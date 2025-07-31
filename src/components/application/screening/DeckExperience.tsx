import React, { useState } from 'react';
import { Eye, Trash2 } from 'lucide-react';

interface ExperienceRecord {
  id: string;
  vesselName: string;
  vesselType: string;
  gtLoa: string;
  vesselRoute: string;
  position: string;
  approve: string;
  startDate: string;
  endDate: string;
  job: string;
}

const DeckExperience: React.FC = () => {
  const [experiences, setExperiences] = useState<ExperienceRecord[]>([
    {
      id: '29',
      vesselName: 'INDO',
      vesselType: '',
      gtLoa: 'INDONESIA',
      vesselRoute: 'Foreign Going',
      position: 'ELECTRO',
      approve: 'View File',
      startDate: '30-04-2024',
      endDate: '12-05-2024',
      job: 'ELECTRICITY : ELECTRICITY : ELECTRICITY'
    },
    {
      id: '46',
      vesselName: 'INDO',
      vesselType: '',
      gtLoa: 'INDONESIA',
      vesselRoute: 'Foreign Going',
      position: 'ELECTRO',
      approve: 'View File',
      startDate: '09-09-2024',
      endDate: '21-08-2024',
      job: 'ELECTRICITY : TRAVO : ENGINE'
    }
  ]);

  const [newExperience, setNewExperience] = useState({
    vesselName: '',
    gtLoa: '',
    vesselRoute: '',
    position: '',
    startDate: '',
    endDate: '',
    reason: '',
    jobDescription: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setNewExperience({
      ...newExperience,
      [e.target.name]: e.target.value
    });
  };

  const handleAddExperience = () => {
    const experience: ExperienceRecord = {
      id: Date.now().toString(),
      vesselName: newExperience.vesselName,
      vesselType: '',
      gtLoa: newExperience.gtLoa,
      vesselRoute: newExperience.vesselRoute,
      position: newExperience.position,
      approve: 'Pending',
      startDate: newExperience.startDate,
      endDate: newExperience.endDate,
      job: newExperience.jobDescription
    };
    setExperiences([...experiences, experience]);
    setNewExperience({
      vesselName: '',
      gtLoa: '',
      vesselRoute: '',
      position: '',
      startDate: '',
      endDate: '',
      reason: '',
      jobDescription: ''
    });
  };

  const handleDeleteExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Experience Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Vessel Name / Type</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">GT / LOA (Length Over All)</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Vessel Route</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Approve</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">End Date</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Job</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((exp) => (
              <tr key={exp.id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2 text-sm">{exp.id}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">{exp.vesselName}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">{exp.gtLoa}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">{exp.vesselRoute}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">{exp.position}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">
                  <button className="text-indigo-600 hover:text-indigo-900 text-sm">
                    {exp.approve}
                  </button>
                </td>
                <td className="border border-gray-200 px-4 py-2 text-sm">{exp.startDate}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">{exp.endDate}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">{exp.job}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">
                  <button
                    onClick={() => handleDeleteExperience(exp.id)}
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

      {/* Add New Experience Form */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Experience</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vessel Name / Type<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="vesselName"
              value={newExperience.vesselName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter vessel name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GT / LOA (Length Over All)<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="gtLoa"
              value={newExperience.gtLoa}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter GT/LOA"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vessel Route<span className="text-red-500">*</span>
            </label>
            <select
              name="vesselRoute"
              value={newExperience.vesselRoute}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Please select</option>
              <option value="Domestic">Domestic</option>
              <option value="Foreign Going">Foreign Going</option>
              <option value="International">International</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Position<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="position"
              value={newExperience.position}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter position"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="startDate"
              value={newExperience.startDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={newExperience.endDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for leaving or current status<span className="text-red-500">*</span>
            </label>
            <select
              name="reason"
              value={newExperience.reason}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Please select</option>
              <option value="Contract completed">Contract completed</option>
              <option value="Personal reasons">Personal reasons</option>
              <option value="Career advancement">Career advancement</option>
              <option value="Currently employed">Currently employed</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Description <span className="text-red-500">* minimum 3</span>
          </label>
          <textarea
            name="jobDescription"
            value={newExperience.jobDescription}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Describe your job responsibilities (minimum 3 points)"
          />
        </div>

        <button
          onClick={handleAddExperience}
          className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Add
        </button>
      </div>

      {/* Approve Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Approve</h3>
        <input
          type="file"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          accept=".pdf"
        />
        <p className="text-sm text-red-500 mt-1">Filetype: Pdf, Max 8 MB</p>
        
        <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors mt-4">
          Save
        </button>
      </div>
    </div>
  );
};

export default DeckExperience;