import { useState } from 'react';
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DndContext,
  closestCenter,
  DragEndEvent,
  DragStartEvent
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import { CVData } from '../types';

export const useDragDrop = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDraggingAny, setIsDraggingAny] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setIsDraggingAny(true);
  };

  const handleDragEnd = (
    event: DragEndEvent,
    data: CVData,
    onUpdate: (data: CVData) => void,
    section: 'contact' | 'skills' | 'experiences' | 'customSection'
  ) => {
    const { active, over } = event;
    setActiveId(null);
    setIsDraggingAny(false);

    if (!over || active.id === over.id) return;

    const newData = { ...data };

    switch (section) {
      case 'contact': {
        const oldIndex = newData.contact.fields.findIndex((f) => f.id === active.id);
        const newIndex = newData.contact.fields.findIndex((f) => f.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
          newData.contact.fields = arrayMove(newData.contact.fields, oldIndex, newIndex);
        }
        break;
      }
      case 'skills': {
        const oldIndex = newData.skills.findIndex((s) => s.id === active.id);
        const newIndex = newData.skills.findIndex((s) => s.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
          newData.skills = arrayMove(newData.skills, oldIndex, newIndex);
        }
        break;
      }
      case 'experiences': {
        const oldIndex = newData.experiences.findIndex((e) => e.id === active.id);
        const newIndex = newData.experiences.findIndex((e) => e.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
          newData.experiences = arrayMove(newData.experiences, oldIndex, newIndex);
        }
        break;
      }
    }

    onUpdate(newData);
  };

  return {
    sensors,
    activeId,
    isDraggingAny,
    handleDragStart,
    handleDragEnd
  };
};