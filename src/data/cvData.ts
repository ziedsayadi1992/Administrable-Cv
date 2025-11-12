import type { CVData } from '../types';

export const CV_DATA: CVData = {
  personalInfo: {
    fullName: 'Your Name',
    professionalTitle: 'Your Professional Title',
    avatarUrl: ''
  },

  profile: 'A short professional summary describing your experience, strengths, and career objectives.',

  contact: {
    email: 'your.email@example.com',
    phone: '+1234567890',
    location: 'Your City, Country',
    github: '',
    linkedin: '',
    fields: [] 
  },

  skills: [
    { id: 'skill-1', value: 'Skill 1' },
    { id: 'skill-2', value: 'Skill 2' },
    { id: 'skill-3', value: 'Skill 3' }
  ],

  technologies: [
    {
      id: 'tech-1',
      title: 'Frontend Development',
      items: 'React, TypeScript, HTML, CSS'
    }
  ],

  experiences: [
    {
      id: 'exp-1',
      jobTitle: 'Job Title',
      company: 'Company Name',
      missions: [
        'Mission or responsibility #1',
        'Mission or responsibility #2'
      ]
    }
  ],

  languages: [
    {
      id: 'lang-1',
      name: 'English',
      level: 'Fluent'
    }
  ],

  certifications: [
    // Example entry (empty list allowed)
    { id: 'cert-1', name: 'Certification Name', issuer: 'Issuer Name' }
  ],

  customSections: [
    // Example structure:
    {
      id: 'custom-1',
      title: 'Projects',
      subtitle: 'Side projects and personal work',
      blocks: [
        { id: 'block-1', content: 'My project description...' }
      ]
    }
  ],

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
    profile: 'Professional Profile',
    skills: 'Skills',
    technologies: 'Technical Environment',
    experiences: 'Professional Experience',
    certifications: 'Certifications',
    languages: 'Languages'
  }
};
