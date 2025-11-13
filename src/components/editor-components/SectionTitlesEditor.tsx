import React from 'react';
import { Type, Info, Navigation, FileText } from 'lucide-react';
import { CVData } from '../../types';

interface SectionTitlesEditorProps {
  data: CVData;
  onUpdate: (data: CVData) => void;
  t: (key: string) => string;
}

const SectionTitlesEditor: React.FC<SectionTitlesEditorProps> = ({
  data,
  onUpdate,
  t,
}) => {
  // Ensure sectionLabels exists with defaults
  const sectionLabels = data.sectionLabels || {
    personal: t('personalInfo'),
    contact: t('contact'),
    profile: t('profile'),
    skills: t('skills'),
    technologies: t('technologies'),
    experiences: t('experiences'),
    certifications: t('certifications'),
    languages: t('languages'),
    customSections: t('customSections')
  };

  const updateSectionLabel = (section: keyof typeof sectionLabels, label: string) => {
    onUpdate({
      ...data,
      sectionLabels: {
        ...sectionLabels,
        [section]: label
      }
    });
  };

  const updateSectionTitle = (section: keyof typeof data.sectionTitles, title: string) => {
    onUpdate({
      ...data,
      sectionTitles: {
        ...data.sectionTitles,
        [section]: title
      }
    });
  };

  const navigationSections = [
    {
      key: 'personal' as const,
      icon: '👤',
      label: 'Personal Information',
      description: 'Label for personal information section in navigation',
      placeholder: 'e.g., Personal Information, About, Personal Details'
    },
    {
      key: 'contact' as const,
      icon: '📧',
      label: 'Contact',
      description: 'Label for contact section in navigation',
      placeholder: 'e.g., Contact, Contact Information, Get in Touch'
    },
    {
      key: 'profile' as const,
      icon: '📝',
      label: 'Profile',
      description: 'Label for profile section in navigation',
      placeholder: 'e.g., Profile, Professional Summary, About Me'
    },
    {
      key: 'skills' as const,
      icon: '💡',
      label: 'Skills',
      description: 'Label for skills section in navigation',
      placeholder: 'e.g., Skills, Competencies, Core Skills'
    },
    {
      key: 'technologies' as const,
      icon: '🔧',
      label: 'Technologies',
      description: 'Label for technologies section in navigation',
      placeholder: 'e.g., Technologies, Technical Stack, Tools'
    },
    {
      key: 'experiences' as const,
      icon: '💼',
      label: 'Experiences',
      description: 'Label for experiences section in navigation',
      placeholder: 'e.g., Experience, Work History, Employment'
    },
    {
      key: 'certifications' as const,
      icon: '🏆',
      label: 'Certifications',
      description: 'Label for certifications section in navigation',
      placeholder: 'e.g., Certifications, Credentials, Licenses'
    },
    {
      key: 'languages' as const,
      icon: '🌍',
      label: 'Languages',
      description: 'Label for languages section in navigation',
      placeholder: 'e.g., Languages, Language Skills, Linguistic Abilities'
    },
    {
      key: 'customSections' as const,
      icon: '✨',
      label: 'Custom Sections',
      description: 'Label for custom sections in navigation',
      placeholder: 'e.g., Custom Sections, Additional Sections, More'
    }
  ];

  const cvTitleSections = [
    {
      key: 'profile' as const,
      icon: '📝',
      label: 'Profile Section Title',
      description: 'Title that appears in your CV for the profile section',
      placeholder: 'e.g., Professional Profile, About Me, Summary'
    },
    {
      key: 'skills' as const,
      icon: '💡',
      label: 'Skills Section Title',
      description: 'Title that appears in your CV for the skills section',
      placeholder: 'e.g., Core Skills, Competencies, Skills'
    },
    {
      key: 'technologies' as const,
      icon: '🔧',
      label: 'Technologies Section Title',
      description: 'Title that appears in your CV for the technologies section',
      placeholder: 'e.g., Technical Environment, Technologies, Tech Stack'
    },
    {
      key: 'experiences' as const,
      icon: '💼',
      label: 'Experiences Section Title',
      description: 'Title that appears in your CV for the experiences section',
      placeholder: 'e.g., Professional Experience, Work History, Experience'
    },
    {
      key: 'certifications' as const,
      icon: '🏆',
      label: 'Certifications Section Title',
      description: 'Title that appears in your CV for the certifications section',
      placeholder: 'e.g., Certifications, Licenses & Certifications'
    },
    {
      key: 'languages' as const,
      icon: '🌍',
      label: 'Languages Section Title',
      description: 'Title that appears in your CV for the languages section',
      placeholder: 'e.g., Languages, Language Skills'
    }
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between pb-4 border-b-2 border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
            <Type size={24} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-neutral-900">
              {t('sectionTitles') || 'Section Labels & Titles'}
            </h3>
            <p className="text-sm text-neutral-500">
              Customize both navigation labels and CV section titles
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl mb-6">
        <div className="flex gap-3">
          <Info size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-900 font-medium mb-1">
              Two Types of Labels
            </p>
            <p className="text-xs text-blue-800">
              <strong>Navigation Labels</strong> appear in the editor sidebar. 
              <strong>CV Titles</strong> appear as section headers in your exported CV.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Labels */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <Navigation size={20} className="text-blue-600" />
          <h4 className="text-lg font-bold text-neutral-800">Navigation Labels</h4>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            Editor Sidebar
          </span>
        </div>

        {navigationSections.map((section) => (
          <div
            key={section.key}
            className="bg-gradient-to-br from-white to-neutral-50 border-2 border-neutral-200 rounded-xl p-5 space-y-3 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{section.icon}</span>
              <div className="flex-1">
                <h4 className="font-semibold text-neutral-800">{section.label}</h4>
                <p className="text-xs text-neutral-500">{section.description}</p>
              </div>
            </div>
            
            <input
              type="text"
              value={sectionLabels[section.key]}
              onChange={(e) => updateSectionLabel(section.key, e.target.value)}
              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white font-medium"
              placeholder={section.placeholder}
            />
          </div>
        ))}
      </div>

      {/* CV Section Titles */}
      <div className="space-y-4 mt-8">
        <div className="flex items-center gap-2 mb-3">
          <FileText size={20} className="text-green-600" />
          <h4 className="text-lg font-bold text-neutral-800">CV Section Titles</h4>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
            CV Document
          </span>
        </div>

        {cvTitleSections.map((section) => (
          <div
            key={section.key}
            className="bg-gradient-to-br from-white to-green-50/30 border-2 border-green-200 rounded-xl p-5 space-y-3 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{section.icon}</span>
              <div className="flex-1">
                <h4 className="font-semibold text-neutral-800">{section.label}</h4>
                <p className="text-xs text-neutral-500">{section.description}</p>
              </div>
            </div>
            
            <input
              type="text"
              value={data.sectionTitles[section.key]}
              onChange={(e) => updateSectionTitle(section.key, e.target.value)}
              className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-300 bg-white font-medium"
              placeholder={section.placeholder}
            />
          </div>
        ))}
      </div>

      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl mt-6">
        <div className="flex gap-3">
          <span className="text-green-600 text-xl">✓</span>
          <div>
            <p className="text-sm text-green-900 font-medium mb-1">
              Preview Your Changes
            </p>
            <p className="text-xs text-green-800">
              Navigation label changes appear in the sidebar immediately. CV title changes appear in the preview document.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionTitlesEditor;