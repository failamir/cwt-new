import React, { useState } from 'react';
import { Calendar, Plane, Ship, Car, Train, Search, Filter, Edit, Eye } from 'lucide-react';

interface ScheduleItem {
  id: string;
  applicantName: string;
  position: string;
  department: string;
  principal: string;
  vessel: string;
  departureDate: string;
  transportation: string;
  departureLocation: string;
  arrivalLocation: string;
  notes: string;
  status: string;
  photo: string;
}

interface ScheduleFormData {
  departureDate: string;
  transportation: string;
  departureLocation: string;
  arrivalLocation: string;
  notes: string;
}

const Schedule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<ScheduleItem | null>(null);
  const [scheduleForm, setScheduleForm] = useState<ScheduleFormData>({
    departureDate: '',
    transportation: '',
    departureLocation: '',
    arrivalLocation: '',
    notes: ''
  });

  // Mock data untuk pelamar yang sudah lolos interview
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    {
      id: '1',
      applicantName: 'failamir abdullah',
      position: 'Deck Officer',
      department: 'Deck',
      principal: 'Norwegian Cruise Line',
      vessel: 'NCL Spirit',
      departureDate: '2024-03-15',
      transportation: 'Flight',
      departureLocation: 'Jakarta (CGK)',
      arrivalLocation: 'Miami (MIA)',
      notes: 'Bring all required documents. Flight details will be sent via email.',
      status: 'Scheduled',
      photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '2',
      applicantName: 'Ahmad Rizki',
      position: 'Chief Engineer',
      department: 'Engine',
      principal: 'NYK Shipmanagement',
      vessel: 'NYK Cosmos',
      departureDate: '2024-03-20',
      transportation: 'Flight + Train',
      departureLocation: 'Surabaya (MLG)',
      arrivalLocation: 'Rotterdam (RTM)',
      notes: 'Transit in Singapore. Train from Amsterdam to Rotterdam.',
      status: 'Confirmed',
      photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '3',
      applicantName: 'Sari Dewi',
      position: 'Hotel Manager',
      department: 'Hotel',
      principal: 'FredOlsen',
      vessel: 'Balmoral',
      departureDate: '2024-03-25',
      transportation: 'Flight',
      departureLocation: 'Jakarta (CGK)',
      arrivalLocation: 'Southampton (SOU)',
      notes: 'Direct flight. Hotel accommodation arranged for one night.',
      status: 'Pending',
      photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '4',
      applicantName: 'Budi Santoso',
      position: 'AB Seaman',
      department: 'Deck',
      principal: 'Alpha Adriatic',
      vessel: 'Alpha Star',
      departureDate: '2024-04-01',
      transportation: 'Flight + Bus',
      departureLocation: 'Jakarta (CGK)',
      arrivalLocation: 'Split, Croatia',
      notes: 'Flight to Zagreb, then bus to Split. Vessel joining at Split port.',
      status: 'Scheduled',
      photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ]);

  const filteredSchedule = scheduleItems.filter(item => {
    const matchesSearch = item.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.vessel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || 
                             item.department.toLowerCase() === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getTransportationIcon = (transportation: string) => {
    if (transportation.includes('Flight')) return <Plane className="w-4 h-4" />;
    if (transportation.includes('Ship')) return <Ship className="w-4 h-4" />;
    if (transportation.includes('Train')) return <Train className="w-4 h-4" />;
    if (transportation.includes('Bus') || transportation.includes('Car')) return <Car className="w-4 h-4" />;
    return <Plane className="w-4 h-4" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleScheduleEdit = (item: ScheduleItem) => {
    setSelectedApplicant(item);
    setScheduleForm({
      departureDate: item.departureDate,
      transportation: item.transportation,
      departureLocation: item.departureLocation,
      arrivalLocation: item.arrivalLocation,
      notes: item.notes
    });
    setShowScheduleForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedApplicant) {
      setScheduleItems(scheduleItems.map(item => 
        item.id === selectedApplicant.id 
          ? { ...item, ...scheduleForm, status: 'Confirmed' }
          : item
      ));
    }
    setShowScheduleForm(false);
    setSelectedApplicant(null);
  };

  const transportationOptions = [
    'Flight',
    'Flight + Train',
    'Flight + Bus',
    'Ship',
    'Train',
    'Bus',
    'Car'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Schedule Management</h2>
        <div className="text-sm text-gray-600">
          Manage departure schedules for approved applicants
        </div>
      </div>

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
                placeholder="Search by name, position, or vessel..."
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
              <option value="deck">Deck</option>
              <option value="engine">Engine</option>
              <option value="hotel">Hotel</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Export Schedule
            </button>
          </div>
        </div>
      </div>

      {/* Schedule Form Modal */}
      {showScheduleForm && selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Schedule Departure - {selectedApplicant.applicantName}
              </h3>
            </div>
            
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departure Date
                  </label>
                  <input
                    type="date"
                    value={scheduleForm.departureDate}
                    onChange={(e) => setScheduleForm({...scheduleForm, departureDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transportation
                  </label>
                  <select
                    value={scheduleForm.transportation}
                    onChange={(e) => setScheduleForm({...scheduleForm, transportation: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Transportation</option>
                    {transportationOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departure Location
                  </label>
                  <input
                    type="text"
                    value={scheduleForm.departureLocation}
                    onChange={(e) => setScheduleForm({...scheduleForm, departureLocation: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Jakarta (CGK)"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Arrival Location
                  </label>
                  <input
                    type="text"
                    value={scheduleForm.arrivalLocation}
                    onChange={(e) => setScheduleForm({...scheduleForm, arrivalLocation: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Miami (MIA)"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  value={scheduleForm.notes}
                  onChange={(e) => setScheduleForm({...scheduleForm, notes: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Additional notes, instructions, or requirements..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Schedule
                </button>
                <button
                  type="button"
                  onClick={() => setShowScheduleForm(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Departure Schedule</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal/Vessel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transportation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSchedule.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 mr-3">
                        <img 
                          src={item.photo} 
                          alt={item.applicantName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.applicantName}</div>
                        <div className="text-sm text-gray-500">{item.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.principal}</div>
                    <div className="text-sm text-gray-500">{item.vessel}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {item.departureDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      {getTransportationIcon(item.transportation)}
                      <span className="ml-2">{item.transportation}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.departureLocation}</div>
                    <div className="text-sm text-gray-500">→ {item.arrivalLocation}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleScheduleEdit(item)}
                        className="text-blue-600 hover:text-blue-900" 
                        title="Edit Schedule"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSchedule.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No scheduled departures found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;