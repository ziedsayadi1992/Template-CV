// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { CV_DATA } from "./cvdata.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "*";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175", 
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(" CORS blocked origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

app.use(express.json({ limit: "1mb" }));

// -------------------------
// Translation helper
// -------------------------
async function translateData(targetLang, data) {
  const prompt = `
You are a translation engine. Translate ONLY the human-readable strings in the following JSON object into ${targetLang}. Follow these rules strictly:

- KEEP ALL JSON KEYS and structure identical.
- DO NOT translate numbers, IDs, URLs, emails, or code.
- Return ONLY valid JSON (no commentary, no markdown, no extra text).

JSON to translate:
${JSON.stringify(data, null, 2)}
`;
  
  try {
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    
    const candidate = result?.candidates?.[0];
    if (!candidate || !candidate.content) {
      console.error("❌ Gemini returned no usable content:", result);
      return {};
    }
    
    // ✅ FIX: content is an object with a 'parts' array, not a direct array
    const parts = candidate.content.parts;
    if (!parts || !Array.isArray(parts) || parts.length === 0) {
      console.error("❌ No parts found in content:", candidate.content);
      return {};
    }
    
    // Extract text from the first part
    const rawText = parts[0].text?.trim() || "{}";
    
    
    // ✅ Extract JSON from potential markdown code blocks
    let cleanJson = rawText;
    
    // Remove markdown code blocks if present
    if (rawText.includes("```")) {
      const codeBlockMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)```/);
      cleanJson = codeBlockMatch ? codeBlockMatch[1].trim() : rawText;
    }
    
    // Extract JSON object
    const jsonMatch = cleanJson.match(/\{[\s\S]*\}/);
    cleanJson = jsonMatch ? jsonMatch[0] : "{}";
    
    try {
      return JSON.parse(cleanJson);
    } catch (parseError) {
      console.error("❌ Failed to parse Gemini response:", cleanJson);
      throw new Error("Failed to parse valid JSON from Gemini output.");
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Error communicating with Gemini API: " + error.message);
  }
}


// -------------------------
// Routes
// -------------------------
app.post("/api/translate", async (req, res) => {
  try {
    const { targetLang, data } = req.body;
    if (!targetLang || !data) {
      return res.status(400).json({ error: "targetLang and data are required" });
    }

    const translated = await translateData(targetLang, data);
    res.json(translated);
  } catch (err) {
    console.error("Translate endpoint error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/test-translate", async (req, res) => {
  try {
    const translated = await translateData("English", CV_DATA);
    res.json(translated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------
// Start server
// -------------------------
app.listen(PORT, async () => {
  console.log(`✅ Translate server listening on http://localhost:${PORT}`);
});
