import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CVData } from '../types/cv';
import { uiTranslations } from '../data/uiTranslations';
import { translationCache } from '../utils/translationCache';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  translatedCV: CVData | null;
  setTranslatedCV: (cv: CVData | null) => void;
  isTranslating: boolean;
  setIsTranslating: (value: boolean) => void;
  translationProgress: number;
  setTranslationProgress: (value: number) => void;
  translationCache: typeof translationCache;
  clearTranslationCache: () => void;
  cvSourceLanguage: string | null;
  setCvSourceLanguage: (lang: string | null) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ✅ Load language from localStorage on init
  const [currentLanguage, setCurrentLanguageState] = useState<string>(() => {
    const saved = localStorage.getItem('selectedLanguage');
    return saved || 'Français';
  });
  
  // ✅ Track the source language of the CV (to avoid unnecessary translations)
  const [cvSourceLanguage, setCvSourceLanguageState] = useState<string | null>(() => {
    const saved = localStorage.getItem('cvSourceLanguage');
    return saved || null;
  });
  
  // ✅ Load translated CV from localStorage on init
  const [translatedCV, setTranslatedCVState] = useState<CVData | null>(() => {
    try {
      const saved = localStorage.getItem('translatedCV');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationProgress, setTranslationProgress] = useState(0);

  // ✅ Translation function that updates when language changes
  const t = (key: string): string => {
    const translations = uiTranslations[currentLanguage];
    if (!translations) {
      console.warn(`No translations found for language: ${currentLanguage}`);
      return key;
    }
    return translations[key] || key;
  };

  // ✅ Persist language to localStorage when it changes
  const setLanguage = (lang: string) => {
    console.log(`🌍 Changing language to: ${lang}`);
    setCurrentLanguageState(lang);
    localStorage.setItem('selectedLanguage', lang);
    setTranslationProgress(0);
  };

  // ✅ Persist translated CV to localStorage when it changes
  const setTranslatedCV = (cv: CVData | null) => {
    setTranslatedCVState(cv);
    if (cv) {
      localStorage.setItem('translatedCV', JSON.stringify(cv));
    } else {
      localStorage.removeItem('translatedCV');
    }
  };

  // ✅ Set and persist CV source language
  const setCvSourceLanguage = (lang: string | null) => {
    setCvSourceLanguageState(lang);
    if (lang) {
      localStorage.setItem('cvSourceLanguage', lang);
    } else {
      localStorage.removeItem('cvSourceLanguage');
    }
  };

  // ✅ Clear translation cache
  const clearTranslationCache = () => {
    translationCache.clear();
    setTranslatedCVState(null);
    localStorage.removeItem('translatedCV');
  };

  // ✅ Debug: Log when language changes
  useEffect(() => {
    console.log(`📝 Current language: ${currentLanguage}`);
    console.log(`📝 CV Source language: ${cvSourceLanguage}`);
  }, [currentLanguage, cvSourceLanguage]);

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        t,
        translatedCV,
        setTranslatedCV,
        isTranslating,
        setIsTranslating,
        translationProgress,
        setTranslationProgress,
        translationCache,
        clearTranslationCache,
        cvSourceLanguage,
        setCvSourceLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};