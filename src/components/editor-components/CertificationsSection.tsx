import React from 'react';
import { Plus, Trash2, Award, Edit2 } from 'lucide-react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CVData, Certification } from '../../types';
import SortableItem from './Sortableitem';
import TipsCard from '../TipsComponent/TipsCard';

interface CertificationsSectionProps {
  data: CVData;
  onUpdate: (data: CVData) => void;
  sensors: any;
  onDragStart: (event: any) => void;
  onDragEnd: (event: any) => void;
  t: (key: string) => string;
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  data,
  onUpdate,
  sensors,
  onDragStart,
  onDragEnd,
  t,
}) => {
  const addCertification = () => {
    const newCert: Certification = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: ''
    };
    onUpdate({
      ...data,
      certifications: [...data.certifications, newCert]
    });
  };

  const removeCertification = (id: string) => {
    onUpdate({
      ...data,
      certifications: data.certifications.filter(cert => cert.id !== id)
    });
  };

  const updateCertification = (id: string, field: 'name' | 'issuer', value: string) => {
    onUpdate({
      ...data,
      certifications: data.certifications.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    });
  };

  const handleTitleUpdate = (value: string) => {
    onUpdate({
      ...data,
      sectionTitles: {
        ...data.sectionTitles,
        certifications: value
      }
    });
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
            <Award size={24} className="text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900">{t('certifications')}</h3>
        </div>
        <button
          onClick={addCertification}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] font-medium text-sm"
        >
          <Plus size={18} />
          {t('addCertification') || 'Add Certification'}
        </button>
      </div>

      {/* Tips Card */}
      <TipsCard 
        tipTitleKey="certificationsTipsTitle" 
        tips={[
          t('certificationsTip1'),
          t('certificationsTip2'),
          t('certificationsTip3'),
          t('certificationsTip4')
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
          value={data.sectionTitles.certifications}
          onChange={(e) => handleTitleUpdate(e.target.value)}
          className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300 bg-white font-medium"
          placeholder="e.g., Certifications, Professional Certifications, Credentials"
        />
        <p className="text-xs text-neutral-500 mt-2">
          {t('editableSectionTitleHint') || 'This title will appear as the section header in your CV.'}
        </p>
      </div>

      {/* ✅ Certifications List with Drag and Drop */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={data.certifications.map(cert => cert.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {data.certifications.map((cert) => (
              <SortableItem key={cert.id} id={cert.id} isDraggingGlobal={false}>
                <div className="bg-gradient-to-br from-white to-neutral-50 border-2 border-neutral-200 rounded-xl p-5">
                  <div className="flex gap-3 mb-3">
                    <input
                      type="text"
                      value={cert.name}
                      onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white"
                      placeholder={t('certificationName') || "e.g., AWS Certified Solutions Architect, PMP"}
                    />
                    <button
                      onClick={() => removeCertification(cert.id)}
                      className="px-3 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all duration-200"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white"
                    placeholder={t('certificationIssuer') || "e.g., AWS, CompTIA, Google"}
                  />
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {data.certifications.length === 0 && (
        <div className="text-center py-12 text-neutral-400">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 mb-4">
            <Award size={32} className="text-blue-600" />
          </div>
          <p className="font-medium mb-2">{t('noCertifications') || 'No certifications added yet'}</p>
          <p className="text-sm">{t('noCertificationsHint') || 'Click "Add Certification" to get started'}</p>
        </div>
      )}
    </div>
  );
};

export default CertificationsSection;