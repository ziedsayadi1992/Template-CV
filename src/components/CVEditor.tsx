import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CVData, ContactField } from '../types';
import EditorHeader from './editor-components/EditorHeader';
import SidebarNavigation from './editor-components/SidebarNavigation';
import PersonalSection from './editor-components/PersonalSection';
import ContactSection from './editor-components/ContactSection';
import ProfileSection from './editor-components/ProfileSection';
import SkillsSection from './editor-components/SkillsSection';
import TechnologiesSection from './editor-components/TechnologiesSection';
import ExperiencesSection from './editor-components/ExperiencesSection';
import CertificationsSection from './editor-components/CertificationsSection';
import LanguagesSection from './editor-components/LanguagesSection';
import CustomSectionsManager from './editor-components/CustomSectionsManager';
import PrintableCVContent from './PrintableCVContent';
import { useDragDrop } from '../hooks/useDragDrop';
import { useSectionCompletion } from '../hooks/useSectionCompletion';

interface CVEditorProps {
  data: CVData;
  onUpdate: (data: CVData) => void;
  onSave: () => void;
  onReset: () => void;
  onTogglePreview: () => void;
  isPreviewMode: boolean;
}

const CVEditor: React.FC<CVEditorProps> = ({
  data,
  onUpdate,
  onSave,
  onReset,
  onTogglePreview,
  isPreviewMode,
}) => {
  const [activeSection, setActiveSection] = useState<string>("personal");
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(
    data.personalInfo.avatarUrl || null
  );
  const [expandedExperiences, setExpandedExperiences] = useState<Set<string>>(
    new Set(data.experiences.map(exp => exp.id))
  );
  
  const { t } = useLanguage();
  const { sensors, handleDragStart, handleDragEnd } = useDragDrop();
  const { getSectionCompletion, getOverallProgress } = useSectionCompletion(data);

  // Memoize contact fields
  const contactFields = useMemo<ContactField[]>(() => {
    return data.contact.fields || [];
  }, [data.contact.fields]);

  const toggleExperience = (id: string) => {
    setExpandedExperiences(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // ✅ Get custom section labels or use translations as fallback
  const getLabel = (key: keyof NonNullable<typeof data.sectionLabels>) => {
    return data.sectionLabels?.[key] || t(key);
  };

  const navigationSections = [
    { id: "personal", icon: "👤", label: getLabel('personal'), completion: getSectionCompletion("personal") },
    { id: "contact", icon: "📧", label: getLabel('contact'), completion: getSectionCompletion("contact") },
    { id: "profile", icon: "📝", label: getLabel('profile'), completion: getSectionCompletion("profile") },
    { id: "skills", icon: "💡", label: getLabel('skills'), completion: getSectionCompletion("skills") },
    { id: "technologies", icon: "🔧", label: getLabel('technologies'), completion: getSectionCompletion("technologies") },
    { id: "experiences", icon: "💼", label: getLabel('experiences'), completion: getSectionCompletion("experiences") },
    { id: "certifications", icon: "🏆", label: getLabel('certifications'), completion: getSectionCompletion("certifications") },
    { id: "languages", icon: "🌍", label: getLabel('languages'), completion: getSectionCompletion("languages") },
    { id: "custom", icon: "✨", label: getLabel('customSections'), completion: getSectionCompletion("custom") }
  ];

  const overallProgress = getOverallProgress();

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-neutral-50 to-blue-50/30">
      <EditorHeader
        t={t}
        isPreviewMode={isPreviewMode}
        onTogglePreview={onTogglePreview}
        onSave={onSave}
        onReset={onReset}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <SidebarNavigation
          sections={navigationSections}
          activeSection={activeSection}
          overallProgress={overallProgress}
          onSectionChange={setActiveSection}
          t={t}
        />

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            {activeSection === "personal" && (
              <PersonalSection
                data={data}
                onUpdate={onUpdate}
                imagePreviewUrl={imagePreviewUrl}
                setImagePreviewUrl={setImagePreviewUrl}
                t={t}
              />
            )}

            {activeSection === "contact" && (
              <ContactSection
                data={data}
                contactFields={contactFields}
                onUpdate={onUpdate}
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={(e) => handleDragEnd(e, data, onUpdate, 'contact')}
                t={t}
              />
            )}

            {activeSection === "profile" && (
              <ProfileSection
                data={data}
                onUpdate={onUpdate}
                t={t}
              />
            )}

            {activeSection === "skills" && (
              <SkillsSection
                data={data}
                onUpdate={onUpdate}
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={(e) => handleDragEnd(e, data, onUpdate, 'skills')}
                t={t}
              />
            )}

            {activeSection === "technologies" && (
              <TechnologiesSection
                data={data}
                onUpdate={onUpdate}
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={(e) => handleDragEnd(e, data, onUpdate, 'technologies')}
                t={t}
              />
            )}

            {activeSection === "experiences" && (
              <ExperiencesSection
                data={data}
                expandedExperiences={expandedExperiences}
                onUpdate={onUpdate}
                toggleExperience={toggleExperience}
                onDragEnd={(e) => handleDragEnd(e, data, onUpdate, 'experiences')}
                sensors={sensors}
                onDragStart={handleDragStart}
                t={t}
              />
            )}

            {activeSection === "certifications" && (
              <CertificationsSection
                data={data}
                onUpdate={onUpdate}
                t={t}
              />
            )}

            {activeSection === "languages" && (
              <LanguagesSection
                data={data}
                onUpdate={onUpdate}
                t={t}
              />
            )}

            {activeSection === "custom" && (
              <CustomSectionsManager
                data={data}
                onUpdate={onUpdate}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                sensors={sensors}
                onDragEnd={(e:any) => handleDragEnd(e, data, onUpdate, 'customSection')}
                t={t}
              />
            )}
          </div>
        </div>

        {/* Live Preview */}
        <div className="w-full lg:w-2/4 overflow-y-auto bg-gradient-to-br from-neutral-50 to-blue-50/30 p-6">
          <div className="max-w-[850px] mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
              <PrintableCVContent data={data} activeSection={activeSection} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVEditor;