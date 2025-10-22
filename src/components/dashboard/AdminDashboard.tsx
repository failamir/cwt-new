import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LogOut, 
  Users, 
  FileText, 
  Calendar, 
  Mail, 
  Settings,
  BarChart3,
  Menu,
  X,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Download
} from 'lucide-react';
import SelectionGapPool from './SelectionGapPool';
import JobManagement from './JobManagement';
import Schedule from './Schedule';

interface Applicant {
  id: string;
  name: string;
  position: string;
  department: string;
  status: string;
  appliedDate: string;
  experience: string;
  email: string;
  phone: string;
}

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [editFormData, setEditFormData] = useState<Applicant>({
    id: '',
    name: '',
    position: '',
    department: '',
    status: '',
    appliedDate: '',
    experience: '',
    email: '',
    phone: ''
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mock applicant data
  const [applicants, setApplicants] = useState<Applicant[]>([
    {
      id: '1',
      name: 'failamir abdullah',
      position: 'Deck Officer',
      department: 'Deck',
      status: 'Under Review',
      appliedDate: '2024-01-15',
      experience: '2 years',
      email: 'failamir@students.amikom.ac.id',
      phone: '+6283148263597'
    },
    {
      id: '2',
      name: 'John Smith',
      position: 'Chief Engineer',
      department: 'Engine',
      status: 'Interview Scheduled',
      appliedDate: '2024-01-14',
      experience: '5 years',
      email: 'john.smith@email.com',
      phone: '+6281234567890'
    },
    {
      id: '3',
      name: 'Maria Garcia',
      position: 'Hotel Manager',
      department: 'Hotel',
      status: 'Approved',
      appliedDate: '2024-01-13',
      experience: '3 years',
      email: 'maria.garcia@email.com',
      phone: '+6289876543210'
    }
  ]);

  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || 
                             applicant.department.toLowerCase() === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Interview Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const sidebarItems = [
    { icon: BarChart3, label: 'Dashboard', active: activeMenuItem === 'Dashboard' },
    { icon: Settings, label: 'Job Settings', active: activeMenuItem === 'Job Settings' },
    { icon: Users, label: 'Selection Gap Pool', active: activeMenuItem === 'Selection Gap Pool' },
    { icon: Calendar, label: 'Schedule', active: activeMenuItem === 'Schedule' },
    { icon: Mail, label: 'Messages', badge: '3' },
    { icon: FileText, label: 'Testimoni' },
    { icon: Users, label: 'User management' },
    { icon: Settings, label: 'Advance Configuration' },
    { icon: Settings, label: 'Change password' }
  ];

  const handleMenuClick = (menuLabel: string) => {
    setActiveMenuItem(menuLabel);
    setSidebarOpen(false);
  };

  const handleEditClick = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setEditFormData(applicant);
    setEditModalOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update applicant data in the state
    setApplicants(prevApplicants => 
      prevApplicants.map(app => 
        app.id === editFormData.id ? editFormData : app
      )
    );
    setEditModalOpen(false);
    setSelectedApplicant(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-600 to-blue-800 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 bg-blue-700">
          <h1 className="text-white font-bold text-lg">Cipta Wira Tirta</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="mt-8 px-4">
          {sidebarItems.map((item, index) => (
            <div key={index} className="mb-2">
              <button 
                onClick={() => handleMenuClick(item.label)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${item.active ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700'}`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            </div>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-blue-100 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0 overflow-hidden">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-4 text-gray-600"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Hello, {user?.firstName} {user?.lastName}</span>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        {activeMenuItem === 'Dashboard' && (
          <div className="p-6 overflow-auto" style={{height: 'calc(100vh - 80px)'}}>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
              <div className="text-3xl font-bold">30</div>
              <div className="text-blue-100">Total Jobs</div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
              <div className="text-3xl font-bold">316</div>
              <div className="text-blue-100">Total Candidate</div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
              <div className="text-3xl font-bold">7</div>
              <div className="text-blue-100">Total Principal</div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
              <div className="text-3xl font-bold">316</div>
              <div className="text-blue-100">Total Applicants</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Registered Users Chart */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Registered Users</h3>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Chart placeholder</span>
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Account Information</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-blue-100">Account Name:</span>
                  <div className="font-medium">{user?.firstName} {user?.lastName}</div>
                </div>
                <div>
                  <span className="text-blue-100">Account Email:</span>
                  <div className="font-medium">{user?.email}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Applicants Table */}
          <div className="bg-white rounded-lg shadow-sm mt-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-0">Recent Applicants</h3>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search applicants..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Departments</option>
                    <option value="deck">Deck</option>
                    <option value="engine">Engine</option>
                    <option value="hotel">Hotel</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg max-w-full">
              <div className="overflow-x-auto overflow-y-auto max-h-96 max-w-full">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredApplicants.map((applicant) => (
                      <tr key={applicant.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{applicant.name}</div>
                            <div className="text-sm text-gray-500">{applicant.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {applicant.position}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {applicant.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(applicant.status)}`}>
                            {applicant.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {applicant.appliedDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => navigate(`/admin/applicant/${applicant.id}`)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleEditClick(applicant)}
                              className="text-green-600 hover:text-green-900"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Selection Gap Pool */}
        {activeMenuItem === 'Selection Gap Pool' && (
          <div className="p-6">
            <SelectionGapPool />
          </div>
        )}

        {/* Job Management */}
        {activeMenuItem === 'Job Settings' && (
          <div className="p-6">
            <JobManagement />
          </div>
        )}

        {/* Schedule */}
        {activeMenuItem === 'Schedule' && (
          <div className="p-6">
            <Schedule />
          </div>
        )}

      </div>
      
      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Edit Applicant</h3>
              <button
                onClick={() => setEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  type="text"
                  name="position"
                  value={editFormData.position}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  name="department"
                  value={editFormData.department}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="Deck">Deck</option>
                  <option value="Engine">Engine</option>
                  <option value="Hotel">Hotel</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={editFormData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="Under Review">Under Review</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={editFormData.experience}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={editFormData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;