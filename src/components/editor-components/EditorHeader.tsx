import React from 'react';
import { Edit, Eye, Save, RotateCcw } from 'lucide-react';

interface EditorHeaderProps {
  t: (key: string) => string;
  isPreviewMode: boolean;
  onTogglePreview: () => void;
  onSave: () => void;
  onReset: () => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  t,
  isPreviewMode,
  onTogglePreview,
  onSave,
  onReset,
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl border-b border-neutral-200/60 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
              <Edit size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">
                {t('editor')}
              </h2>
              <p className="text-sm text-neutral-500 font-medium">Complete your professional CV</p>
            </div>
          </div>

          <div className="flex gap-2.5">
            <button
              onClick={onTogglePreview}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] font-medium text-sm"
            >
              {isPreviewMode ? <Edit size={18} /> : <Eye size={18} />}
              {isPreviewMode ? t('edit') : t('preview')}
            </button>
            
            <button
              onClick={onSave}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] font-medium text-sm"
            >
              <Save size={18} />
              {t('save')}
            </button>
            
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] font-medium text-sm"
            >
              <RotateCcw size={18} />
              {t('reset')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorHeader;