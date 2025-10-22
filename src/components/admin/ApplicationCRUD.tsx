import React, { useState, useEffect } from 'react';
import { ApplicationService } from '../../services/applicationService';
import type { Application } from '../../lib/types';

const ApplicationCRUD: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Application['status'] | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    setLoading(true);
    try {
      const data = await ApplicationService.getAllApplications();
      setApplications(data);
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicationId: string, newStatus: Application['status']) => {
    setLoading(true);
    try {
      const updated = await ApplicationService.updateApplicationStatus(applicationId, newStatus);
      if (updated) {
        setApplications(applications.map(app => 
          app.id === applicationId ? updated : app
        ));
      }
    } catch (error) {
      console.error('Error updating application status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus application ini?')) {
      setLoading(true);
      try {
        const success = await ApplicationService.deleteApplication(id);
        if (success) {
          setApplications(applications.filter(app => app.id !== id));
        }
      } catch (error) {
        console.error('Error deleting application:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'shortlisted':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: Application['status']) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      case 'shortlisted':
        return 'Shortlisted';
      default:
        return status;
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      (app.jobs?.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (app.users?.email?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manajemen Application</h2>
        <button
          onClick={loadApplications}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Cari berdasarkan job title atau email user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as Application['status'] | 'all')}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">Semua Status</option>
          <option value="pending">Pending</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Applications List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job & Applicant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal Apply
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredApplications.map((application) => (
              <tr key={application.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {application.jobs?.title || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {application.users?.email || 'N/A'}
                    </div>
                    <div className="text-xs text-gray-400">
                      {application.jobs?.company || 'N/A'} • {application.jobs?.location || 'N/A'}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                    {getStatusLabel(application.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {application.created_at ? new Date(application.created_at).toLocaleDateString('id-ID') : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex flex-col space-y-2">
                    {/* Status Change Buttons */}
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleStatusChange(application.id!, 'pending')}
                        disabled={application.status === 'pending' || loading}
                        className={`px-2 py-1 text-xs rounded ${
                          application.status === 'pending'
                            ? 'bg-yellow-200 text-yellow-800 cursor-not-allowed'
                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        }`}
                      >
                        Pending
                      </button>
                      <button
                        onClick={() => handleStatusChange(application.id!, 'shortlisted')}
                        disabled={application.status === 'shortlisted' || loading}
                        className={`px-2 py-1 text-xs rounded ${
                          application.status === 'shortlisted'
                            ? 'bg-blue-200 text-blue-800 cursor-not-allowed'
                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                      >
                        Shortlist
                      </button>
                      <button
                        onClick={() => handleStatusChange(application.id!, 'approved')}
                        disabled={application.status === 'approved' || loading}
                        className={`px-2 py-1 text-xs rounded ${
                          application.status === 'approved'
                            ? 'bg-green-200 text-green-800 cursor-not-allowed'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(application.id!, 'rejected')}
                        disabled={application.status === 'rejected' || loading}
                        className={`px-2 py-1 text-xs rounded ${
                          application.status === 'rejected'
                            ? 'bg-red-200 text-red-800 cursor-not-allowed'
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                      >
                        Reject
                      </button>
                    </div>
                    
                    {/* View Details Button */}
                    <button
                      onClick={() => {
                        // TODO: Implement view details modal/page
                        console.log('View application details:', application.id);
                      }}
                      className="text-indigo-600 hover:text-indigo-900 text-xs"
                    >
                      Lihat Detail
                    </button>
                    
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(application.id!)}
                      className="text-red-600 hover:text-red-900 text-xs"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredApplications.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          Tidak ada application yang ditemukan
        </div>
      )}

      {/* Application Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">
            {applications.length}
          </div>
          <div className="text-sm text-blue-600">Total Applications</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {applications.filter(app => app.status === 'pending').length}
          </div>
          <div className="text-sm text-yellow-600">Pending</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">
            {applications.filter(app => app.status === 'shortlisted').length}
          </div>
          <div className="text-sm text-blue-600">Shortlisted</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">
            {applications.filter(app => app.status === 'approved').length}
          </div>
          <div className="text-sm text-green-600">Approved</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-600">
            {applications.filter(app => app.status === 'rejected').length}
          </div>
          <div className="text-sm text-red-600">Rejected</div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCRUD;



