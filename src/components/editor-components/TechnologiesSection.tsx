import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
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
          {t('addCategory') || 'Add Category'}
        </button>
      </div>

      <div className="space-y-4">
        {data.technologies.map((tech) => (
          <div
            key={tech.id}
            className="bg-gradient-to-br from-white to-neutral-50 border-2 border-neutral-200 rounded-xl p-5 space-y-3"
          >
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={tech.title}
                onChange={(e) => updateTechnologyTitle(tech.id, e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white font-semibold"
                placeholder={t('categoryTitle') || "e.g., Programming Languages, Frameworks, Tools"}
              />
              <button
                onClick={() => removeTechnologyCategory(tech.id)}
                className="px-3 py-3 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all duration-200"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <textarea
              value={tech.items}
              onChange={(e) => updateTechnologyItems(tech.id, e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white resize-none"
              placeholder={t('techItemsPlaceholder') || "e.g., JavaScript, Python, React, Node.js, Docker, AWS"}
            />
            <p className="text-xs text-neutral-500">
              {t('techTip') || "Tip: Separate technologies with commas"}
            </p>
          </div>
        ))}
      </div>

      {data.technologies.length === 0 && (
        <div className="text-center py-12 text-neutral-400">
          <p>{t('noTechnologies') || 'No technology categories added yet. Click "Add Category" to get started.'}</p>
        </div>
      )}
    </div>
  );
};

export default TechnologiesSection;