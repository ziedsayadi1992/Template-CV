import React from 'react';
import { Check } from 'lucide-react';

interface NavigationSection {
  id: string;
  icon: string;
  label: string;
  completion: number;
}

interface SidebarNavigationProps {
  sections: NavigationSection[];
  activeSection: string;
  overallProgress: number;
  onSectionChange: (sectionId: string) => void;
  t: (key: string) => string;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  sections,
  activeSection,
  overallProgress,
  onSectionChange,
  t
}) => {
  return (
    <div className="w-72 bg-white/90 backdrop-blur-sm border-r border-neutral-200/60 overflow-y-auto">
      <div className="p-6">
        {/* Overall Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-neutral-700">{t('overallProgress')}</span>
            <span className="text-sm font-bold text-blue-600">{Math.round(overallProgress)}%</span>
          </div>
          <div className="w-full h-3 bg-neutral-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-[1.02]'
                  : 'hover:bg-neutral-100 text-neutral-700'
              }`}
            >
              <span className="text-2xl">{section.icon}</span>
              <div className="flex-1 text-left">
                <span className="font-medium text-sm">{section.label}</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 rounded-full ${
                        activeSection === section.id ? 'bg-white' : 'bg-blue-500'
                      }`}
                      style={{ width: `${section.completion}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold opacity-75">
                    {Math.round(section.completion)}%
                  </span>
                </div>
              </div>
              {section.completion === 100 && (
                <div className={`p-1 rounded-full ${
                  activeSection === section.id ? 'bg-white/20' : 'bg-green-100'
                }`}>
                  <Check size={14} className={activeSection === section.id ? 'text-white' : 'text-green-600'} />
                </div>
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SidebarNavigation;