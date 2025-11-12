import React from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { CVData, Experience } from '../../types';

interface ExperiencesSectionProps {
  data: CVData;
  expandedExperiences: Set<string>;
  onUpdate: (data: CVData) => void;
  toggleExperience: (id: string) => void;
  t: (key: string) => string;
}

const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({
  data,
  expandedExperiences,
  onUpdate,
  toggleExperience,
  t,
}) => {
  const addExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      jobTitle: '',
      company: '',
      missions: ['']
    };
    onUpdate({
      ...data,
      experiences: [...data.experiences, newExp]
    });
  };

  const removeExperience = (id: string) => {
    onUpdate({
      ...data,
      experiences: data.experiences.filter(exp => exp.id !== id)
    });
  };

  const updateExperience = (id: string, field: 'jobTitle' | 'company', value: string) => {
    onUpdate({
      ...data,
      experiences: data.experiences.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const addMission = (expId: string) => {
    onUpdate({
      ...data,
      experiences: data.experiences.map(exp => 
        exp.id === expId ? { ...exp, missions: [...exp.missions, ''] } : exp
      )
    });
  };

  const removeMission = (expId: string, missionIndex: number) => {
    onUpdate({
      ...data,
      experiences: data.experiences.map(exp => 
        exp.id === expId ? { 
          ...exp, 
          missions: exp.missions.filter((_, idx) => idx !== missionIndex) 
        } : exp
      )
    });
  };

  const updateMission = (expId: string, missionIndex: number, value: string) => {
    onUpdate({
      ...data,
      experiences: data.experiences.map(exp => 
        exp.id === expId ? {
          ...exp,
          missions: exp.missions.map((mission, idx) => 
            idx === missionIndex ? value : mission
          )
        } : exp
      )
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between pb-4 border-b-2 border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
            <span className="text-2xl">💼</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-900">{t('experiences')}</h3>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] font-medium text-sm"
        >
          <Plus size={18} />
          {t('addExperience') || 'Add Experience'}
        </button>
      </div>

      <div className="space-y-4">
        {data.experiences.map((exp) => {
          const isExpanded = expandedExperiences.has(exp.id);
          
          return (
            <div
              key={exp.id}
              className="bg-gradient-to-br from-white to-neutral-50 border-2 border-neutral-200 rounded-xl p-5 space-y-4"
            >
              {/* Header */}
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleExperience(exp.id)}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                <div className="flex-1 space-y-3">
                  <input
                    type="text"
                    value={exp.jobTitle}
                    onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white font-semibold"
                    placeholder={t('jobTitle') || "e.g., Senior Software Engineer"}
                  />
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white"
                    placeholder={t('company') || "e.g., Tech Corp Inc."}
                  />
                </div>
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="px-3 py-3 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all duration-200"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Missions - Only show when expanded */}
              {isExpanded && (
                <div className="pl-12 space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-neutral-700">
                      {t('missions') || 'Key Achievements & Responsibilities'}
                    </label>
                    <button
                      onClick={() => addMission(exp.id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <Plus size={14} />
                      {t('addMission') || 'Add'}
                    </button>
                  </div>
                  
                  {exp.missions.map((mission, idx) => (
                    <div key={idx} className="flex gap-2">
                      <textarea
                        value={mission}
                        onChange={(e) => updateMission(exp.id, idx, e.target.value)}
                        rows={2}
                        className="flex-1 px-4 py-2 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white resize-none text-sm"
                        placeholder={t('missionPlaceholder') || "Describe a key achievement or responsibility..."}
                      />
                      <button
                        onClick={() => removeMission(exp.id, idx)}
                        className="px-2 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all duration-200"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {data.experiences.length === 0 && (
        <div className="text-center py-12 text-neutral-400">
          <p>{t('noExperiences') || 'No work experiences added yet. Click "Add Experience" to get started.'}</p>
        </div>
      )}
    </div>
  );
};

export default ExperiencesSection;