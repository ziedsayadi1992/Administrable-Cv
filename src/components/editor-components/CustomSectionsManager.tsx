import React from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CVData, CustomSection, CustomSectionBlock } from '../../types';
import SortableItem from './Sortableitem';

interface CustomSectionsManagerProps {
  data: CVData;
  onUpdate: (data: CVData) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  sensors: any;
  onDragStart: (event: any) => void;
  onDragEnd: (event: any) => void;
  t: (key: string) => string;
}

const CustomSectionsManager: React.FC<CustomSectionsManagerProps> = ({
  data,
  onUpdate,
  activeSection,
  setActiveSection,
  sensors,
  onDragStart,
  onDragEnd,
  t,
}) => {
  const createCustomSection = (title: string, subtitle: string) => {
    return {
      id: `custom-${Date.now()}`,
      title,
      subtitle,
      blocks: []
    };
  };

  const addCustomSection = () => {
    const newSection = createCustomSection(
      t('customSection') || 'New Section',
      ''
    );
    const newData = { ...data };
    newData.customSections.push(newSection);
    newData.sectionOrder.push(newSection.id);
    onUpdate(newData);
    setActiveSection(newSection.id);
  };

  const removeCustomSection = (id: string) => {
    const newData = { ...data };
    newData.customSections = newData.customSections.filter(s => s.id !== id);
    newData.sectionOrder = newData.sectionOrder.filter(sid => sid !== id);
    onUpdate(newData);
    if (activeSection === id) {
      setActiveSection('personal');
    }
  };

  const updateCustomSectionTitle = (id: string, title: string) => {
    const newData = { ...data };
    const section = newData.customSections.find(s => s.id === id);
    if (section) section.title = title;
    onUpdate(newData);
  };

  const updateCustomSectionSubtitle = (id: string, subtitle: string) => {
    const newData = { ...data };
    const section = newData.customSections.find(s => s.id === id);
    if (section) section.subtitle = subtitle;
    onUpdate(newData);
  };

  const addCustomSectionBlock = (sectionId: string) => {
    const newBlock: CustomSectionBlock = {
      id: `block-${Date.now()}`,
      content: ''
    };
    const newData = { ...data };
    const section = newData.customSections.find(s => s.id === sectionId);
    if (section) section.blocks.push(newBlock);
    onUpdate(newData);
  };

  const removeCustomSectionBlock = (sectionId: string, blockId: string) => {
    const newData = { ...data };
    const section = newData.customSections.find(s => s.id === sectionId);
    if (section) {
      section.blocks = section.blocks.filter(b => b.id !== blockId);
    }
    onUpdate(newData);
  };

  const updateCustomSectionBlock = (sectionId: string, blockId: string, content: string) => {
    const newData = { ...data };
    const section = newData.customSections.find(s => s.id === sectionId);
    if (section) {
      const block = section.blocks.find(b => b.id === blockId);
      if (block) block.content = content;
    }
    onUpdate(newData);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between pb-4 border-b-2 border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
            <span className="text-2xl">✨</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-900">{t('customSections')}</h3>
        </div>
        <button
          onClick={addCustomSection}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] font-medium text-sm"
        >
          <Plus size={18} />
          {t('addSection') || 'Add Section'}
        </button>
      </div>

      {data.customSections.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 mb-4">
            <span className="text-4xl">✨</span>
          </div>
          <p className="text-neutral-600 font-medium mb-2">
            {t('noCustomSections') || 'No custom sections yet'}
          </p>
          <p className="text-sm text-neutral-400">
            {t('customSectionHint') || 'Add custom sections like Projects, Awards, Publications, etc.'}
          </p>
        </div>
      )}

      <div className="space-y-6">
        {data.customSections.map((customSection) => (
          <div
            key={customSection.id}
            className="bg-gradient-to-br from-white to-neutral-50 border-2 border-neutral-200 rounded-xl p-6 space-y-4"
          >
            {/* Section Header */}
            <div className="flex items-start gap-3 pb-4 border-b border-neutral-200">
              <div className="flex-1 space-y-3">
                <input
                  type="text"
                  value={customSection.title}
                  onChange={(e) => updateCustomSectionTitle(customSection.id, e.target.value)}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white font-bold text-lg"
                  placeholder={t('sectionTitle') || "e.g., Projects, Awards, Publications"}
                />
                <input
                  type="text"
                  value={customSection.subtitle}
                  onChange={(e) => updateCustomSectionSubtitle(customSection.id, e.target.value)}
                  className="w-full px-4 py-2.5 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white text-sm"
                  placeholder={t('sectionSubtitle') || "Optional subtitle or description"}
                />
              </div>
              <button
                onClick={() => removeCustomSection(customSection.id)}
                className="px-3 py-3 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all duration-200"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Content Blocks */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-neutral-700">
                  {t('contentBlocks') || 'Content Blocks'}
                </label>
                <button
                  onClick={() => addCustomSectionBlock(customSection.id)}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Plus size={14} />
                  {t('addBlock') || 'Add Block'}
                </button>
              </div>

              {customSection.blocks.length === 0 ? (
                <div className="text-center py-8 text-neutral-400 text-sm">
                  {t('noBlocks') || 'No content blocks yet. Click "Add Block" to start.'}
                </div>
              ) : (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragStart={onDragStart}
                  onDragEnd={(e) => onDragEnd(e, data, onUpdate, 'customSection')}
                >
                  <SortableContext
                    items={customSection.blocks.map(b => b.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-2">
                      {customSection.blocks.map((block) => (
                        <SortableItem key={block.id} id={block.id} isDraggingGlobal={false}>
                          <div className="bg-white border-2 border-neutral-200 rounded-xl p-3">
                            <div className="flex gap-2">
                              <textarea
                                value={block.content}
                                onChange={(e) => updateCustomSectionBlock(customSection.id, block.id, e.target.value)}
                                rows={3}
                                className="flex-1 px-3 py-2 border-2 border-neutral-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white resize-none text-sm"
                                placeholder={t('blockPlaceholder') || "Enter your content here..."}
                              />
                              <button
                                onClick={() => removeCustomSectionBlock(customSection.id, block.id)}
                                className="px-2 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all duration-200"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </SortableItem>
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSectionsManager;