import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User, FileText, CheckCircle } from 'lucide-react';
import ApplicationForm from '../ApplicationForm';

const UserDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mock job data for the application
  const mockJob = {
    id: '1',
    title: 'Deck Officer',
    department: 'deck' as const,
    company: 'Maritime Corp',
    location: 'International Waters',
    urgent: false,
    datePosted: '25/06/2023',
    expirationDate: '01/01/2030',
    experience: 'Fresh',
    gender: 'male',
    requirements: [
      'Valid certificates as per STCW 2010',
      'Min 1 Year Experience in the same position',
      'Good English communication',
      'Fully vaccination C-19'
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Maritime Career Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">{user?.firstName} {user?.lastName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Welcome, {user?.firstName}!</h2>
              <p className="text-gray-600">Complete your application to apply for maritime positions</p>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="font-medium text-blue-900">Application Status</h3>
            </div>
            <p className="text-blue-700 text-sm">
              Please complete all three steps of your application: Personal Details, Pre-Screening, and Screening.
            </p>
          </div>
        </div>

        {/* Application Form */}
        <ApplicationForm 
          job={mockJob}
          onBack={() => navigate('/')}
        />
      </div>
    </div>
  );
};

export default UserDashboard;