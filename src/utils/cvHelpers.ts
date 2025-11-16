import { CVData, CustomSection, Skill, Language, Certification, CustomSectionBlock } from '../types';

// ✅ Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const createEmptyCV = (): CVData => ({
  personalInfo: {
    fullName: "",
    professionalTitle: "",
    avatarUrl: ""
  },
  profile: "",
  contact: {
    email: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
    fields: []
  },
  skills: [],
  technologies: [],
  experiences: [],
  languages: [],
  certifications: [],
  customSections: [],
  sectionOrder: [
    "personal",
    "profile",
    "skills",
    "technologies",
    "experiences",
    "certifications",
    "languages"
  ],
  sectionTitles: {
    profile: "Profil Professionnel",
    skills: "Domaines de Compétences",
    technologies: "Environnements Techniques",
    experiences: "Expériences Professionnelles",
    certifications: "Certifications",
    languages: "Langues"
  }
});

export const createCustomSection = (title: string, subtitle?: string): CustomSection => ({
  id: generateId(),
  title,
  subtitle: subtitle ?? "",
  blocks: []
});

export const generateSectionId = (prefix: string): string => {
  return `${prefix}-${generateId()}`;
};

// ✅ NEW: Migrate legacy data to add IDs
export const migrateLegacyData = (data: any): CVData => {
  const migratedData = { ...data };

  // Migrate skills from string[] to Skill[]
  if (migratedData.skills && Array.isArray(migratedData.skills)) {
    migratedData.skills = migratedData.skills.map((skill: any) => {
      if (typeof skill === 'string') {
        return {
          id: generateId(),
          value: skill
        };
      }
      // Already has ID
      if (skill.id && skill.value) {
        return skill;
      }
      // Has ID but wrong structure
      return {
        id: skill.id || generateId(),
        value: skill.value || skill
      };
    });
  }

  // Migrate languages to add IDs
  if (migratedData.languages && Array.isArray(migratedData.languages)) {
    migratedData.languages = migratedData.languages.map((lang: any) => {
      if (!lang.id) {
        return {
          id: generateId(),
          ...lang
        };
      }
      return lang;
    });
  }

  // Migrate certifications to add IDs
  if (migratedData.certifications && Array.isArray(migratedData.certifications)) {
    migratedData.certifications = migratedData.certifications.map((cert: any) => {
      if (!cert.id) {
        return {
          id: generateId(),
          ...cert
        };
      }
      return cert;
    });
  }

  // Migrate custom section blocks from string[] to CustomSectionBlock[]
  if (migratedData.customSections && Array.isArray(migratedData.customSections)) {
    migratedData.customSections = migratedData.customSections.map((section: any) => {
      if (section.blocks && Array.isArray(section.blocks)) {
        section.blocks = section.blocks.map((block: any) => {
          if (typeof block === 'string') {
            return {
              id: generateId(),
              content: block
            };
          }
          // Already has ID
          if (block.id && block.content) {
            return block;
          }
          // Has ID but wrong structure
          return {
            id: block.id || generateId(),
            content: block.content || block
          };
        });
      }
      return section;
    });
  }

  // Ensure technologies have IDs
  if (migratedData.technologies && Array.isArray(migratedData.technologies)) {
    migratedData.technologies = migratedData.technologies.map((tech: any, index: number) => {
      if (!tech.id) {
        return { ...tech, id: generateId() };
      }
      return tech;
    });
  }

  // Ensure experiences have IDs
  if (migratedData.experiences && Array.isArray(migratedData.experiences)) {
    migratedData.experiences = migratedData.experiences.map((exp: any) => {
      if (!exp.id) {
        return { ...exp, id: generateId() };
      }
      return exp;
    });
  }

  // Ensure custom sections have IDs
  if (migratedData.customSections && Array.isArray(migratedData.customSections)) {
    migratedData.customSections = migratedData.customSections.map((section: any) => {
      if (!section.id) {
        return { ...section, id: generateId() };
      }
      return section;
    });
  }

  // Ensure sectionOrder exists
  if (!migratedData.sectionOrder || migratedData.sectionOrder.length === 0) {
    migratedData.sectionOrder = [
      "personal",
      "profile",
      "skills",
      "technologies",
      "experiences",
      "certifications",
      "languages"
    ];
  }

  // Ensure sectionTitles exists
  if (!migratedData.sectionTitles) {
    migratedData.sectionTitles = {
      profile: "Profil Professionnel",
      skills: "Domaines de Compétences",
      technologies: "Environnements Techniques",
      experiences: "Expériences Professionnelles",
      certifications: "Certifications",
      languages: "Langues"
    };
  }

  if (!migratedData.sectionTitles.skills) {
    migratedData.sectionTitles.skills = "Domaines de Compétences";
  }

  return migratedData as CVData;
};