import React from 'react';
import { Upload } from 'lucide-react';
import { CVData } from '../../types';

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
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setImagePreviewUrl(imageUrl);
        onUpdate({
          ...data,
          personalInfo: { ...data.personalInfo, avatarUrl: imageUrl }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreviewUrl(null);
    onUpdate({
      ...data,
      personalInfo: { ...data.personalInfo, avatarUrl: '' }
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between pb-4 border-b-2 border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
            <span className="text-2xl">👤</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-900">{t('personalInfo')}</h3>
        </div>
      </div>

      <div className="bg-gradient-to-br from-white to-neutral-50 border-2 border-neutral-200 rounded-xl p-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            {t('fullName')} *
          </label>
          <input
            type="text"
            value={data.personalInfo.fullName}
            onChange={(e) =>
              onUpdate({
                ...data,
                personalInfo: { ...data.personalInfo, fullName: e.target.value }
              })
            }
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white"
            placeholder={t('fullNamePlaceholder')}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            {t('professionalTitle')} *
          </label>
          <input
            type="text"
            value={data.personalInfo.professionalTitle}
            onChange={(e) =>
              onUpdate({
                ...data,
                personalInfo: { ...data.personalInfo, professionalTitle: e.target.value }
              })
            }
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-neutral-300 bg-white"
            placeholder={t('professionalTitlePlaceholder')}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            {t('photo')}
          </label>
          <div className="flex items-center gap-4">
            {imagePreviewUrl && (
              <div className="relative">
                <img
                  src={imagePreviewUrl}
                  alt="Avatar preview"
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 shadow-lg"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            <label className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer font-medium text-sm">
              <Upload size={18} />
              {imagePreviewUrl ? t('changePhoto') : t('uploadPhoto')}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          {imagePreviewUrl && (
            <p className="text-xs text-neutral-500 mt-2">{t('maxFileSize')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalSection;