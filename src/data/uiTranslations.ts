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
    
    skillsTipsTitle: "Skills Section Tips",
    skillsTip1: "List skills relevant to your target position",
    skillsTip2: "Include both hard and soft skills",
    skillsTip3: "Prioritize most important skills first",
    skillsTip4: "Be specific and honest about your abilities",
    
    techTipsTitle: "Technologies Tips",
    techTip1: "Group technologies by category (Frontend, Backend, etc.)",
    techTip2: "Include version numbers for specificity",
    techTip3: "List technologies you're actively using",
    techTip4: "Keep the list updated with current tech",
    
    experiencesTipsTitle: "Professional Experience Tips",
    experiencesTip1: "Start with most recent position",
    experiencesTip2: "Use action verbs to describe achievements",
    experiencesTip3: "Quantify results when possible (%, $, time saved)",
    experiencesTip4: "Focus on relevant responsibilities",
    
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
    
    skillsTipsTitle: "Conseils pour la Section Compétences",
    skillsTip1: "Listez les compétences pertinentes pour votre poste cible",
    skillsTip2: "Incluez des compétences techniques et relationnelles",
    skillsTip3: "Priorisez les compétences les plus importantes en premier",
    skillsTip4: "Soyez précis et honnête sur vos capacités",
    
    techTipsTitle: "Conseils pour les Technologies",
    techTip1: "Groupez les technologies par catégorie (Frontend, Backend, etc.)",
    techTip2: "Incluez les numéros de version pour plus de précision",
    techTip3: "Listez les technologies que vous utilisez activement",
    techTip4: "Maintenez la liste à jour avec les technologies actuelles",
    
    experiencesTipsTitle: "Conseils pour l'Expérience Professionnelle",
    experiencesTip1: "Commencez par le poste le plus récent",
    experiencesTip2: "Utilisez des verbes d'action pour décrire les réalisations",
    experiencesTip3: "Quantifiez les résultats quand possible (%, $, temps économisé)",
    experiencesTip4: "Concentrez-vous sur les responsabilités pertinentes",
    
    certificationsTipsTitle: "Conseils pour les Certifications",
    certificationsTip1: "Incluez les certifications professionnelles pertinentes",
    certificationsTip2: "Ajoutez l'organisme émetteur pour la crédibilité",
    certificationsTip3: "Priorisez les certifications reconnues par l'industrie",
    certificationsTip4: "Maintenez les certifications expirées à jour",
    
    languagesTipsTitle: "Conseils pour les Langues",
    languagesTip1: "Soyez honnête sur votre niveau de maîtrise",
    languagesTip2: "Incluez votre(vos) langue(s) maternelle(s)",
    languagesTip3: "Mentionnez toute certification linguistique",
    languagesTip4: "Priorisez les langues pertinentes pour le poste",
    
    customSectionsTipsTitle: "Sections Personnalisées Populaires",
    customSectionsTip1: "Projets : Présentez des projets personnels ou professionnels",
    customSectionsTip2: "Publications : Listez des articles ou papiers de recherche",
    customSectionsTip3: "Prix et Distinctions : Mettez en avant vos réalisations",
    customSectionsTip4: "Bénévolat : Démontrez votre engagement communautaire",
    customSectionsTip5: "Conférences : Interventions ou participations",
    
    // About texts
    customSectionsAboutTitle: "À propos des Sections Personnalisées",
    customSectionsAbout: "Chaque section personnalisée a son propre titre (en-tête principal) et sous-titre optionnel (description). Ces titres apparaissent directement dans votre CV, rendez-les donc descriptifs et professionnels.",
  
    // Dynamic UI elements Titles
    editableSectionTitle: "Titre de la Section",
    editableSectionTitleHint: "Ce titre apparaîtra dans votre CV au-dessus de cette section",
    editableSectionTag: "Apparaît dans le CV",

    charactersCount: "caractères",
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
    customSections: "أقسام مخصصة",
    sectionTitles: "عناوين الأقسام",
    
    // Actions
    addSkill: "إضافة",
    addExperience: "إضافة",
    addLanguage: "إضافة",
    addCertification: "إضافة",
    addTechCategory: "إضافة فئة",
    addMission: "مهمة",
    addField: "إضافة حقل",
    addSection: "إضافة قسم",
    addBlock: "كتلة",
    
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
    sectionTitle: "عنوان القسم",
    subtitle: "عنوان فرعي (اختياري)",
    content: "المحتوى",
    removeSection: "حذف القسم",
    
    // Image upload
    uploadImage: "تحميل صورتك الشخصية",
    maxFileSize: "الحد الأقصى 5 ميجابايت. الصيغ المقبولة: JPG، PNG، GIF.",
    removeImage: "إزالة الصورة",
    
    // Placeholders
    skillPlaceholder: "مهارة",
    missionPlaceholder: "مهمة أو مجموعة تقنيات",
    techPlaceholder: "مثال: PHP 7, JavaScript, TypeScript",
    itemsPlaceholder: "العناصر (مفصولة بفواصل)",
    sectionPlaceholder: "مثال: المشاريع، المنشورات، الجوائز...",
    subtitlePlaceholder: "عنوان فرعي اختياري",
    blockPlaceholder: "محتوى الكتلة",
    certificationName: "اسم الشهادة",
    certificationIssuer: "الجهة المصدرة",
    techCategoryTitle: "عنوان الفئة",
    techItemsPlaceholder: "عناصر التقنية",
    
    // Empty states
    noContactFields: "لا توجد حقول اتصال بعد",
    noContactFieldsHint: "انقر على \"إضافة حقل\" لإضافة معلومات الاتصال الخاصة بك",
    noSkills: "لم تتم إضافة مهارات بعد",
    noSkillsHint: "انقر على \"إضافة\" للبدء.",
    noTechCategories: "لا توجد فئات تقنية بعد",
    noTechCategoriesHint: "انقر على \"إضافة فئة\" للبدء.",
    noExperiences: "لم تتم إضافة خبرات بعد",
    noExperiencesHint: "انقر على \"إضافة\" للبدء.",
    noCertifications: "لم تتم إضافة شهادات بعد",
    noCertificationsHint: "انقر على \"إضافة\" للبدء.",
    noLanguages: "لم تتم إضافة لغات بعد",
    noLanguagesHint: "انقر على \"إضافة\" للبدء.",
    noCustomSections: "لا توجد أقسام مخصصة بعد",
    noCustomSectionsHint: "أضف أقساماً مخصصة لعرض مشاريعك أو جوائزك أو منشوراتك أو عملك التطوعي أو أي معلومات أخرى تميزك.",
    createFirstSection: "إنشاء القسم الأول الخاص بك",
    
    // Status
    translating: "جارٍ الترجمة...",
    
    // Dynamic labels
    experience: "خبرة",
    language: "لغة",
    certification: "شهادة",
    customSection: "قسم مخصص",
    
    // Tips and instructions
    photoTipsTitle: "نصائح للصورة الاحترافية",
    photoTip1: "استخدم صورة حديثة عالية الجودة",
    photoTip2: "يُوصى بالملابس المهنية",
    photoTip3: "الخلفية المحايدة هي الأفضل",
    photoTip4: "ابتسم بشكل طبيعي وانظر إلى الكاميرا",
    
    contactTipsTitle: "نصائح لمعلومات الاتصال",
    contactTip1: "قم بتضمين طرق الاتصال المهنية فقط",
    contactTip2: "تأكد من أن عنوان البريد الإلكتروني احترافي",
    contactTip3: "أضف روابط إلى LinkedIn والمحافظ ذات الصلة",
    contactTip4: "حافظ على تنسيق رقم الهاتف متسقاً",
    
    profileTipsTitle: "نصائح للملف المهني",
    profileTip1: "كن موجزاً (3-5 جمل)",
    profileTip2: "سلط الضوء على نقاط قوتك الرئيسية وخبرتك",
    profileTip3: "قم بتضمين سنوات الخبرة",
    profileTip4: "اذكر أهدافك المهنية أو تخصصاتك",
    
    skillsTipsTitle: "نصائح لقسم المهارات",
    skillsTip1: "قم بإدراج المهارات ذات الصلة بوظيفتك المستهدفة",
    skillsTip2: "قم بتضمين المهارات التقنية والشخصية",
    skillsTip3: "أعط الأولوية للمهارات الأكثر أهمية أولاً",
    skillsTip4: "كن محدداً وصادقاً بشأن قدراتك",
    
    techTipsTitle: "نصائح للتقنيات",
    techTip1: "جمّع التقنيات حسب الفئة (الواجهة الأمامية، الخلفية، إلخ)",
    techTip2: "قم بتضمين أرقام الإصدارات للتحديد",
    techTip3: "قم بإدراج التقنيات التي تستخدمها بنشاط",
    techTip4: "حافظ على تحديث القائمة بالتقنيات الحالية",
    
    experiencesTipsTitle: "نصائح للخبرة المهنية",
    experiencesTip1: "ابدأ بالمنصب الأحدث",
    experiencesTip2: "استخدم أفعال العمل لوصف الإنجازات",
    experiencesTip3: "قم بقياس النتائج عندما يكون ذلك ممكناً (٪، $، الوقت الموفر)",
    experiencesTip4: "ركز على المسؤوليات ذات الصلة",
    
    certificationsTipsTitle: "نصائح للشهادات",
    certificationsTip1: "قم بتضمين الشهادات المهنية ذات الصلة",
    certificationsTip2: "أضف المنظمة المصدرة للمصداقية",
    certificationsTip3: "أعط الأولوية للشهادات المعترف بها في الصناعة",
    certificationsTip4: "حافظ على تحديث الشهادات المنتهية الصلاحية",
    
    languagesTipsTitle: "نصائح للغات",
    languagesTip1: "كن صادقاً بشأن مستوى إتقانك",
    languagesTip2: "قم بتضمين لغتك (لغاتك) الأم",
    languagesTip3: "اذكر أي شهادات لغوية",
    languagesTip4: "أعط الأولوية للغات ذات الصلة بالوظيفة",
    
    customSectionsTipsTitle: "الأقسام المخصصة الشائعة",
    customSectionsTip1: "المشاريع: عرض المشاريع الشخصية أو المهنية",
    customSectionsTip2: "المنشورات: قائمة الأوراق البحثية أو المقالات",
    customSectionsTip3: "الجوائز والتكريمات: تسليط الضوء على الإنجازات والتقدير",
    customSectionsTip4: "العمل التطوعي: إظهار المشاركة المجتمعية",
    customSectionsTip5: "المؤتمرات: المشاركات أو الحضور",
    
    // About texts
    customSectionsAboutTitle: "حول الأقسام المخصصة",
    customSectionsAbout: "كل قسم مخصص له عنوانه الخاص (العنوان الرئيسي) وعنوان فرعي اختياري (الوصف). تظهر هذه العناوين مباشرة في سيرتك الذاتية، لذا اجعلها وصفية ومهنية.",
  
    // Dynamic UI elements Titles
    editableSectionTitle: "عنوان القسم",
    editableSectionTitleHint: "سيظهر هذا العنوان في سيرتك الذاتية فوق هذا القسم",
    editableSectionTag: "يظهر في السيرة الذاتية",

    charactersCount: "أحرف",
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
    customSections: "Benutzerdefinierte Abschnitte",
    sectionTitles: "Abschnittstitel",
    
    // Actions
    addSkill: "Hinzufügen",
    addExperience: "Hinzufügen",
    addLanguage: "Hinzufügen",
    addCertification: "Hinzufügen",
    addTechCategory: "Kategorie hinzufügen",
    addMission: "Mission",
    addField: "Feld hinzufügen",
    addSection: "Abschnitt hinzufügen",
    addBlock: "Block",
    
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
    sectionTitle: "Abschnittstitel",
    subtitle: "Untertitel (optional)",
    content: "Inhalt",
    removeSection: "Abschnitt entfernen",
    
    // Image upload
    uploadImage: "Profilbild hochladen",
    maxFileSize: "Max. 5 MB. Akzeptierte Formate: JPG, PNG, GIF.",
    removeImage: "Foto entfernen",
    
    // Placeholders
    skillPlaceholder: "Fähigkeit",
    missionPlaceholder: "Mission oder Stack",
    techPlaceholder: "Bsp: PHP 7, JavaScript, TypeScript",
    itemsPlaceholder: "Elemente (durch Kommas getrennt)",
    sectionPlaceholder: "Bsp: Projekte, Publikationen, Auszeichnungen...",
    subtitlePlaceholder: "Optionaler Untertitel",
    blockPlaceholder: "Blockinhalt",
    certificationName: "Zertifizierungsname",
    certificationIssuer: "Ausstellende Organisation",
    techCategoryTitle: "Kategorietitel",
    techItemsPlaceholder: "Technologie-Elemente",
    
    // Empty states
    noContactFields: "Noch keine Kontaktfelder",
    noContactFieldsHint: "Klicken Sie auf \"Feld hinzufügen\", um Ihre Kontaktinformationen hinzuzufügen",
    noSkills: "Noch keine Fähigkeiten hinzugefügt",
    noSkillsHint: "Klicken Sie auf \"Hinzufügen\", um zu beginnen.",
    noTechCategories: "Noch keine Technologiekategorien",
    noTechCategoriesHint: "Klicken Sie auf \"Kategorie hinzufügen\", um zu beginnen.",
    noExperiences: "Noch keine Erfahrungen hinzugefügt",
    noExperiencesHint: "Klicken Sie auf \"Hinzufügen\", um zu beginnen.",
    noCertifications: "Noch keine Zertifizierungen hinzugefügt",
    noCertificationsHint: "Klicken Sie auf \"Hinzufügen\", um zu beginnen.",
    noLanguages: "Noch keine Sprachen hinzugefügt",
    noLanguagesHint: "Klicken Sie auf \"Hinzufügen\", um zu beginnen.",
    noCustomSections: "Noch keine benutzerdefinierten Abschnitte",
    noCustomSectionsHint: "Fügen Sie benutzerdefinierte Abschnitte hinzu, um Ihre Projekte, Auszeichnungen, Publikationen, ehrenamtliche Arbeit oder andere Informationen hervorzuheben, die Sie auszeichnen.",
    createFirstSection: "Erstellen Sie Ihren ersten Abschnitt",
    
    // Status
    translating: "Wird übersetzt...",
    
    // Dynamic labels
    experience: "Erfahrung",
    language: "Sprache",
    certification: "Zertifizierung",
    customSection: "Benutzerdefinierter Abschnitt",
    
    // Tips and instructions
    photoTipsTitle: "Tipps für professionelle Fotos",
    photoTip1: "Verwenden Sie ein aktuelles, hochwertiges Foto",
    photoTip2: "Professionelle Kleidung empfohlen",
    photoTip3: "Neutraler Hintergrund funktioniert am besten",
    photoTip4: "Lächeln Sie natürlich und schauen Sie in die Kamera",
    
    contactTipsTitle: "Tipps für Kontaktinformationen",
    contactTip1: "Nur professionelle Kontaktmethoden angeben",
    contactTip2: "Stellen Sie sicher, dass die E-Mail-Adresse professionell ist",
    contactTip3: "Links zu LinkedIn und relevanten Portfolios hinzufügen",
    contactTip4: "Telefonnummernformat konsistent halten",
    
    profileTipsTitle: "Tipps für Berufsprofil",
    profileTip1: "Halten Sie es prägnant (3-5 Sätze)",
    profileTip2: "Heben Sie Ihre Hauptstärken und Fachkenntnisse hervor",
    profileTip3: "Geben Sie Ihre Jahre der Erfahrung an",
    profileTip4: "Erwähnen Sie Ihre Karriereziele oder Spezialisierungen",
    
    skillsTipsTitle: "Tipps für Fähigkeiten-Abschnitt",
    skillsTip1: "Listen Sie Fähigkeiten auf, die für Ihre Zielposition relevant sind",
    skillsTip2: "Sowohl Hard- als auch Soft Skills einbeziehen",
    skillsTip3: "Priorisieren Sie die wichtigsten Fähigkeiten zuerst",
    skillsTip4: "Seien Sie spezifisch und ehrlich über Ihre Fähigkeiten",
    
    techTipsTitle: "Tipps für Technologien",
    techTip1: "Gruppieren Sie Technologien nach Kategorie (Frontend, Backend usw.)",
    techTip2: "Versionsnummern für Spezifität angeben",
    techTip3: "Listen Sie Technologien auf, die Sie aktiv nutzen",
    techTip4: "Halten Sie die Liste mit aktuellen Technologien auf dem neuesten Stand",
    
    experiencesTipsTitle: "Tipps für Berufserfahrung",
    experiencesTip1: "Beginnen Sie mit der aktuellsten Position",
    experiencesTip2: "Verwenden Sie Aktionsverben zur Beschreibung von Leistungen",
    experiencesTip3: "Quantifizieren Sie Ergebnisse, wenn möglich (%, $, eingesparte Zeit)",
    experiencesTip4: "Konzentrieren Sie sich auf relevante Verantwortlichkeiten",
    
    certificationsTipsTitle: "Tipps für Zertifizierungen",
    certificationsTip1: "Relevante professionelle Zertifizierungen einbeziehen",
    certificationsTip2: "Ausstellende Organisation für Glaubwürdigkeit hinzufügen",
    certificationsTip3: "Priorisieren Sie branchenweit anerkannte Zertifizierungen",
    certificationsTip4: "Abgelaufene Zertifizierungen aktualisieren",
    
    languagesTipsTitle: "Tipps für Sprachen",
    languagesTip1: "Seien Sie ehrlich über Ihr Kompetenzniveau",
    languagesTip2: "Muttersprache(n) angeben",
    languagesTip3: "Sprachzertifizierungen erwähnen",
    languagesTip4: "Priorisieren Sie für den Job relevante Sprachen",
    
    customSectionsTipsTitle: "Beliebte benutzerdefinierte Abschnitte",
    customSectionsTip1: "Projekte: Persönliche oder berufliche Projekte präsentieren",
    customSectionsTip2: "Publikationen: Forschungsarbeiten oder Artikel auflisten",
    customSectionsTip3: "Auszeichnungen und Ehrungen: Leistungen und Anerkennung hervorheben",
    customSectionsTip4: "Ehrenamtliche Arbeit: Gemeinschaftliches Engagement demonstrieren",
    customSectionsTip5: "Konferenzen: Vorträge oder Teilnahme",
    
    // About texts
    customSectionsAboutTitle: "Über benutzerdefinierte Abschnitte",
    customSectionsAbout: "Jeder benutzerdefinierte Abschnitt hat seinen eigenen Titel (Hauptüberschrift) und optionalen Untertitel (Beschreibung). Diese Titel erscheinen direkt in Ihrem Lebenslauf, machen Sie sie daher beschreibend und professionell.",
  
    // Dynamic UI elements Titles
    editableSectionTitle: "Abschnittstitel",
    editableSectionTitleHint: "Dieser Titel wird in Ihrem Lebenslauf über diesem Abschnitt angezeigt",
    editableSectionTag: "Erscheint im Lebenslauf",

    charactersCount: "Zeichen",
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
    customSections: "Secciones Personalizadas",
    sectionTitles: "Títulos de Secciones",
    
    // Actions
    addSkill: "Agregar",
    addExperience: "Agregar",
    addLanguage: "Agregar",
    addCertification: "Agregar",
    addTechCategory: "Agregar Categoría",
    addMission: "Misión",
    addField: "Agregar Campo",
    addSection: "Agregar Sección",
    addBlock: "Bloque",
    
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
    sectionTitle: "Título de la Sección",
    subtitle: "Subtítulo (opcional)",
    content: "Contenido",
    removeSection: "Eliminar Sección",
    
    // Image upload
    uploadImage: "Subir tu foto de perfil",
    maxFileSize: "Máx. 5 MB. Formatos aceptados: JPG, PNG, GIF.",
    removeImage: "Eliminar foto",
    
    // Placeholders
    skillPlaceholder: "Habilidad",
    missionPlaceholder: "Misión o Stack",
    techPlaceholder: "Ej: PHP 7, JavaScript, TypeScript",
    itemsPlaceholder: "Elementos (separados por comas)",
    sectionPlaceholder: "Ej: Proyectos, Publicaciones, Premios...",
    subtitlePlaceholder: "Subtítulo opcional",
    blockPlaceholder: "Contenido del bloque",
    certificationName: "Nombre de la certificación",
    certificationIssuer: "Organización emisora",
    techCategoryTitle: "Título de la categoría",
    techItemsPlaceholder: "Elementos de tecnología",
    
    // Empty states
    noContactFields: "Aún no hay campos de contacto",
    noContactFieldsHint: "Haz clic en \"Agregar Campo\" para añadir tu información de contacto",
    noSkills: "Aún no se han agregado habilidades",
    noSkillsHint: "Haz clic en \"Agregar\" para comenzar.",
    noTechCategories: "Aún no hay categorías de tecnología",
    noTechCategoriesHint: "Haz clic en \"Agregar Categoría\" para comenzar.",
    noExperiences: "Aún no se han agregado experiencias",
    noExperiencesHint: "Haz clic en \"Agregar\" para comenzar.",
    noCertifications: "Aún no se han agregado certificaciones",
    noCertificationsHint: "Haz clic en \"Agregar\" para comenzar.",
    noLanguages: "Aún no se han agregado idiomas",
    noLanguagesHint: "Haz clic en \"Agregar\" para comenzar.",
    noCustomSections: "Aún no hay secciones personalizadas",
    noCustomSectionsHint: "Agrega secciones personalizadas para mostrar tus proyectos, premios, publicaciones, trabajo voluntario o cualquier otra información que te distinga.",
    createFirstSection: "Crea tu primera sección",
    
    // Status
    translating: "Traduciendo...",
    
    // Dynamic labels
    experience: "Experiencia",
    language: "Idioma",
    certification: "Certificación",
    customSection: "Sección Personalizada",
    
    // Tips and instructions
    photoTipsTitle: "Consejos para Foto Profesional",
    photoTip1: "Usa una foto reciente de alta calidad",
    photoTip2: "Se recomienda vestimenta profesional",
    photoTip3: "Un fondo neutro funciona mejor",
    photoTip4: "Sonríe naturalmente y mira a la cámara",
    
    contactTipsTitle: "Consejos para Información de Contacto",
    contactTip1: "Incluye solo métodos de contacto profesionales",
    contactTip2: "Asegúrate de que la dirección de correo sea profesional",
    contactTip3: "Agrega enlaces a LinkedIn y portafolios relevantes",
    contactTip4: "Mantén el formato de número de teléfono consistente",
    
    profileTipsTitle: "Consejos para Perfil Profesional",
    profileTip1: "Mantenlo conciso (3-5 oraciones)",
    profileTip2: "Destaca tus fortalezas clave y experiencia",
    profileTip3: "Incluye tus años de experiencia",
    profileTip4: "Menciona tus objetivos profesionales o especializaciones",
    
    skillsTipsTitle: "Consejos para Sección de Habilidades",
    skillsTip1: "Lista habilidades relevantes para tu puesto objetivo",
    skillsTip2: "Incluye tanto habilidades técnicas como blandas",
    skillsTip3: "Prioriza las habilidades más importantes primero",
    skillsTip4: "Sé específico y honesto sobre tus capacidades",
    
    techTipsTitle: "Consejos para Tecnologías",
    techTip1: "Agrupa tecnologías por categoría (Frontend, Backend, etc.)",
    techTip2: "Incluye números de versión para especificidad",
    techTip3: "Lista tecnologías que estás usando activamente",
    techTip4: "Mantén la lista actualizada con tecnología actual",
    
    experiencesTipsTitle: "Consejos para Experiencia Profesional",
    experiencesTip1: "Comienza con el puesto más reciente",
    experiencesTip2: "Usa verbos de acción para describir logros",
    experiencesTip3: "Cuantifica resultados cuando sea posible (%, $, tiempo ahorrado)",
    experiencesTip4: "Enfócate en responsabilidades relevantes",
    
    certificationsTipsTitle: "Consejos para Certificaciones",
    certificationsTip1: "Incluye certificaciones profesionales relevantes",
    certificationsTip2: "Agrega la organización emisora para credibilidad",
    certificationsTip3: "Prioriza certificaciones reconocidas en la industria",
    certificationsTip4: "Mantén actualizadas las certificaciones vencidas",
    
    languagesTipsTitle: "Consejos para Idiomas",
    languagesTip1: "Sé honesto sobre tu nivel de competencia",
    languagesTip2: "Incluye tu(s) idioma(s) nativo(s)",
    languagesTip3: "Menciona cualquier certificación de idiomas",
    languagesTip4: "Prioriza idiomas relevantes para el trabajo",
    
    customSectionsTipsTitle: "Secciones Personalizadas Populares",
    customSectionsTip1: "Proyectos: Muestra proyectos personales o profesionales",
    customSectionsTip2: "Publicaciones: Lista artículos o trabajos de investigación",
    customSectionsTip3: "Premios y Honores: Destaca logros y reconocimientos",
    customSectionsTip4: "Trabajo Voluntario: Demuestra participación comunitaria",
    customSectionsTip5: "Conferencias: Ponencias o asistencia",
    
    // About texts
    customSectionsAboutTitle: "Acerca de las Secciones Personalizadas",
    customSectionsAbout: "Cada sección personalizada tiene su propio título (encabezado principal) y subtítulo opcional (descripción). Estos títulos aparecen directamente en tu CV, así que hazlos descriptivos y profesionales.",
  },
};