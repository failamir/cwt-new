import React, { useState } from 'react';
import DeckExperience from './screening/DeckExperience';
import DeckCertificate from './screening/DeckCertificate';
import TravelDocument from './screening/TravelDocument';
import FormalEducation from './screening/FormalEducation';
import References from './screening/References';
import NextOfKin from './screening/NextOfKin';
import EmergencyContact from './screening/EmergencyContact';

type ScreeningTab = 'deck-experience' | 'deck-certificate' | 'travel-document' | 'formal-education' | 'references' | 'next-of-kin' | 'emergency-contact';

const Screening: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ScreeningTab>('deck-experience');

  const tabs = [
    { id: 'deck-experience', label: 'Deck Experience' },
    { id: 'deck-certificate', label: 'Deck Certificate' },
    { id: 'travel-document', label: 'Travel Document' },
    { id: 'formal-education', label: 'Formal Education Background' },
    { id: 'references', label: 'References' },
    { id: 'next-of-kin', label: 'Next Of Kin' },
    { id: 'emergency-contact', label: 'Emergency Contact Details' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'deck-experience':
        return <DeckExperience />;
      case 'deck-certificate':
        return <DeckCertificate />;
      case 'travel-document':
        return <TravelDocument />;
      case 'formal-education':
        return <FormalEducation />;
      case 'references':
        return <References />;
      case 'next-of-kin':
        return <NextOfKin />;
      case 'emergency-contact':
        return <EmergencyContact />;
      default:
        return <DeckExperience />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub Navigation */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as ScreeningTab)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Screening;