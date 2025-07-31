import React, { useState } from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';

interface TestResult {
  id: string;
  testName: string;
  score: number;
  fileResult: string;
}

const PreScreening: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([
    {
      id: '1',
      testName: 'Neha',
      score: 99,
      fileResult: 'test_result_1.pdf'
    }
  ]);

  const [newTest, setNewTest] = useState({
    testName: '',
    score: '',
    file: null as File | null
  });

  const handleAddTest = () => {
    if (newTest.testName && newTest.score) {
      const test: TestResult = {
        id: Date.now().toString(),
        testName: newTest.testName,
        score: parseInt(newTest.score),
        fileResult: newTest.file ? newTest.file.name : 'No file'
      };
      setTestResults([...testResults, test]);
      setNewTest({ testName: '', score: '', file: null });
    }
  };

  const handleDeleteTest = (id: string) => {
    setTestResults(testResults.filter(test => test.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Warning Message */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800 text-sm">
          If the test results are out, you must immediately upload the results here
        </p>
      </div>

      {/* Test Category */}
      <div>
        <p className="text-gray-700 font-medium mb-4">(Marlins/NEHA/CES)</p>
      </div>

      {/* Existing Test Results */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Test Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                File Result
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {testResults.map((test) => (
              <tr key={test.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {test.testName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {test.score}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-indigo-600 hover:text-indigo-900 text-sm">
                    View File
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition-colors">
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteTest(test.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Test Form */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Test Result</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Name
            </label>
            <select
              value={newTest.testName}
              onChange={(e) => setNewTest({ ...newTest, testName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select test</option>
              <option value="Marlins">Marlins</option>
              <option value="NEHA">NEHA</option>
              <option value="CES">CES</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Score
            </label>
            <input
              type="number"
              value={newTest.score}
              onChange={(e) => setNewTest({ ...newTest, score: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter score"
              min="0"
              max="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              File Result<span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              onChange={(e) => setNewTest({ ...newTest, file: e.target.files?.[0] || null })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              accept=".pdf"
            />
            <p className="text-sm text-red-500 mt-1">Filetype: Pdf, Max 8 MB</p>
          </div>

          <button
            onClick={handleAddTest}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreScreening;