import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Calendar, X, User } from 'lucide-react';

interface Applicant {
  id: string;
  photo: string;
  registrationNumber: string;
  firstName: string;
  lastName: string;
  shipDepartment: string;
  dateOfBirth: string;
  source: string;
  position: string;
  department: string;
  secondPosition: string;
  thirdPosition: string;
  job: string;
  age: string;
  height: string;
  weight: string;
  shipExperience: string;
  previousDepartment: string;
  educationBackground: string;
  contactNo: string;
  email: string;
  emergencyContact: string;
  cv: string;
  lastLogin: string;
  specialSkillRemark: string;
  remarks: string;
  interviewBy: string;
  interviewDate: string;
  interviewResult: string;
}

interface InterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicant: Applicant | null;
}

const InterviewModal: React.FC<InterviewModalProps> = ({ isOpen, onClose, applicant }) => {
  const [formData, setFormData] = useState({
    interviewType: 'Agent CWT',
    interviewer: '',
    office: 'Jakarta',
    interviewDate: '20-07-2025',
    meetingUrl: '',
    notes: ''
  });

  if (!isOpen || !applicant) return null;

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

          <button 
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

const SelectionGapPool: React.FC = () => {
  const navigate = useNavigate();
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [selectedApplicants, setSelectedApplicants] = useState<Applicant[]>([]);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    firstName: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    lastName: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    department: { value: null, matchMode: FilterMatchMode.EQUALS },
    position: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    interviewResult: { value: null, matchMode: FilterMatchMode.EQUALS }
  });

  const departments = ['Deck', 'Engine', 'Hotel'];
  const interviewResults = ['Approved', 'Pending', 'Rejected'];

  // Mock applicant data
  const applicants: Applicant[] = [
    {
      id: '1',
      photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      registrationNumber: 'REG001',
      firstName: 'failamir',
      lastName: 'abdullah',
      shipDepartment: 'Deck',
      dateOfBirth: '04-04-1998',
      source: 'Institution',
      position: 'Deck Officer',
      department: 'Deck',
      secondPosition: 'AB',
      thirdPosition: 'OS',
      job: 'Mermaid Man and Barnacle Boy',
      age: '26',
      height: '170',
      weight: '55',
      shipExperience: '2 years',
      previousDepartment: 'Deck',
      educationBackground: 'S2',
      contactNo: '083148263597',
      email: 'failamir@students.amikom.ac.id',
      emergencyContact: 'Father - 6283148263597',
      cv: 'View CV',
      lastLogin: '2024-01-15',
      specialSkillRemark: 'Good English',
      remarks: 'Experienced',
      interviewBy: 'John Smith',
      interviewDate: '2024-02-01',
      interviewResult: 'Approved'
    },
    {
      id: '2',
      photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      registrationNumber: 'REG002',
      firstName: 'Ahmad',
      lastName: 'Rizki',
      shipDepartment: 'Engine',
      dateOfBirth: '15-08-1995',
      source: 'Website',
      position: 'Chief Engineer',
      department: 'Engine',
      secondPosition: '2nd Engineer',
      thirdPosition: '3rd Engineer',
      job: 'Chief Engineer Officer',
      age: '29',
      height: '175',
      weight: '70',
      shipExperience: '5 years',
      previousDepartment: 'Engine',
      educationBackground: 'S1',
      contactNo: '081234567890',
      email: 'ahmad.rizki@email.com',
      emergencyContact: 'Wife - 6281234567890',
      cv: 'View CV',
      lastLogin: '2024-01-14',
      specialSkillRemark: 'Engine Expert',
      remarks: 'Highly Skilled',
      interviewBy: 'Maria Garcia',
      interviewDate: '2024-02-02',
      interviewResult: 'Pending'
    },
    {
      id: '3',
      photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      registrationNumber: 'REG003',
      firstName: 'Sari',
      lastName: 'Dewi',
      shipDepartment: 'Hotel',
      dateOfBirth: '22-03-1992',
      source: 'Social Media',
      position: 'Hotel Manager',
      department: 'Hotel',
      secondPosition: 'Assistant Manager',
      thirdPosition: 'Supervisor',
      job: 'Hotel Manager',
      age: '32',
      height: '165',
      weight: '58',
      shipExperience: '4 years',
      previousDepartment: 'Hotel',
      educationBackground: 'D3',
      contactNo: '089876543210',
      email: 'sari.dewi@email.com',
      emergencyContact: 'Mother - 6289876543210',
      cv: 'View CV',
      lastLogin: '2024-01-13',
      specialSkillRemark: 'Hospitality Expert',
      remarks: 'Professional',
      interviewBy: 'David Wilson',
      interviewDate: '2024-02-03',
      interviewResult: 'Approved'
    },
    {
      id: '4',
      photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      registrationNumber: 'REG004',
      firstName: 'Budi',
      lastName: 'Santoso',
      shipDepartment: 'Deck',
      dateOfBirth: '10-12-1990',
      source: 'Referral',
      position: 'AB Seaman',
      department: 'Deck',
      secondPosition: 'OS',
      thirdPosition: 'Cadet',
      job: 'Able Seaman',
      age: '34',
      height: '172',
      weight: '68',
      shipExperience: '6 years',
      previousDepartment: 'Deck',
      educationBackground: 'SMA',
      contactNo: '087654321098',
      email: 'budi.santoso@email.com',
      emergencyContact: 'Brother - 6287654321098',
      cv: 'View CV',
      lastLogin: '2024-01-12',
      specialSkillRemark: 'Navigation Skills',
      remarks: 'Reliable',
      interviewBy: 'John Smith',
      interviewDate: '2024-02-04',
      interviewResult: 'Approved'
    },
    {
      id: '5',
      photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      registrationNumber: 'REG005',
      firstName: 'Lisa',
      lastName: 'Permata',
      shipDepartment: 'Hotel',
      dateOfBirth: '05-07-1996',
      source: 'Institution',
      position: 'Waitress',
      department: 'Hotel',
      secondPosition: 'Steward',
      thirdPosition: 'Cleaner',
      job: 'Food Service',
      age: '28',
      height: '160',
      weight: '52',
      shipExperience: '1 year',
      previousDepartment: 'Hotel',
      educationBackground: 'SMK',
      contactNo: '085432109876',
      email: 'lisa.permata@email.com',
      emergencyContact: 'Sister - 6285432109876',
      cv: 'View CV',
      lastLogin: '2024-01-11',
      specialSkillRemark: 'Customer Service',
      remarks: 'Friendly',
      interviewBy: 'Maria Garcia',
      interviewDate: '2024-02-05',
      interviewResult: 'Pending'
    }
  ];

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
        <h4 className="m-0">Selection Gap Pool List</h4>
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search applicants..." />
        </IconField>
      </div>
    );
  };

  const photoBodyTemplate = (rowData: Applicant) => {
    return (
      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
        <img 
          src={rowData.photo} 
          alt={`${rowData.firstName} ${rowData.lastName}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center"><svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg></div>';
          }}
        />
      </div>
    );
  };

  const departmentBodyTemplate = (rowData: Applicant) => {
    const getSeverity = (department: string) => {
      switch (department) {
        case 'Deck': return 'info';
        case 'Engine': return 'danger';
        case 'Hotel': return 'success';
        default: return null;
      }
    };

    return <Tag value={rowData.department} severity={getSeverity(rowData.department)} />;
  };

  const departmentFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <Dropdown 
        value={options.value} 
        options={departments} 
        onChange={(e: DropdownChangeEvent) => options.filterCallback(e.value, options.index)} 
        placeholder="Select Department" 
        className="p-column-filter" 
        showClear 
      />
    );
  };

  const interviewResultBodyTemplate = (rowData: Applicant) => {
    const getSeverity = (result: string) => {
      switch (result) {
        case 'Approved': return 'success';
        case 'Pending': return 'warning';
        case 'Rejected': return 'danger';
        default: return null;
      }
    };

    return <Tag value={rowData.interviewResult} severity={getSeverity(rowData.interviewResult)} />;
  };

  const interviewResultFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <Dropdown 
        value={options.value} 
        options={interviewResults} 
        onChange={(e: DropdownChangeEvent) => options.filterCallback(e.value, options.index)} 
        placeholder="Select Result" 
        className="p-column-filter" 
        showClear 
      />
    );
  };

  const cvBodyTemplate = (rowData: Applicant) => {
    return (
      <Button 
        label="View CV" 
        className="p-button-link p-button-sm" 
        onClick={() => console.log('View CV for', rowData.firstName)}
      />
    );
  };

  const actionBodyTemplate = (rowData: Applicant) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-info p-button-sm"
          onClick={() => navigate(`/admin/applicant/${rowData.id}`)}
          tooltip="View Details"
        />
        <Button
          icon="pi pi-calendar"
          className="p-button-rounded p-button-success p-button-sm"
          onClick={() => {
            setSelectedApplicant(rowData);
            setShowInterviewModal(true);
          }}
          tooltip="Schedule Interview"
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-warning p-button-sm"
          tooltip="Edit"
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-sm"
          tooltip="Delete"
        />
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className="space-y-6">
      {/* Search Filter */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Search Filter</h2>
        
        <div className="flex justify-end">
          <Button 
            label="Export to Excel" 
            icon="pi pi-file-excel" 
            className="p-button-success"
          />
        </div>
      </div>

      {/* Selection Gap Pool DataTable */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Status Buttons */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            <Button label="All" className="p-button-info p-button-sm" />
            <Button label="Shortlisted" className="p-button-outlined p-button-sm" />
            <Button label="On Process" className="p-button-outlined p-button-sm" />
            <Button label="Reject" className="p-button-outlined p-button-sm" />
          </div>
        </div>

        <DataTable 
          value={applicants} 
          paginator 
          header={header} 
          rows={10}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rowsPerPageOptions={[5, 10, 25, 50]} 
          dataKey="id" 
          selectionMode="checkbox" 
          selection={selectedApplicants} 
          onSelectionChange={(e) => setSelectedApplicants(e.value as Applicant[])}
          filters={filters} 
          filterDisplay="menu" 
          globalFilterFields={['firstName', 'lastName', 'position', 'department', 'email']}
          emptyMessage="No applicants found." 
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          scrollable
          scrollHeight="600px"
        >
          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
          <Column field="photo" header="Photo" body={photoBodyTemplate} style={{ minWidth: '8rem' }} />
          <Column field="id" header="ID" sortable style={{ minWidth: '6rem' }} />
          <Column field="registrationNumber" header="Reg. Number" sortable style={{ minWidth: '10rem' }} />
          <Column field="firstName" header="First Name" sortable filter filterPlaceholder="Search by first name" style={{ minWidth: '12rem' }} />
          <Column field="lastName" header="Last Name" sortable filter filterPlaceholder="Search by last name" style={{ minWidth: '12rem' }} />
          <Column field="department" header="Department" sortable body={departmentBodyTemplate} filter filterElement={departmentFilterTemplate} style={{ minWidth: '10rem' }} />
          <Column field="dateOfBirth" header="Date of Birth" sortable style={{ minWidth: '12rem' }} />
          <Column field="source" header="Source" sortable style={{ minWidth: '10rem' }} />
          <Column field="position" header="Position" sortable filter filterPlaceholder="Search by position" style={{ minWidth: '14rem' }} />
          <Column field="secondPosition" header="2nd Position" sortable style={{ minWidth: '12rem' }} />
          <Column field="thirdPosition" header="3rd Position" sortable style={{ minWidth: '12rem' }} />
          <Column field="job" header="Job" sortable style={{ minWidth: '16rem' }} />
          <Column field="age" header="Age" sortable style={{ minWidth: '6rem' }} />
          <Column field="height" header="Height" sortable style={{ minWidth: '8rem' }} />
          <Column field="weight" header="Weight" sortable style={{ minWidth: '8rem' }} />
          <Column field="shipExperience" header="Experience" sortable style={{ minWidth: '10rem' }} />
          <Column field="educationBackground" header="Education" sortable style={{ minWidth: '10rem' }} />
          <Column field="contactNo" header="Contact" sortable style={{ minWidth: '12rem' }} />
          <Column field="email" header="Email" sortable style={{ minWidth: '16rem' }} />
          <Column field="emergencyContact" header="Emergency Contact" sortable style={{ minWidth: '16rem' }} />
          <Column field="cv" header="CV" body={cvBodyTemplate} style={{ minWidth: '8rem' }} />
          <Column field="lastLogin" header="Last Login" sortable style={{ minWidth: '10rem' }} />
          <Column field="specialSkillRemark" header="Special Skills" sortable style={{ minWidth: '12rem' }} />
          <Column field="remarks" header="Remarks" sortable style={{ minWidth: '10rem' }} />
          <Column field="interviewBy" header="Interview By" sortable style={{ minWidth: '12rem' }} />
          <Column field="interviewDate" header="Interview Date" sortable style={{ minWidth: '12rem' }} />
          <Column field="interviewResult" header="Interview Result" sortable body={interviewResultBodyTemplate} filter filterElement={interviewResultFilterTemplate} style={{ minWidth: '12rem' }} />
          <Column header="Actions" body={actionBodyTemplate} style={{ minWidth: '12rem' }} />
        </DataTable>
      </div>

      <InterviewModal
        isOpen={showInterviewModal}
        onClose={() => setShowInterviewModal(false)}
        applicant={selectedApplicant}
      />
    </div>
  );
};

export default SelectionGapPool;