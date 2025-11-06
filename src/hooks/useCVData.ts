import { useState, useEffect } from 'react';
import { CV_DATA } from '../data/cvData';
import type { CVData } from '../types/cv';

export const useCVData = () => {
  const [cvData, setCVData] = useState<CVData>(() => {
    // ✅ Try to load from localStorage first, fallback to CV_DATA
    try {
      const saved = localStorage.getItem('cvData');
      return saved ? JSON.parse(saved) : CV_DATA;
    } catch (err) {
      console.error('Failed to load CV data from localStorage:', err);
      return CV_DATA;
    }
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Save to localStorage when data changes
  useEffect(() => {
    try {
      localStorage.setItem('cvData', JSON.stringify(cvData));
    } catch (err) {
      console.error('Failed to save CV data to localStorage:', err);
    }
  }, [cvData]);

  const updateCVData = (newData: CVData) => {
    setCVData(newData);
    setHasUnsavedChanges(true);
  };

  const saveCVData = () => {
    try {
      localStorage.setItem('cvData', JSON.stringify(cvData));
      setHasUnsavedChanges(false);
      return true;
    } catch (err) {
      console.error('Failed to save CV data:', err);
      return false;
    }
  };

  const resetCVData = () => {
    setCVData(CV_DATA);
    setHasUnsavedChanges(false);
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
        linkedin: null
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
    setCVData(newData);
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