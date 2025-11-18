import React from 'react';
import { Plus, Trash2, Globe, Edit2 } from 'lucide-react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CVData, Language } from '../../types';
import SortableItem from './Sortableitem';
import TipsCard from '../TipsComponent/TipsCard';

interface LanguagesSectionProps {
  data: CVData;
  onUpdate: (data: CVData) => void;
  sensors: any;
  onDragStart: (event: any) => void;
  onDragEnd: (event: any) => void;
  t: (key: string) => string;
}

const LanguagesSection: React.FC<LanguagesSectionProps> = ({
  data,
  onUpdate,
  sensors,
  onDragStart,
  onDragEnd,
  t,
}) => {
  const addLanguage = () => {
    const newLang: Language = {
      id: `lang-${Date.now()}`,
      name: '',
      level: ''
    };
    onUpdate({
      ...data,
      languages: [...data.languages, newLang]
    });
  };

  const removeLanguage = (id: string) => {
    onUpdate({
      ...data,
      languages: data.languages.filter(lang => lang.id !== id)
    });
  };

  const updateLanguage = (id: string, field: 'name' | 'level', value: string) => {
    onUpdate({
      ...data,
      languages: data.languages.map(lang =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    });
  };

  const handleTitleUpdate = (value: string) => {
    onUpdate({
      ...data,
      sectionTitles: {
        ...data.sectionTitles,
        languages: value
      }
    });
  };

  const proficiencyLevels = [
    { value: '', label: 'Select Level' },
    { value: 'Native', label: 'Native' },
    { value: 'Fluent', label: 'Fluent' },
    { value: 'Advanced', label: 'Advanced' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Basic', label: 'Basic' },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
            <span className="text-2xl">🌍</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-900">{t('languages')}</h3>
        </div>
        <button
          onClick={addLanguage}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] font-medium text-sm"
        >
          <Plus size={18} />
          {t('addLanguage') || 'Add Language'}
        </button>
      </div>

      {/* Tips Card */}
      <TipsCard 
        tipTitleKey="languagesTipsTitle" 
        tips={[
          t('languagesTip1'),
          t('languagesTip2'),
          t('languagesTip3'),
          t('languagesTip4')
        ]} 
      />

      {/* CV Title Editor */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50/30 border-2 border-blue-200 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Edit2 size={18} className="text-blue-600" />
          <label className="text-sm font-semibold text-neutral-700">
            {t('editableSectionTitle') || 'CV Section Title'}
          </label>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            {t('editableSectionTag') || 'Appears in CV'}
          </span>
        </div>
        <input
          type="text"
          value={data.sectionTitles.languages}
          onChange={(e) => handleTitleUpdate(e.target.value)}
          className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300 bg-white font-medium"
          placeholder="e.g., Languages, Language Skills, Linguistic Abilities"
        />
        <p className="text-xs text-neutral-500 mt-2">
          {t('editableSectionTitleHint') || 'This title will appear as the section header in your CV.'}
        </p>
      </div>

      {/* ✅ Languages List with Drag and Drop */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={data.languages.map(lang => lang.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {data.languages.map((lang) => (
              <SortableItem key={lang.id} id={lang.id} isDraggingGlobal={false}>
                <div className="bg-gradient-to-br from-white to-neutral-50 border-2 border-neutral-200 rounded-xl p-5">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={lang.name}
                      onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white"
                      placeholder={t('languageName') || "e.g., English, Spanish, Mandarin"}
                    />
                    <select
                      value={lang.level}
                      onChange={(e) => updateLanguage(lang.id, 'level', e.target.value)}
                      className="px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white"
                    >
                      {proficiencyLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeLanguage(lang.id)}
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

      {data.languages.length === 0 && (
        <div className="text-center py-12 text-neutral-400">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 mb-4">
            <Globe size={32} className="text-blue-600" />
          </div>
          <p className="font-medium mb-2">{t('noLanguages') || 'No languages added yet'}</p>
          <p className="text-sm">{t('noLanguagesHint') || 'Click "Add Language" to get started'}</p>
        </div>
      )}
    </div>
  );
};

export default LanguagesSection;