import React, { useState } from 'react';

interface TravelDocumentRecord {
  id: string;
  documentType: string;
  documentNumber: string;
  issuingCountry: string;
  issueDate: string;
  expiryDate: string;
  file: string;
}

const TravelDocument: React.FC = () => {
  const [documents, setDocuments] = useState<TravelDocumentRecord[]>([
    {
      id: '1',
      documentType: 'Passport',
      documentNumber: 'A1234567',
      issuingCountry: 'Indonesia',
      issueDate: '15-01-2020',
      expiryDate: '15-01-2030',
      file: 'View file'
    },
    {
      id: '2',
      documentType: 'Seaman Book',
      documentNumber: 'SB987654',
      issuingCountry: 'Indonesia',
      issueDate: '20-03-2022',
      expiryDate: '20-03-2027',
      file: 'View file'
    }
  ]);

  const [newDocument, setNewDocument] = useState({
    documentType: '',
    documentNumber: '',
    issuingCountry: '',
    issueDate: '',
    expiryDate: '',
    file: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewDocument({
      ...newDocument,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDocument({
      ...newDocument,
      file: e.target.files?.[0] || null
    });
  };

  const handleAddDocument = () => {
    if (newDocument.documentType && newDocument.documentNumber) {
      const document: TravelDocumentRecord = {
        id: Date.now().toString(),
        documentType: newDocument.documentType,
        documentNumber: newDocument.documentNumber,
        issuingCountry: newDocument.issuingCountry,
        issueDate: newDocument.issueDate,
        expiryDate: newDocument.expiryDate,
        file: newDocument.file ? 'View file' : ''
      };
      setDocuments([...documents, document]);
      setNewDocument({
        documentType: '',
        documentNumber: '',
        issuingCountry: '',
        issueDate: '',
        expiryDate: '',
        file: null
      });
    }
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const documentTypes = [
    'Passport',
    'Seaman Book',
    'Visa',
    'Yellow Fever Certificate',
    'Medical Certificate',
    'ID Card'
  ];

  const countries = [
    'Indonesia',
    'Singapore',
    'Malaysia',
    'Philippines',
    'Thailand',
    'Vietnam',
    'Other'
  ];

  return (
    <div className="space-y-6">
      {/* Documents Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Document Type</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Document Number</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Issuing Country</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Issue Date</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Expiry Date</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">File</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2 text-sm">{doc.id}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">{doc.documentType}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">{doc.documentNumber}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">{doc.issuingCountry}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">{doc.issueDate}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">{doc.expiryDate}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">
                  {doc.file && (
                    <button className="text-indigo-600 hover:text-indigo-900 text-sm">
                      {doc.file}
                    </button>
                  )}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-sm">
                  <button
                    onClick={() => handleDeleteDocument(doc.id)}
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

      {/* Add New Document Form */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Travel Document</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Type<span className="text-red-500">*</span>
            </label>
            <select
              name="documentType"
              value={newDocument.documentType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Please select</option>
              {documentTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Number<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="documentNumber"
              value={newDocument.documentNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter document number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Issuing Country<span className="text-red-500">*</span>
            </label>
            <select
              name="issuingCountry"
              value={newDocument.issuingCountry}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Please select</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Issue Date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="issueDate"
              value={newDocument.issueDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="expiryDate"
              value={newDocument.expiryDate}
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
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <p className="text-sm text-red-500 mt-1">Filetype: Pdf, JPG, PNG, Max 8 MB</p>
          </div>
        </div>

        <button
          onClick={handleAddDocument}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default TravelDocument;