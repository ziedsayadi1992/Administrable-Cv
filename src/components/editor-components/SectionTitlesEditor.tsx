import React from 'react';
import { Type, Info } from 'lucide-react';
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
  const updateSectionTitle = (section: keyof typeof data.sectionTitles, title: string) => {
    onUpdate({
      ...data,
      sectionTitles: {
        ...data.sectionTitles,
        [section]: title
      }
    });
  };

  const sectionDefinitions = [
    {
      key: 'profile' as const,
      icon: '📝',
      label: 'Profile Section',
      description: 'Title for your professional summary/profile section',
      placeholder: 'e.g., Professional Profile, About Me, Summary'
    },
    {
      key: 'skills' as const,
      icon: '💡',
      label: 'Skills Section',
      description: 'Title for your skills/competencies section',
      placeholder: 'e.g., Skills, Competencies, Core Skills'
    },
    {
      key: 'technologies' as const,
      icon: '🔧',
      label: 'Technologies Section',
      description: 'Title for your technical skills/tools section',
      placeholder: 'e.g., Technical Environment, Technologies, Tools & Technologies'
    },
    {
      key: 'experiences' as const,
      icon: '💼',
      label: 'Experience Section',
      description: 'Title for your work experience section',
      placeholder: 'e.g., Professional Experience, Work History, Experience'
    },
    {
      key: 'certifications' as const,
      icon: '🏆',
      label: 'Certifications Section',
      description: 'Title for your certifications section',
      placeholder: 'e.g., Certifications, Licenses & Certifications'
    },
    {
      key: 'languages' as const,
      icon: '🌍',
      label: 'Languages Section',
      description: 'Title for your languages section',
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
              {t('sectionTitles') || 'Section Titles'}
            </h3>
            <p className="text-sm text-neutral-500">
              Customize the titles of each section in your CV
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl mb-6">
        <div className="flex gap-3">
          <Info size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-900 font-medium mb-1">
              Personalize Your CV
            </p>
            <p className="text-xs text-blue-800">
              Change section titles to match your preferred terminology or to better suit your industry.
              These titles will appear in your final CV document.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {sectionDefinitions.map((section) => (
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
              value={data.sectionTitles[section.key]}
              onChange={(e) => updateSectionTitle(section.key, e.target.value)}
              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white font-medium"
              placeholder={section.placeholder}
            />
          </div>
        ))}
      </div>

      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
        <div className="flex gap-3">
          <span className="text-green-600 text-xl">✓</span>
          <div>
            <p className="text-sm text-green-900 font-medium mb-1">
              Preview Your Changes
            </p>
            <p className="text-xs text-green-800">
              Your section title changes will be immediately reflected in the live preview on the right.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionTitlesEditor;