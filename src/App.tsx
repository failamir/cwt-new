import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/shared/Layout';
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import InsurancePage from './components/pages/InsurancePage';
import ManningServicesPage from './components/pages/ManningServicesPage';
import SafetyPolicyPage from './components/pages/SafetyPolicyPage';
import ContactPage from './components/pages/ContactPage';
import JobsPage from './components/pages/JobsPage';
import RecruitmentProcedurePage from './components/pages/RecruitmentProcedurePage';
import JobDetail from './components/JobDetail';
import ApplicationForm from './components/ApplicationForm';
import UserDashboard from './components/dashboard/UserDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import ApplicantDetail from './components/dashboard/ApplicantDetail';

export type Department = 'deck' | 'hotel' | 'engine';

export interface Job {
  id: string;
  title: string;
  department: Department;
  company: string;
  location: string;
  urgent: boolean;
  datePosted: string;
  expirationDate: string;
  experience: string;
  gender: string;
  requirements: string[];
}

const sampleJobs: Job[] = [
  {
    id: '1',
    title: 'Mermaid Man and Barnacle Boy',
    department: 'deck',
    company: 'Pesiar SEA',
    location: 'International Waters',
    urgent: true,
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
  },
  {
    id: '2',
    title: 'Chief Engineer Officer',
    department: 'engine',
    company: 'Maritime Corp',
    location: 'Southeast Asia',
    urgent: false,
    datePosted: '20/06/2023',
    expirationDate: '15/12/2023',
    experience: '5+ Years',
    gender: 'any',
    requirements: [
      'Chief Engineer COC',
      'Minimum 3 years experience as 2nd Engineer',
      'STCW Basic Safety Training',
      'Good communication skills'
    ]
  },
  {
    id: '3',
    title: 'Hotel Manager',
    department: 'hotel',
    company: 'Cruise Lines',
    location: 'Caribbean Route',
    urgent: true,
    datePosted: '22/06/2023',
    expirationDate: '30/11/2023',
    experience: '3+ Years',
    gender: 'any',
    requirements: [
      'Hotel management degree',
      'Cruise ship experience preferred',
      'Fluent in English',
      'Leadership skills'
    ]
  }
];

function AppContent() {
  const { user, isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState<'listing' | 'detail' | 'application'>('listing');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
    setCurrentView('detail');
  };

  const handleApply = () => {
    setCurrentView('application');
  };

  const handleBackToListing = () => {
    setCurrentView('listing');
    setSelectedJob(null);
  };

  const handleBackToDetail = () => {
    setCurrentView('detail');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/about" element={<Layout><AboutPage /></Layout>} />
          <Route path="/insurance" element={<Layout><InsurancePage /></Layout>} />
          <Route path="/manning-services" element={<Layout><ManningServicesPage /></Layout>} />
          <Route path="/safety-policy" element={<Layout><SafetyPolicyPage /></Layout>} />
          <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
          <Route path="/jobs" element={<Layout><JobsPage /></Layout>} />
          <Route path="/recruitment-procedure" element={<Layout><RecruitmentProcedurePage /></Layout>} />
          
          <Route path="/job/:id" element={
            selectedJob ? (
              <JobDetail 
                job={selectedJob} 
                onApply={handleApply}
                onBack={handleBackToListing}
              />
            ) : (
              <Navigate to="/jobs" />
            )
          } />
          
          <Route path="/apply" element={
            selectedJob && isAuthenticated ? (
              <ApplicationForm 
                job={selectedJob}
                onBack={handleBackToDetail}
              />
            ) : (
              <Navigate to="/jobs" />
            )
          } />
          
          <Route path="/dashboard" element={
            isAuthenticated ? (
              user?.role === 'admin' ? (
                <AdminDashboard />
              ) : (
                <UserDashboard />
              )
            ) : (
              <Navigate to="/" />
            )
          } />
          
          <Route path="/admin/applicant/:id" element={
            isAuthenticated && user?.role === 'admin' ? (
              <ApplicantDetail />
            ) : (
              <Navigate to="/" />
            )
          } />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;