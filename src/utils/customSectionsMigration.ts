import { CVData } from '../types';

/**
 * Migrates CV data to ensure all custom sections have blocks arrays
 * This fixes issues with old data that might not have the blocks property
 */
export const migrateCustomSections = (data: CVData): CVData => {
  const migratedData = { ...data };
  
  // Ensure customSections exists
  if (!migratedData.customSections) {
    migratedData.customSections = [];
  }
  
  // Ensure each custom section has blocks array
  migratedData.customSections = migratedData.customSections.map(section => ({
    ...section,
    blocks: section.blocks || [],
    subtitle: section.subtitle || ''
  }));
  
  console.log('✅ Custom sections migrated:', migratedData.customSections.length);
  
  return migratedData;
};