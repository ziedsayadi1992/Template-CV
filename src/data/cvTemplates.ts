import type { CVData } from '../types';
import { generateId } from '../utils/cvHelpers';

// English Template
export const CV_TEMPLATE_EN: CVData = {
  personalInfo: {
    fullName: 'Your Name',
    professionalTitle: 'Your Professional Title',
    avatarUrl: ''
  },
  profile: 'Write your professional summary here. Describe your experience, skills, and career objectives in a compelling way...',
  contact: {
    email: 'your.email@example.com',
    phone: '+1234567890',
    location: 'Your City, Country',
    github: 'github.com/yourusername',
    linkedin: 'linkedin.com/in/yourprofile',
    fields: []
  },
  skills: [
    { id: generateId(), value: 'Project Management & Team Leadership' },
    { id: generateId(), value: 'Strategic Planning & Business Analysis' },
    { id: generateId(), value: 'Communication & Stakeholder Management' }
  ],
  technologies: [
    {
      id: generateId(),
      title: 'Frontend Development',
      items: 'React, TypeScript, HTML5, CSS3, JavaScript'
    },
    {
      id: generateId(),
      title: 'Backend Development',
      items: 'Node.js, Python, REST APIs, GraphQL'
    }
  ],
  experiences: [
    {
      id: generateId(),
      jobTitle: 'Senior Developer',
      company: 'Tech Company Inc.',
      missions: [
        'Led development of web applications using React and TypeScript',
        'Collaborated with cross-functional teams to deliver projects on time',
        'Mentored junior developers and conducted code reviews'
      ]
    }
  ],
  languages: [
    { id: generateId(), name: 'English', level: 'Native' },
    { id: generateId(), name: 'Spanish', level: 'Intermediate' }
  ],
  certifications: [
    { id: generateId(), name: 'Professional Certification', issuer: 'Certification Authority' }
  ],
  customSections: [],
  sectionOrder: ['personal', 'profile', 'skills', 'technologies', 'experiences', 'certifications', 'languages'],
  sectionTitles: {
    profile: 'Professional Profile',
    skills: 'Core Skills',
    technologies: 'Technical Environment',
    experiences: 'Professional Experience',
    certifications: 'Certifications',
    languages: 'Languages'
  }
};

// French Template
export const CV_TEMPLATE_FR: CVData = {
  personalInfo: {
    fullName: 'Votre Nom',
    professionalTitle: 'Votre Titre Professionnel',
    avatarUrl: ''
  },
  profile: 'Rédigez votre résumé professionnel ici. Décrivez votre expérience, vos compétences et vos objectifs de carrière de manière convaincante...',
  contact: {
    email: 'votre.email@exemple.fr',
    phone: '+33123456789',
    location: 'Votre Ville, Pays',
    github: 'github.com/votrenom',
    linkedin: 'linkedin.com/in/votreprofil',
    fields: []
  },
  skills: [
    { id: generateId(), value: 'Gestion de Projet & Leadership d\'Équipe' },
    { id: generateId(), value: 'Planification Stratégique & Analyse Business' },
    { id: generateId(), value: 'Communication & Gestion des Parties Prenantes' }
  ],
  technologies: [
    {
      id: generateId(),
      title: 'Développement Frontend',
      items: 'React, TypeScript, HTML5, CSS3, JavaScript'
    },
    {
      id: generateId(),
      title: 'Développement Backend',
      items: 'Node.js, Python, APIs REST, GraphQL'
    }
  ],
  experiences: [
    {
      id: generateId(),
      jobTitle: 'Développeur Senior',
      company: 'Entreprise Tech Inc.',
      missions: [
        'Direction du développement d\'applications web avec React et TypeScript',
        'Collaboration avec des équipes pluridisciplinaires pour livrer des projets à temps',
        'Mentorat de développeurs juniors et révisions de code'
      ]
    }
  ],
  languages: [
    { id: generateId(), name: 'Français', level: 'Langue maternelle' },
    { id: generateId(), name: 'Anglais', level: 'Courant' }
  ],
  certifications: [
    { id: generateId(), name: 'Certification Professionnelle', issuer: 'Autorité de Certification' }
  ],
  customSections: [],
  sectionOrder: ['personal', 'profile', 'skills', 'technologies', 'experiences', 'certifications', 'languages'],
  sectionTitles: {
    profile: 'Profil Professionnel',
    skills: 'Compétences Clés',
    technologies: 'Environnement Technique',
    experiences: 'Expérience Professionnelle',
    certifications: 'Certifications',
    languages: 'Langues'
  }
};

export const CV_TEMPLATE_DE: CVData = {
  personalInfo: {
    fullName: 'Ihr Name',
    professionalTitle: 'Ihre Berufsbezeichnung',
    avatarUrl: ''
  },

  profile:
    'Verfassen Sie hier Ihr berufliches Profil. Beschreiben Sie Ihre Erfahrung, Kernkompetenzen und beruflichen Ziele präzise und überzeugend...',

  contact: {
    email: 'ihre.email@example.de',
    phone: '+491234567890',
    location: 'Ihre Stadt, Deutschland',
    github: 'github.com/ihrprofil',
    linkedin: 'linkedin.com/in/ihrprofil',
    fields: []  
  },

  skills: [
    { id: generateId(), value: 'Projektmanagement & Teamführung' },
    { id: generateId(), value: 'Strategische Planung & Geschäftsanalytik' },
    { id: generateId(), value: 'Kommunikation & Stakeholder-Management' }
  ],

  technologies: [
    {
      id: generateId(),
      title: 'Frontend-Entwicklung',
      items: 'React, TypeScript, HTML5, CSS3, JavaScript'
    },
    {
      id: generateId(),
      title: 'Backend-Entwicklung',
      items: 'Node.js, Python, REST APIs, GraphQL'
    }
  ],

  experiences: [
    {
      id: generateId(),
      jobTitle: 'Senior Entwickler',
      company: 'Tech Unternehmen GmbH',
      missions: [
        'Leitung der Entwicklung moderner Webanwendungen mit React und TypeScript',
        'Zusammenarbeit mit funktionsübergreifenden Teams zur termingerechten Projektabwicklung',
        'Coaching von Junior-Entwicklern sowie Durchführung von Code-Reviews'
      ]
    }
  ],

  languages: [
    { id: generateId(), name: 'Deutsch', level: 'Muttersprache' },
    { id: generateId(), name: 'Englisch', level: 'Fließend' }
  ],

  certifications: [
    {
      id: generateId(),
      name: 'Berufliche Zertifizierung',
      issuer: 'Zertifizierungsstelle'
    }
  ],

  customSections: [],

  sectionOrder: [
    'personal',
    'profile',
    'skills',
    'technologies',
    'experiences',
    'certifications',
    'languages'
  ],

  sectionTitles: {
    profile: 'Berufliches Profil',
    skills: 'Kernkompetenzen',
    technologies: 'Technisches Umfeld',
    experiences: 'Berufserfahrung',
    certifications: 'Zertifizierungen',
    languages: 'Sprachen'
  }
};

export const CV_TEMPLATE_ES: CVData = {
  personalInfo: {
    fullName: 'Tu Nombre',
    professionalTitle: 'Tu Título Profesional',
    avatarUrl: ''
  },

  profile:
    'Escribe aquí tu resumen profesional. Describe tu experiencia, habilidades principales y objetivos laborales de forma clara y atractiva...',

  contact: {
    email: 'tu.email@ejemplo.es',
    phone: '+341234567890',
    location: 'Tu Ciudad, España',
    github: 'github.com/tuusuario',
    linkedin: 'linkedin.com/in/tuperfil',
    fields: []
  },

  skills: [
    { id: generateId(), value: 'Gestión de Proyectos y Liderazgo de Equipos' },
    { id: generateId(), value: 'Planificación Estratégica y Análisis de Negocio' },
    { id: generateId(), value: 'Comunicación y Gestión de Stakeholders' }
  ],

  technologies: [
    {
      id: generateId(),
      title: 'Desarrollo Frontend',
      items: 'React, TypeScript, HTML5, CSS3, JavaScript'
    },
    {
      id: generateId(),
      title: 'Desarrollo Backend',
      items: 'Node.js, Python, APIs REST, GraphQL'
    }
  ],

  experiences: [
    {
      id: generateId(),
      jobTitle: 'Desarrollador Senior',
      company: 'Empresa Tecnológica S.A.',
      missions: [
        'Lideré el desarrollo de aplicaciones web utilizando React y TypeScript',
        'Colaboré con equipos multidisciplinarios para entregar proyectos dentro del plazo',
        'Mentoricé a desarrolladores junior y realicé revisiones de código'
      ]
    }
  ],

  languages: [
    { id: generateId(), name: 'Español', level: 'Nativo' },
    { id: generateId(), name: 'Inglés', level: 'Intermedio' }
  ],

  certifications: [
    {
      id: generateId(),
      name: 'Certificación Profesional',
      issuer: 'Entidad Certificadora'
    }
  ],

  customSections: [],

  sectionOrder: [
    'personal',
    'profile',
    'skills',
    'technologies',
    'experiences',
    'certifications',
    'languages'
  ],

  sectionTitles: {
    profile: 'Perfil Profesional',
    skills: 'Habilidades Clave',
    technologies: 'Entorno Técnico',
    experiences: 'Experiencia Profesional',
    certifications: 'Certificaciones',
    languages: 'Idiomas'
  }
};



// Helper function to get template by language
export const getCVTemplate = (language: string): CVData => {
  switch (language) {
    case 'English':
      return CV_TEMPLATE_EN;
    case 'Français':
      return CV_TEMPLATE_FR;
    case 'German':
      return CV_TEMPLATE_DE;
    case 'Spanish':
      return CV_TEMPLATE_ES;
    default:
      return CV_TEMPLATE_EN;
  }
};