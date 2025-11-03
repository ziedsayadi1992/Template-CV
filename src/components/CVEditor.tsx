import React, { useState } from 'react';
import { Save, RotateCcw, Eye, Edit, Plus, Trash2 } from 'lucide-react';
import type { CVData, Experience, Language, Certification } from '../types/cv';

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
  isPreviewMode
}) => {
  const [activeSection, setActiveSection] = useState<string>('personal');

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
    array[index] = { ...array[index], [field]: value };
    onUpdate(newData);
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      missions: ['']
    };
    onUpdate({ ...data, experiences: [...data.experiences, newExp] });
  };

  const removeExperience = (index: number) => {
    const newExperiences = data.experiences.filter((_, i) => i !== index);
    onUpdate({ ...data, experiences: newExperiences });
  };

  const addMission = (expIndex: number) => {
    const newData = { ...data };
    newData.experiences[expIndex].missions.push('');
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
    const newLang: Language = { name: '', flag: '', level: '' };
    onUpdate({ ...data, languages: [...data.languages, newLang] });
  };

  const removeLanguage = (index: number) => {
    const newLanguages = data.languages.filter((_, i) => i !== index);
    onUpdate({ ...data, languages: newLanguages });
  };

  const addCertification = () => {
    const newCert: Certification = { name: '', issuer: '' };
    onUpdate({ ...data, certifications: [...data.certifications, newCert] });
  };

  const removeCertification = (index: number) => {
    const newCertifications = data.certifications.filter((_, i) => i !== index);
    onUpdate({ ...data, certifications: newCertifications });
  };

  const addSkill = () => {
    onUpdate({ ...data, skills: [...data.skills, ''] });
  };

  const removeSkill = (index: number) => {
    const newSkills = data.skills.filter((_, i) => i !== index);
    onUpdate({ ...data, skills: newSkills });
  };

  const updateSkill = (index: number, value: string) => {
    const newData = { ...data };
    newData.skills[index] = value;
    onUpdate(newData);
  };

  const addTechnology = () => {
    onUpdate({ ...data, technologies: [...data.technologies, ''] });
  };

  const removeTechnology = (index: number) => {
    const newTechnologies = data.technologies.filter((_, i) => i !== index);
    onUpdate({ ...data, technologies: newTechnologies });
  };

  const updateTechnology = (index: number, value: string) => {
    const newData = { ...data };
    newData.technologies[index] = value;
    onUpdate(newData);
  };

  const sections = [
    { id: 'personal', label: 'Informations Personnelles', icon: '👤' },
    { id: 'profile', label: 'Profil Professionnel', icon: '📝' },
    { id: 'contact', label: 'Contact', icon: '📧' },
    { id: 'skills', label: 'Compétences', icon: '⚡' },
    { id: 'technologies', label: 'Technologies', icon: '💻' },
    { id: 'experiences', label: 'Expériences', icon: '💼' },
    { id: 'languages', label: 'Langues', icon: '🌐' },
    { id: 'certifications', label: 'Certifications', icon: '🏆' }
  ];

  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <Edit size={24} />
          <h2 className="text-xl font-bold">Éditeur de CV</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onTogglePreview}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            title={isPreviewMode ? "Mode Édition" : "Mode Aperçu"}
          >
            {isPreviewMode ? <Edit size={18} /> : <Eye size={18} />}
            {isPreviewMode ? 'Éditer' : 'Aperçu'}
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
            title="Réinitialiser"
          >
            <RotateCcw size={18} />
            Réinitialiser
          </button>
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            title="Sauvegarder"
          >
            <Save size={18} />
            Sauvegarder
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto">
          <nav className="p-4 space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-200 text-gray-700'
                }`}
              >
                <span className="text-xl">{section.icon}</span>
                <span className="font-medium">{section.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-3xl mx-auto space-y-6">
            {activeSection === 'personal' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Informations Personnelles</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom Complet</label>
                  <input
                    type="text"
                    value={data.personalInfo.fullName}
                    onChange={(e) => updateField(['personalInfo', 'fullName'], e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titre Professionnel</label>
                  <input
                    type="text"
                    value={data.personalInfo.professionalTitle}
                    onChange={(e) => updateField(['personalInfo', 'professionalTitle'], e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL de la Photo</label>
                  <input
                    type="text"
                    value={data.personalInfo.avatarUrl}
                    onChange={(e) => updateField(['personalInfo', 'avatarUrl'], e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {activeSection === 'profile' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Profil Professionnel</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={data.profile}
                    onChange={(e) => updateField(['profile'], e.target.value)}
                    rows={8}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {activeSection === 'contact' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={data.contact.email}
                    onChange={(e) => updateField(['contact', 'email'], e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  <input
                    type="tel"
                    value={data.contact.phone}
                    onChange={(e) => updateField(['contact', 'phone'], e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
                  <input
                    type="text"
                    value={data.contact.location}
                    onChange={(e) => updateField(['contact', 'location'], e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
                  <input
                    type="text"
                    value={data.contact.github}
                    onChange={(e) => updateField(['contact', 'github'], e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                  <input
                    type="text"
                    value={data.contact.linkedin}
                    onChange={(e) => updateField(['contact', 'linkedin'], e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {activeSection === 'skills' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Domaines de Compétences</h3>
                  <button
                    onClick={addSkill}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={18} />
                    Ajouter
                  </button>
                </div>

                {data.skills.map((skill, index) => (
                  <div key={index} className="flex gap-2">
                    <textarea
                      value={skill}
                      onChange={(e) => updateSkill(index, e.target.value)}
                      rows={2}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Compétence"
                    />
                    <button
                      onClick={() => removeSkill(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'technologies' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Environnements Techniques</h3>
                  <button
                    onClick={addTechnology}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={18} />
                    Ajouter
                  </button>
                </div>

                {data.technologies.map((tech, index) => (
                  <div key={index} className="flex gap-2">
                    <textarea
                      value={tech}
                      onChange={(e) => updateTechnology(index, e.target.value)}
                      rows={2}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Technologies"
                    />
                    <button
                      onClick={() => removeTechnology(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'experiences' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Expériences Professionnelles</h3>
                  <button
                    onClick={addExperience}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={18} />
                    Ajouter
                  </button>
                </div>

                {data.experiences.map((exp, expIndex) => (
                  <div key={exp.id} className="border border-gray-300 rounded-lg p-6 space-y-4 bg-gray-50">
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-bold text-gray-800">Expérience {expIndex + 1}</h4>
                      <button
                        onClick={() => removeExperience(expIndex)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Titre du Poste</label>
                      <input
                        type="text"
                        value={exp.jobTitle}
                        onChange={(e) => updateArrayField('experiences', expIndex, 'jobTitle', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Entreprise</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateArrayField('experiences', expIndex, 'company', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">Missions</label>
                        <button
                          onClick={() => addMission(expIndex)}
                          className="flex items-center gap-1 px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors"
                        >
                          <Plus size={14} />
                          Mission
                        </button>
                      </div>
                      <div className="space-y-2">
                        {exp.missions.map((mission, missionIndex) => (
                          <div key={missionIndex} className="flex gap-2">
                            <textarea
                              value={mission}
                              onChange={(e) => updateMission(expIndex, missionIndex, e.target.value)}
                              rows={2}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              placeholder="Mission ou Stack"
                            />
                            <button
                              onClick={() => removeMission(expIndex, missionIndex)}
                              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                              title="Supprimer"
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

            {activeSection === 'languages' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Langues</h3>
                  <button
                    onClick={addLanguage}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={18} />
                    Ajouter
                  </button>
                </div>

                {data.languages.map((lang, index) => (
                  <div key={index} className="border border-gray-300 rounded-lg p-4 space-y-3 bg-gray-50">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-gray-700">Langue {index + 1}</h4>
                      <button
                        onClick={() => removeLanguage(index)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Nom</label>
                        <input
                          type="text"
                          value={lang.name}
                          onChange={(e) => updateArrayField('languages', index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Drapeau</label>
                        <input
                          type="text"
                          value={lang.flag}
                          onChange={(e) => updateArrayField('languages', index, 'flag', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="🇫🇷"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Niveau</label>
                        <input
                          type="text"
                          value={lang.level}
                          onChange={(e) => updateArrayField('languages', index, 'level', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'certifications' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Certifications</h3>
                  <button
                    onClick={addCertification}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={18} />
                    Ajouter
                  </button>
                </div>

                {data.certifications.map((cert, index) => (
                  <div key={index} className="border border-gray-300 rounded-lg p-4 space-y-3 bg-gray-50">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-gray-700">Certification {index + 1}</h4>
                      <button
                        onClick={() => removeCertification(index)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Nom</label>
                        <input
                          type="text"
                          value={cert.name}
                          onChange={(e) => updateArrayField('certifications', index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Organisme</label>
                        <input
                          type="text"
                          value={cert.issuer}
                          onChange={(e) => updateArrayField('certifications', index, 'issuer', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVEditor;
