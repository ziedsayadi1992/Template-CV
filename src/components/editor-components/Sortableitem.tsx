import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
  isDraggingGlobal: boolean;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, children, isDraggingGlobal }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative ${isDragging ? 'z-50 opacity-60' : ''}`}
    >
      <div 
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-10 cursor-grab active:cursor-grabbing transition-all duration-200 ${
          isDragging ? 'scale-125 text-blue-600' : 'hover:scale-110 hover:text-blue-500'
        }`}
        {...attributes} 
        {...listeners}
      >
        <div className={`p-2 rounded-lg ${isDragging ? 'bg-blue-100' : 'hover:bg-gray-100'}`}>
          <GripVertical size={20} className="text-gray-400" />
        </div>
      </div>
      <div className={isDragging ? 'bg-blue-50 border-2 border-blue-400 rounded-xl' : ''}>
        {children}
      </div>
    </div>
  );
};

export default SortableItem;