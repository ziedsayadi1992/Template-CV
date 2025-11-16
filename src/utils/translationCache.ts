import type { CVData } from '../types';

interface CacheEntry {
  data: CVData;
  timestamp: number;
}

// Helper to strip avatar for cache key generation
function stripAvatarForKey(data: CVData): string {
  const stripped = JSON.parse(JSON.stringify(data));
  if (stripped.personalInfo?.avatarUrl) {
    stripped.personalInfo.avatarUrl = '';
  }
  return JSON.stringify(stripped);
}

class TranslationCache {
  private cache: Map<string, CacheEntry> = new Map();
  private maxAge = 3600000; // 1 hour
  private localStorageKey = 'cv-translation-cache';

  // ✅ Method signature: (data: CVData, targetLang: string) => CVData | null
  get(data: CVData, targetLang: string): CVData | null {
    const key = this.getCacheKey(data, targetLang);
    const entry = this.cache.get(key);

    if (!entry) {
      return this.getFromLocalStorage(data, targetLang);
    }

    if (Date.now() - entry.timestamp > this.maxAge) {
      this.cache.delete(key);
      return null;
    }

    console.log('✅ Cache hit (in-memory):', key.substring(0, 50));
    
    const result = { ...entry.data };
    if (data.personalInfo?.avatarUrl) {
      result.personalInfo.avatarUrl = data.personalInfo.avatarUrl;
    }
    
    return result;
  }

  // ✅ Method signature: (data: CVData, targetLang: string, translatedData: CVData) => void
  set(data: CVData, targetLang: string, translatedData: CVData): void {
    const key = this.getCacheKey(data, targetLang);
    
    const dataToStore = JSON.parse(JSON.stringify(translatedData));
    if (dataToStore.personalInfo?.avatarUrl) {
      dataToStore.personalInfo.avatarUrl = '';
    }
    
    this.cache.set(key, {
      data: dataToStore,
      timestamp: Date.now(),
    });

    this.saveToLocalStorage(data, targetLang, dataToStore);
    console.log('💾 Cached translation:', key.substring(0, 50));
  }

  private getCacheKey(data: CVData, targetLang: string): string {
    const strippedData = stripAvatarForKey(data);
    return `${targetLang}:${strippedData.substring(0, 200)}`;
  }

  private getFromLocalStorage(data: CVData, targetLang: string): CVData | null {
    try {
      const stored = localStorage.getItem(this.localStorageKey);
      if (!stored) return null;

      const cache = JSON.parse(stored);
      const key = this.getCacheKey(data, targetLang);
      const entry = cache[key];

      if (!entry) return null;

      if (Date.now() - entry.timestamp > this.maxAge) {
        delete cache[key];
        localStorage.setItem(this.localStorageKey, JSON.stringify(cache));
        return null;
      }

      console.log('✅ Cache hit (localStorage):', key.substring(0, 50));
      
      const result = entry.data;
      if (data.personalInfo?.avatarUrl) {
        result.personalInfo.avatarUrl = data.personalInfo.avatarUrl;
      }
      
      this.cache.set(key, {
        data: entry.data,
        timestamp: entry.timestamp
      });

      return result;
    } catch (err) {
      console.error('localStorage cache read error:', err);
      return null;
    }
  }

  private saveToLocalStorage(data: CVData, targetLang: string, translatedData: CVData): void {
    try {
      const stored = localStorage.getItem(this.localStorageKey);
      const cache = stored ? JSON.parse(stored) : {};
      const key = this.getCacheKey(data, targetLang);

      cache[key] = {
        data: translatedData,
        timestamp: Date.now()
      };

      localStorage.setItem(this.localStorageKey, JSON.stringify(cache));
    } catch (err) {
      console.error('localStorage cache write error:', err);
    }
  }

  clear(): void {
    this.cache.clear();
    try {
      localStorage.removeItem(this.localStorageKey);
      localStorage.removeItem('translatedCV');
      console.log('🗑️ Translation cache cleared');
    } catch (err) {
      console.error('Failed to clear localStorage cache:', err);
    }
  }

  cleanExpired(): void {
    try {
      const stored = localStorage.getItem(this.localStorageKey);
      if (!stored) return;

      const cache = JSON.parse(stored);
      let cleaned = false;

      for (const key in cache) {
        if (Date.now() - cache[key].timestamp > this.maxAge) {
          delete cache[key];
          cleaned = true;
        }
      }

      if (cleaned) {
        localStorage.setItem(this.localStorageKey, JSON.stringify(cache));
        console.log('🧹 Cleaned expired cache entries');
      }
    } catch (err) {
      console.error('Failed to clean expired cache:', err);
    }
  }
}

// ✅ Export a single instance
export const translationCache = new TranslationCache();

// Clean expired cache on initialization
translationCache.cleanExpired();