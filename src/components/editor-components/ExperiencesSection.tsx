// ✅ FIXED VERSION:
// 1. Proper drag-drop implementation that actually works
// 2. BLUE colors to match other sections (not green)
// 3. Nested drag-drop for missions

import React from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, Briefcase } from 'lucide-react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { CVData, Experience } from '../../types';
import SortableItem from './Sortableitem';

interface ExperiencesSectionProps {
  data: CVData;
  expandedExperiences: Set<string>;
  onUpdate: (data: CVData) => void;
  toggleExperience: (id: string) => void;
  sensors: any;
  onDragStart: (event: any) => void;
  onDragEnd: (event: any) => void;
  t: (key: string) => string;
}

const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({
  data,
  expandedExperiences,
  onUpdate,
  toggleExperience,
  sensors,
  onDragStart,
  onDragEnd,
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

  // ✅ FIXED: Proper handler for experience drag-drop
  const handleExperienceDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) return;

    const oldIndex = data.experiences.findIndex(exp => exp.id === active.id);
    const newIndex = data.experiences.findIndex(exp => exp.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const reorderedExperiences = arrayMove(data.experiences, oldIndex, newIndex);
      
      onUpdate({
        ...data,
        experiences: reorderedExperiences
      });
    }
  };

  // ✅ FIXED: Proper handler for mission drag-drop within an experience
  const handleMissionDragEnd = (event: any, expId: string) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) return;

    const experience = data.experiences.find(exp => exp.id === expId);
    if (!experience) return;

    // Extract indices from mission IDs (format: mission-expId-index)
    const activeIndex = parseInt(active.id.split('-').pop());
    const overIndex = parseInt(over.id.split('-').pop());

    if (!isNaN(activeIndex) && !isNaN(overIndex)) {
      const reorderedMissions = arrayMove(experience.missions, activeIndex, overIndex);

      onUpdate({
        ...data,
        experiences: data.experiences.map(exp =>
          exp.id === expId ? { ...exp, missions: reorderedMissions } : exp
        )
      });
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
            <Briefcase size={24} className="text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900">{t('experiences')}</h3>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] font-medium text-sm"
        >
          <Plus size={18} />
          {t('addExperience')}
        </button>
      </div>

      {/* ✅ CHANGED: Professional Tips - BLUE colors (matching other sections) */}
      <div className="bg-blue-50 p-4 rounded-r-xl">
        <div className="flex gap-3">
          <span className="text-blue-600 text-xl">💡</span>
          <div>
            <p className="text-sm text-blue-900 font-medium mb-1">
              {t('experienceTipsTitle') || t('experiencesTipsTitle')}
            </p>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• {t('experienceTip1') || t('experiencesTip1')}</li>
              <li>• {t('experienceTip2') || t('experiencesTip2')}</li>
              <li>• {t('experienceTip3') || t('experiencesTip3')}</li>
              <li>• {t('experienceTip4') || t('experiencesTip4')}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ✅ FIXED: Experiences List with proper drag-drop */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={handleExperienceDragEnd}
      >
        <SortableContext
          items={data.experiences.map(exp => exp.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {data.experiences.map((exp) => {
              const isExpanded = expandedExperiences.has(exp.id);
              
              return (
                <SortableItem key={exp.id} id={exp.id} isDraggingGlobal={false}>
                  <div className="bg-gradient-to-br from-white to-neutral-50 border-2 border-neutral-200 rounded-xl p-5 space-y-4">
                    {/* Experience Header */}
                    <div className="flex items-start gap-3">
                      <div className="flex-1 space-y-3">
                        <div className="flex gap-3">
                          <div className="flex-1">
                            <label className="block text-sm font-semibold text-neutral-700 mb-2">
                              {t('jobTitle')} *
                            </label>
                            <input
                              type="text"
                              value={exp.jobTitle}
                              onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white"
                              placeholder="e.g., Senior Software Engineer"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <label className="block text-sm font-semibold text-neutral-700 mb-2">
                              {t('company')} *
                            </label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white"
                              placeholder="e.g., Tech Company Inc."
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleExperience(exp.id)}
                          className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-all duration-200 mt-7"
                        >
                          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                        
                        <button
                          onClick={() => removeExperience(exp.id)}
                          className="px-3 py-2 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all duration-200 mt-7"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    {/* ✅ FIXED: Missions with nested drag-drop */}
                    {isExpanded && (
                      <div className="pl-4 space-y-3">
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
                        
                        {/* ✅ FIXED: Separate DndContext for missions */}
                        <DndContext
                          sensors={sensors}
                          collisionDetection={closestCenter}
                          onDragStart={onDragStart}
                          onDragEnd={(event) => handleMissionDragEnd(event, exp.id)}
                        >
                          <SortableContext
                            items={exp.missions.map((_, idx) => `mission-${exp.id}-${idx}`)}
                            strategy={verticalListSortingStrategy}
                          >
                            {exp.missions.map((mission, idx) => (
                              <SortableItem 
                                key={`mission-${exp.id}-${idx}`} 
                                id={`mission-${exp.id}-${idx}`} 
                                isDraggingGlobal={false}
                              >
                                <div className="flex gap-2">
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
                              </SortableItem>
                            ))}
                          </SortableContext>
                        </DndContext>
                      </div>
                    )}
                  </div>
                </SortableItem>
              );
            })}
          </div>
        </SortableContext>
      </DndContext>

      {/* Empty State */}
      {data.experiences.length === 0 && (
        <div className="text-center py-12 text-neutral-400">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 mb-4">
            <Briefcase size={32} className="text-blue-600" />
          </div>
          <p className="font-medium mb-2">{t('noExperiences')}</p>
          <p className="text-sm">{t('noExperiencesHint')}</p>
        </div>
      )}
    </div>
  );
};

export default ExperiencesSection;