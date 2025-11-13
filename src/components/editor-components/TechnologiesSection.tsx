import React from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { CVData, TechnologyCategory } from '../../types';

interface TechnologiesSectionProps {
  data: CVData;
  onUpdate: (data: CVData) => void;
  t: (key: string) => string;
}

const TechnologiesSection: React.FC<TechnologiesSectionProps> = ({
  data,
  onUpdate,
  t,
}) => {
  const addTechnologyCategory = () => {
    const newCategory: TechnologyCategory = {
      id: `tech-${Date.now()}`,
      title: '',
      items: ''
    };
    onUpdate({
      ...data,
      technologies: [...data.technologies, newCategory]
    });
  };

  const removeTechnologyCategory = (id: string) => {
    onUpdate({
      ...data,
      technologies: data.technologies.filter(tech => tech.id !== id)
    });
  };

  const updateTechnologyTitle = (id: string, title: string) => {
    onUpdate({
      ...data,
      technologies: data.technologies.map(tech => 
        tech.id === id ? { ...tech, title } : tech
      )
    });
  };

  const updateTechnologyItems = (id: string, items: string) => {
    onUpdate({
      ...data,
      technologies: data.technologies.map(tech => 
        tech.id === id ? { ...tech, items } : tech
      )
    });
  };

  const handleTitleUpdate = (value: string) => {
    onUpdate({
      ...data,
      sectionTitles: {
        ...data.sectionTitles,
        technologies: value
      }
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between pb-4 border-b-2 border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
            <span className="text-2xl">🔧</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-900">{t('technologies')}</h3>
        </div>
        <button
          onClick={addTechnologyCategory}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] font-medium text-sm"
        >
          <Plus size={18} />
          {t('addTechCategory') || 'Add Category'}
        </button>
      </div>

      {/* CV Title Editor */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50/30 border-2 border-blue-200 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Edit2 size={18} className="text-blue-600" />
          <label className="text-sm font-semibold text-neutral-700">
            CV Section Title
          </label>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            Appears in CV
          </span>
        </div>
        <input
          type="text"
          value={data.sectionTitles.technologies}
          onChange={(e) => handleTitleUpdate(e.target.value)}
          className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300 bg-white font-medium"
          placeholder="e.g., Technical Environment, Technologies, Tech Stack"
        />
        <p className="text-xs text-neutral-500 mt-2">
          This title will appear in your CV above this section
        </p>
      </div>

      {/* Technology Categories List */}
      <div className="space-y-4">
        {data.technologies.map((tech) => (
          <div
            key={tech.id}
            className="bg-gradient-to-br from-white to-neutral-50 border-2 border-neutral-200 rounded-xl p-5 space-y-3"
          >
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={tech.title}
                onChange={(e) => updateTechnologyTitle(tech.id, e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white font-semibold"
                placeholder={t('techCategoryTitle') || "e.g., Frontend, Backend, DevOps"}
              />
              <button
                onClick={() => removeTechnologyCategory(tech.id)}
                className="ml-3 px-3 py-3 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all duration-200"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <textarea
              value={tech.items}
              onChange={(e) => updateTechnologyItems(tech.id, e.target.value)}
              rows={2}
              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white resize-none"
              placeholder={t('techItemsPlaceholder') || "e.g., React, TypeScript, Next.js, Tailwind CSS"}
            />
          </div>
        ))}
      </div>

      {data.technologies.length === 0 && (
        <div className="text-center py-12 text-neutral-400">
          <p>{t('noTechCategories') || 'No technology categories yet. Click "Add Category" to get started.'}</p>
        </div>
      )}
    </div>
  );
};

export default TechnologiesSection;