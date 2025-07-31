import React, { useState } from 'react';

interface ReferenceRecord {
  id: string;
  previousEmployersName: string;
  addressAndContact: string;
  recommendation: string;
}

const References: React.FC = () => {
  const [references, setReferences] = useState<ReferenceRecord[]>([]);

  const [newReference, setNewReference] = useState({
    previousEmployersName: '',
    recommendation: '',
    addressAndContact: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setNewReference({
      ...newReference,
      [e.target.name]: e.target.value
    });
  };

  const handleAddReference = () => {
    if (newReference.previousEmployersName && newReference.recommendation) {
      const reference: ReferenceRecord = {
        id: Date.now().toString(),
        previousEmployersName: newReference.previousEmployersName,
        addressAndContact: newReference.addressAndContact,
        recommendation: newReference.recommendation
      };
      setReferences([...references, reference]);
      setNewReference({
        previousEmployersName: '',
        recommendation: '',
        addressAndContact: ''
      });
    }
  };

  const handleDeleteReference = (id: string) => {
    setReferences(references.filter(ref => ref.id !== id));
  };

  const recommendationTypes = [
    'Excellent',
    'Very Good',
    'Good',
    'Satisfactory',
    'Needs Improvement'
  ];

  return (
    <div className="space-y-6">
      {/* References Table */}
      {references.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Previous Employers Name</th>
                <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Address And Email / Contact Number</th>
                <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Recommendation</th>
                <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {references.map((ref) => (
                <tr key={ref.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2 text-sm">{ref.id}</td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">{ref.previousEmployersName}</td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">{ref.addressAndContact}</td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">{ref.recommendation}</td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">
                    <button
                      onClick={() => handleDeleteReference(ref.id)}
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
      )}

      {/* Add New Reference Form */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Reference</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Previous Employers Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="previousEmployersName"
              value={newReference.previousEmployersName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter previous employer's name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recommendation/role<span className="text-red-500">*</span>
            </label>
            <select
              name="recommendation"
              value={newReference.recommendation}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Please select</option>
              {recommendationTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address And Email / Contact Number<span className="text-red-500">*</span>
            </label>
            <textarea
              name="addressAndContact"
              value={newReference.addressAndContact}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter complete address, email, and contact number"
            />
          </div>

          <button
            onClick={handleAddReference}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default References;