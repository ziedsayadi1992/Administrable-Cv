import React from 'react';
import { Plus, Trash2, Info, Sparkles } from 'lucide-react';
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
    if (section) {
      if (!section.blocks) {
        section.blocks = [];
      }
      section.blocks.push(newBlock);
    }
    onUpdate(newData);
  };

  const removeCustomSectionBlock = (sectionId: string, blockId: string) => {
    const newData = { ...data };
    const section = newData.customSections.find(s => s.id === sectionId);
    if (section && section.blocks) {
      section.blocks = section.blocks.filter(b => b.id !== blockId);
    }
    onUpdate(newData);
  };

  const updateCustomSectionBlock = (sectionId: string, blockId: string, content: string) => {
    const newData = { ...data };
    const section = newData.customSections.find(s => s.id === sectionId);
    if (section && section.blocks) {
      const block = section.blocks.find(b => b.id === blockId);
      if (block) block.content = content;
    }
    onUpdate(newData);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
            <Sparkles size={24} className="text-purple-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-neutral-900">{t('customSections')}</h3>
            <p className="text-sm text-neutral-500">Create sections for projects, awards, publications, etc.</p>
          </div>
        </div>
        <button
          onClick={addCustomSection}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] font-medium text-sm"
        >
          <Plus size={18} />
          {t('addSection') || 'Add Section'}
        </button>
      </div>

      {/* Info Box */}
      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-xl">
        <div className="flex gap-3">
          <Info size={20} className="text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-purple-900 font-medium mb-1">
              About Custom Sections
            </p>
            <p className="text-xs text-purple-800">
              Each custom section has its own <strong>title</strong> (main heading) and optional <strong>subtitle</strong> (description). 
              These titles appear directly in your CV, so make them descriptive and professional.
            </p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {data.customSections.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 mb-6">
            <Sparkles size={40} className="text-purple-600" />
          </div>
          <h4 className="text-lg font-bold text-neutral-800 mb-2">
            {t('noCustomSections') || 'No custom sections yet'}
          </h4>
          <p className="text-sm text-neutral-500 mb-6 max-w-md mx-auto">
            {t('customSectionHint') || 'Add custom sections to showcase your projects, awards, publications, volunteer work, or any other information that makes you stand out.'}
          </p>
          <button
            onClick={addCustomSection}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] font-medium"
          >
            <Plus size={20} />
            Create Your First Section
          </button>
        </div>
      )}

      {/* Custom Sections List */}
      <div className="space-y-6">
        {data.customSections.map((customSection) => {
          const blocks = customSection.blocks || [];
          
          return (
            <div
              key={customSection.id}
              className="bg-gradient-to-br from-white to-purple-50/20 border-2 border-purple-200 rounded-xl p-6 space-y-5 hover:shadow-md transition-all duration-200"
            >
              {/* Section Header Controls */}
              <div className="flex items-start gap-3 pb-4 border-b-2 border-purple-100">
                <div className="flex-1 space-y-3">
                  {/* Section Title */}
                  <div>
                    <label className="block text-xs font-semibold text-purple-700 mb-1.5 uppercase tracking-wide">
                      Section Title *
                    </label>
                    <input
                      type="text"
                      value={customSection.title}
                      onChange={(e) => updateCustomSectionTitle(customSection.id, e.target.value)}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-purple-300 bg-white font-bold text-lg"
                      placeholder={t('sectionTitle') || "e.g., Projects, Awards, Publications"}
                    />
                  </div>
                  
                  {/* Section Subtitle */}
                  <div>
                    <label className="block text-xs font-semibold text-purple-700 mb-1.5 uppercase tracking-wide">
                      Subtitle (Optional)
                    </label>
                    <input
                      type="text"
                      value={customSection.subtitle || ''}
                      onChange={(e) => updateCustomSectionSubtitle(customSection.id, e.target.value)}
                      className="w-full px-4 py-2.5 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-purple-300 bg-white text-sm"
                      placeholder={t('sectionSubtitle') || "Optional subtitle or description"}
                    />
                  </div>
                </div>
                
                {/* Delete Section Button */}
                <button
                  onClick={() => removeCustomSection(customSection.id)}
                  className="px-3 py-3 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all duration-200 hover:scale-105"
                  title="Delete section"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Content Blocks */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-neutral-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    {t('contentBlocks') || 'Content Blocks'}
                  </label>
                  <button
                    onClick={() => addCustomSectionBlock(customSection.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors font-medium"
                  >
                    <Plus size={14} />
                    {t('addBlock') || 'Add Block'}
                  </button>
                </div>

                {blocks.length === 0 ? (
                  <div className="text-center py-8 bg-purple-50/50 rounded-xl border-2 border-dashed border-purple-200">
                    <p className="text-neutral-400 text-sm font-medium">
                      {t('noBlocks') || 'No content blocks yet'}
                    </p>
                    <p className="text-neutral-400 text-xs mt-1">
                      Click "Add Block" to start adding content
                    </p>
                  </div>
                ) : (
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={onDragStart}
                    onDragEnd={(e) => onDragEnd(e)}
                  >
                    <SortableContext
                      items={blocks.map(b => b.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-2">
                        {blocks.map((block) => (
                          <SortableItem key={block.id} id={block.id} isDraggingGlobal={false}>
                            <div className="bg-white border-2 border-purple-200 rounded-xl p-3 hover:shadow-sm transition-all duration-200">
                              <div className="flex gap-2">
                                <textarea
                                  value={block.content}
                                  onChange={(e) => updateCustomSectionBlock(customSection.id, block.id, e.target.value)}
                                  rows={3}
                                  className="flex-1 px-3 py-2 border-2 border-neutral-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white resize-none text-sm"
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
          );
        })}
      </div>

      {/* Tips Section */}
      {data.customSections.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-4 rounded-r-xl">
          <div className="flex gap-3">
            <span className="text-purple-600 text-xl">💡</span>
            <div>
              <p className="text-sm text-purple-900 font-medium mb-2">
                Popular Custom Sections
              </p>
              <ul className="text-xs text-purple-800 space-y-1">
                <li>• <strong>Projects:</strong> Showcase personal or professional projects</li>
                <li>• <strong>Publications:</strong> List research papers or articles</li>
                <li>• <strong>Awards & Honors:</strong> Highlight achievements and recognition</li>
                <li>• <strong>Volunteer Work:</strong> Demonstrate community involvement</li>
                <li>• <strong>Conferences:</strong> Speaking engagements or attendance</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSectionsManager;