import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CVData } from '../types/cv';
import { uiTranslations, UITranslations } from '../data/uiTranslations';
import { translationCache } from '../utils/translationCache'; // ✅ Import the new class

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
  translationCache: typeof translationCache; // ✅ Use the class type
  clearTranslationCache: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ✅ Load language from localStorage on init
  const [currentLanguage, setCurrentLanguageState] = useState<string>(() => {
    const saved = localStorage.getItem('selectedLanguage');
    return saved || 'Français';
  });
  
  // ✅ Load translated CV from localStorage on init
  const [translatedCV, setTranslatedCVState] = useState<CVData | null>(() => {
    const saved = localStorage.getItem('translatedCV');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationProgress, setTranslationProgress] = useState(0);
  
  const [currentUITranslations, setCurrentUITranslations] = useState<UITranslations>(
    uiTranslations[currentLanguage] || uiTranslations['Français']
  );

  useEffect(() => {
    setCurrentUITranslations(uiTranslations[currentLanguage] || uiTranslations['Français']);
  }, [currentLanguage]);

  // ✅ Persist language to localStorage when it changes
  const setLanguage = (lang: string) => {
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

  const t = (key: string): string => {
    return currentUITranslations[key] || key;
  };

  // ✅ Use the class's clear method
  const clearTranslationCache = () => {
    translationCache.clear();
    setTranslatedCVState(null);
  };

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
        translationCache, // ✅ Pass the imported class instance
        clearTranslationCache,
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