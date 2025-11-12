import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { CVData, Certification } from '../../types';

interface CertificationsSectionProps {
  data: CVData;
  onUpdate: (data: CVData) => void;
  t: (key: string) => string;
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  data,
  onUpdate,
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

  return (
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
          {t('addCertification') || 'Add Certification'}
        </button>
      </div>

      <div className="space-y-4">
        {data.certifications.map((cert) => (
          <div
            key={cert.id}
            className="bg-gradient-to-br from-white to-neutral-50 border-2 border-neutral-200 rounded-xl p-5"
          >
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
        ))}
      </div>

      {data.certifications.length === 0 && (
        <div className="text-center py-12 text-neutral-400">
          <p>{t('noCertifications') || 'No certifications added yet. Click "Add Certification" to get started.'}</p>
        </div>
      )}
    </div>
  );
};

export default CertificationsSection;