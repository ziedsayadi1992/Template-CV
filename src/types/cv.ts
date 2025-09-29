export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  missions: string[];
}

export interface Language {
  name: string;
  flag: string;
  level: string;
}

export interface Certification {
  name: string;
  issuer: string;
}

export interface CVData {
  personalInfo: {
    fullName: string;
    professionalTitle: string;
    avatarUrl: string;
  };
  profile: string;
  contact: ContactInfo;
  skills: string[];
  technologies: string[];
  experiences: Experience[];
  languages: Language[];
  certifications: Certification[];
}