
export interface UITranslations {
  [key: string]: string;
}

export const uiTranslations: { [lang: string]: UITranslations } = {
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
    customSections: "Custom Sections",
    sectionTitles: "Section Titles",
    
    // Actions
    addSkill: "Add",
    addExperience: "Add",
    addLanguage: "Add",
    addCertification: "Add",
    addTechCategory: "Add Category",
    addMission: "Mission",
    addField: "Add Field",
    addSection: "Add Section",
    addBlock: "Block",
    
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
    sectionTitle: "Section Title",
    subtitle: "Subtitle (optional)",
    content: "Content",
    removeSection: "Remove Section",
    
    // Image upload
    uploadImage: "Upload your profile picture",
    maxFileSize: "Max 5 MB. Accepted formats: JPG, PNG, GIF.",
    removeImage: "Remove photo",
    
    // Placeholders
    skillPlaceholder: "Skill",
    missionPlaceholder: "Mission or Stack",
    techPlaceholder: "Ex: PHP 7, JavaScript, TypeScript",
    itemsPlaceholder: "Items (comma separated)",
    sectionPlaceholder: "Ex: Projects, Publications, Awards...",
    subtitlePlaceholder: "Optional subtitle",
    blockPlaceholder: "Block content",
    certificationName: "Certification name",
    certificationIssuer: "Issuing organization",
    techCategoryTitle: "Category title",
    techItemsPlaceholder: "Technology items",
    
    // Empty states
    noContactFields: "No contact fields yet",
    noContactFieldsHint: "Click \"Add Field\" to add your contact information",
    noSkills: "No skills added yet",
    noSkillsHint: "Click \"Add Skill\" to get started.",
    noTechCategories: "No technology categories yet",
    noTechCategoriesHint: "Click \"Add Category\" to get started.",
    noExperiences: "No experiences added yet",
    noExperiencesHint: "Click \"Add Experience\" to get started.",
    noCertifications: "No certifications added yet",
    noCertificationsHint: "Click \"Add Certification\" to get started.",
    noLanguages: "No languages added yet",
    noLanguagesHint: "Click \"Add Language\" to get started.",
    noCustomSections: "No custom sections yet",
    noCustomSectionsHint: "Add custom sections to showcase your projects, awards, publications, volunteer work, or any other information that makes you stand out.",
    createFirstSection: "Create Your First Section",
    
    // Status
    translating: "Translating...",
    
    // Dynamic labels
    experience: "Experience",
    language: "Language",
    certification: "Certification",
    customSection: "Custom Section",
    
    // Tips and instructions
    photoTipsTitle: "Professional Photo Tips",
    photoTip1: "Use a high-quality, recent photo",
    photoTip2: "Professional attire recommended",
    photoTip3: "Neutral background works best",
    photoTip4: "Smile naturally and look at the camera",
    
    contactTipsTitle: "Contact Information Tips",
    contactTip1: "Include only professional contact methods",
    contactTip2: "Ensure email address is professional",
    contactTip3: "Add links to LinkedIn and relevant portfolios",
    contactTip4: "Keep phone number format consistent",
    
    profileTipsTitle: "Professional Profile Tips",
    profileTip1: "Keep it concise (3-5 sentences)",
    profileTip2: "Highlight your key strengths and expertise",
    profileTip3: "Include years of experience",
    profileTip4: "Mention your career goals or specializations",

    profileSummary: "Professional Profile Description",
    
    skillsTipsTitle: "Skills Section Tips",
    skillsTip1: "List skills relevant to your target position",
    skillsTip2: "Include both hard and soft skills",
    skillsTip3: "Prioritize most important skills first",
    skillsTip4: "Be specific and honest about your abilities",
    
    // ✅ ADDED: Technologies Tips Title
    technologiesTipsTitle: "Technologies Tips",
    technologiesTip1: "Group technologies by category (Frontend, Backend, etc.)",
    technologiesTip2: "Include version numbers for specificity",
    technologiesTip3: "List technologies you're actively using",
    technologiesTip4: "Keep the list updated with current tech",
    
    // ✅ ADDED: Experience Tips Title
    experienceTipsTitle: "Professional Experience Tips",
    experienceTip1: "Start with most recent position",
    experienceTip2: "Use action verbs to describe achievements",
    experienceTip3: "Quantify results when possible (%, $, time saved)",
    experienceTip4: "Focus on relevant responsibilities",
    
    certificationsTipsTitle: "Certifications Tips",
    certificationsTip1: "Include relevant professional certifications",
    certificationsTip2: "Add issuing organization for credibility",
    certificationsTip3: "Prioritize industry-recognized certifications",
    certificationsTip4: "Keep expired certifications updated",
    
    languagesTipsTitle: "Languages Tips",
    languagesTip1: "Be honest about your proficiency level",
    languagesTip2: "Include native language(s)",
    languagesTip3: "Mention any language certifications",
    languagesTip4: "Prioritize languages relevant to the job",
    
    customSectionsTipsTitle: "Popular Custom Sections",
    customSectionsTip1: "Projects: Showcase personal or professional projects",
    customSectionsTip2: "Publications: List research papers or articles",
    customSectionsTip3: "Awards & Honors: Highlight achievements and recognition",
    customSectionsTip4: "Volunteer Work: Demonstrate community involvement",
    customSectionsTip5: "Conferences: Speaking engagements or attendance",
    
    // About texts
    customSectionsAboutTitle: "About Custom Sections",
    customSectionsAbout: "Each custom section has its own title (main heading) and optional subtitle (description). These titles appear directly in your CV, so make them descriptive and professional.",
  
    // Dynamic UI elements Titles
    editableSectionTitle: "Section Title",
    editableSectionTitleHint: "This title will appear in your CV above this section",
    editableSectionTag: "Appears in CV",

    charactersCount: "characters",
    overallProgress: "Overall Progress",


    // Blocks Info 

    noBlocksYet: "No content blocks yet. Click \"Add Block\" to get started.",
    contentBlocks: "Content Blocks",
    customCreateSections: "Create sections for projects, awards, publications, etc.",

    Email: "Email",
    Phone: "Phone",
    Location: "Location",
    GitHub: "GitHub",
    LinkedIn: "LinkedIn",
    Website: "Website",
  },
  
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
    customSections: "Sections Personnalisées",
    sectionTitles: "Titres des Sections",
    
    // Actions
    addSkill: "Ajouter",
    addExperience: "Ajouter",
    addLanguage: "Ajouter",
    addCertification: "Ajouter",
    addTechCategory: "Ajouter Catégorie",
    addMission: "Mission",
    addField: "Ajouter Champ",
    addSection: "Ajouter Section",
    addBlock: "Bloc",
    
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
    sectionTitle: "Titre de la Section",
    subtitle: "Sous-titre (optionnel)",
    content: "Contenu",
    removeSection: "Supprimer Section",
    
    // Image upload
    uploadImage: "Importer votre photo de profil",
    maxFileSize: "Max 5 Mo. Formats acceptés : JPG, PNG, GIF.",
    removeImage: "Supprimer la photo",
    
    // Placeholders
    skillPlaceholder: "Compétence",
    missionPlaceholder: "Mission ou Stack",
    techPlaceholder: "Ex: PHP 7, JavaScript, TypeScript",
    itemsPlaceholder: "Éléments (séparés par des virgules)",
    sectionPlaceholder: "Ex: Projets, Publications, Prix...",
    subtitlePlaceholder: "Sous-titre optionnel",
    blockPlaceholder: "Contenu du bloc",
    certificationName: "Nom de la certification",
    certificationIssuer: "Organisme émetteur",
    techCategoryTitle: "Titre de la catégorie",
    techItemsPlaceholder: "Éléments technologiques",
    
    // Empty states
    noContactFields: "Aucun champ de contact",
    noContactFieldsHint: "Cliquez sur \"Ajouter Champ\" pour ajouter vos informations de contact",
    noSkills: "Aucune compétence ajoutée",
    noSkillsHint: "Cliquez sur \"Ajouter\" pour commencer.",
    noTechCategories: "Aucune catégorie technologique",
    noTechCategoriesHint: "Cliquez sur \"Ajouter Catégorie\" pour commencer.",
    noExperiences: "Aucune expérience ajoutée",
    noExperiencesHint: "Cliquez sur \"Ajouter\" pour commencer.",
    noCertifications: "Aucune certification ajoutée",
    noCertificationsHint: "Cliquez sur \"Ajouter\" pour commencer.",
    noLanguages: "Aucune langue ajoutée",
    noLanguagesHint: "Cliquez sur \"Ajouter\" pour commencer.",
    noCustomSections: "Aucune section personnalisée",
    noCustomSectionsHint: "Ajoutez des sections personnalisées pour présenter vos projets, récompenses, publications, bénévolat ou toute autre information qui vous distingue.",
    createFirstSection: "Créez votre première section",
    
    // Status
    translating: "Traduction en cours...",
    
    // Dynamic labels
    experience: "Expérience",
    language: "Langue",
    certification: "Certification",
    customSection: "Section Personnalisée",
    
    // Tips and instructions
    photoTipsTitle: "Conseils pour la Photo Professionnelle",
    photoTip1: "Utilisez une photo récente de haute qualité",
    photoTip2: "Tenue professionnelle recommandée",
    photoTip3: "Un arrière-plan neutre fonctionne mieux",
    photoTip4: "Souriez naturellement et regardez l'appareil photo",
    
    contactTipsTitle: "Conseils pour les Informations de Contact",
    contactTip1: "N'incluez que des moyens de contact professionnels",
    contactTip2: "Assurez-vous que l'adresse e-mail est professionnelle",
    contactTip3: "Ajoutez des liens vers LinkedIn et portfolios pertinents",
    contactTip4: "Maintenez un format de numéro de téléphone cohérent",
    
    profileTipsTitle: "Conseils pour le Profil Professionnel",
    profileTip1: "Soyez concis (3-5 phrases)",
    profileTip2: "Mettez en valeur vos forces clés et votre expertise",
    profileTip3: "Incluez vos années d'expérience",
    profileTip4: "Mentionnez vos objectifs de carrière ou spécialisations",
    
    profileSummary: "Description du Profil Professionnel",
    
    skillsTipsTitle: "Conseils pour la Section Compétences",
    skillsTip1: "Listez les compétences pertinentes pour votre poste cible",
    skillsTip2: "Incluez des compétences techniques et relationnelles",
    skillsTip3: "Priorisez les compétences les plus importantes en premier",
    skillsTip4: "Soyez précis et honnête sur vos capacités",
    
    // ✅ ADDED: Technologies Tips Title (French)
    technologiesTipsTitle: "Conseils pour les Technologies",
    technologiesTip1: "Groupez les technologies par catégorie (Frontend, Backend, etc.)",
    technologiesTip2: "Incluez les numéros de version pour plus de précision",
    technologiesTip3: "Listez les technologies que vous utilisez activement",
    technologiesTip4: "Maintenez la liste à jour avec les technologies actuelles",
    
    // ✅ ADDED: Experience Tips Title (French)
    experienceTipsTitle: "Conseils pour l'Expérience Professionnelle",
    experienceTip1: "Commencez par le poste le plus récent",
    experienceTip2: "Utilisez des verbes d'action pour décrire les réalisations",
    experienceTip3: "Quantifiez les résultats lorsque possible (%, $, temps économisé)",
    experienceTip4: "Concentrez-vous sur les responsabilités pertinentes",
    
    certificationsTipsTitle: "Conseils pour les Certifications",
    certificationsTip1: "Incluez les certifications professionnelles pertinentes",
    certificationsTip2: "Ajoutez l'organisme émetteur pour la crédibilité",
    certificationsTip3: "Priorisez les certifications reconnues par l'industrie",
    certificationsTip4: "Maintenez les certifications expirées à jour",
    
    languagesTipsTitle: "Conseils pour les Langues",
    languagesTip1: "Soyez honnête sur votre niveau de compétence",
    languagesTip2: "Incluez votre(vos) langue(s) maternelle(s)",
    languagesTip3: "Mentionnez les certifications linguistiques",
    languagesTip4: "Priorisez les langues pertinentes pour le poste",
    
    customSectionsTipsTitle: "Sections Personnalisées Populaires",
    customSectionsTip1: "Projets : Présentez vos projets personnels ou professionnels",
    customSectionsTip2: "Publications : Listez vos articles de recherche ou articles",
    customSectionsTip3: "Prix et Honneurs : Mettez en avant vos réalisations et reconnaissances",
    customSectionsTip4: "Bénévolat : Démontrez votre engagement communautaire",
    customSectionsTip5: "Conférences : Interventions ou participations",
    
    // About texts
    customSectionsAboutTitle: "À propos des Sections Personnalisées",
    customSectionsAbout: "Chaque section personnalisée a son propre titre (titre principal) et sous-titre optionnel (description). Ces titres apparaissent directement dans votre CV, rendez-les donc descriptifs et professionnels.",
  
    // Dynamic UI elements Titles
    editableSectionTitle: "Titre de la Section",
    editableSectionTitleHint: "Ce titre apparaîtra dans votre CV au-dessus de cette section",
    editableSectionTag: "Apparaît dans le CV",

    charactersCount: "caractères",
    overallProgress: "Votre progression globale",

    noBlocksYet: "Pas de blocs de contenu pour le moment. Cliquez sur \"Ajouter Bloc\" pour commencer.",
    contentBlocks: "Blocs de Contenu",
    customCreateSections: "Créez des sections pour des projets, récompenses, publications, etc.",

    Email: "Email",
    Phone: "Téléphone",
    Location: "Localisation",
    GitHub: "GitHub",
    LinkedIn: "LinkedIn",
    Website: "Site Web",
  },
};


// reminder


