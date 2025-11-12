/**
 * Default section titles by language
 */
const defaultTitles = {
  'English': {
    'profile': 'Professional Profile',
    'skills': 'Skills',
    'technologies': 'Technical Environment',
    'experiences': 'Professional Experience',
    'certifications': 'Certifications',
    'languages': 'Languages'
  },
  'French': {
    'profile': 'Profil Professionnel',
    'skills': 'Compétences',
    'technologies': 'Environnements Techniques',
    'experiences': 'Expériences Professionnelles',
    'certifications': 'Certifications',
    'languages': 'Langues'
  },
  'Arabic': {
    'profile': 'الملف الشخصي المهني',
    'skills': 'المهارات',
    'technologies': 'البيئات التقنية',
    'experiences': 'الخبرات المهنية',
    'certifications': 'الشهادات',
    'languages': 'اللغات'
  },
  'Spanish': {
    'profile': 'Perfil Profesional',
    'skills': 'Habilidades',
    'technologies': 'Entorno Técnico',
    'experiences': 'Experiencia Profesional',
    'certifications': 'Certificaciones',
    'languages': 'Idiomas'
  },
  'German': {
    'profile': 'Berufsprofil',
    'skills': 'Fähigkeiten',
    'technologies': 'Technische Umgebung',
    'experiences': 'Berufserfahrung',
    'certifications': 'Zertifizierungen',
    'languages': 'Sprachen'
  }
};

/**
 * Detect CV language from content
 */
export function detectCVLanguage(jsonData) {
  const sampleTexts = [];
  
  if (jsonData.personalInfo?.professionalTitle) {
    sampleTexts.push(jsonData.personalInfo.professionalTitle);
  }
  if (jsonData.profile) {
    sampleTexts.push(jsonData.profile.substring(0, 200));
  }
  if (jsonData.experiences && jsonData.experiences.length > 0) {
    const firstExp = jsonData.experiences[0];
    if (firstExp.jobTitle) sampleTexts.push(firstExp.jobTitle);
    if (firstExp.missions && firstExp.missions[0]) {
      sampleTexts.push(firstExp.missions[0]);
    }
  }
  if (jsonData.sectionTitles) {
    for (const key in jsonData.sectionTitles) {
      if (jsonData.sectionTitles[key] && typeof jsonData.sectionTitles[key] === 'string') {
        sampleTexts.push(jsonData.sectionTitles[key]);
      }
    }
  }
  
  const combinedText = sampleTexts.join(' ').toLowerCase();
  
  const patterns = {
    'French': /\b(professionnel|compétences|expériences|développeur|ingénieur|gestion|projet)\b/i,
    'Arabic': /[\u0600-\u06FF]/,
    'Spanish': /\b(profesional|experiencia|habilidades|desarrollo|ingeniero|gestión)\b/i,
    'German': /\b(berufserfahrung|fähigkeiten|entwickler|ingenieur|projekt)\b/i,
    'English': /\b(professional|experience|skills|developer|engineer|management|project)\b/i
  };
  
  const scores = {};
  for (const [lang, pattern] of Object.entries(patterns)) {
    const matches = combinedText.match(pattern);
    scores[lang] = matches ? matches.length : 0;
  }
  
  let detectedLang = 'English';
  let maxScore = 0;
  
  for (const [lang, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      detectedLang = lang;
    }
  }
  
  console.log(`🔍 Detected CV language: ${detectedLang} (score: ${maxScore})`);
  return detectedLang;
}

/**
 * Ensure all section titles have values
 */
export function ensureSectionTitles(jsonData) {
  const detectedLang = detectCVLanguage(jsonData);
  const defaults = defaultTitles[detectedLang] || defaultTitles['English'];
  
  if (!jsonData.sectionTitles) {
    jsonData.sectionTitles = {};
  }
  
  for (const key in defaults) {
    if (!jsonData.sectionTitles[key] || jsonData.sectionTitles[key].trim() === '') {
      jsonData.sectionTitles[key] = defaults[key];
      console.log(`✅ Applied default ${detectedLang} title for "${key}": ${defaults[key]}`);
    }
  }
  
  return jsonData;
}