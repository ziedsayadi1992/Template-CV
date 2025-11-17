// ✅ FIXED VERSION:
// BLUE colors to match other sections (Technologies, Experiences, Custom Sections all use blue)

import React from 'react';
import { Plus, Trash2, Code } from 'lucide-react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CVData, TechnologyCategory } from '../../types';
import SortableItem from './Sortableitem';
import TipsCard from '../TipsComponent/TipsCard';

interface TechnologiesSectionProps {
  data: CVData;
  onUpdate: (data: CVData) => void;
  sensors: any;
  onDragStart: (event: any) => void;
  onDragEnd: (event: any) => void;
  t: (key: string) => string;
}

const TechnologiesSection: React.FC<TechnologiesSectionProps> = ({
  data,
  onUpdate,
  sensors,
  onDragStart,
  onDragEnd,
  t,
}) => {
  const addTechCategory = () => {
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

  const removeTechCategory = (id: string) => {
    onUpdate({
      ...data,
      technologies: data.technologies.filter(cat => cat.id !== id)
    });
  };

  const updateTechCategory = (id: string, field: 'title' | 'items', value: string) => {
    onUpdate({
      ...data,
      technologies: data.technologies.map(cat =>
        cat.id === id ? { ...cat, [field]: value } : cat
      )
    });
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
            <Code size={24} className="text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900">{t('technologies')}</h3>
        </div>
        <button
          onClick={addTechCategory}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] font-medium text-sm"
        >
          <Plus size={18} />
          {t('addTechCategory')}
        </button>
      </div>

      <TipsCard tipTitleKey="technologiesTipsTitle" tips={[
          t('technologiesTip1'),
          t('technologiesTip2'),
          t('technologiesTip3'),
          t('technologiesTip4')
        ]} />

      {/* Technology Categories List with Drag and Drop */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={data.technologies.map(cat => cat.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {data.technologies.map((category) => (
              <SortableItem key={category.id} id={category.id} isDraggingGlobal={false}>
                <div className="bg-gradient-to-br from-white to-neutral-50 border-2 border-neutral-200 rounded-xl p-5 space-y-3">
                  <div className="flex gap-3">
                    <div className="flex-1 space-y-3">
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                          {t('categoryTitle')}
                        </label>
                        <input
                          type="text"
                          value={category.title}
                          onChange={(e) => updateTechCategory(category.id, 'title', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white"
                          placeholder={t('techCategoryTitle') || "e.g., Frontend, Backend, DevOps"}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                          {t('items')}
                        </label>
                        <input
                          type="text"
                          value={category.items}
                          onChange={(e) => updateTechCategory(category.id, 'items', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white"
                          placeholder={t('techPlaceholder') || "React, Node.js, PostgreSQL, Docker..."}
                        />
                      </div>
                    </div>
                    
                    <button
                      onClick={() => removeTechCategory(category.id)}
                      className="px-3 py-2 h-fit bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all duration-200 mt-7"
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

      {/* Empty State */}
      {data.technologies.length === 0 && (
        <div className="text-center py-12 text-neutral-400">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 mb-4">
            <Code size={32} className="text-blue-600" />
          </div>
          <p className="font-medium mb-2">{t('noTechCategories')}</p>
          <p className="text-sm">{t('noTechCategoriesHint')}</p>
        </div>
      )}
    </div>
  );
};

export default TechnologiesSection;