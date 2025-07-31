import React, { useState } from 'react';
import { Ship, ChevronDown, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthModal from '../auth/AuthModal';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <Ship className="w-8 h-8 text-blue-600 mr-2" />
              <div>
                <div className="text-lg font-bold text-gray-900">Wira Manning Services</div>
                <div className="text-xs text-gray-600">PT.Cipta Wira Tirta</div>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button 
                  onClick={() => navigate('/')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Home
                </button>
                <button 
                  onClick={() => navigate('/about')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive('/about') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  About Us
                </button>
                <div 
                  className="relative group"
                >
                  <button 
                    onClick={() => setShowServicesDropdown(!showServicesDropdown)}
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium flex items-center"
                  >
                    Our Services
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </button>
                  {showServicesDropdown && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                      <button 
                        onClick={() => {
                          navigate('/insurance');
                          setShowServicesDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Insurance
                      </button>
                      <button 
                        onClick={() => {
                          navigate('/manning-services');
                          setShowServicesDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Manning Services
                      </button>
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => navigate('/safety-policy')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive('/safety-policy') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Safety & Quality Policy
                </button>
                <button 
                  onClick={() => navigate('/contact')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive('/contact') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Contact
                </button>
                <button 
                  onClick={() => navigate('/jobs')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive('/jobs') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Jobs
                </button>
                
              </div>
            </div>

            <button 
              onClick={() => setShowAuthModal(true)}
              className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center mb-6">
                <Ship className="w-8 h-8 text-white mr-2" />
                <div>
                  <div className="text-lg font-bold">Wira Manning Services</div>
                  <div className="text-sm text-blue-200">PT.Cipta Wira Tirta</div>
                </div>
              </div>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Follow Us</h3>
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6 text-blue-200 hover:text-white cursor-pointer" />
                <Instagram className="w-6 h-6 text-blue-200 hover:text-white cursor-pointer" />
                <Linkedin className="w-6 h-6 text-blue-200 hover:text-white cursor-pointer" />
              </div>
            </div>

            {/* Offices */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Offices</h3>
              <div className="flex flex-wrap gap-2">
                {['Jakarta', 'Bali', 'Yogyakarta', 'Surabaya', 'Bandung'].map((city) => (
                  <button
                    key={city}
                    className="bg-blue-800 hover:bg-blue-700 px-3 py-1 rounded text-sm transition-colors"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-blue-800 mt-12 pt-8 text-center text-blue-200">
            <p>© 2022 Kardusinfo Indonesia. All Right Reserved.</p>
          </div>
        </div>
      </footer>
      
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
};

export default Layout;