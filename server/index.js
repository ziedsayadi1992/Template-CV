import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const primaryModel = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash-lite" }); // More stable model
const fallbackModel = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash-lite" });

// Middleware
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "50mb" }));

// Cache directory setup
const CACHE_DIR = path.join(__dirname, "translation-cache");
const CACHE_INDEX_FILE = path.join(CACHE_DIR, "index.json");

// Initialize cache directory
async function initCacheDir() {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });
    console.log("✅ Translation cache directory initialized");
  } catch (err) {
    console.error("❌ Failed to create cache directory:", err);
  }
}

// Load cache index
async function loadCacheIndex() {
  try {
    const data = await fs.readFile(CACHE_INDEX_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

// Save cache index
async function saveCacheIndex(index) {
  try {
    await fs.writeFile(CACHE_INDEX_FILE, JSON.stringify(index, null, 2));
  } catch (err) {
    console.error("❌ Failed to save cache index:", err);
  }
}

// Generate cache key from CV data
function generateCacheKey(data, targetLang) {
  const content = JSON.stringify(data);
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `${targetLang}_${Math.abs(hash).toString(36)}`;
}

// Get cached translation
async function getCachedTranslation(cacheKey) {
  try {
    const cacheIndex = await loadCacheIndex();
    const cacheEntry = cacheIndex[cacheKey];
    
    if (!cacheEntry) return null;
    
    // Check if cache is expired (7 days)
    const now = Date.now();
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    if (now - cacheEntry.timestamp > maxAge) {
      console.log(`⏰ Cache expired for ${cacheKey}`);
      return null;
    }
    
    const cacheFile = path.join(CACHE_DIR, `${cacheKey}.json`);
    const data = await fs.readFile(cacheFile, "utf-8");
    console.log(`✅ Cache hit: ${cacheKey}`);
    return JSON.parse(data);
  } catch (err) {
    console.log(`❌ Cache miss: ${cacheKey}`);
    return null;
  }
}

// Save cached translation
async function saveCachedTranslation(cacheKey, data, targetLang) {
  try {
    const cacheFile = path.join(CACHE_DIR, `${cacheKey}.json`);
    await fs.writeFile(cacheFile, JSON.stringify(data, null, 2));
    
    const cacheIndex = await loadCacheIndex();
    cacheIndex[cacheKey] = {
      timestamp: Date.now(),
      language: targetLang,
      file: `${cacheKey}.json`
    };
    await saveCacheIndex(cacheIndex);
    
    console.log(`💾 Cached translation: ${cacheKey}`);
  } catch (err) {
    console.error("❌ Failed to save cache:", err);
  }
}

// Smart chunk splitting - improved to preserve JSON structure
function smartSplitChunks(jsonStr, maxLength = 800) {
  const chunks = [];
  let current = "";
  let braceCount = 0;
  let inString = false;
  let escapeNext = false;
  
  for (let i = 0; i < jsonStr.length; i++) {
    const char = jsonStr[i];
    
    if (escapeNext) {
      current += char;
      escapeNext = false;
      continue;
    }
    
    if (char === '\\') {
      escapeNext = true;
      current += char;
      continue;
    }
    
    if (char === '"' && !escapeNext) {
      inString = !inString;
    }
    
    if (!inString) {
      if (char === '{' || char === '[') braceCount++;
      if (char === '}' || char === ']') braceCount--;
    }
    
    current += char;
    
    // Split at safe boundaries (after complete objects/arrays)
    if (current.length >= maxLength && braceCount === 0 && !inString) {
      chunks.push(current.trim());
      current = "";
    }
  }
  
  if (current.trim()) {
    chunks.push(current.trim());
  }
  
  return chunks.filter(c => c.length > 0);
}

// Improved JSON healing
function healJSON(text) {
  let healed = text.trim();
  
  // Remove markdown code blocks
  healed = healed.replace(/```json\n?/g, '').replace(/```\n?/g, '');
  
  // Remove trailing commas before closing brackets
  healed = healed.replace(/,(\s*[}\]])/g, '$1');
  
  // ❌ REMOVE THIS LINE - it was corrupting translations
  // healed = healed.replace(/([^\\])"/g, '$1"');
  
  // Add missing closing brackets
  const openBraces = (healed.match(/{/g) || []).length;
  const closeBraces = (healed.match(/}/g) || []).length;
  const openBrackets = (healed.match(/\[/g) || []).length;
  const closeBrackets = (healed.match(/\]/g) || []).length;
  
  if (openBraces > closeBraces) {
    healed += '}'.repeat(openBraces - closeBraces);
  }
  if (openBrackets > closeBrackets) {
    healed += ']'.repeat(openBrackets - closeBrackets);
  }
  
  return healed;
}


// Enhanced retry with fallback
async function withRetryAndFallback(fn, retries = 5) {
  let delay = 500; // Increased initial delay
  
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      // Use fallback model after 2 failed attempts
      const model = attempt >= 2 ? fallbackModel : primaryModel;
      return await fn(model);
    } catch (err) {
      const is429 = err.status === 429 || `${err}`.includes("429") || `${err}`.includes("quota");
      const is503 = err.status === 503 || `${err}`.includes("503");
      
      console.log(`⚠️ Attempt ${attempt + 1}/${retries} failed:`, err.message);
      
      if (is429 || is503) {
        if (attempt < retries - 1) {
          console.log(`⏳ Waiting ${delay}ms before retry...`);
          await new Promise((r) => setTimeout(r, delay));
          delay *= 2; // Exponential backoff
          continue;
        }
      } else {
        throw err;
      }
    }
  }
  throw new Error("Translation failed after all retries");
}

// Translate a single chunk
// Translate a single chunk

async function translateChunk(text, targetLang, model) {
  const prompt = `
    Translate the following JSON content to ${targetLang}.
    
    IMPORTANT RULES:
    1. This is CV (Curriculum Vitae) data. Use appropriate professional terminology.
    2. DO NOT translate:
      - JSON keys (personalInfo, fullName, jobTitle, etc.)
      - Field names
      - IDs
      - URLs
      - Email addresses
    3. DO translate:
      - All text content values
      - Job titles
      - Company descriptions
      - Skills
      - Mission descriptions
      - **ALL section titles in sectionTitles** - CRITICAL: These MUST be translated
    4. Preserve the EXACT JSON structure
    5. Return ONLY valid JSON - no markdown, no comments, no explanations
    6. Keep all arrays the same length
    7. Keep all special characters and formatting
    8. CRITICAL: sectionTitles must use professional ${targetLang} terms:
       - profile → Professional Profile / Profil Professionnel / etc.
       - skills → Skills / Compétences / etc.
       - technologies → Technical Environment / Environnements Techniques / etc.
       - experiences → Professional Experience / Expériences Professionnelles / etc.
       - certifications → Certifications / Certifications / etc.
       - languages → Languages / Langues / etc.

    JSON to translate:
    ${text}

    Return ONLY the translated JSON (no markdown blocks):`;

  const result = await model.generateContent(prompt);
  let translated = result.response.text();
  
  // Clean up the response
  translated = healJSON(translated);
  
  return translated;
}

function stripAvatarFromCV(cvData) {
  const stripped = JSON.parse(JSON.stringify(cvData)); // Deep clone
  if (stripped.personalInfo?.avatarUrl) {
    stripped.personalInfo.avatarUrl = ""; // Remove base64 image
  }
  return stripped;
}

function restoreAvatarToCV(translatedData, originalData) {
  if (originalData.personalInfo?.avatarUrl) {
    translatedData.personalInfo.avatarUrl = originalData.personalInfo.avatarUrl;
  }
  return translatedData;
}

// Streaming translation endpoint
// Streaming translation endpoint
app.post("/api/translate-stream", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  
  try {
    const { targetLang, data } = req.body;
    
    if (!targetLang || !data) {
      res.write(`event: error\ndata: ${JSON.stringify({ error: "Missing parameters" })}\n\n`);
      res.end();
      return;
    }
    
    // ✅ Strip avatar before translation
    const avatarUrl = data.personalInfo?.avatarUrl || "";
    const dataToTranslate = stripAvatarFromCV(data);
    
    // Check cache first (use stripped data for cache key)
    const cacheKey = generateCacheKey(dataToTranslate, targetLang);
    const cached = await getCachedTranslation(cacheKey);
    
    if (cached) {
      // ✅ Restore avatar to cached result
      const withAvatar = restoreAvatarToCV(cached, data);
      res.write(`event: start\ndata: ${JSON.stringify({ chunks: 1, cached: true })}\n\n`);
      res.write(`event: chunk\ndata: ${JSON.stringify({ 
        index: 0, 
        text: JSON.stringify(withAvatar), 
        progress: 100 
      })}\n\n`);
      res.write(`event: done\ndata: ${JSON.stringify({ cached: true })}\n\n`);
      res.end();
      return;
    }
    
    // ✅ Translate the stripped data
    const jsonStr = JSON.stringify(dataToTranslate);
    const chunks = smartSplitChunks(jsonStr, 800);
    
    console.log(`📦 Translating ${chunks.length} chunks to ${targetLang}`);
    res.write(`event: start\ndata: ${JSON.stringify({ chunks: chunks.length })}\n\n`);
    
    const translatedChunks = [];
    
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      
      try {
        console.log(`🔄 Translating chunk ${i + 1}/${chunks.length}`);
        
        const translated = await withRetryAndFallback(
          (model) => translateChunk(chunk, targetLang, model)
        );
        
        translatedChunks.push(translated);
        
        const progress = Math.round(((i + 1) / chunks.length) * 100);
        res.write(
          `event: chunk\ndata: ${JSON.stringify({
            index: i,
            text: translated,
            progress: progress
          })}\n\n`
        );
        
        await new Promise((r) => setTimeout(r, 100));
        
      } catch (chunkError) {
        console.error(`❌ Chunk ${i} failed:`, chunkError.message);
        res.write(`event: error\ndata: ${JSON.stringify({
          error: `Translation failed at chunk ${i + 1}: ${chunkError.message}`
        })}\n\n`);
        res.end();
        return;
      }
    }
    
    // Combine and validate
    const combined = translatedChunks.join("");
    const healed = healJSON(combined);
    
    try {
      const finalResult = JSON.parse(healed);
      
      // ✅ Restore avatar to final result
      const withAvatar = restoreAvatarToCV(finalResult, data);
      
      // Save to cache (without avatar)
      await saveCachedTranslation(cacheKey, finalResult, targetLang);
      
      console.log(`✅ Translation complete: ${targetLang}`);
      res.write(`event: done\ndata: ${JSON.stringify({ success: true })}\n\n`);
    } catch (err) {
      console.error("❌ Final JSON validation failed:", err.message);
      res.write(`event: error\ndata: ${JSON.stringify({
        error: "Failed to validate final JSON",
        details: err.message
      })}\n\n`);
    }
    
    res.end();
  } catch (err) {
    console.error("❌ Stream error:", err);
    res.write(`event: error\ndata: ${JSON.stringify({ 
      error: err.message || "Translation failed" 
    })}\n\n`);
    res.end();
  }
});


// Fast parallel translation endpoint (improved)
app.post("/api/translate-fast", async (req, res) => {
  try {
    const { targetLang, data } = req.body;
    
    if (!targetLang || !data) {
      return res.status(400).json({ error: "Missing parameters" });
    }
    
    // ✅ Strip avatar before translation
    const dataToTranslate = stripAvatarFromCV(data);
    
    // Check cache
    const cacheKey = generateCacheKey(dataToTranslate, targetLang);
    const cached = await getCachedTranslation(cacheKey);
    
    if (cached) {
      console.log(`✅ Returning cached translation: ${cacheKey}`);
      // ✅ Restore avatar
      const withAvatar = restoreAvatarToCV(cached, data);
      return res.json(withAvatar);
    }
    
    const jsonStr = JSON.stringify(dataToTranslate);
    const chunks = smartSplitChunks(jsonStr, 800);
    
    console.log(`📦 Fast translating ${chunks.length} chunks`);
    
    const translatedChunks = [];
    const batchSize = 3;
    
    for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize);
      const batchPromises = batch.map((chunk, idx) => 
        withRetryAndFallback((model) => translateChunk(chunk, targetLang, model))
          .catch(err => {
            console.error(`Chunk ${i + idx} failed:`, err.message);
            return chunk;
          })
      );
      
      const batchResults = await Promise.all(batchPromises);
      translatedChunks.push(...batchResults);
    }
    
    const combined = translatedChunks.join("");
    const healed = healJSON(combined);
    
    const finalResult = JSON.parse(healed);
    
    // ✅ Restore avatar
    const withAvatar = restoreAvatarToCV(finalResult, data);
    
    // Save to cache (without avatar)
    await saveCachedTranslation(cacheKey, finalResult, targetLang);
    
    res.json(withAvatar);
  } catch (err) {
    console.error("❌ Fast translate error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Clear cache endpoint
app.post("/api/clear-cache", async (req, res) => {
  try {
    const files = await fs.readdir(CACHE_DIR);
    for (const file of files) {
      if (file.endsWith('.json')) {
        await fs.unlink(path.join(CACHE_DIR, file));
      }
    }
    console.log("🗑️ Cache cleared");
    res.json({ message: "Cache cleared successfully" });
  } catch (err) {
    console.error("❌ Failed to clear cache:", err);
    res.status(500).json({ error: err.message });
  }
});

// Cache statistics endpoint
app.get("/api/cache-stats", async (req, res) => {
  try {
    const cacheIndex = await loadCacheIndex();
    const stats = {
      totalTranslations: Object.keys(cacheIndex).length,
      languages: {},
      cacheSize: 0
    };
    
    for (const key in cacheIndex) {
      const lang = cacheIndex[key].language;
      stats.languages[lang] = (stats.languages[lang] || 0) + 1;
    }
    
    const files = await fs.readdir(CACHE_DIR);
    for (const file of files) {
      const stat = await fs.stat(path.join(CACHE_DIR, file));
      stats.cacheSize += stat.size;
    }
    
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Test endpoint
app.get("/api/test-model", async (req, res) => {
  try {
    const result = await primaryModel.generateContent("Say 'OK' if you're working");
    res.json({ status: "ok", response: result.response.text() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Update the healCVJSON function to properly handle control characters
// Keep the simple healing function

function healCVJSON(text) {
  let healed = text.trim();
  
  // Only remove trailing commas before closing brackets
  healed = healed.replace(/,(\s*[}\]])/g, '$1');
  
  // Add missing closing brackets if needed
  const openBraces = (healed.match(/{/g) || []).length;
  const closeBraces = (healed.match(/}/g) || []).length;
  const openBrackets = (healed.match(/\[/g) || []).length;
  const closeBrackets = (healed.match(/\]/g) || []).length;
  
  if (openBraces > closeBraces) {
    healed += '}'.repeat(openBraces - closeBraces);
  }
  if (openBrackets > closeBrackets) {
    healed += ']'.repeat(openBrackets - closeBrackets);
  }
  
  return healed;
}

// Add this helper function to fix control characters inside strings only
function escapeControlCharsInStrings(jsonStr) {
  let result = '';
  let inString = false;
  let escapeNext = false;
  
  for (let i = 0; i < jsonStr.length; i++) {
    const char = jsonStr[i];
    const code = char.charCodeAt(0);
    
    // Handle escape sequences
    if (escapeNext) {
      result += char;
      escapeNext = false;
      continue;
    }
    
    if (char === '\\') {
      result += char;
      escapeNext = true;
      continue;
    }
    
    // Track if we're inside a string
    if (char === '"' && !escapeNext) {
      inString = !inString;
      result += char;
      continue;
    }
    
    // If inside a string and it's a control character, escape it
    if (inString && code < 32) {
      switch (code) {
        case 9: result += '\\t'; break;  // tab
        case 10: result += '\\n'; break; // newline
        case 13: result += '\\r'; break; // carriage return
        default: result += ''; break;    // remove other control chars
      }
    } else {
      result += char;
    }
  }
  
  return result;
}


// ============================================
// ENSURE SECTION TITLES HELPER
// ============================================
function ensureSectionTitles(jsonData) {
  // Detect the language of the CV based on content
  const detectedLang = detectCVLanguage(jsonData);
  
  // Define default titles for each language
  const defaultTitles = {
    'English': {
      profile: 'Professional Profile',
      skills: 'Skills',
      technologies: 'Technical Environment',
      experiences: 'Professional Experience',
      certifications: 'Certifications',
      languages: 'Languages'
    },
    'French': {
      profile: 'Profil Professionnel',
      skills: 'Domaines de Compétences',
      technologies: 'Environnements Techniques',
      experiences: 'Expériences Professionnelles',
      certifications: 'Certifications',
      languages: 'Langues'
    },
    'Arabic': {
      profile: 'الملف الشخصي المهني',
      skills: 'المهارات',
      technologies: 'البيئات التقنية',
      experiences: 'الخبرات المهنية',
      certifications: 'الشهادات',
      languages: 'اللغات'
    },
    'Spanish': {
      profile: 'Perfil Profesional',
      skills: 'Habilidades',
      technologies: 'Entorno Técnico',
      experiences: 'Experiencia Profesional',
      certifications: 'Certificaciones',
      languages: 'Idiomas'
    },
    'German': {
      profile: 'Berufsprofil',
      skills: 'Fähigkeiten',
      technologies: 'Technische Umgebung',
      experiences: 'Berufserfahrung',
      certifications: 'Zertifizierungen',
      languages: 'Sprachen'
    }
  };

  // Get the default titles for detected language (fallback to English)
  const defaults = defaultTitles[detectedLang] || defaultTitles['English'];
  
  // Ensure sectionTitles exists
  if (!jsonData.sectionTitles) {
    jsonData.sectionTitles = {};
  }
  
  // Apply defaults for any null or empty values
  for (const key in defaults) {
    if (!jsonData.sectionTitles[key] || jsonData.sectionTitles[key].trim() === '') {
      jsonData.sectionTitles[key] = defaults[key];
      console.log(`✅ Applied default ${detectedLang} title for "${key}": ${defaults[key]}`);
    }
  }
  
  return jsonData;
}

// ============================================
// LANGUAGE DETECTION FUNCTION
// ============================================
function detectCVLanguage(jsonData) {
  // Sample text from various fields to detect language
  const sampleTexts = [];
  
  if (jsonData.personalInfo?.professionalTitle) {
    sampleTexts.push(jsonData.personalInfo.professionalTitle);
  }
  if (jsonData.profile) {
    sampleTexts.push(jsonData.profile.substring(0, 200)); // First 200 chars
  }
  if (jsonData.experiences && jsonData.experiences.length > 0) {
    const firstExp = jsonData.experiences[0];
    if (firstExp.jobTitle) sampleTexts.push(firstExp.jobTitle);
    if (firstExp.missions && firstExp.missions[0]) {
      sampleTexts.push(firstExp.missions[0]);
    }
  }
  if (jsonData.sectionTitles) {
    // Check existing section titles
    for (const key in jsonData.sectionTitles) {
      if (jsonData.sectionTitles[key] && typeof jsonData.sectionTitles[key] === 'string') {
        sampleTexts.push(jsonData.sectionTitles[key]);
      }
    }
  }
  
  const combinedText = sampleTexts.join(' ').toLowerCase();
  
  // Language detection patterns
  const patterns = {
    'French': /\b(professionnel|compétences|expériences|développeur|ingénieur|gestion|projet)\b/i,
    'Arabic': /[\u0600-\u06FF]/,  // Arabic Unicode range
    'Spanish': /\b(profesional|experiencia|habilidades|desarrollo|ingeniero|gestión)\b/i,
    'German': /\b(berufserfahrung|fähigkeiten|entwickler|ingenieur|projekt)\b/i,
    'English': /\b(professional|experience|skills|developer|engineer|management|project)\b/i
  };
  
  // Score each language
  const scores = {};
  for (const [lang, pattern] of Object.entries(patterns)) {
    const matches = combinedText.match(pattern);
    scores[lang] = matches ? matches.length : 0;
  }
  
  // Get language with highest score
  let detectedLang = 'English'; // Default
  let maxScore = 0;
  
  for (const [lang, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      detectedLang = lang;
    }
  }
  
  console.log(`🔍 Detected CV language: ${detectedLang} (score: ${maxScore})`);
  console.log(`   Language scores:`, scores);
  
  return detectedLang;
}

// Add this to your server/index.js after the existing code

// ============================================
// RATE LIMIT HANDLER FOR PDF EXTRACTION
// ============================================

// Retry configuration
const RETRY_CONFIG = {
  maxRetries: 3,
  baseDelay: 2000,      // Start with 2 seconds
  maxDelay: 30000,      // Max 30 seconds
  backoffMultiplier: 2   // Double each time
};

// Rate limit detection
function isRateLimitError(error) {
  const errorMessage = error.message || error.toString();
  return errorMessage.includes('429') || 
         errorMessage.includes('Too Many Requests') || 
         errorMessage.includes('Resource exhausted') ||
         errorMessage.includes('quota');
}

// Sleep function for delays
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Calculate exponential backoff delay
function getBackoffDelay(retryCount) {
  const delay = Math.min(
    RETRY_CONFIG.baseDelay * Math.pow(RETRY_CONFIG.backoffMultiplier, retryCount),
    RETRY_CONFIG.maxDelay
  );
  // Add jitter (random 0-25% variation) to prevent thundering herd
  const jitter = delay * 0.25 * Math.random();
  return Math.floor(delay + jitter);
}

// Improved extractCVData function with retry logic

async function extractCVData(text, retryCount = 0) {
  const prompt = `
You are a professional CV parser. Your task is to intelligently read the following raw CV text, **infer its sectional structure (headings, lists, paragraphs)**, and then accurately map and extract all relevant information into a valid JSON object matching the **EXACT** provided schema.

### JSON Schema (MUST be strictly followed):
{
  "personalInfo": {
    "fullName": string,
    "professionalTitle": string,
    "avatarUrl": ""
  },
  "profile": string (professional summary/objective - the main introductory text ONLY),
  "contact": {
    "email": string,
    "phone": string,
    "location": string,
    "github": string,
    "linkedin": string
  },
  "skills": [string array of SOFT/NON-TECHNICAL skills only],
  "technologies": [
    {
      "id": string (unique id),
      "title": string (category name),
      "items": string (comma-separated list of technologies)
    }
  ],
  "experiences": [
    {
      "id": string (unique id),
      "jobTitle": string,
      "company": string,
      "missions": [string array]
    }
  ],
  "languages": [
    {
      "name": string,
      "flag": "",
      "level": string
    }
  ],
  "certifications": [
    {
      "name": string,
      "issuer": string
    }
  ],
  "customSections": [],
  "sectionOrder": ["personal", "profile", "skills", "technologies", "experiences", "certifications", "languages"],
  "sectionTitles": {
    "profile": string (GENERIC section title in CV language - NOT the actual profile content),
    "skills": string (GENERIC section title),
    "technologies": string (GENERIC section title),
    "experiences": string (GENERIC section title),
    "certifications": string (GENERIC section title),
    "languages": string (GENERIC section title)
  }
}

### CRITICAL PARSING RULES:
1. **Section Titles vs Content**: sectionTitles should contain GENERIC headers like "Profil Professionnel", NOT actual content
2. **Profile Field**: Extract ONLY the introductory summary/objective paragraph
3. **Skills vs Technologies**: skills = soft skills (Leadership, Communication), technologies = technical skills (React, PHP)
4. **No Duplication**: Each piece of information appears ONLY ONCE
5. **Language Detection**: CRITICAL - Detect the CV's language and use section titles in that SAME language:
   - If CV is in English → use English titles (Skills, Technical Environment, Professional Experience, etc.)
   - If CV is in French → use French titles (Compétences, Environnements Techniques, Expériences Professionnelles, etc.)
   - If CV is in Arabic → use Arabic titles (المهارات, البيئات التقنية, الخبرات المهنية, etc.)
6. **ALL Section Titles are REQUIRED**: Every field in sectionTitles MUST have a value - NEVER use null or empty strings
7. **String Formatting**: Keep each string on a SINGLE LINE
8. **Output Format**: Return ONLY valid JSON

CV TEXT to parse:
${text}

Return ONLY the JSON object:
`;

  try {
    console.log(`📄 Attempting CV extraction (attempt ${retryCount + 1}/${RETRY_CONFIG.maxRetries + 1})`);
    
    const result = await primaryModel.generateContent(prompt);
    let rawText = result.response.text().trim();
    
    console.log("✅ Raw response received, length:", rawText.length);

    // Remove markdown code blocks
    rawText = rawText.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    
    // Parse JSON
    let jsonData = JSON.parse(rawText);
    
    // ✅ FIX: Apply fallback titles if any are missing
    jsonData = ensureSectionTitles(jsonData);
    
    console.log("✅ CV extraction successful!");
    return jsonData;
    
  } catch (error) {
    console.error(`❌ Extraction error (attempt ${retryCount + 1}):`, error.message);
    
    // Retry on rate limit errors
    if (isRateLimitError(error) && retryCount < RETRY_CONFIG.maxRetries) {
      const delay = getBackoffDelay(retryCount);
      console.log(`⏳ Rate limit hit. Retrying in ${delay}ms...`);
      await sleep(delay);
      return extractCVData(text, retryCount + 1);
    }
    
    // If all retries failed, throw error
    throw new Error(`CV extraction failed: ${error.message}`);
  }
}

// Update the /api/extract-cv endpoint to use the new function
// Replace the existing endpoint with this:

app.post('/api/extract-cv', async (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({ error: 'Invalid or empty text provided' });
  }

  try {
    console.log('📥 Received CV extraction request, text length:', text.length);
    
    const cvData = await extractCVData(text);
    
    res.json(cvData);
  } catch (error) {
    console.error('Extract CV endpoint error:', error);
    
    // Send user-friendly error message
    if (isRateLimitError(error)) {
      res.status(429).json({
        error: 'Rate limit exceeded',
        message: 'Too many requests. Please wait a few minutes before trying again.',
        retryAfter: 60, // Suggest waiting 60 seconds
        details: error.message
      });
    } else {
      res.status(500).json({
        error: 'CV extraction failed',
        message: error.message
      });
    }
  }
});

// Add a new endpoint to check rate limit status
app.get('/api/rate-limit-status', async (req, res) => {
  try {
    // Try a minimal API call
    const testModel = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash-lite" });
    await testModel.generateContent("Test");
    
    res.json({
      status: 'ok',
      message: 'API is responsive',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    if (isRateLimitError(error)) {
      res.status(429).json({
        status: 'rate_limited',
        message: 'API is currently rate limited',
        suggestedWaitTime: 60,
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }
});

console.log('✅ Rate limit handler initialized');
console.log(`⚙️  Retry config: max ${RETRY_CONFIG.maxRetries} retries, ${RETRY_CONFIG.baseDelay}ms base delay`);

// Initialize and start server
initCacheDir().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📁 Cache directory: ${CACHE_DIR}`);
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('👋 SIGTERM received, cleaning up...');
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('👋 SIGINT received, cleaning up...');
  process.exit(0);
});