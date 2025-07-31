import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import PersonalDetail from './application/PersonalDetail';
import PreScreening from './application/PreScreening';
import Screening from './application/Screening';
import type { Job } from '../App';

interface ApplicationFormProps {
  job: Job;
  onBack: () => void;
}

type ApplicationStep = 'personal' | 'prescreening' | 'screening';

const ApplicationForm: React.FC<ApplicationFormProps> = ({ job, onBack }) => {
  const [currentStep, setCurrentStep] = useState<ApplicationStep>('personal');

  const steps = [
    { id: 'personal', label: 'STEP 1 : Personal Detail' },
    { id: 'prescreening', label: 'STEP 2 : Pre Screening' },
    { id: 'screening', label: 'STEP 3 : Screening' }
  ];

  const handleStepChange = (step: ApplicationStep) => {
    setCurrentStep(step);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Job Details
        </button>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Application for: {job.title}
          </h1>

          {/* Step Navigation */}
          <div className="flex flex-wrap gap-2 mb-6">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => handleStepChange(step.id as ApplicationStep)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentStep === step.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                }`}
              >
                {step.label}
              </button>
            ))}
          </div>

          {/* Step Content */}
          {currentStep === 'personal' && <PersonalDetail />}
          {currentStep === 'prescreening' && <PreScreening />}
          {currentStep === 'screening' && <Screening />}
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;