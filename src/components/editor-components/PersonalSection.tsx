import React from 'react';
import { Upload, X, Edit2, Info } from 'lucide-react';
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

  const handleTitleUpdate = (value: string) => {
    onUpdate({
      ...data,
      sectionTitles: {
        ...data.sectionTitles,
        personal: value
      }
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

      {/* CV Title Editor - Optional for Personal */}
      {/* <div className="bg-gradient-to-br from-blue-50 to-cyan-50/30 border-2 border-blue-200 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Edit2 size={18} className="text-blue-600" />
          <label className="text-sm font-semibold text-neutral-700">
            CV Section Title (Optional)
          </label>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            Header Section
          </span>
        </div>
        <input
          type="text"
          value={data.sectionTitles?.personal || ''}
          onChange={(e) => handleTitleUpdate(e.target.value)}
          className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300 bg-white font-medium"
          placeholder="e.g., Personal Information, About, Profile"
        />
        <div className="flex items-start gap-2 mt-3 p-3 bg-blue-50/50 rounded-lg">
          <Info size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-neutral-600">
            <strong>Note:</strong> In most CV templates, personal information appears in the header without a section title. 
            This field is optional and allows customization for alternative layouts.
          </p>
        </div>
      </div> */}

      {/* Personal Information Fields */}
      <div className="bg-gradient-to-br from-white to-neutral-50 border-2 border-neutral-200 rounded-xl p-6 space-y-5">
        {/* Full Name */}
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
            placeholder={t('fullNamePlaceholder') || 'John Doe'}
          />
        </div>

        {/* Professional Title */}
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
            placeholder={t('professionalTitlePlaceholder') || 'Senior Software Engineer'}
          />
        </div>

        {/* Profile Photo */}
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
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg hover:scale-110 transition-transform duration-200"
                  title="Remove photo"
                >
                  <X size={14} strokeWidth={3} />
                </button>
              </div>
            )}
            <label className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer font-medium text-sm">
              <Upload size={18} />
              {imagePreviewUrl ? (t('changePhoto') || 'Change Photo') : (t('uploadPhoto') || 'Upload Photo')}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-xs text-neutral-500 mt-2">
            {t('maxFileSize') || 'Max 5 MB. Accepted formats: JPG, PNG, GIF'}
          </p>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
        <div className="flex gap-3">
          <span className="text-green-600 text-xl">💡</span>
          <div>
            <p className="text-sm text-green-900 font-medium mb-1">
              Professional Photo Tips
            </p>
            <ul className="text-xs text-green-800 space-y-1">
              <li>• Use a high-quality, recent photo</li>
              <li>• Professional attire recommended</li>
              <li>• Neutral background works best</li>
              <li>• Smile naturally and look at the camera</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalSection;