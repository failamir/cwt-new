import React, { useState } from 'react';

interface EmergencyContactRecord {
  id: string;
  name: string;
  relationship: string;
  contactNumber: string;
  emailAddress: string;
}

const EmergencyContact: React.FC = () => {
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContactRecord[]>([
    {
      id: '14',
      name: 'failamir abdullah',
      relationship: 'Father',
      contactNumber: '6283148263597',
      emailAddress: 'failamir@students.amikom.ac.id'
    }
  ]);

  const [newContact, setNewContact] = useState({
    name: '',
    relationship: '',
    contactNumber: '',
    emailAddress: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewContact({
      ...newContact,
      [e.target.name]: e.target.value
    });
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.relationship && newContact.contactNumber) {
      const contact: EmergencyContactRecord = {
        id: Date.now().toString(),
        name: newContact.name,
        relationship: newContact.relationship,
        contactNumber: newContact.contactNumber,
        emailAddress: newContact.emailAddress
      };
      setEmergencyContacts([...emergencyContacts, contact]);
      setNewContact({
        name: '',
        relationship: '',
        contactNumber: '',
        emailAddress: ''
      });
    }
  };

  const handleDeleteContact = (id: string) => {
    setEmergencyContacts(emergencyContacts.filter(contact => contact.id !== id));
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
    'Friend',
    'Other'
  ];

  return (
    <div className="space-y-6">
      {/* Emergency Contacts Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Relationship</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Contact Number</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">E Mail Address</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {emergencyContacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2 text-sm">{contact.id}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">{contact.name}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">{contact.relationship}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">{contact.contactNumber}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">{contact.emailAddress}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">
                  <button
                    onClick={() => handleDeleteContact(contact.id)}
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

      {/* Add New Emergency Contact Form */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Emergency Contact</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={newContact.name}
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
              value={newContact.relationship}
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
              Contact Number<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={newContact.contactNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Phone Number +62 83"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E Mail Address
            </label>
            <input
              type="email"
              name="emailAddress"
              value={newContact.emailAddress}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ignore if not there"
            />
          </div>
        </div>

        <button
          onClick={handleAddContact}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EmergencyContact;