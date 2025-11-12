import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CVData, Skill } from '../../types';
import SortableItem from './Sortableitem';

interface SkillsSectionProps {
  data: CVData;
  onUpdate: (data: CVData) => void;
  sensors: any;
  onDragStart: (event: any) => void;
  onDragEnd: (event: any) => void;
  t: (key: string) => string;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  data,
  onUpdate,
  sensors,
  onDragStart,
  onDragEnd,
  t,
}) => {
  const addSkill = () => {
    const newSkill: Skill = {
      id: `skill-${Date.now()}`,
      value: ''
    };
    onUpdate({
      ...data,
      skills: [...data.skills, newSkill]
    });
  };

  const removeSkill = (id: string) => {
    onUpdate({
      ...data,
      skills: data.skills.filter(s => s.id !== id)
    });
  };

  const updateSkill = (id: string, value: string) => {
    onUpdate({
      ...data,
      skills: data.skills.map(s => s.id === id ? { ...s, value } : s)
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between pb-4 border-b-2 border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
            <span className="text-2xl">💡</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-900">{t('skills')}</h3>
        </div>
        <button
          onClick={addSkill}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] font-medium text-sm"
        >
          <Plus size={18} />
          {t('addSkill') || 'Add Skill'}
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={data.skills.map(s => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {data.skills.map((skill) => (
              <SortableItem key={skill.id} id={skill.id} isDraggingGlobal={false}>
                <div className="bg-gradient-to-br from-white to-neutral-50 border-2 border-neutral-200 rounded-xl p-4">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={skill.value}
                      onChange={(e) => updateSkill(skill.id, e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white"
                      placeholder={t('skillPlaceholder') || "e.g., Project Management, Problem Solving, Team Leadership"}
                    />
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="px-3 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all duration-200"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {data.skills.length === 0 && (
        <div className="text-center py-12 text-neutral-400">
          <p>{t('noSkills') || 'No skills added yet. Click "Add Skill" to get started.'}</p>
        </div>
      )}
    </div>
  );
};

export default SkillsSection;