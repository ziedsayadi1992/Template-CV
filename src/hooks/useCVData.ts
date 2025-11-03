import { useState, useEffect } from 'react';
import { CVData } from '../types/cv';
import { CV_DATA } from '../data/cvData';

const STORAGE_KEY = 'cv-data';

export const useCVData = () => {
  const [cvData, setCvData] = useState<CVData>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error('Error parsing saved CV data:', error);
        return CV_DATA;
      }
    }
    return CV_DATA;
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        const isChanged = JSON.stringify(parsed) !== JSON.stringify(cvData);
        setHasUnsavedChanges(isChanged);
      } catch (error) {
        setHasUnsavedChanges(false);
      }
    } else {
      setHasUnsavedChanges(JSON.stringify(CV_DATA) !== JSON.stringify(cvData));
    }
  }, [cvData]);

  const updateCVData = (newData: CVData) => {
    setCvData(newData);
    setHasUnsavedChanges(true);
  };

  const saveCVData = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
      setHasUnsavedChanges(false);
      return true;
    } catch (error) {
      console.error('Error saving CV data:', error);
      return false;
    }
  };

  const resetCVData = () => {
    setCvData(CV_DATA);
    localStorage.removeItem(STORAGE_KEY);
    setHasUnsavedChanges(false);
  };

  return {
    cvData,
    updateCVData,
    saveCVData,
    resetCVData,
    hasUnsavedChanges
  };
};
