// Modern CVEditor with Section Progress Indicators
import { Save, RotateCcw, Eye, Edit, Plus, Trash2, CheckCircle2, Circle } from "lucide-react";
import type { CVData, TechnologyCategory, Experience } from "../types/cv";
import PrintableCVContent from "./PrintableCVContent";
import { useState, useEffect } from 'react';
import { createCustomSection } from '../utils/cvHelpers';
import { useLanguage } from '../contexts/LanguageContext';

export interface CVEditorProps {
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
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(data.personalInfo.avatarUrl || null);
  const { t } = useLanguage();

  // Calculate section completion
  const getSectionCompletion = (sectionId: string): number => {
    switch (sectionId) {
      case 'personal':
        const personalFields = [data.personalInfo.fullName, data.personalInfo.professionalTitle];
        const personalFilled = personalFields.filter(f => f && f.trim()).length;
        return (personalFilled / personalFields.length) * 100;
      
      case 'profile':
        return data.profile && data.profile.trim() ? 100 : 0;
      
      case 'contact':
        const contactFields = [data.contact.email, data.contact.phone, data.contact.location];
        const contactFilled = contactFields.filter(f => f && f.trim()).length;
        return (contactFilled / contactFields.length) * 100;
      
      case 'skills':
        return data.skills.length > 0 && data.skills.some(s => s.trim()) ? 100 : 0;
      
      case 'technologies':
        return data.technologies.length > 0 ? 100 : 0;
      
      case 'experiences':
        return data.experiences.length > 0 ? 100 : 0;
      
      case 'languages':
        return data.languages.length > 0 ? 100 : 0;
      
      case 'certifications':
        return data.certifications.length > 0 ? 100 : 0;
      
      default:
        const customSection = data.customSections?.find(s => s.id === sectionId);
        return customSection && customSection.blocks.some(b => b.trim()) ? 100 : 0;
    }
  };

  // Calculate overall progress
  const getOverallProgress = (): number => {
    const sections = ['personal', 'profile', 'contact', 'skills', 'technologies', 'experiences'];
    const completions = sections.map(s => getSectionCompletion(s));
    return completions.reduce((a, b) => a + b, 0) / sections.length;
  };

  useEffect(() => {
    setImagePreviewUrl(data.personalInfo.avatarUrl || null);
  }, [data.personalInfo.avatarUrl]);

  // Update helpers (keeping existing logic)
  const updateField = (path: string[], value: string) => {
    const newData = { ...data };
    let current: any = newData;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    onUpdate(newData);
  };

  const updateArrayField = (section: keyof CVData, index: number, field: string, value: string) => {
    const newData = { ...data };
    const array = newData[section] as any[];
    if (array && array[index] && typeof array[index] === 'object') {
      array[index] = { ...array[index], [field]: value };
    } else if (section === 'skills' && typeof array[index] === 'string') {
      array[index] = value;
    }
    onUpdate(newData);
  };

  // Item management (keeping existing logic)
  const addExperience = () => {
    const newExp: Experience = { id: Date.now().toString(), jobTitle: "", company: "", missions: [""] };
    onUpdate({ ...data, experiences: [...data.experiences, newExp] });
  };

  const removeExperience = (index: number) => {
    onUpdate({ ...data, experiences: data.experiences.filter((_, i) => i !== index) });
  };

  const addMission = (expIndex: number) => {
    const newData = { ...data };
    newData.experiences[expIndex].missions.push("");
    onUpdate(newData);
  };

  const removeMission = (expIndex: number, missionIndex: number) => {
    const newData = { ...data };
    newData.experiences[expIndex].missions = newData.experiences[expIndex].missions.filter((_, i) => i !== missionIndex);
    onUpdate(newData);
  };

  const updateMission = (expIndex: number, missionIndex: number, value: string) => {
    const newData = { ...data };
    newData.experiences[expIndex].missions[missionIndex] = value;
    onUpdate(newData);
  };

  const addLanguage = () => {
    onUpdate({ ...data, languages: [...data.languages, { name: "", flag: "", level: "" }] });
  };

  const removeLanguage = (index: number) => {
    onUpdate({ ...data, languages: data.languages.filter((_, i) => i !== index) });
  };

  const addCertification = () => {
    onUpdate({ ...data, certifications: [...data.certifications, { name: "", issuer: "" }] });
  };

  const removeCertification = (index: number) => {
    onUpdate({ ...data, certifications: data.certifications.filter((_, i) => i !== index) });
  };

  const addSkill = () => {
    onUpdate({ ...data, skills: [...data.skills, ""] });
  };

  const removeSkill = (index: number) => {
    onUpdate({ ...data, skills: data.skills.filter((_, i) => i !== index) });
  };

  const updateSkill = (index: number, value: string) => {
    const newData = { ...data };
    newData.skills[index] = value;
    onUpdate(newData);
  };

  const addTechnologyCategory = () => {
    const newCategory: TechnologyCategory = { id: Date.now().toString(), title: "", items: "" };
    onUpdate({ ...data, technologies: [...data.technologies, newCategory] });
  };

  const removeTechnologyCategory = (index: number) => {
    onUpdate({ ...data, technologies: data.technologies.filter((_, i) => i !== index) });
  };

  const updateTechnologyTitle = (index: number, title: string) => {
    const newData = { ...data };
    newData.technologies[index].title = title;
    onUpdate(newData);
  };

  const updateTechnologyItems = (index: number, items: string) => {
    const newData = { ...data };
    newData.technologies[index].items = items;
    onUpdate(newData);
  };

  const addCustomSection = () => {
    const newSection = createCustomSection(t('customSection'), "");
    const newData = { ...data };
    newData.customSections.push(newSection);
    newData.sectionOrder.push(newSection.id);
    onUpdate(newData);
    setActiveSection(newSection.id);
  };

  const removeCustomSection = (id: string) => {
    const newData = { ...data };
    newData.customSections = newData.customSections.filter(s => s.id !== id);
    newData.sectionOrder = newData.sectionOrder.filter(sid => sid !== id);
    onUpdate(newData);
    if (activeSection === id) {
      setActiveSection("personal");
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

  const addCustomSectionBlock = (id: string) => {
    const newData = { ...data };
    const section = newData.customSections.find(s => s.id === id);
    if (section) section.blocks.push("");
    onUpdate(newData);
  };

  const removeCustomSectionBlock = (id: string, blockIndex: number) => {
    const newData = { ...data };
    const section = newData.customSections.find(s => s.id === id);
    if (section) section.blocks = section.blocks.filter((_, i) => i !== blockIndex);
    onUpdate(newData);
  };

  const updateCustomSectionBlock = (id: string, blockIndex: number, value: string) => {
    const newData = { ...data };
    const section = newData.customSections.find(s => s.id === id);
    if (section) section.blocks[blockIndex] = value;
    onUpdate(newData);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const maxSizeInBytes = 5 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        alert(t('maxFileSize'));
        event.target.value = "";
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAvatarUrl = reader.result as string;
        updateField(["personalInfo", "avatarUrl"], newAvatarUrl);
        setImagePreviewUrl(newAvatarUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    updateField(["personalInfo", "avatarUrl"], "");
    setImagePreviewUrl(null);
    const fileInput = document.getElementById('avatarInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const sections = [
    { id: "personal", label: t('personalInfo'), icon: "👤" },
    { id: "profile", label: t('profile'), icon: "📝" },
    { id: "contact", label: t('contact'), icon: "📧" },
    { id: "skills", label: t('skills'), icon: "⚡" },
    { id: "technologies", label: t('technologies'), icon: "💻" },
    { id: "experiences", label: t('experiences'), icon: "💼" },
    { id: "languages", label: t('languages'), icon: "🌐" },
    { id: "certifications", label: t('certifications'), icon: "🏆" },
    ...data.customSections.map(section => ({
      id: section.id,
      label: section.title || t('customSection'),
      icon: "📑"
    }))
  ];

  const overallProgress = getOverallProgress();

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-neutral-50 to-blue-50/30">
      {/* MODERN HEADER */}
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
                onClick={onReset}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200 hover:border-red-200 text-neutral-700 hover:text-red-600 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] font-medium text-sm"
              >
                <RotateCcw size={18} />
                {t('reset')}
              </button>

              <button
                onClick={onSave}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] font-semibold text-sm"
              >
                <Save size={18} />
                {t('save')}
              </button>
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-neutral-200 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-neutral-700 min-w-[50px] text-right">
              {Math.round(overallProgress)}%
            </span>
          </div>
        </div>
      </div>

      {/* MAIN SPLIT VIEW */}
      <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
        {/* LEFT SIDE — EDITOR */}
        <div className="w-full lg:w-2/4 overflow-y-auto bg-white border-r border-neutral-200">
          <div className="p-6 max-w-[700px] mx-auto">
            {/* Modern Section Navigation */}
            <nav className="mb-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {sections.map((section) => {
                  const completion = getSectionCompletion(section.id);
                  const isActive = activeSection === section.id;
                  const isComplete = completion === 100;

                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`relative group flex flex-col items-center gap-2 px-4 py-3.5 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] ${
                        isActive
                          ? 'bg-gradient-to-br from-blue-500 to-cyan-500 border-transparent text-white shadow-lg'
                          : 'bg-white border-neutral-200 hover:border-neutral-300 text-neutral-700 shadow-sm hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{section.icon}</span>
                        {isComplete && !isActive && (
                          <CheckCircle2 size={14} className="text-green-500" />
                        )}
                        {!isComplete && !isActive && completion > 0 && (
                          <Circle size={14} className="text-neutral-400" />
                        )}
                      </div>
                      <span className="text-xs font-semibold text-center leading-tight">{section.label}</span>
                      
                      {/* Mini Progress Bar */}
                      {completion > 0 && completion < 100 && !isActive && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-200 rounded-b-lg overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
                            style={{ width: `${completion}%` }}
                          />
                        </div>
                      )}
                    </button>
                  );
                })}
                
                <button
                  onClick={addCustomSection}
                  className="flex flex-col items-center gap-2 px-4 py-3.5 rounded-xl border-2 border-dashed border-neutral-300 hover:border-blue-500 bg-white hover:bg-blue-50 text-neutral-600 hover:text-blue-600 transition-all duration-200 hover:scale-[1.02] shadow-sm"
                >
                  <Plus size={20} />
                  <span className="text-xs font-semibold text-center leading-tight">{t('addCustomSection')}</span>
                </button>
              </div>
            </nav>

            {/* SECTION CONTENT - keeping existing content structure but with modern input styles */}
            <div className="space-y-6">
              {/* Personal Section */}
              {activeSection === "personal" && (
                <div className="space-y-5">
                  <div className="flex items-center gap-3 pb-4 border-b-2 border-neutral-200">
                    <div className="p-2.5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
                      <span className="text-2xl">👤</span>
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900">{t('personalInfo')}</h3>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      {t('fullName')}
                    </label>
                    <input
                      type="text"
                      value={data.personalInfo.fullName}
                      onChange={(e) => updateField(["personalInfo", "fullName"], e.target.value)}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      {t('professionalTitle')}
                    </label>
                    <input
                      type="text"
                      value={data.personalInfo.professionalTitle}
                      onChange={(e) => updateField(["personalInfo", "professionalTitle"], e.target.value)}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white"
                      placeholder="Senior Software Engineer"
                    />
                  </div>

                  {/* Image Upload - Modern Card Style */}
                  <div className="mt-6 bg-gradient-to-br from-neutral-50 to-blue-50/50 border-2 border-dashed border-neutral-300 rounded-2xl p-6">
                    {!imagePreviewUrl && (
                      <button
                        onClick={() => document.getElementById('avatarInput')?.click()}
                        className="flex flex-col items-center justify-center w-full gap-3 py-6 bg-white rounded-xl border-2 border-dashed border-neutral-300 hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-200 group"
                      >
                        <div className="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl group-hover:scale-110 transition-transform duration-200">
                          <span className="text-3xl">📸</span>
                        </div>
                        <span className="text-sm font-semibold text-neutral-700 group-hover:text-blue-600">
                          {t('uploadImage')}
                        </span>
                      </button>
                    )}

                    <div className="flex justify-between items-center">
                      {imagePreviewUrl && (
                        <div className="flex items-center gap-4">
                          <div className="relative w-28 h-28 rounded-2xl border-4 border-white shadow-lg overflow-hidden ring-2 ring-neutral-200">
                            <img
                              src={imagePreviewUrl}
                              alt="Profile preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={handleRemoveImage}
                              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg transition-all duration-200 hover:scale-110"
                              aria-label={t('removeImage')}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      )}
                      <div className="flex-1 ml-4">
                        <input
                          id="avatarInput"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className={`${!imagePreviewUrl ? 'hidden' : 'block w-full text-sm text-neutral-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer'}`}
                        />
                        {imagePreviewUrl && (
                          <p className="text-xs text-neutral-500 mt-2">{t('maxFileSize')}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Profile Section */}
              {activeSection === "profile" && (
                <div className="space-y-5">
                  <div className="flex items-center gap-3 pb-4 border-b-2 border-neutral-200">
                    <div className="p-2.5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
                      <span className="text-2xl">📝</span>
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900">{t('profile')}</h3>
                  </div>

                  <textarea
                    value={data.profile}
                    onChange={(e) => updateField(["profile"], e.target.value)}
                    rows={10}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white resize-none"
                    placeholder="Write a compelling professional summary..."
                  />
                </div>
              )}

              {/* Contact Section */}
              {activeSection === "contact" && (
                <div className="space-y-5">
                  <div className="flex items-center gap-3 pb-4 border-b-2 border-neutral-200">
                    <div className="p-2.5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
                      <span className="text-2xl">📧</span>
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900">{t('contact')}</h3>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">{t('email')}</label>
                    <input
                      type="email"
                      value={data.contact.email}
                      onChange={(e) => updateField(["contact", "email"], e.target.value)}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white"
                      placeholder="john.doe@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">{t('phone')}</label>
                    <input
                      type="tel"
                      value={data.contact.phone}
                      onChange={(e) => updateField(["contact", "phone"], e.target.value)}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">{t('location')}</label>
                    <input
                      type="text"
                      value={data.contact.location}
                      onChange={(e) => updateField(["contact", "location"], e.target.value)}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white"
                      placeholder="San Francisco, CA"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">{t('github')}</label>
                    <input
                      type="text"
                      value={data.contact.github || ''}
                      onChange={(e) => updateField(["contact", "github"], e.target.value)}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white"
                      placeholder="github.com/johndoe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">{t('linkedin')}</label>
                    <input
                      type="text"
                      value={data.contact.linkedin || ''}
                      onChange={(e) => updateField(["contact", "linkedin"], e.target.value)}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white"
                      placeholder="linkedin.com/in/johndoe"
                    />
                  </div>
                </div>
              )}

              {/* Skills Section */}
              {activeSection === "skills" && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-4 border-b-2 border-neutral-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
                        <span className="text-2xl">⚡</span>
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900">{t('skills')}</h3>
                    </div>
                    <button
                      onClick={addSkill}
                      className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] font-medium text-sm"
                    >
                      <Plus size={18} />
                      {t('addSkill')}
                    </button>
                  </div>

                  <div className="space-y-3">
                    {data.skills.map((skill, index) => (
                      <div key={index} className="flex gap-2.5 group">
                        <textarea
                          value={skill}
                          onChange={(e) => updateSkill(index, e.target.value)}
                          rows={2}
                          className="flex-1 px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white resize-none"
                          placeholder={t('skillPlaceholder')}
                        />
                        <button
                          onClick={() => removeSkill(index)}
                          className="px-3 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all duration-200 opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies Section */}
              {activeSection === "technologies" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b-2 border-neutral-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
                        <span className="text-2xl">💻</span>
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900">{t('technologies')}</h3>
                    </div>
                    <button
                      onClick={addTechnologyCategory}
                      className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] font-medium text-sm"
                    >
                      <Plus size={18} />
                      {t('addTechCategory')}
                    </button>
                  </div>

                  {data.technologies.map((techCategory, index) => (
                    <div key={index} className="bg-gradient-to-br from-white to-neutral-50 border-2 border-neutral-200 rounded-2xl p-5 space-y-4 shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="flex justify-between items-center gap-3">
                        <input
                          type="text"
                          value={techCategory.title}
                          onChange={(e) => updateTechnologyTitle(index, e.target.value)}
                          className="flex-1 text-lg font-bold text-neutral-900 px-4 py-2.5 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                          placeholder={t('categoryTitle')}
                        />
                        <button
                          onClick={() => removeTechnologyCategory(index)}
                          className="px-3 py-2.5 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all duration-200"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <textarea
                        value={techCategory.items}
                        onChange={(e) => updateTechnologyItems(index, e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white resize-none"
                        placeholder={t('techPlaceholder')}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Experiences Section */}
              {activeSection === "experiences" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b-2 border-neutral-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
                        <span className="text-2xl">💼</span>
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

                  {data.experiences.map((exp, expIndex) => (
                    <div key={exp.id} className="bg-gradient-to-br from-white to-neutral-50 border-2 border-neutral-200 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="flex justify-between items-start">
                        <h4 className="text-lg font-bold text-neutral-900">
                          {t('experience')} {expIndex + 1}
                        </h4>
                        <button
                          onClick={() => removeExperience(expIndex)}
                          className="px-3 py-2 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all duration-200 text-sm font-medium"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">{t('jobTitle')}</label>
                        <input
                          type="text"
                          value={exp.jobTitle}
                          onChange={(e) => updateArrayField("experiences", expIndex, "jobTitle", e.target.value)}
                          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">{t('company')}</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateArrayField("experiences", expIndex, "company", e.target.value)}
                          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <label className="text-sm font-semibold text-neutral-700">{t('missions')}</label>
                          <button
                            onClick={() => addMission(expIndex)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 hover:bg-green-500 text-green-600 hover:text-white rounded-lg text-xs font-semibold transition-all duration-200"
                          >
                            <Plus size={14} />
                            {t('addMission')}
                          </button>
                        </div>

                        <div className="space-y-2.5">
                          {exp.missions.map((mission, missionIndex) => (
                            <div key={missionIndex} className="flex gap-2.5 group">
                              <textarea
                                value={mission}
                                onChange={(e) => updateMission(expIndex, missionIndex, e.target.value)}
                                rows={2}
                                className="flex-1 px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white resize-none text-sm"
                                placeholder={t('missionPlaceholder')}
                              />
                              <button
                                onClick={() => removeMission(expIndex, missionIndex)}
                                className="px-2 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all duration-200 opacity-0 group-hover:opacity-100"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Languages Section */}
              {activeSection === "languages" && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-4 border-b-2 border-neutral-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
                        <span className="text-2xl">🌐</span>
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900">{t('languages')}</h3>
                    </div>
                    <button
                      onClick={addLanguage}
                      className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] font-medium text-sm"
                    >
                      <Plus size={18} />
                      {t('addLanguage')}
                    </button>
                  </div>

                  {data.languages.map((lang, index) => (
                    <div key={index} className="bg-gradient-to-br from-white to-neutral-50 border-2 border-neutral-200 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-bold text-neutral-900">
                          {t('language')} {index + 1}
                        </h4>
                        <button
                          onClick={() => removeLanguage(index)}
                          className="px-2 py-1.5 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all duration-200 text-xs"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">{t('name')}</label>
                          <input
                            type="text"
                            value={lang.name}
                            onChange={(e) => updateArrayField("languages", index, "name", e.target.value)}
                            className="w-full px-3 py-2.5 border-2 border-neutral-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">{t('flag')}</label>
                          <input
                            type="text"
                            value={lang.flag}
                            onChange={(e) => updateArrayField("languages", index, "flag", e.target.value)}
                            className="w-full px-3 py-2.5 border-2 border-neutral-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-sm"
                            placeholder="🇫🇷"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">{t('level')}</label>
                          <input
                            type="text"
                            value={lang.level}
                            onChange={(e) => updateArrayField("languages", index, "level", e.target.value)}
                            className="w-full px-3 py-2.5 border-2 border-neutral-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Certifications Section */}
              {activeSection === "certifications" && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-4 border-b-2 border-neutral-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
                        <span className="text-2xl">🏆</span>
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900">{t('certifications')}</h3>
                    </div>
                    <button
                      onClick={addCertification}
                      className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] font-medium text-sm"
                    >
                      <Plus size={18} />
                      {t('addCertification')}
                    </button>
                  </div>

                  {data.certifications.map((cert, index) => (
                    <div key={index} className="bg-gradient-to-br from-white to-neutral-50 border-2 border-neutral-200 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-bold text-neutral-900">
                          {t('certification')} {index + 1}
                        </h4>
                        <button
                          onClick={() => removeCertification(index)}
                          className="px-2 py-1.5 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all duration-200 text-xs"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1.5">{t('name')}</label>
                        <input
                          type="text"
                          value={cert.name}
                          onChange={(e) => updateArrayField("certifications", index, "name", e.target.value)}
                          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1.5">{t('issuer')}</label>
                        <input
                          type="text"
                          value={cert.issuer}
                          onChange={(e) => updateArrayField("certifications", index, "issuer", e.target.value)}
                          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Custom Sections */}
              {data.customSections.map((customSection) =>
                activeSection === customSection.id && (
                  <div key={customSection.id} className="space-y-5">
                    <div className="flex items-center justify-between pb-4 border-b-2 border-neutral-200">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
                          <span className="text-2xl">📑</span>
                        </div>
                        <h3 className="text-2xl font-bold text-neutral-900">{t('customSection')}</h3>
                      </div>
                      <button
                        onClick={() => removeCustomSection(customSection.id)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white rounded-xl transition-all duration-200 font-medium text-sm"
                      >
                        <Trash2 size={18} />
                        {t('removeSection')}
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">{t('sectionTitle')}</label>
                      <input
                        type="text"
                        value={customSection.title}
                        onChange={(e) => updateCustomSectionTitle(customSection.id, e.target.value)}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white"
                        placeholder={t('sectionPlaceholder')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">{t('subtitle')}</label>
                      <input
                        type="text"
                        value={customSection.subtitle || ""}
                        onChange={(e) => updateCustomSectionSubtitle(customSection.id, e.target.value)}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white"
                        placeholder={t('subtitlePlaceholder')}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-semibold text-neutral-700">{t('content')}</label>
                        <button
                          onClick={() => addCustomSectionBlock(customSection.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 hover:bg-green-500 text-green-600 hover:text-white rounded-lg text-xs font-semibold transition-all duration-200"
                        >
                          <Plus size={14} />
                          {t('addBlock')}
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        {customSection.blocks.map((block, blockIndex) => (
                          <div key={blockIndex} className="flex gap-2.5 group">
                            <textarea
                              value={block}
                              onChange={(e) => updateCustomSectionBlock(customSection.id, blockIndex, e.target.value)}
                              rows={3}
                              className="flex-1 px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white resize-none text-sm"
                              placeholder={t('blockPlaceholder')}
                            />
                            <button
                              onClick={() => removeCustomSectionBlock(customSection.id, blockIndex)}
                              className="px-2 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all duration-200 opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — LIVE PREVIEW */}
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