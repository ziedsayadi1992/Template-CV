export interface UITranslations {
  [key: string]: string;
}

export const uiTranslations: { [lang: string]: UITranslations } = {
  Français: {
    // Navigation buttons
    edit: "Éditer",
    save: "Sauvegarder",
    reset: "Réinitialiser",
    uploadPdf: "Importer PDF",
    newCv: "Nouveau CV",
    selectLanguage: "Langue",
    preview: "Aperçu",
    exportPdf: "PDF",
    
    // Sections
    editor: "Éditeur de CV",
    personalInfo: "Informations Personnelles",
    profile: "Profil Professionnel",
    contact: "Contact",
    skills: "Compétences",
    technologies: "Technologies",
    experiences: "Expériences",
    languages: "Langues",
    certifications: "Certifications",
    
    // Actions
    addSkill: "Ajouter",
    addExperience: "Ajouter",
    addLanguage: "Ajouter",
    addCertification: "Ajouter",
    addTechCategory: "Ajouter Catégorie",
    addMission: "Mission",
    
    // Fields
    fullName: "Nom Complet",
    professionalTitle: "Titre Professionnel",
    email: "Email",
    phone: "Téléphone",
    location: "Localisation",
    github: "GitHub",
    linkedin: "LinkedIn",
    jobTitle: "Titre du Poste",
    company: "Entreprise",
    missions: "Missions",
    name: "Nom",
    flag: "Drapeau",
    level: "Niveau",
    issuer: "Organisme",
    categoryTitle: "Titre de la catégorie",
    items: "Éléments (séparés par des virgules)",
    
    // Image upload
    uploadImage: "Importer votre photo de profil",
    maxFileSize: "Max 5 Mo. Formats acceptés : JPG, PNG, GIF.",
    removeImage: "Supprimer la photo",
    
    // Custom sections
    customSection: "Section Personnalisée",
    addCustomSection: "Section Personnalisée",
    sectionTitle: "Titre de la Section",
    subtitle: "Sous-titre (optionnel)",
    content: "Contenu",
    addBlock: "Bloc",
    removeSection: "Supprimer Section",
    
    // Placeholders
    skillPlaceholder: "Compétence",
    missionPlaceholder: "Mission ou Stack",
    techPlaceholder: "Ex: PHP 7, JavaScript, TypeScript",
    itemsPlaceholder: "Éléments (séparés par des virgules)",
    sectionPlaceholder: "Ex: Projets, Publications, Prix...",
    subtitlePlaceholder: "Sous-titre optionnel",
    blockPlaceholder: "Contenu du bloc",
    
    // Status
    translating: "Traduction en cours...",
    
    // Dynamic labels
    experience: "Expérience",
    language: "Langue",
    certification: "Certification",
  },
  
  English: {
    // Navigation buttons
    edit: "Edit",
    save: "Save",
    reset: "Reset",
    uploadPdf: "Import PDF",
    newCv: "New CV",
    selectLanguage: "Language",
    preview: "Preview",
    exportPdf: "PDF",
    
    // Sections
    editor: "CV Editor",
    personalInfo: "Personal Information",
    profile: "Professional Profile",
    contact: "Contact",
    skills: "Skills",
    technologies: "Technologies",
    experiences: "Experiences",
    languages: "Languages",
    certifications: "Certifications",
    
    // Actions
    addSkill: "Add",
    addExperience: "Add",
    addLanguage: "Add",
    addCertification: "Add",
    addTechCategory: "Add Category",
    addMission: "Mission",
    
    // Fields
    fullName: "Full Name",
    professionalTitle: "Professional Title",
    email: "Email",
    phone: "Phone",
    location: "Location",
    github: "GitHub",
    linkedin: "LinkedIn",
    jobTitle: "Job Title",
    company: "Company",
    missions: "Missions",
    name: "Name",
    flag: "Flag",
    level: "Level",
    issuer: "Issuer",
    categoryTitle: "Category Title",
    items: "Items (comma separated)",
    
    // Image upload
    uploadImage: "Upload your profile picture",
    maxFileSize: "Max 5 MB. Accepted formats: JPG, PNG, GIF.",
    removeImage: "Remove photo",
    
    // Custom sections
    customSection: "Custom Section",
    addCustomSection: "Custom Section",
    sectionTitle: "Section Title",
    subtitle: "Subtitle (optional)",
    content: "Content",
    addBlock: "Block",
    removeSection: "Remove Section",
    
    // Placeholders
    skillPlaceholder: "Skill",
    missionPlaceholder: "Mission or Stack",
    techPlaceholder: "Ex: PHP 7, JavaScript, TypeScript",
    itemsPlaceholder: "Items (comma separated)",
    sectionPlaceholder: "Ex: Projects, Publications, Awards...",
    subtitlePlaceholder: "Optional subtitle",
    blockPlaceholder: "Block content",
    
    // Status
    translating: "Translating...",
    
    // Dynamic labels
    experience: "Experience",
    language: "Language",
    certification: "Certification",
  },
  
  Arabic: {
    // Navigation buttons
    edit: "تحرير",
    save: "حفظ",
    reset: "إعادة تعيين",
    uploadPdf: "استيراد PDF",
    newCv: "سيرة ذاتية جديدة",
    selectLanguage: "اللغة",
    preview: "معاينة",
    exportPdf: "PDF",
    
    // Sections
    editor: "محرر السيرة الذاتية",
    personalInfo: "المعلومات الشخصية",
    profile: "الملف المهني",
    contact: "اتصال",
    skills: "المهارات",
    technologies: "التقنيات",
    experiences: "الخبرات",
    languages: "اللغات",
    certifications: "الشهادات",
    
    // Actions
    addSkill: "إضافة",
    addExperience: "إضافة",
    addLanguage: "إضافة",
    addCertification: "إضافة",
    addTechCategory: "إضافة فئة",
    addMission: "مهمة",
    
    // Fields
    fullName: "الاسم الكامل",
    professionalTitle: "المسمى الوظيفي",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    location: "الموقع",
    github: "GitHub",
    linkedin: "LinkedIn",
    jobTitle: "المسمى الوظيفي",
    company: "الشركة",
    missions: "المهام",
    name: "الاسم",
    flag: "العلم",
    level: "المستوى",
    issuer: "الجهة المصدرة",
    categoryTitle: "عنوان الفئة",
    items: "العناصر (مفصولة بفواصل)",
    
    // Image upload
    uploadImage: "تحميل صورتك الشخصية",
    maxFileSize: "الحد الأقصى 5 ميجابايت. الصيغ المقبولة: JPG، PNG، GIF.",
    removeImage: "إزالة الصورة",
    
    // Custom sections
    customSection: "قسم مخصص",
    addCustomSection: "قسم مخصص",
    sectionTitle: "عنوان القسم",
    subtitle: "عنوان فرعي (اختياري)",
    content: "المحتوى",
    addBlock: "كتلة",
    removeSection: "حذف القسم",
    
    // Placeholders
    skillPlaceholder: "مهارة",
    missionPlaceholder: "مهمة أو مجموعة تقنيات",
    techPlaceholder: "مثال: PHP 7, JavaScript, TypeScript",
    itemsPlaceholder: "العناصر (مفصولة بفواصل)",
    sectionPlaceholder: "مثال: المشاريع، المنشورات، الجوائز...",
    subtitlePlaceholder: "عنوان فرعي اختياري",
    blockPlaceholder: "محتوى الكتلة",
    
    // Status
    translating: "جارٍ الترجمة...",
    
    // Dynamic labels
    experience: "خبرة",
    language: "لغة",
    certification: "شهادة",
  },
  
  German: {
    // Navigation buttons
    edit: "Bearbeiten",
    save: "Speichern",
    reset: "Zurücksetzen",
    uploadPdf: "PDF importieren",
    newCv: "Neuer Lebenslauf",
    selectLanguage: "Sprache",
    preview: "Vorschau",
    exportPdf: "PDF",
    
    // Sections
    editor: "Lebenslauf-Editor",
    personalInfo: "Persönliche Informationen",
    profile: "Berufsprofil",
    contact: "Kontakt",
    skills: "Fähigkeiten",
    technologies: "Technologien",
    experiences: "Erfahrungen",
    languages: "Sprachen",
    certifications: "Zertifizierungen",
    
    // Actions
    addSkill: "Hinzufügen",
    addExperience: "Hinzufügen",
    addLanguage: "Hinzufügen",
    addCertification: "Hinzufügen",
    addTechCategory: "Kategorie hinzufügen",
    addMission: "Mission",
    
    // Fields
    fullName: "Vollständiger Name",
    professionalTitle: "Berufsbezeichnung",
    email: "E-Mail",
    phone: "Telefon",
    location: "Standort",
    github: "GitHub",
    linkedin: "LinkedIn",
    jobTitle: "Stellenbezeichnung",
    company: "Unternehmen",
    missions: "Aufgaben",
    name: "Name",
    flag: "Flagge",
    level: "Niveau",
    issuer: "Aussteller",
    categoryTitle: "Kategorietitel",
    items: "Elemente (kommagetrennt)",
    
    // Image upload
    uploadImage: "Profilbild hochladen",
    maxFileSize: "Max. 5 MB. Akzeptierte Formate: JPG, PNG, GIF.",
    removeImage: "Foto entfernen",
    
    // Custom sections
    customSection: "Benutzerdefinierter Abschnitt",
    addCustomSection: "Benutzerdefinierter Abschnitt",
    sectionTitle: "Abschnittstitel",
    subtitle: "Untertitel (optional)",
    content: "Inhalt",
    addBlock: "Block",
    removeSection: "Abschnitt entfernen",
    
    // Placeholders
    skillPlaceholder: "Fähigkeit",
    missionPlaceholder: "Mission oder Stack",
    techPlaceholder: "Bsp: PHP 7, JavaScript, TypeScript",
    itemsPlaceholder: "Elemente (durch Kommas getrennt)",
    sectionPlaceholder: "Bsp: Projekte, Publikationen, Auszeichnungen...",
    subtitlePlaceholder: "Optionaler Untertitel",
    blockPlaceholder: "Blockinhalt",
    
    // Status
    translating: "Wird übersetzt...",
    
    // Dynamic labels
    experience: "Erfahrung",
    language: "Sprache",
    certification: "Zertifizierung",
  },
  
  Spanish: {
    // Navigation buttons
    edit: "Editar",
    save: "Guardar",
    reset: "Restablecer",
    uploadPdf: "Importar PDF",
    newCv: "Nuevo CV",
    selectLanguage: "Idioma",
    preview: "Vista previa",
    exportPdf: "PDF",
    
    // Sections
    editor: "Editor de CV",
    personalInfo: "Información Personal",
    profile: "Perfil Profesional",
    contact: "Contacto",
    skills: "Habilidades",
    technologies: "Tecnologías",
    experiences: "Experiencias",
    languages: "Idiomas",
    certifications: "Certificaciones",
    
    // Actions
    addSkill: "Agregar",
    addExperience: "Agregar",
    addLanguage: "Agregar",
    addCertification: "Agregar",
    addTechCategory: "Agregar Categoría",
    addMission: "Misión",
    
    // Fields
    fullName: "Nombre Completo",
    professionalTitle: "Título Profesional",
    email: "Correo electrónico",
    phone: "Teléfono",
    location: "Ubicación",
    github: "GitHub",
    linkedin: "LinkedIn",
    jobTitle: "Título del Puesto",
    company: "Empresa",
    missions: "Misiones",
    name: "Nombre",
    flag: "Bandera",
    level: "Nivel",
    issuer: "Emisor",
    categoryTitle: "Título de la Categoría",
    items: "Elementos (separados por comas)",
    
    // Image upload
    uploadImage: "Subir tu foto de perfil",
    maxFileSize: "Máx. 5 MB. Formatos aceptados: JPG, PNG, GIF.",
    removeImage: "Eliminar foto",
    
    // Custom sections
    customSection: "Sección Personalizada",
    addCustomSection: "Sección Personalizada",
    sectionTitle: "Título de la Sección",
    subtitle: "Subtítulo (opcional)",
    content: "Contenido",
    addBlock: "Bloque",
    removeSection: "Eliminar Sección",
    
    // Placeholders
    skillPlaceholder: "Habilidad",
    missionPlaceholder: "Misión o Stack",
    techPlaceholder: "Ej: PHP 7, JavaScript, TypeScript",
    itemsPlaceholder: "Elementos (separados por comas)",
    sectionPlaceholder: "Ej: Proyectos, Publicaciones, Premios...",
    subtitlePlaceholder: "Subtítulo opcional",
    blockPlaceholder: "Contenido del bloque",
    
    // Status
    translating: "Traduciendo...",
    
    // Dynamic labels
    experience: "Experiencia",
    language: "Idioma",
    certification: "Certificación",
  },
};