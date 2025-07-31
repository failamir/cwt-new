import React, { useState } from 'react';

interface EducationRecord {
  id: string;
  schoolAcademy: string;
  fromDate: string;
  toDate: string;
  qualificationAttained: string;
}

const FormalEducation: React.FC = () => {
  const [educations, setEducations] = useState<EducationRecord[]>([
    {
      id: '37',
      schoolAcademy: 'AMIKOM',
      fromDate: '12-05-2024',
      toDate: '02-06-2024',
      qualificationAttained: 'S2'
    }
  ]);

  const [newEducation, setNewEducation] = useState({
    schoolAcademy: '',
    fromDate: '',
    toDate: '',
    qualificationAttained: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewEducation({
      ...newEducation,
      [e.target.name]: e.target.value
    });
  };

  const handleAddEducation = () => {
    if (newEducation.schoolAcademy && newEducation.qualificationAttained) {
      const education: EducationRecord = {
        id: Date.now().toString(),
        schoolAcademy: newEducation.schoolAcademy,
        fromDate: newEducation.fromDate,
        toDate: newEducation.toDate,
        qualificationAttained: newEducation.qualificationAttained
      };
      setEducations([...educations, education]);
      setNewEducation({
        schoolAcademy: '',
        fromDate: '',
        toDate: '',
        qualificationAttained: ''
      });
    }
  };

  const handleDeleteEducation = (id: string) => {
    setEducations(educations.filter(edu => edu.id !== id));
  };

  const qualifications = [
    'SD',
    'SMP',
    'SMA/SMK',
    'D1',
    'D2',
    'D3',
    'S1',
    'S2',
    'S3'
  ];

  return (
    <div className="space-y-6">
      {/* Education Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">School Academy</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">From Date</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">To Date</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qualification Attained</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {educations.map((edu) => (
              <tr key={edu.id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2 text-sm">{edu.id}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">{edu.schoolAcademy}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">{edu.fromDate}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">{edu.toDate}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">{edu.qualificationAttained}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">
                  <button
                    onClick={() => handleDeleteEducation(edu.id)}
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

      {/* Add New Education Form */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Education</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              School Academy<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="schoolAcademy"
              value={newEducation.schoolAcademy}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter school/academy name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Qualification Attained<span className="text-red-500">*</span>
            </label>
            <select
              name="qualificationAttained"
              value={newEducation.qualificationAttained}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Please select</option>
              {qualifications.map((qual) => (
                <option key={qual} value={qual}>{qual}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="fromDate"
              value={newEducation.fromDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="toDate"
              value={newEducation.toDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <button
          onClick={handleAddEducation}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default FormalEducation;