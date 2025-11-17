import React from 'react';
import { Plus, Trash2, Mail, Phone, MapPin, Github, Linkedin, Globe, Edit2, Info } from 'lucide-react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CVData, ContactField } from '../../types';
import SortableItem from './Sortableitem';
import TipsCard from '../TipsComponent/TipsCard';

interface ContactSectionProps {
  data: CVData;
  contactFields: ContactField[];
  onUpdate: (data: CVData) => void;
  sensors: any;
  onDragStart: (event: any) => void;
  onDragEnd: (event: any) => void;
  t: (key: string) => string;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  data,
  contactFields,
  onUpdate,
  sensors,
  onDragStart,
  onDragEnd,
  t,
}) => {
  const getIconForType = (type: string) => {
    switch (type) {
      case 'email': return <Mail size={18} />;
      case 'phone': return <Phone size={18} />;
      case 'location': return <MapPin size={18} />;
      case 'github': return <Github size={18} />;
      case 'linkedin': return <Linkedin size={18} />;
      case 'website': return <Globe size={18} />;
      default: return <Mail size={18} />;
    }
  };

  const addContactField = () => {
    const newField: ContactField = {
      id: `contact-${Date.now()}`,
      type: 'email',
      label: 'Email',
      value: ''
    };
    onUpdate({
      ...data,
      contact: {
        ...data.contact,
        fields: [...contactFields, newField]
      }
    });
  };

  const removeContactField = (id: string) => {
    onUpdate({
      ...data,
      contact: {
        ...data.contact,
        fields: contactFields.filter(f => f.id !== id)
      }
    });
  };

  const updateContactField = (id: string, updates: Partial<ContactField>) => {
    onUpdate({
      ...data,
      contact: {
        ...data.contact,
        fields: contactFields.map(f => f.id === id ? { ...f, ...updates } : f)
      }
    });
  };

  const handleTitleUpdate = (value: string) => {
    onUpdate({
      ...data,
      sectionTitles: {
        ...data.sectionTitles,
        contact: value
      }
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between pb-4 border-b-2 border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
            <span className="text-2xl">📧</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-900">{t('contact')}</h3>
        </div>
        <button
          onClick={addContactField}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] font-medium text-sm"
        >
          <Plus size={18} />
          {t('addField')}
        </button>
      </div>

      {/* Professional Tips */}
      <TipsCard tipTitleKey="contactTipsTitle" tips={[
        t('contactTip1'),
        t('contactTip2'),
        t('contactTip3'),
        t('contactTip4')
      ]} />

      {/* Contact Fields List */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={contactFields.map(f => f.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {contactFields.map((field) => (
              <SortableItem key={field.id} id={field.id} isDraggingGlobal={false}>
                <div className="bg-gradient-to-br from-white to-neutral-50 border-2 rounded-xl p-4 space-y-3">
                  <div className="flex gap-3">
                    <select
                      value={field.type}
                      onChange={(e) => updateContactField(field.id, { type: e.target.value })}
                      className="px-3 py-2 border-2 border-neutral-200 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium text-sm"
                    >
                      <option value="email">{t('email') || 'Email'}</option>
                      <option value="phone">{t('phone') || 'Phone'}</option>
                      <option value="location">{t('location') || 'Location'}</option>
                      <option value="github">{t('github') || 'GitHub'}</option>
                      <option value="linkedin">{t('linkedin') || 'LinkedIn'}</option>
                      <option value="website">{t('website') || 'Website'}</option>
                    </select>
                    <div className="flex-1 flex items-center gap-2 px-4 py-2 border-2 border-neutral-200 rounded-lg bg-white">
                      {getIconForType(field.type)}
                      <input
                        type="text"
                        value={field.value}
                        onChange={(e) => updateContactField(field.id, { value: e.target.value })}
                        className="flex-1 outline-none"
                        placeholder={`Enter ${field.type}`}
                      />
                    </div>
                    <button
                      onClick={() => removeContactField(field.id)}
                      className="px-3 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {contactFields.length === 0 && (
        <div className="text-center py-12 text-neutral-400">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 mb-4">
            <Mail size={32} className="text-blue-600" />
          </div>
          <p className="font-medium mb-2">{t('noContactFields')}</p>
          <p className="text-sm">{t('noContactFieldsHint')}</p>
        </div>
      )}
    </div>
  );
};

export default ContactSection;