import React, { useState } from 'react';

interface CertificateRecord {
  id: string;
  institution: string;
  place: string;
  certNumber: string;
  dateOfIssue: string;
  file: string;
  typeCertificates: string;
}

const DeckCertificate: React.FC = () => {
  const [certificates, setCertificates] = useState<CertificateRecord[]>([
    {
      id: '81',
      institution: 'CIA',
      place: 'Hawaii',
      certNumber: '9899-GY77-990',
      dateOfIssue: '01-05-2024',
      file: 'View file',
      typeCertificates: 'PROFICIENCY IN SURVIVAL CRAFT AND RESCUE BOATS'
    },
    {
      id: '82',
      institution: 'CIA',
      place: 'Hawaii',
      certNumber: '9899-GY77-990',
      dateOfIssue: '09-06-2024',
      file: 'View file',
      typeCertificates: 'BASIC SAFETY TRAINING (BST)'
    },
    {
      id: '153',
      institution: 'CIA',
      place: 'Hawaii',
      certNumber: '9899-GY77-990',
      dateOfIssue: '03-09-2024',
      file: '',
      typeCertificates: 'ADVANCE FIRE FIGHTING (AFF)'
    },
    {
      id: '154',
      institution: 'CIA',
      place: 'Hawaii',
      certNumber: '9899-GY77-990',
      dateOfIssue: '28-09-2024',
      file: '',
      typeCertificates: 'PROFICIENCY IN SURVIVAL CRAFT AND RESCUE BOATS'
    },
    {
      id: '155',
      institution: 'CIA',
      place: 'Hawaii',
      certNumber: '9899-GY77-990',
      dateOfIssue: '10-09-2024',
      file: '',
      typeCertificates: 'SEAFARERS WITH DESIGNATED SECURITY DUTIES'
    },
    {
      id: '156',
      institution: 'CIA',
      place: 'Hawaii',
      certNumber: '9899-GY77-990',
      dateOfIssue: '10-09-2024',
      file: '',
      typeCertificates: 'SEAFARERS WITH DESIGNATED SECURITY DUTIES'
    },
    {
      id: '157',
      institution: 'CIA',
      place: 'Hawaii',
      certNumber: '9899-GY77-990',
      dateOfIssue: '28-09-2024',
      file: 'View file',
      typeCertificates: 'CROWD MANAGEMENT'
    }
  ]);

  const [newCertificate, setNewCertificate] = useState({
    typeCertificates: '',
    institution: '',
    place: '',
    certNumber: '',
    dateOfIssue: '',
    file: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewCertificate({
      ...newCertificate,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCertificate({
      ...newCertificate,
      file: e.target.files?.[0] || null
    });
  };

  const handleAddCertificate = () => {
    if (newCertificate.typeCertificates && newCertificate.institution) {
      const certificate: CertificateRecord = {
        id: Date.now().toString(),
        institution: newCertificate.institution,
        place: newCertificate.place,
        certNumber: newCertificate.certNumber,
        dateOfIssue: newCertificate.dateOfIssue,
        file: newCertificate.file ? 'View file' : '',
        typeCertificates: newCertificate.typeCertificates
      };
      setCertificates([...certificates, certificate]);
      setNewCertificate({
        typeCertificates: '',
        institution: '',
        place: '',
        certNumber: '',
        dateOfIssue: '',
        file: null
      });
    }
  };

  const handleDeleteCertificate = (id: string) => {
    setCertificates(certificates.filter(cert => cert.id !== id));
  };

  const certificateTypes = [
    'PROFICIENCY IN SURVIVAL CRAFT AND RESCUE BOATS',
    'BASIC SAFETY TRAINING (BST)',
    'ADVANCE FIRE FIGHTING (AFF)',
    'SEAFARERS WITH DESIGNATED SECURITY DUTIES',
    'CROWD MANAGEMENT',
    'MEDICAL FIRST AID',
    'MEDICAL CARE',
    'SHIP SECURITY OFFICER',
    'RADAR OBSERVER',
    'ARPA',
    'GMDSS GENERAL OPERATOR',
    'BRIDGE RESOURCE MANAGEMENT'
  ];

  return (
    <div className="space-y-6">
      {/* Certificates Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Institution</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Place</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cert. Number</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date Of Issue</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">File</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type Certificates</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert) => (
              <tr key={cert.id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2 text-sm">{cert.id}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">{cert.institution}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">{cert.place}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">{cert.certNumber}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">{cert.dateOfIssue}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">
                  {cert.file && (
                    <button className="text-indigo-600 hover:text-indigo-900 text-sm">
                      {cert.file}
                    </button>
                  )}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-sm">{cert.typeCertificates}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">
                  <button
                    onClick={() => handleDeleteCertificate(cert.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Certificate Form */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type Certificates<span className="text-red-500">*</span>
            </label>
            <select
              name="typeCertificates"
              value={newCertificate.typeCertificates}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Please select</option>
              {certificateTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Institution<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="institution"
              value={newCertificate.institution}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter institution"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Place
            </label>
            <input
              type="text"
              name="place"
              value={newCertificate.place}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter place"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cert. Number
            </label>
            <input
              type="text"
              name="certNumber"
              value={newCertificate.certNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter certificate number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Of Issue
            </label>
            <input
              type="date"
              name="dateOfIssue"
              value={newCertificate.dateOfIssue}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              File<span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              accept=".pdf"
            />
            <p className="text-sm text-red-500 mt-1">Filetype: Pdf, Max 8 MB</p>
          </div>
        </div>

        <button
          onClick={handleAddCertificate}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default DeckCertificate;