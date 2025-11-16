import React from 'react';
import { Edit2, FileText } from 'lucide-react';
import { CVData } from '../../types';

interface ProfileSectionProps {
  data: CVData;
  onUpdate: (data: CVData) => void;
  t: (key: string) => string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  data,
  onUpdate,
  t,
}) => {
  const handleProfileUpdate = (value: string) => {
    onUpdate({
      ...data,
      profile: value
    });
  };

  const handleTitleUpdate = (value: string) => {
    onUpdate({
      ...data,
      sectionTitles: {
        ...data.sectionTitles,
        profile: value
      }
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between pb-4 border-b-2 border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
            <span className="text-2xl">📝</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-900">{t('profile')}</h3>
        </div>
      </div>

      {/* Professional Tips */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
        <div className="flex gap-3">
          <span className="text-blue-600 text-xl">💡</span>
          <div>
            <p className="text-sm text-blue-900 font-medium mb-1">
              {t('profileTipsTitle')}
            </p>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• {t('profileTip1')}</li>
              <li>• {t('profileTip2')}</li>
              <li>• {t('profileTip3')}</li>
              <li>• {t('profileTip4')}</li>
            </ul>
          </div>
        </div>
      </div>

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
          value={data.sectionTitles.profile}
          onChange={(e) => handleTitleUpdate(e.target.value)}
          className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300 bg-white font-medium"
          placeholder="e.g., Professional Profile, About Me, Summary"
        />
        <p className="text-xs text-neutral-500 mt-2">
          {t('editableSectionTitleHint') || 'This title will appear as the section header in your CV.'}
        </p>
      </div>

      {/* Profile Text Area */}
      <div className="bg-gradient-to-br from-white to-neutral-50 border-2 border-neutral-200 rounded-xl p-5">
        <label className="block text-sm font-semibold text-neutral-700 mb-3">
          {t('profileSummary')}
        </label>
        <textarea
          value={data.profile}
          onChange={(e) => handleProfileUpdate(e.target.value)}
          rows={6}
          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white resize-none"
          placeholder="Write a compelling professional summary that highlights your expertise, experience, and career goals. Keep it concise and impactful (3-5 sentences)."
        />
        <div className="mt-2 text-xs text-neutral-500">
          {data.profile.length } {t('charactersCount')} 
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;