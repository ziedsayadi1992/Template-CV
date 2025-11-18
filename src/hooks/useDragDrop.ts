import { useState } from 'react';
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
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
    section: 'contact' | 'skills' | 'experiences' | 'technologies' | 'certifications' | 'languages' | 'customSection',
    sectionId?: string  // Optional sectionId for custom sections
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
      // ✅ FIX 1: Added technologies case
      case 'technologies': {
        const oldIndex = newData.technologies.findIndex((t) => t.id === active.id);
        const newIndex = newData.technologies.findIndex((t) => t.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
          newData.technologies = arrayMove(newData.technologies, oldIndex, newIndex);
        }
        break;
      }
      // ✅ FIX 2: Added certifications case
      case 'certifications': {
        const oldIndex = newData.certifications.findIndex((c) => c.id === active.id);
        const newIndex = newData.certifications.findIndex((c) => c.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
          newData.certifications = arrayMove(newData.certifications, oldIndex, newIndex);
        }
        break;
      }
      // ✅ FIX 3: Added languages case
      case 'languages': {
        const oldIndex = newData.languages.findIndex((l) => l.id === active.id);
        const newIndex = newData.languages.findIndex((l) => l.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
          newData.languages = arrayMove(newData.languages, oldIndex, newIndex);
        }
        break;
      }
      // Handle custom section blocks
      case 'customSection': {
        if (sectionId) {
          const customSection = newData.customSections.find(s => s.id === sectionId);
          if (customSection) {
            const oldIndex = customSection.blocks.findIndex((b) => b.id === active.id);
            const newIndex = customSection.blocks.findIndex((b) => b.id === over.id);
            if (oldIndex !== -1 && newIndex !== -1) {
              customSection.blocks = arrayMove(customSection.blocks, oldIndex, newIndex);
            }
          }
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