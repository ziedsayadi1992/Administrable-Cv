import React from 'react';
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

      <div className="bg-gradient-to-br from-white to-neutral-50 border-2 border-neutral-200 rounded-xl p-6">
        <label className="block text-sm font-semibold text-neutral-700 mb-2">
          {t('professionalSummary')}
        </label>
        <textarea
          value={data.profile}
          onChange={(e) => handleProfileUpdate(e.target.value)}
          rows={8}
          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white resize-none"
          placeholder={t('profilePlaceholder') || "Write a compelling professional summary that highlights your key strengths, experience, and career objectives..."}
        />
        <p className="text-xs text-neutral-500 mt-2">
          {t('profileTip') || "Tip: Keep it concise (3-5 sentences) and focus on your unique value proposition"}
        </p>
      </div>
    </div>
  );
};

export default ProfileSection;