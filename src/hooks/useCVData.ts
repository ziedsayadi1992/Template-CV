import { useState, useEffect } from 'react';
import { CV_DATA } from '../data/cvData';
import type { CVData } from '../types';
import { migrateLegacyData } from '../utils/cvHelpers';
import { migrateCustomSections } from '../utils/customSectionsMigration'; // ✅ NEW IMPORT

// Version for data migration
const CV_DATA_VERSION = 2; // ✅ Increased version for ID migration

interface StoredCVData extends CVData {
  version?: number;
  lastModified?: string;
}

// Validate that CVData has all required fields
const validateCVData = (data: any): boolean => {
  try {
    // Check for critical fields
    if (!data || typeof data !== 'object') {
      console.error('Invalid data: not an object');
      return false;
    }

    if (!data.personalInfo || typeof data.personalInfo !== 'object') {
      console.error('Invalid data: missing personalInfo');
      return false;
    }

    if (typeof data.personalInfo.fullName !== 'string') {
      console.error('Invalid data: personalInfo.fullName must be string');
      return false;
    }

    if (!data.contact || typeof data.contact !== 'object') {
      console.error('Invalid data: missing contact');
      return false;
    }

    if (!Array.isArray(data.skills)) {
      console.error('Invalid data: skills must be array');
      return false;
    }

    if (!Array.isArray(data.technologies)) {
      console.error('Invalid data: technologies must be array');
      return false;
    }

    if (!Array.isArray(data.experiences)) {
      console.error('Invalid data: experiences must be array');
      return false;
    }

    if (!data.sectionTitles || typeof data.sectionTitles !== 'object') {
      console.error('Invalid data: missing sectionTitles');
      return false;
    }

    return true;
  } catch (err) {
    console.error('Validation error:', err);
    return false;
  }
};

// Merge incomplete data with defaults
const mergeWithDefaults = (data: any): CVData => {
  return {
    personalInfo: {
      fullName: data.personalInfo?.fullName || CV_DATA.personalInfo.fullName,
      professionalTitle: data.personalInfo?.professionalTitle || CV_DATA.personalInfo.professionalTitle,
      avatarUrl: data.personalInfo?.avatarUrl || CV_DATA.personalInfo.avatarUrl
    },
    profile: data.profile || CV_DATA.profile,
    contact: {
      email: data.contact?.email || CV_DATA.contact.email,
      phone: data.contact?.phone || CV_DATA.contact.phone,
      location: data.contact?.location || CV_DATA.contact.location,
      github: data.contact?.github || CV_DATA.contact.github,
      linkedin: data.contact?.linkedin || CV_DATA.contact.linkedin,
      fields: Array.isArray(data.contact?.fields) ? data.contact.fields : CV_DATA.contact.fields
    },
    skills: Array.isArray(data.skills) ? data.skills : CV_DATA.skills,
    technologies: Array.isArray(data.technologies) ? data.technologies : CV_DATA.technologies,
    experiences: Array.isArray(data.experiences) ? data.experiences : CV_DATA.experiences,
    languages: Array.isArray(data.languages) ? data.languages : CV_DATA.languages,
    certifications: Array.isArray(data.certifications) ? data.certifications : CV_DATA.certifications,
    customSections: Array.isArray(data.customSections) ? data.customSections : CV_DATA.customSections,
    sectionOrder: Array.isArray(data.sectionOrder) ? data.sectionOrder : CV_DATA.sectionOrder,
    sectionTitles: data.sectionTitles || CV_DATA.sectionTitles
  };
};

// Load CV data from localStorage with validation
const loadFromStorage = (): CVData => {
  try {
    const saved = localStorage.getItem('cvData');
    
    if (!saved) {
      console.log('📝 No saved CV data, using defaults');
      return CV_DATA;
    }

    const parsed = JSON.parse(saved) as StoredCVData;
    
    // ✅ Always migrate data to ensure IDs are present
    let migratedData = migrateLegacyData(parsed);
    
    // ✅ NEW: Migrate custom sections to ensure blocks arrays exist
    migratedData = migrateCustomSections(migratedData);
    
    // Check version
    if (!parsed.version || parsed.version < CV_DATA_VERSION) {
      console.log(`🔄 Migrating CV data from version ${parsed.version || 1} to ${CV_DATA_VERSION}`);
      // Save the migrated data
      saveToStorage(migratedData);
    }

    // Validate data structure
    if (!validateCVData(migratedData)) {
      console.warn('⚠️ Stored CV data is invalid after migration, using defaults');
      return CV_DATA;
    }

    console.log('✅ Loaded and migrated CV data from localStorage');
    return migratedData as CVData;

  } catch (err) {
    console.error('❌ Failed to load CV data from localStorage:', err);
    console.warn('💡 Using default CV data instead');
    
    // Try to clear corrupted data
    try {
      localStorage.removeItem('cvData');
      console.log('🧹 Cleared corrupted data from localStorage');
    } catch (cleanupErr) {
      console.error('Failed to clear corrupted data:', cleanupErr);
    }
    
    return CV_DATA;
  }
};

// Save CV data to localStorage with validation
const saveToStorage = (data: CVData): boolean => {
  try {
    // Validate before saving
    if (!validateCVData(data)) {
      console.error('❌ Cannot save: CV data is invalid');
      return false;
    }

    const dataToSave: StoredCVData = {
      ...data,
      version: CV_DATA_VERSION,
      lastModified: new Date().toISOString()
    };

    localStorage.setItem('cvData', JSON.stringify(dataToSave));
    console.log('✅ CV data saved to localStorage');
    return true;

  } catch (err) {
    console.error('❌ Failed to save CV data to localStorage:', err);
    
    // Check if it's a quota exceeded error
    if (err instanceof Error && err.name === 'QuotaExceededError') {
      console.error('💾 localStorage quota exceeded!');
      console.warn('💡 Try clearing old data or reducing CV size');
    }
    
    return false;
  }
};

export const useCVData = () => {
  const [cvData, setCVData] = useState<CVData>(() => loadFromStorage());
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Auto-save to localStorage when data changes (with debounce)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (hasUnsavedChanges) {
        const saved = saveToStorage(cvData);
        if (saved) {
          console.log('💾 Auto-saved CV data');
        }
      }
    }, 1000); // Save 1 second after last change

    return () => clearTimeout(timeoutId);
  }, [cvData, hasUnsavedChanges]);

  const updateCVData = (newData: CVData) => {
    // Validate before updating
    if (!validateCVData(newData)) {
      console.error('❌ Cannot update: new data is invalid');
      return;
    }

    setCVData(newData);
    setHasUnsavedChanges(true);
  };

  const saveCVData = () => {
    const success = saveToStorage(cvData);
    if (success) {
      setHasUnsavedChanges(false);
    }
    return success;
  };

  const resetCVData = () => {
    setCVData(CV_DATA);
    setHasUnsavedChanges(false);
    saveToStorage(CV_DATA);
  };

  const createNewCV = () => {
    const emptyCV: CVData = {
      personalInfo: {
        fullName: '',
        professionalTitle: '',
        avatarUrl: ''
      },
      profile: '',
      contact: {
        email: '',
        phone: '',
        location: '',
        github: null,
        linkedin: null,
        fields: []
      },
      skills: [],
      technologies: [],
      experiences: [],
      languages: [],
      certifications: [],
      customSections: [],
      sectionOrder: ['personal', 'profile', 'skills', 'technologies', 'experiences', 'certifications', 'languages'],
      sectionTitles: {
        profile: 'Profil Professionnel',
        skills: 'Compétences',
        technologies: 'Environnement Technique',
        experiences: 'Expériences Professionnelles',
        certifications: 'Certifications',
        languages: 'Langues'
      }
    };
    
    setCVData(emptyCV);
    setHasUnsavedChanges(true);
  };

  const loadCVData = (newData: CVData) => {
    // ✅ Always migrate loaded data
    let migratedData = migrateLegacyData(newData);
    
    // ✅ NEW: Also migrate custom sections
    migratedData = migrateCustomSections(migratedData);
    
    // Try to validate, but be lenient
    if (!validateCVData(migratedData)) {
      console.warn('⚠️ Loaded data has validation issues, merging with defaults');
      const mergedData = mergeWithDefaults(migratedData);
      setCVData(mergedData);
    } else {
      setCVData(migratedData);
    }
    setHasUnsavedChanges(true);
  };

  return {
    cvData,
    updateCVData,
    saveCVData,
    resetCVData,
    createNewCV,
    loadCVData,
    hasUnsavedChanges
  };
};