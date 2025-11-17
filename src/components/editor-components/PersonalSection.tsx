import React from 'react';
import { Upload, X, User } from 'lucide-react';
import { CVData } from '../../types';
import TipsCard from '../TipsComponent/TipsCard';

interface PersonalSectionProps {
  data: CVData;
  onUpdate: (data: CVData) => void;
  imagePreviewUrl: string | null;
  setImagePreviewUrl: (url: string | null) => void;
  t: (key: string) => string;
}

const PersonalSection: React.FC<PersonalSectionProps> = ({
  data,
  onUpdate,
  imagePreviewUrl,
  setImagePreviewUrl,
  t,
}) => {
  const handleInputChange = (field: 'fullName' | 'professionalTitle', value: string) => {
    onUpdate({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreviewUrl(result);
        onUpdate({
          ...data,
          personalInfo: {
            ...data.personalInfo,
            avatarUrl: result
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreviewUrl(null);
    onUpdate({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        avatarUrl: ''
      }
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 pb-4 border-b-2 border-neutral-200">
        <div className="p-2.5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
          <span className="text-2xl">👤</span>
        </div>
        <h3 className="text-2xl font-bold text-neutral-900">{t('personalInfo')}</h3>
      </div>

      {/* Professional Photo Tips */}
      <TipsCard tipTitleKey="photoTipsTitle" tips={[
        t('photoTip1'),
        t('photoTip2'),
        t('photoTip3'),
        t('photoTip4')
      ]} />

      {/* Profile Picture Upload */}
      <div className="bg-gradient-to-br from-white to-neutral-50 border-2 border-neutral-200 rounded-xl p-6">
        {/* <label className="block text-sm font-semibold text-neutral-700 mb-4">
          {t('uploadImage')}
        </label> */}
        
        <div className="flex items-start gap-6">
          {/* Image Preview */}
          <div className="flex-shrink-0">
            {imagePreviewUrl ? (
              <div className="relative group">
                <img
                  src={imagePreviewUrl}
                  alt="Profile"
                  className="w-32 h-32 rounded-xl object-cover border-2 border-neutral-200"
                />
                <button
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="w-32 h-32 rounded-xl border-2 border-dashed border-neutral-300 flex items-center justify-center bg-neutral-50">
                <User size={40} className="text-neutral-400" />
              </div>
            )}
          </div>

          {/* Upload Button */}
          <div className="flex-1 my-auto mx-1">
            <label className="cursor-pointer">
              <div className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] font-medium">
                <Upload size={20} />
                <span>{t('uploadImage')}</span>
              </div>
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            <p className="text-xs text-center text-neutral-500 mt-2">
              {t('maxFileSize')}
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information Fields */}
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-white to-neutral-50 border-2 border-neutral-200 rounded-xl p-5">
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            {t('fullName')} *
          </label>
          <input
            type="text"
            value={data.personalInfo.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white"
            placeholder="John Doe"
          />
        </div>

        <div className="bg-gradient-to-br from-white to-neutral-50 border-2 border-neutral-200 rounded-xl p-5">
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            {t('professionalTitle')} *
          </label>
          <input
            type="text"
            value={data.personalInfo.professionalTitle}
            onChange={(e) => handleInputChange('professionalTitle', e.target.value)}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white"
            placeholder="e.g., Senior Software Engineer, Product Manager"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalSection;