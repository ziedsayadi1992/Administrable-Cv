import React from 'react';
import { Plus, Trash2, Mail, Phone, MapPin, Github, Linkedin, Globe, Edit2, Info } from 'lucide-react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CVData, ContactField } from '../../types';
import SortableItem from './Sortableitem';

interface ContactSectionProps {
  data: CVData;
  contactFields: ContactField[];
  onUpdate: (data: CVData) => void;
  sensors: any;
  onDragStart: (event: any) => void;
  onDragEnd: (event: any) => void;
  t: (key: string) => string;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  data,
  contactFields,
  onUpdate,
  sensors,
  onDragStart,
  onDragEnd,
  t,
}) => {
  const getIconForType = (type: string) => {
    switch (type) {
      case 'email': return <Mail size={18} />;
      case 'phone': return <Phone size={18} />;
      case 'location': return <MapPin size={18} />;
      case 'github': return <Github size={18} />;
      case 'linkedin': return <Linkedin size={18} />;
      case 'website': return <Globe size={18} />;
      default: return <Mail size={18} />;
    }
  };

  const addContactField = () => {
    const newField: ContactField = {
      id: `contact-${Date.now()}`,
      type: 'email',
      label: 'Email',
      value: ''
    };
    onUpdate({
      ...data,
      contact: {
        ...data.contact,
        fields: [...contactFields, newField]
      }
    });
  };

  const removeContactField = (id: string) => {
    onUpdate({
      ...data,
      contact: {
        ...data.contact,
        fields: contactFields.filter(f => f.id !== id)
      }
    });
  };

  const updateContactField = (id: string, updates: Partial<ContactField>) => {
    onUpdate({
      ...data,
      contact: {
        ...data.contact,
        fields: contactFields.map(f => f.id === id ? { ...f, ...updates } : f)
      }
    });
  };

  const handleTitleUpdate = (value: string) => {
    onUpdate({
      ...data,
      sectionTitles: {
        ...data.sectionTitles,
        contact: value
      }
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between pb-4 border-b-2 border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
            <span className="text-2xl">📧</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-900">{t('contact')}</h3>
        </div>
        <button
          onClick={addContactField}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] font-medium text-sm"
        >
          <Plus size={18} />
          Add Field
        </button>
      </div>

      {/* CV Title Editor - Optional for Contact */}
      {/* <div className="bg-gradient-to-br from-blue-50 to-cyan-50/30 border-2 border-blue-200 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Edit2 size={18} className="text-blue-600" />
          <label className="text-sm font-semibold text-neutral-700">
            CV Section Title (Optional)
          </label>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            Header Section
          </span>
        </div>
        <input
          type="text"
          value={data.sectionTitles?.contact || ''}
          onChange={(e) => handleTitleUpdate(e.target.value)}
          className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300 bg-white font-medium"
          placeholder="e.g., Contact Information, Get in Touch, Contact Details"
        />
        <div className="flex items-start gap-2 mt-3 p-3 bg-blue-50/50 rounded-lg">
          <Info size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-neutral-600">
            <strong>Note:</strong> In most CV templates, contact information appears in the header without a section title. 
            This field is optional and allows customization for alternative layouts.
          </p>
        </div>
      </div> */}

      {/* Contact Fields List */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={contactFields.map(f => f.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {contactFields.map((field) => (
              <SortableItem key={field.id} id={field.id} isDraggingGlobal={false}>
                <div className="bg-gradient-to-br from-white to-neutral-50 border-2 rounded-xl p-4 space-y-3">
                  <div className="flex gap-3">
                    <select
                      value={field.type}
                      onChange={(e) => updateContactField(field.id, { type: e.target.value })}
                      className="px-3 py-2 border-2 border-neutral-200 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium text-sm"
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="location">Location</option>
                      <option value="github">GitHub</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="website">Website</option>
                    </select>
                    <div className="flex-1 flex items-center gap-2 px-4 py-2 border-2 border-neutral-200 rounded-lg bg-white">
                      {getIconForType(field.type)}
                      <input
                        type="text"
                        value={field.value}
                        onChange={(e) => updateContactField(field.id, { value: e.target.value })}
                        className="flex-1 outline-none"
                        placeholder={`Enter ${field.type}`}
                      />
                    </div>
                    <button
                      onClick={() => removeContactField(field.id)}
                      className="px-3 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all"
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

      {contactFields.length === 0 && (
        <div className="text-center py-12 text-neutral-400">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 mb-4">
            <Mail size={32} className="text-blue-600" />
          </div>
          <p className="font-medium mb-2">No contact fields yet</p>
          <p className="text-sm">Click "Add Field" to add your contact information</p>
        </div>
      )}
    </div>
  );
};

export default ContactSection;