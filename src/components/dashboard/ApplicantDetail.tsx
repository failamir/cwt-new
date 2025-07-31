import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Mail, Phone, MapPin, FileText, Award, X } from 'lucide-react';

interface InterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicantName: string;
}

const InterviewModal: React.FC<InterviewModalProps> = ({ isOpen, onClose, applicantName }) => {
  const [formData, setFormData] = useState({
    interviewType: 'Agent CWT',
    interviewer: '',
    office: 'Jakarta',
    interviewDate: '20-07-2025',
    meetingUrl: '',
    notes: ''
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Set Interviewer & Date</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interview Type
            </label>
            <select
              value={formData.interviewType}
              onChange={(e) => setFormData({ ...formData, interviewType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Agent CWT">Agent CWT</option>
              <option value="Principal">Principal</option>
              <option value="Technical">Technical</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              INTERVIEW BY
            </label>
            <select
              value={formData.interviewer}
              onChange={(e) => setFormData({ ...formData, interviewer: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Interviewer</option>
              <option value="John Smith">John Smith</option>
              <option value="Maria Garcia">Maria Garcia</option>
              <option value="David Wilson">David Wilson</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Office
            </label>
            <select
              value={formData.office}
              onChange={(e) => setFormData({ ...formData, office: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Jakarta">Jakarta</option>
              <option value="Surabaya">Surabaya</option>
              <option value="Yogyakarta">Yogyakarta</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              INTERVIEW DATE
            </label>
            <input
              type="text"
              value={formData.interviewDate}
              onChange={(e) => setFormData({ ...formData, interviewDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="DD-MM-YYYY"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meeting Url
            </label>
            <input
              type="url"
              value={formData.meetingUrl}
              onChange={(e) => setFormData({ ...formData, meetingUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Additional notes..."
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

const ApplicantDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showInterviewModal, setShowInterviewModal] = useState(false);

  // Mock applicant data
  const applicant = {
    id: id,
    name: 'failamir abdullah',
    position: 'Deck Officer',
    department: 'Deck',
    email: 'failamir@students.amikom.ac.id',
    phone: '+6283148263597',
    address: 'Sleman, Yogyakarta',
    appliedDate: '2024-01-15',
    status: 'Under Review',
    experience: '2 years',
    personalDetails: {
      firstName: 'failamir',
      lastName: 'abdullah',
      weight: '55',
      height: '170',
      ktp: '2210832464155312',
      nationality: 'Indonesia',
      gender: 'male',
      contactNo: '083148263597',
      email: 'failamir@gmail.com',
      address: 'sleman',
      city: 'jogja',
      placeOfBirth: 'jakarta',
      dateOfBirth: '04-04-1998',
      howFoundUs: 'Institution / School / Courses',
      registerCity: 'Yogyakarta',
      referralName: 'QWERTY',
      covidVaccination: 'Yes'
    },
    testResults: [
      {
        testName: 'Neha',
        score: 99,
        fileResult: 'test_result_1.pdf'
      }
    ],
    experiences: [
      {
        id: '29',
        vesselName: 'INDO',
        gtLoa: 'INDONESIA',
        vesselRoute: 'Foreign Going',
        position: 'ELECTRO',
        startDate: '30-04-2024',
        endDate: '12-05-2024',
        job: 'ELECTRICITY : ELECTRICITY : ELECTRICITY'
      }
    ]
  };

  const interviewData = [
    {
      category: 'Interview Result Notes',
      status: 'Update',
      color: 'blue'
    },
    {
      category: 'Approved Position',
      status: 'Update',
      color: 'green'
    },
    {
      category: 'Marlins English Score',
      status: 'Update',
      color: 'blue'
    },
    {
      category: 'NehaICES Test',
      status: 'Update',
      color: 'blue'
    },
    {
      category: 'Test Result',
      status: 'Update',
      color: 'blue'
    },
    {
      category: 'Principal Interview By',
      status: 'Update',
      color: 'blue'
    },
    {
      category: 'Principal Interview Date',
      status: 'Monday 13th of May 2024',
      color: 'blue'
    },
    {
      category: 'Principal Interview Result',
      status: 'Approved',
      color: 'green'
    },
    {
      category: 'Approved As',
      status: 'Mermaid Man and Barnacle Boy',
      color: 'blue'
    },
    {
      category: 'Notes',
      status: 'Update',
      color: 'blue'
    },
    {
      category: 'Employment Offer',
      status: 'Received',
      color: 'green'
    },
    {
      category: 'EO Acceptance',
      status: 'Update',
      color: 'blue'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Applicant Details</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Applicant Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-gray-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{applicant.name}</h2>
                <p className="text-gray-600">{applicant.position} - {applicant.department} Department</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    {applicant.email}
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    {applicant.phone}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {applicant.address}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800">
                {applicant.status}
              </span>
              <p className="text-sm text-gray-500 mt-2">Applied: {applicant.appliedDate}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personal Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Personal Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">First Name:</span>
                  <p className="text-gray-900">{applicant.personalDetails.firstName}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Last Name:</span>
                  <p className="text-gray-900">{applicant.personalDetails.lastName}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">KTP:</span>
                  <p className="text-gray-900">{applicant.personalDetails.ktp}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Nationality:</span>
                  <p className="text-gray-900">{applicant.personalDetails.nationality}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Gender:</span>
                  <p className="text-gray-900">{applicant.personalDetails.gender}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Date of Birth:</span>
                  <p className="text-gray-900">{applicant.personalDetails.dateOfBirth}</p>
                </div>
              </div>
            </div>

            {/* Test Results */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Test Results
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Test Name</th>
                      <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Score</th>
                      <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">File Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicant.testResults.map((test, index) => (
                      <tr key={index}>
                        <td className="border border-gray-200 px-4 py-2 text-sm">{test.testName}</td>
                        <td className="border border-gray-200 px-4 py-2 text-sm">{test.score}</td>
                        <td className="border border-gray-200 px-4 py-2 text-sm">
                          <button className="text-blue-600 hover:text-blue-800">View File</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Work Experience
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Vessel Name</th>
                      <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Position</th>
                      <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Duration</th>
                      <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Job Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicant.experiences.map((exp) => (
                      <tr key={exp.id}>
                        <td className="border border-gray-200 px-4 py-2 text-sm">{exp.vesselName}</td>
                        <td className="border border-gray-200 px-4 py-2 text-sm">{exp.position}</td>
                        <td className="border border-gray-200 px-4 py-2 text-sm">{exp.startDate} - {exp.endDate}</td>
                        <td className="border border-gray-200 px-4 py-2 text-sm">{exp.job}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Interview Status */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Interview Status
              </h3>
              
              <button
                onClick={() => setShowInterviewModal(true)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors mb-4"
              >
                Schedule Interview
              </button>

              <div className="space-y-2">
                {interviewData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-sm text-gray-700">{item.category}</span>
                    <button className={`px-2 py-1 text-xs rounded ${
                      item.color === 'blue' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {item.status}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  Approve Application
                </button>
                <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                  Reject Application
                </button>
                <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                  Download CV
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <InterviewModal
        isOpen={showInterviewModal}
        onClose={() => setShowInterviewModal(false)}
        applicantName={applicant.name}
      />
    </div>
  );
};

export default ApplicantDetail;