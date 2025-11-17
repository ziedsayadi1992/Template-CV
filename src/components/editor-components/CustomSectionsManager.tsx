// ✅ FIXED: Track drag state to prevent empty screen during drag operations

import React, { useEffect, useRef, useState } from 'react';
import { Plus, Trash2, Info, Sparkles } from 'lucide-react';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { CVData, CustomSection, CustomSectionBlock } from '../../types';
import SortableItem from './Sortableitem';
import TipsCard from '../TipsComponent/TipsCard';

interface CustomSectionsManagerProps {
  data: CVData;
  onUpdate: (data: CVData) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  t: (key: string) => string;
  sensors: any;
  onDragEnd: (event: any, sectionId: string) => void;
}

const CustomSectionsManager: React.FC<CustomSectionsManagerProps> = ({
  data,
  onUpdate,
  activeSection,
  setActiveSection,
  t,
}) => {
  const newSectionIdRef = useRef<string | null>(null);
  
  // ✅ NEW: Track if we're currently dragging
  const [isDragging, setIsDragging] = useState(false);
  
  // ✅ NEW: Store snapshot of blocks before drag starts
  const dragSnapshotRef = useRef<{ [sectionId: string]: CustomSectionBlock[] }>({});

  const localSensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (newSectionIdRef.current) {
      const sectionExists = data.customSections.some(s => s.id === newSectionIdRef.current);
      if (sectionExists) {
        // Don't change activeSection - keep it as "custom"
        newSectionIdRef.current = null;
      }
    }
  }, [data.customSections]);

  const createCustomSection = (title: string, subtitle: string) => {
    return {
      id: `custom-${Date.now()}`,
      title,
      subtitle,
      blocks: [{
        id: `block-${Date.now()}`,
        content: ''
      }]
    };
  };

  const addCustomSection = () => {
    const newSection = createCustomSection(
      t('customSection') || 'New Section',
      ''
    );
    
    newSectionIdRef.current = newSection.id;
    
    const newData = { ...data };
    newData.customSections.push(newSection);
    newData.sectionOrder.push(newSection.id);
    
    onUpdate(newData);
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

  // ✅ NEW: Drag start handler - save snapshot and mark dragging
  const handleDragStart = (sectionId: string) => {
    setIsDragging(true);
    
    // Save current blocks state
    const section = data.customSections.find(s => s.id === sectionId);
    if (section && section.blocks) {
      dragSnapshotRef.current[sectionId] = [...section.blocks];
    }
  };

  // ✅ NEW: Drag end handler - reorder and clear dragging state
  const handleBlockDragEnd = (event: any, sectionId: string) => {
    const { active, over } = event;
    
    // Clear dragging state immediately
    setIsDragging(false);
    
    if (!over || active.id === over.id) {
      return;
    }

    const section = data.customSections.find(s => s.id === sectionId);
    if (!section || !section.blocks) return;

    const oldIndex = section.blocks.findIndex(b => b.id === active.id);
    const newIndex = section.blocks.findIndex(b => b.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const reorderedBlocks = arrayMove(section.blocks, oldIndex, newIndex);

      onUpdate({
        ...data,
        customSections: data.customSections.map(s =>
          s.id === sectionId ? { ...s, blocks: reorderedBlocks } : s
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
            <Sparkles size={24} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-neutral-900">{t('customSections')}</h3>
            <p className="text-sm text-neutral-500">{t('customCreateSections') || 'Create sections for projects, awards, publications, etc.'}</p>
          </div>
        </div>
        <button
          onClick={addCustomSection}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] font-medium text-sm"
        >
          <Plus size={18} />
          {t('addSection') || 'Add Section'}
        </button>
      </div>

      {/* Tips */}
      {data.customSections.length > 0 && (
        <TipsCard tipTitleKey="customSectionsTipsTitle" tips={[
          t('customSectionsTip1'),
          t('customSectionsTip2'),
          t('customSectionsTip3'),
          t('customSectionsTip4')
        ]} />
      )}

      {/* Info Box */}
      {data.customSections.length > 0 && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
          <div className="flex gap-3">
            <Info size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-900 font-medium mb-1">
                {t('customSectionsAboutTitle')}
              </p>
              <p className="text-xs text-blue-800">
                {t('customSectionsAbout')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {data.customSections.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 mb-6">
            <Sparkles size={40} className="text-blue-600" />
          </div>
          <h4 className="text-lg font-bold text-neutral-800 mb-2">
            {t('noCustomSections')}
          </h4>
          <p className="text-sm text-neutral-500 mb-6 max-w-md mx-auto">
            {t('noCustomSectionsHint')}
          </p>
          <button
            onClick={addCustomSection}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] font-medium"
          >
            <Plus size={20} />
            {t('createFirstSection')}
          </button>
        </div>
      )}

      {/* Custom Sections List */}
      <div className="space-y-6">
        {data.customSections.map((customSection) => {
          // ✅ CRITICAL: Use snapshot during drag, actual data otherwise
          const blocks = isDragging && dragSnapshotRef.current[customSection.id]
            ? dragSnapshotRef.current[customSection.id]
            : (customSection.blocks || []);
          
          return (
            <div
              key={customSection.id}
              className="bg-gradient-to-br p-6 space-y-5 transition-all duration-200"
            >
              {/* Section Header Controls */}
              <div className="flex items-start gap-3 pb-4 ">
                <div className="flex-1 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                      {t('sectionTitle')} *
                    </label>
                    <input
                      type="text"
                      value={customSection.title}
                      onChange={(e) => updateCustomSectionTitle(customSection.id, e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 hover:border-blue-300 bg-white font-bold text-lg"
                      placeholder={t('sectionPlaceholder') || "e.g., Projects, Awards, Publications"}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                      {t('subtitle')}
                    </label>
                    <input
                      type="text"
                      value={customSection.subtitle}
                      onChange={(e) => updateCustomSectionSubtitle(customSection.id, e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 hover:border-blue-300 bg-white"
                      placeholder={t('subtitlePlaceholder') || "Optional subtitle or description"}
                    />
                  </div>
                </div>
                
                <button
                  onClick={() => removeCustomSection(customSection.id)}
                  className="px-3 py-2 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all duration-200 mt-7"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Content Blocks */}
              <div className="space-y-4">
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

                <DndContext
                  sensors={localSensors}
                  collisionDetection={closestCenter}
                  onDragStart={() => handleDragStart(customSection.id)}
                  onDragEnd={(event) => handleBlockDragEnd(event, customSection.id)}
                >
                  <SortableContext
                    items={blocks.map(b => b.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {blocks.length > 0 ? (
                      <div className="space-y-3 pl-2">
                        {blocks.map((block) => (
                          <SortableItem key={block.id} id={block.id} isDraggingGlobal={false}>
                            <div className="flex gap-2">
                              <textarea
                                value={block.content}
                                onChange={(e) => updateCustomSectionBlock(customSection.id, block.id, e.target.value)}
                                rows={3}
                                className="flex-1 px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white resize-none"
                                placeholder={t('blockPlaceholder') || "Add content for this block..."}
                              />
                              <button
                                onClick={() => removeCustomSectionBlock(customSection.id, block.id)}
                                className="px-2 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all duration-200"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </SortableItem>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-neutral-400 text-center py-4">
                        {t('noBlocksYet') || 'No content blocks yet. Click "Add Block" to get started.'}
                      </p>
                    )}
                  </SortableContext>
                </DndContext>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomSectionsManager;