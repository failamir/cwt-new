import React, { useState } from 'react';

interface NextOfKinRecord {
  id: string;
  name: string;
  relationship: string;
  placeBirth: string;
  dateOfBirth: string;
  signature: string;
}

const NextOfKin: React.FC = () => {
  const [nextOfKinRecords, setNextOfKinRecords] = useState<NextOfKinRecord[]>([]);

  const [newNextOfKin, setNewNextOfKin] = useState({
    name: '',
    relationship: '',
    placeBirth: '',
    dateOfBirth: '',
    signature: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewNextOfKin({
      ...newNextOfKin,
      [e.target.name]: e.target.value
    });
  };

  const handleAddNextOfKin = () => {
    if (newNextOfKin.name && newNextOfKin.relationship) {
      const nextOfKin: NextOfKinRecord = {
        id: Date.now().toString(),
        name: newNextOfKin.name,
        relationship: newNextOfKin.relationship,
        placeBirth: newNextOfKin.placeBirth,
        dateOfBirth: newNextOfKin.dateOfBirth,
        signature: newNextOfKin.signature
      };
      setNextOfKinRecords([...nextOfKinRecords, nextOfKin]);
      setNewNextOfKin({
        name: '',
        relationship: '',
        placeBirth: '',
        dateOfBirth: '',
        signature: ''
      });
    }
  };

  const handleDeleteNextOfKin = (id: string) => {
    setNextOfKinRecords(nextOfKinRecords.filter(nok => nok.id !== id));
  };

  const relationships = [
    'Father',
    'Mother',
    'Spouse',
    'Son',
    'Daughter',
    'Brother',
    'Sister',
    'Uncle',
    'Aunt',
    'Grandfather',
    'Grandmother',
    'Other'
  ];

  return (
    <div className="space-y-6">
      {/* Next of Kin Table */}
      {nextOfKinRecords.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Relationship</th>
                <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Place Birth</th>
                <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date of Birth</th>
                <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Signature</th>
                <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {nextOfKinRecords.map((nok) => (
                <tr key={nok.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2 text-sm">{nok.id}</td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">{nok.name}</td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">{nok.relationship}</td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">{nok.placeBirth}</td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">{nok.dateOfBirth}</td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">{nok.signature}</td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">
                    <button
                      onClick={() => handleDeleteNextOfKin(nok.id)}
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

      {/* Add New Next of Kin Form */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Add Next of Kin</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={newNextOfKin.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Name of Wife/Husband/Mother/Father"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Relationship<span className="text-red-500">*</span>
            </label>
            <select
              name="relationship"
              value={newNextOfKin.relationship}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Please select</option>
              {relationships.map((rel) => (
                <option key={rel} value={rel}>{rel}</option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mt-1">What's the relationship?</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Place Birth
            </label>
            <input
              type="text"
              name="placeBirth"
              value={newNextOfKin.placeBirth}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter place of birth"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={newNextOfKin.dateOfBirth}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <button
          onClick={handleAddNextOfKin}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default NextOfKin;