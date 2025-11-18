import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface MissionSortableItemProps {
  id: string;
  children: React.ReactNode;
}

const MissionSortableItem: React.FC<MissionSortableItemProps> = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useSortable({ 
    id,
    transition: {
      duration: 200,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    }
  });

  // ✅ FIX: Custom smooth transform without snap effect
  const style = {
    transform: CSS.Transform.toString(transform),
    // ✅ NO transition property here - prevents snap effect
    // The transform will be smooth because of the transition config in useSortable
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative ${isDragging ? 'z-50' : ''}`}
    >
      {/* Drag Handle - Smaller for missions */}
      <div 
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 cursor-grab active:cursor-grabbing transition-opacity duration-150 ${
          isDragging ? 'opacity-50' : 'opacity-100 hover:opacity-100'
        }`}
        {...attributes} 
        {...listeners}
      >
        <div className={`p-1.5 rounded-lg ${isDragging ? 'bg-blue-100' : 'hover:bg-gray-100'}`}>
          <GripVertical size={16} className="text-gray-400" />
        </div>
      </div>
      
      {/* Content with subtle highlight when dragging */}
      <div className={`transition-all duration-150 ${
        isDragging ? 'opacity-50 scale-[1.02]' : 'opacity-100'
      }`}>
        {children}
      </div>
    </div>
  );
};

export default MissionSortableItem;