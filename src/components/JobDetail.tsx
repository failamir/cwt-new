import React from 'react';
import { ArrowLeft, Calendar, Clock, User, Users, MapPin, Bookmark, Share2 } from 'lucide-react';
import { Facebook, MessageCircle, Instagram } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { Job } from '../App';

interface JobDetailProps {
  job: Job;
  onApply: () => void;
  onBack: () => void;
}

const JobDetail: React.FC<JobDetailProps> = ({ job, onApply, onBack }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'deck': return 'bg-blue-100 text-blue-800';
      case 'engine': return 'bg-red-100 text-red-800';
      case 'hotel': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Job Listings
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">{job.department.charAt(0).toUpperCase()}{job.department.slice(1)} Department</span>
                    </div>
                    {job.urgent && (
                      <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
                        Urgent
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${getDepartmentColor(job.department)}`}>
                      {job.company}
                    </span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Bookmark className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements:</h2>
                <ul className="space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-gray-400 mt-1">-</span>
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t pt-6">
                <button
                  onClick={onApply}
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors mr-4"
                >
                  Recruitment Procedure
                </button>
                
                {isAuthenticated && (
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Go to Dashboard
                  </button>
                )}
              </div>

              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this job</h3>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </button>
                  <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </button>
                  <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div className="text-center mb-6">
                <button
                  onClick={onApply}
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                >
                  Apply For Job
                </button>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Overview</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Date Posted:</p>
                    <p className="text-gray-600">Posted {job.datePosted}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Expiration date:</p>
                    <p className="text-gray-600">{job.expirationDate}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Experience:</p>
                    <p className="text-gray-600">{job.experience}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Gender:</p>
                    <p className="text-gray-600">{job.gender}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;