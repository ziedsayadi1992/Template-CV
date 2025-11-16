// Core CV Data Types

export interface PersonalInfo {
  fullName: string;
  professionalTitle: string;
  avatarUrl: string;
}

export interface ContactField {
  id: string;
  type: string;
  label: string;
  value: string;
}

export interface Contact {
  email: string;
  phone: string;
  location: string;
  github: string|null;
  linkedin: string|null;
  fields: ContactField[];
}

export interface Skill {
  id: string;
  value: string;
}

export interface TechnologyCategory {
  id: string;
  title: string;
  items: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  missions: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
}

export interface Language {
  id: string;
  name: string;
  level: string;
}

export interface CustomSectionBlock {
  id: string;
  content: string;
}

export interface CustomSection {
  id: string;
  title: string;
  subtitle: string;
  blocks: CustomSectionBlock[];
}

export interface SectionLabels {
  personal: string;
  contact: string;
  profile: string;
  skills: string;
  technologies: string;
  experiences: string;
  certifications: string;
  languages: string;
  customSections: string;
}

export interface SectionTitles {
  personal?: string;  // ✅ Optional - for custom CV layouts
  contact?: string;   // ✅ Optional - for custom CV layouts
  profile: string;
  skills: string;
  technologies: string;
  experiences: string;
  certifications: string;
  languages: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  profile: string;
  contact: Contact;
  skills: Skill[];
  technologies: TechnologyCategory[];
  experiences: Experience[];
  certifications: Certification[];
  languages: Language[];
  sectionTitles: SectionTitles;
  sectionOrder: string[];
  customSections: CustomSection[];
  sectionLabels?: SectionLabels;
}

// Component Props Types

export interface CVEditorProps {
  data: CVData;
  onUpdate: (data: CVData) => void;
  onSave: () => void;
  onReset: () => void;
  onTogglePreview: () => void;
  isPreviewMode: boolean;
}

export interface CVTemplateProps {
  data: CVData;
  onUpdate: (data: CVData) => void;
}

// Utility Types

export type SectionId = 
  | 'personal' 
  | 'contact' 
  | 'profile' 
  | 'skills' 
  | 'technologies' 
  | 'experiences' 
  | 'certifications' 
  | 'languages' 
  | 'custom';

export interface NavigationSection {
  id: string;
  icon: string;
  label: string;
  completion: number;
}

// Translation Types

export interface TranslationCache {
  [key: string]: CVData;
}

export interface LanguageContextType {
  currentLanguage: string;
  setCurrentLanguage: (lang: string) => void;
  t: (key: string) => string;
  translatedCV: CVData | null;
  setTranslatedCV: (cv: CVData | null) => void;
  cvSourceLanguage: string | null;
  setCvSourceLanguage: (lang: string | null) => void;
}

// Default Values

export const createDefaultPersonalInfo = (): PersonalInfo => ({
  fullName: '',
  professionalTitle: '',
  avatarUrl: ''
});

export const createDefaultContact = (): Contact => ({
  email: '',
  phone: '',
  location: '',
  github: '',
  linkedin: '',
  fields: []
});

export const createDefaultSectionTitles = (): SectionTitles => ({
  profile: 'Professional Profile',
  skills: 'Skills',
  technologies: 'Technical Environment',
  experiences: 'Professional Experience',
  certifications: 'Certifications',
  languages: 'Languages'
});

export const createDefaultCVData = (): CVData => ({
  personalInfo: createDefaultPersonalInfo(),
  profile: '',
  contact: createDefaultContact(),
  skills: [],
  technologies: [],
  experiences: [],
  certifications: [],
  languages: [],
  sectionTitles: createDefaultSectionTitles(),
  sectionOrder: [
    'personal',
    'profile',
    'skills',
    'technologies',
    'experiences',
    'certifications',
    'languages'
  ],
  customSections: []
});

// Helper Functions

export const createSkill = (value: string = ''): Skill => ({
  id: `skill-${Date.now()}`,
  value
});

export const createTechnology = (title: string = '', items: string = ''): TechnologyCategory => ({
  id: `tech-${Date.now()}`,
  title,
  items
});

export const createExperience = (
  jobTitle: string = '',
  company: string = '',
  missions: string[] = ['']
): Experience => ({
  id: `exp-${Date.now()}`,
  jobTitle,
  company,
  missions
});

export const createCertification = (name: string = '', issuer: string = ''): Certification => ({
  id: `cert-${Date.now()}`,
  name,
  issuer
});

export const createLanguage = (name: string = '', level: string = ''): Language => ({
  id: `lang-${Date.now()}`,
  name,
  level
});

export const createCustomSection = (title: string = '', subtitle: string = ''): CustomSection => ({
  id: `custom-${Date.now()}`,
  title,
  subtitle,
  blocks: []
});

export const createCustomSectionBlock = (content: string = ''): CustomSectionBlock => ({
  id: `block-${Date.now()}`,
  content
});

export const createContactField = (
  type: string = 'email',
  label: string = '',
  value: string = ''
): ContactField => ({
  id: `contact-${Date.now()}`,
  type,
  label,
  value
});