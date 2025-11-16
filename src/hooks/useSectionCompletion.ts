import { CVData } from '../types';

export const useSectionCompletion = (data: CVData) => {
  const getSectionCompletion = (sectionId: string): number => {
    switch (sectionId) {
      case 'personal': {
        const personalFields = [data.personalInfo.fullName, data.personalInfo.professionalTitle];
        const personalFilled = personalFields.filter(f => f && f.trim()).length;
        return (personalFilled / personalFields.length) * 100;
      }
      
      case 'profile':
        return data.profile && data.profile.trim() ? 100 : 0;
      
      case 'contact': {
        const contactFields = data.contact.fields || [];
        if (contactFields.length === 0) return 0;
        const filledFields = contactFields.filter(f => f.value && f.value.trim()).length;
        return (filledFields / contactFields.length) * 100;
      }
      
      case 'skills':
        return data.skills.length > 0 ? 100 : 0;
      
      case 'technologies':
        return data.technologies.length > 0 ? 100 : 0;
      
      case 'experiences':
        return data.experiences.length > 0 ? 100 : 0;
      
      case 'certifications':
        return data.certifications.length > 0 ? 100 : 0;
      
      case 'languages':
        return data.languages.length > 0 ? 100 : 0;
      
      case 'custom':
        return data.customSections.length > 0 ? 100 : 0;
      
      default:
        return 0;
    }
  };

  const getOverallProgress = (): number => {
    const sections = [
      'personal',
      'contact',
      'profile',
      'skills',
      'technologies',
      'experiences',
      'certifications',
      'languages',
      // 'custom'
    ];
    
    const totalCompletion = sections.reduce(
      (sum, section) => sum + getSectionCompletion(section),
      0
    );
    
    return totalCompletion / sections.length;
  };

  return {
    getSectionCompletion,
    getOverallProgress
  };
};