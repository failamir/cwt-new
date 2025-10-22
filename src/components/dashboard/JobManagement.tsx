import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Search, Filter } from 'lucide-react';
import { JobService } from '../../services/jobService';
import type { Job as DbJob } from '../../lib/types';

interface Job {
  id: string;
  title: string;
  // Local-only fields for UI; mapped to DB fields
  slug?: string;
  content?: string; // maps to description
  department: string; // Deck | Engine | Hotel (UI) -> deck | engine | hotel (DB)
  principal: string; // maps to company
  expirationDate: string; // maps to expiration_date
  gender: string; // Male | Female | Any -> male | female | any
  isUrgent: boolean; // maps to urgent
  status?: string; // Not stored in DB
  createdDate: string; // maps to date_posted
}

interface JobFormData {
  title: string;
  slug: string;
  content: string;
  department: string;
  principal: string;
  expirationDate: string;
  gender: string;
  isUrgent: string;
  status: string;
}

const JobManagement: React.FC = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    slug: '',
    content: '',
    department: '',
    principal: '',
    expirationDate: '',
    gender: '',
    isUrgent: '',
    status: ''
  });

  const departments = ['Deck', 'Engine', 'Hotel'];
  const genderOptions = ['Male', 'Female', 'Any'];
  const urgentOptions = ['Yes', 'No'];
  const statusOptions = ['Active', 'Inactive', 'Draft'];

  const [jobs, setJobs] = useState<Job[]>([]);

  // Helpers to map between DB and UI models
  const dbToUi = (j: DbJob): Job => ({
    id: j.id as string,
    title: j.title,
    slug: '',
    content: j.description || '',
    department: j.department === 'deck' ? 'Deck' : j.department === 'engine' ? 'Engine' : 'Hotel',
    principal: j.company,
    expirationDate: j.expiration_date,
    gender: j.gender === 'male' ? 'Male' : j.gender === 'female' ? 'Female' : 'Any',
    isUrgent: !!j.urgent,
    status: 'Active',
    createdDate: j.date_posted,
  });

  const uiToDb = (f: JobFormData): Omit<DbJob, 'id' | 'created_at' | 'updated_at'> => ({
    title: f.title,
    department: f.department.toLowerCase() as DbJob['department'],
    company: f.principal,
    location: 'N/A',
    urgent: f.isUrgent === 'Yes',
    date_posted: new Date().toISOString().split('T')[0],
    expiration_date: f.expirationDate,
    experience: 'N/A',
    gender: f.gender.toLowerCase() as DbJob['gender'],
    requirements: [],
    salary: undefined,
    description: f.content,
  });

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await JobService.getAllJobs();
      setJobs((data || []).map(dbToUi));
    } catch (e: any) {
      setError('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.principal.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || 
                             job.department.toLowerCase() === selectedDepartment.toLowerCase();
    return matchesSearch && matchesDepartment;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({
        ...prev,
        slug
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      content: '',
      department: '',
      principal: '',
      expirationDate: '',
      gender: '',
      isUrgent: '',
      status: ''
    });
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (editingId) {
        // Update
        const updates = uiToDb(formData);
        const updated = await JobService.updateJob(editingId, updates as Partial<DbJob>);
        if (!updated) throw new Error('Failed to update job');
      } else {
        // Create
        const payload = uiToDb(formData);
        const created = await JobService.createJob(payload);
        if (!created) throw new Error('Failed to create job');
      }
      await loadJobs();
      resetForm();
      setShowCreateForm(false);
    } catch (err: any) {
      setError(err.message || 'Failed to submit');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const ok = await JobService.deleteJob(id);
      if (!ok) throw new Error('Failed to delete');
      await loadJobs();
    } catch (e: any) {
      setError(e.message || 'Failed to delete');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (job: Job) => {
    setEditingId(job.id);
    setShowCreateForm(true);
    setFormData({
      title: job.title,
      slug: job.slug || '',
      content: job.content || '',
      department: job.department,
      principal: job.principal,
      expirationDate: job.expirationDate,
      gender: job.gender,
      isUrgent: job.isUrgent ? 'Yes' : 'No',
      status: job.status || ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Job Management</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {editingId ? 'Edit Job' : 'Create Job'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 px-4 py-2 rounded">{error}</div>
      )}

      {/* Create Job Form */}
      {showCreateForm && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{editingId ? 'Edit Job' : 'Create Job'}</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Job description and requirements..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">-- Please Select --</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Principal
                </label>
                <select
                  name="principal"
                  value={formData.principal}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">-- Please Select --</option>
                  {['Pertamina International Shipping', 'Alpha Adriatic', 'SeaQuest', 'SeaChef', 'FredOlsen', 'NYK Shipmanagement', 'Norwegian Cruise Line'].map(principal => (
                    <option key={principal} value={principal}>{principal}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiration Date
                </label>
                <input
                  type="date"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Please select</option>
                  {genderOptions.map(gender => (
                    <option key={gender} value={gender}>{gender}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Is Urgent
                </label>
                <select
                  name="isUrgent"
                  value={formData.isUrgent}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Please select</option>
                  {urgentOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Please select</option>
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {editingId ? 'Save Changes' : 'Create Job'}
              </button>
              <button
                type="button"
                onClick={() => { setShowCreateForm(false); resetForm(); }}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => resetForm()}
                  className="bg-yellow-100 text-yellow-800 px-6 py-2 rounded-lg hover:bg-yellow-200 transition-colors"
                >
                  Reset
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept.toLowerCase()}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Jobs List</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiration Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Urgent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading && (
                <tr>
                  <td colSpan={9} className="px-6 py-4 text-center text-sm text-gray-500">Loading...</td>
                </tr>
              )}
              {!loading && filteredJobs.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-4 text-center text-sm text-gray-500">No jobs found</td>
                </tr>
              )}
              {!loading && filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{job.title}</div>
                    {job.slug && <div className="text-sm text-gray-500">{job.slug}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      job.department === 'Deck' ? 'bg-blue-100 text-blue-800' :
                      job.department === 'Engine' ? 'bg-red-100 text-red-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {job.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.principal}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.expirationDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      job.isUrgent ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {job.isUrgent ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      job.status === 'Active' ? 'bg-green-100 text-green-800' :
                      job.status === 'Inactive' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.createdDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => startEdit(job)} className="text-green-600 hover:text-green-900" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(job.id)}
                        className="text-red-600 hover:text-red-900" 
                        title="Delete"
                      >
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
  );
};

export default JobManagement;