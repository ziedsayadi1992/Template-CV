import type { CVData } from '../types/cv';

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
    linkedin: 'linkedin.com/in/yourprofile'
  },
  skills: [
    'Project Management & Team Leadership',
    'Strategic Planning & Business Analysis', 
    'Communication & Stakeholder Management'
  ],
  technologies: [
    {
      id: '1',
      title: 'Frontend Development',
      items: 'React, TypeScript, HTML5, CSS3, JavaScript'
    },
    {
      id: '2',
      title: 'Backend Development',
      items: 'Node.js, Python, REST APIs, GraphQL'
    }
  ],
  experiences: [
    {
      id: '1',
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
    {
      name: 'English',
      flag: '',
      level: 'Native'
    },
    {
      name: 'Spanish',
      flag: '',
      level: 'Intermediate'
    }
  ],
  certifications: [
    {
      name: 'Professional Certification',
      issuer: 'Certification Authority'
    }
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
    linkedin: 'linkedin.com/in/votreprofil'
  },
  skills: [
    'Gestion de Projet & Leadership d\'Équipe',
    'Planification Stratégique & Analyse Business',
    'Communication & Gestion des Parties Prenantes'
  ],
  technologies: [
    {
      id: '1',
      title: 'Développement Frontend',
      items: 'React, TypeScript, HTML5, CSS3, JavaScript'
    },
    {
      id: '2',
      title: 'Développement Backend',
      items: 'Node.js, Python, APIs REST, GraphQL'
    }
  ],
  experiences: [
    {
      id: '1',
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
    {
      name: 'Français',
      flag: '',
      level: 'Langue maternelle'
    },
    {
      name: 'Anglais',
      flag: '',
      level: 'Courant'
    }
  ],
  certifications: [
    {
      name: 'Certification Professionnelle',
      issuer: 'Autorité de Certification'
    }
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

// Arabic Template
export const CV_TEMPLATE_AR: CVData = {
  personalInfo: {
    fullName: 'اسمك الكامل',
    professionalTitle: 'مسماك الوظيفي',
    avatarUrl: ''
  },
  profile: 'اكتب ملخصك المهني هنا. صف خبرتك ومهاراتك وأهدافك المهنية بطريقة مقنعة...',
  contact: {
    email: 'your.email@example.com',
    phone: '+966123456789',
    location: 'مدينتك، البلد',
    github: 'github.com/username',
    linkedin: 'linkedin.com/in/profile'
  },
  skills: [
    'إدارة المشاريع وقيادة الفريق',
    'التخطيط الاستراتيجي وتحليل الأعمال',
    'التواصل وإدارة أصحاب المصلحة'
  ],
  technologies: [
    {
      id: '1',
      title: 'تطوير الواجهة الأمامية',
      items: 'React, TypeScript, HTML5, CSS3, JavaScript'
    },
    {
      id: '2',
      title: 'تطوير الواجهة الخلفية',
      items: 'Node.js, Python, REST APIs, GraphQL'
    }
  ],
  experiences: [
    {
      id: '1',
      jobTitle: 'مطور أول',
      company: 'شركة التقنية',
      missions: [
        'قيادة تطوير تطبيقات الويب باستخدام React و TypeScript',
        'التعاون مع فرق متعددة الوظائف لتسليم المشاريع في الوقت المحدد',
        'توجيه المطورين المبتدئين ومراجعة الأكواد'
      ]
    }
  ],
  languages: [
    {
      name: 'العربية',
      flag: '',
      level: 'اللغة الأم'
    },
    {
      name: 'الإنجليزية',
      flag: '',
      level: 'متقدم'
    }
  ],
  certifications: [
    {
      name: 'شهادة مهنية',
      issuer: 'جهة إصدار الشهادات'
    }
  ],
  customSections: [],
  sectionOrder: ['personal', 'profile', 'skills', 'technologies', 'experiences', 'certifications', 'languages'],
  sectionTitles: {
    profile: 'الملف المهني',
    skills: 'المهارات الأساسية',
    technologies: 'البيئة التقنية',
    experiences: 'الخبرة المهنية',
    certifications: 'الشهادات',
    languages: 'اللغات'
  }
};

// German Template
export const CV_TEMPLATE_DE: CVData = {
  personalInfo: {
    fullName: 'Ihr Name',
    professionalTitle: 'Ihr Berufsbezeichnung',
    avatarUrl: ''
  },
  profile: 'Schreiben Sie hier Ihre professionelle Zusammenfassung. Beschreiben Sie Ihre Erfahrung, Fähigkeiten und Karriereziele überzeugend...',
  contact: {
    email: 'ihre.email@beispiel.de',
    phone: '+49123456789',
    location: 'Ihre Stadt, Land',
    github: 'github.com/ihrname',
    linkedin: 'linkedin.com/in/ihrprofil'
  },
  skills: [
    'Projektmanagement & Teamführung',
    'Strategische Planung & Geschäftsanalyse',
    'Kommunikation & Stakeholder-Management'
  ],
  technologies: [
    {
      id: '1',
      title: 'Frontend-Entwicklung',
      items: 'React, TypeScript, HTML5, CSS3, JavaScript'
    },
    {
      id: '2',
      title: 'Backend-Entwicklung',
      items: 'Node.js, Python, REST APIs, GraphQL'
    }
  ],
  experiences: [
    {
      id: '1',
      jobTitle: 'Senior-Entwickler',
      company: 'Tech Firma GmbH',
      missions: [
        'Leitung der Entwicklung von Webanwendungen mit React und TypeScript',
        'Zusammenarbeit mit funktionsübergreifenden Teams zur Lieferung von Projekten',
        'Mentoring von Junior-Entwicklern und Code-Reviews'
      ]
    }
  ],
  languages: [
    {
      name: 'Deutsch',
      flag: '',
      level: 'Muttersprache'
    },
    {
      name: 'Englisch',
      flag: '',
      level: 'Fließend'
    }
  ],
  certifications: [
    {
      name: 'Berufszertifikat',
      issuer: 'Zertifizierungsstelle'
    }
  ],
  customSections: [],
  sectionOrder: ['personal', 'profile', 'skills', 'technologies', 'experiences', 'certifications', 'languages'],
  sectionTitles: {
    profile: 'Berufsprofil',
    skills: 'Kernkompetenzen',
    technologies: 'Technische Umgebung',
    experiences: 'Berufserfahrung',
    certifications: 'Zertifizierungen',
    languages: 'Sprachen'
  }
};

// Spanish Template
export const CV_TEMPLATE_ES: CVData = {
  personalInfo: {
    fullName: 'Tu Nombre',
    professionalTitle: 'Tu Título Profesional',
    avatarUrl: ''
  },
  profile: 'Escribe tu resumen profesional aquí. Describe tu experiencia, habilidades y objetivos profesionales de manera convincente...',
  contact: {
    email: 'tu.email@ejemplo.com',
    phone: '+34123456789',
    location: 'Tu Ciudad, País',
    github: 'github.com/tuusuario',
    linkedin: 'linkedin.com/in/tuperfil'
  },
  skills: [
    'Gestión de Proyectos y Liderazgo de Equipo',
    'Planificación Estratégica y Análisis de Negocio',
    'Comunicación y Gestión de Stakeholders'
  ],
  technologies: [
    {
      id: '1',
      title: 'Desarrollo Frontend',
      items: 'React, TypeScript, HTML5, CSS3, JavaScript'
    },
    {
      id: '2',
      title: 'Desarrollo Backend',
      items: 'Node.js, Python, APIs REST, GraphQL'
    }
  ],
  experiences: [
    {
      id: '1',
      jobTitle: 'Desarrollador Senior',
      company: 'Empresa Tech Inc.',
      missions: [
        'Liderazgo en el desarrollo de aplicaciones web usando React y TypeScript',
        'Colaboración con equipos multifuncionales para entregar proyectos a tiempo',
        'Mentoría de desarrolladores junior y revisiones de código'
      ]
    }
  ],
  languages: [
    {
      name: 'Español',
      flag: '',
      level: 'Nativo'
    },
    {
      name: 'Inglés',
      flag: '',
      level: 'Avanzado'
    }
  ],
  certifications: [
    {
      name: 'Certificación Profesional',
      issuer: 'Autoridad de Certificación'
    }
  ],
  customSections: [],
  sectionOrder: ['personal', 'profile', 'skills', 'technologies', 'experiences', 'certifications', 'languages'],
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
    case 'Arabic':
      return CV_TEMPLATE_AR;
    case 'German':
      return CV_TEMPLATE_DE;
    case 'Spanish':
      return CV_TEMPLATE_ES;
    default:
      return CV_TEMPLATE_EN;
  }
};