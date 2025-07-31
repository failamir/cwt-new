import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Ship, Users, Shield, Award, Facebook, Instagram, Linkedin } from 'lucide-react';

const LandingPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Your Dream Jobs Are Waiting',
      subtitle: 'Professional Maritime Recruitment Services'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Excellence in Maritime Services',
      subtitle: 'Connecting Talent with Opportunity'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Global Maritime Solutions',
      subtitle: 'Your Trusted Partner at Sea'
    }
  ];

  const partners = [
    { name: 'NYK Shipmanagement', logo: 'https://via.placeholder.com/120x60/4F46E5/white?text=NYK' },
    { name: 'Fred Olsen Cruise Lines', logo: 'https://via.placeholder.com/120x60/06B6D4/white?text=Fred+Olsen' },
    { name: 'SeaQuest', logo: 'https://via.placeholder.com/120x60/10B981/white?text=SeaQuest' },
    { name: 'Alpha Adriatic', logo: 'https://via.placeholder.com/120x60/F59E0B/white?text=Alpha' },
    { name: 'Pertamina', logo: 'https://via.placeholder.com/120x60/EF4444/white?text=Pertamina' },
    { name: 'Norwegian', logo: 'https://via.placeholder.com/120x60/8B5CF6/white?text=Norwegian' }
  ];

  const teamPhotos = [
    { title: 'Jakarta Team', image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
    { title: 'Yogyakarta Team', image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
    { title: 'Surabaya Team', image: 'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
    { title: 'Bali Team', image: 'https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
    { title: 'Bandung Team', image: 'https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
    { title: 'Family Gathering to Bogor', image: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
    { title: 'Ship Visit - Norwegian Jewel', image: 'https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
    { title: 'Kegiatan Badminton', image: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
    { title: 'Crew Fred Olsen', image: 'https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
    { title: 'Ship Visit - Norwegian Jewel', image: 'https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Ship className="w-8 h-8 text-blue-600 mr-2" />
              <div>
                <div className="text-lg font-bold text-gray-900">Wira Manning Services</div>
                <div className="text-xs text-gray-600">PT.Cipta Wira Tirta</div>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#home" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">Home</a>
                <a href="#about" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">About Us</a>
                <div className="relative group">
                  <button className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium flex items-center">
                    Our Services
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <a href="#insurance" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Insurance</a>
                    <a href="#manning" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Manning Services</a>
                  </div>
                </div>
                <a href="#safety" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">Safety & Quality Policy</a>
                <a href="#contact" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">Contact</a>
                <a href="#jobs" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">Jobs</a>
              </div>
            </div>

            <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Slider */}
      <section id="home" className="relative h-screen overflow-hidden">
        <div className="relative h-full">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                className="h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              </div>
            </div>
          ))}
          
          {/* Hero Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                {heroSlides[currentSlide].subtitle}
              </p>
              <div className="space-x-4">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Find Jobs
                </button>
                <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                  Recruitment Procedure
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Partners Section */}
        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-95 py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center items-center space-x-8 overflow-x-auto">
              {partners.map((partner, index) => (
                <div key={index} className="flex-shrink-0">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-12 object-contain opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Us</h2>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <span>Home</span>
              <span>/</span>
              <span>About Us</span>
            </div>
          </div>

          {/* Team Photos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {teamPhotos.map((photo, index) => (
              <div key={index} className="text-center">
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-900">{photo.title}</h3>
              </div>
            ))}
          </div>

          {/* About Text */}
          <div className="max-w-4xl mx-auto text-gray-600 space-y-6">
            <p>
              The company is established in May 2000 as a representative office for Wilhelmsen Ship Management formerly 
              known as Barber International. Initially, the company served for a cruise line company based in Miami, USA. 
              The company has grown rapidly not only to serve cruise line companies but for other types of vessels including FPSO.
            </p>
            <p>
              In the year 2008, Wilhelmsen Ship Management made significant changes. The cruise ship crewing management 
              was not part of their future plans. Wira Manning Services continues to serve the existing clients with similar quality of 
              services.
            </p>
            <p>
              Our reputation and commitment in providing quality crew management services, fair and professional recruitment 
              of seafarers, excellent relationship with authorities and regulators have made the company matured into a 
              reputable manning agent and have added more values for Indonesian seafarers in the international seafarer world. 
              The operations of PT. Cipta Wira Tirta is in Compliance with ISO 9001 : 2015, MLC 2006 for SRPS and SIUJPAK.
            </p>
          </div>
        </div>
      </section>

      {/* Insurance Section */}
      <section id="insurance" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Insurance</h2>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-12">
              <span>Home</span>
              <span>/</span>
              <span>Insurance</span>
            </div>

            {/* Ship Icon */}
            <div className="flex justify-center mb-12">
              <div className="w-32 h-32 bg-red-600 rounded-lg flex items-center justify-center">
                <Ship className="w-16 h-16 text-white" />
              </div>
            </div>

            <h3 className="text-4xl font-bold text-red-600 mb-8">MARINE BENEFITS</h3>
            
            <div className="max-w-4xl mx-auto text-gray-600 text-lg leading-relaxed">
              <p>
                We are proud to be part of a company providing peace of mind for ship owners, seafarers and their families. 
                In co-operation with Marine Benefits AS of Norway, we provide seafarers and their dependants with social benefit 
                such as medical, disability and life insurance. All the work processes are in compliant with ISO 9001 and ISO 27001. 
                For more information, please visit the official website of Marine benefits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Manning Services Section */}
      <section id="manning" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Manning Services</h2>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-12">
              <span>Home</span>
              <span>/</span>
              <span>Manning Services</span>
            </div>

            {/* Manning Services Content */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <img
                  src="https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                  alt="Manning Services"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="lg:w-1/2 flex justify-center">
                <div className="space-y-6">
                  <div className="bg-red-600 text-white p-4 rounded-lg">
                    <div className="text-sm font-semibold">MLC 2006</div>
                    <div className="text-xs">BUREAU VERITAS</div>
                    <div className="text-xs">Certification</div>
                    <div className="text-xs mt-2">Member of CRSO Federation</div>
                  </div>
                  <div className="bg-blue-600 text-white p-4 rounded-lg">
                    <div className="text-lg font-bold">RINA</div>
                    <div className="text-sm">CERTIFIED MANAGEMENT SYSTEM</div>
                    <div className="text-sm">ISO 9001</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto text-gray-600 text-lg leading-relaxed mt-12 space-y-6">
              <p>
                Since the establishment of the company in the year of 2000, we have an excellent proven track record as a 
                reliable, honest and transparent manning agency. We provide wide range of manning services from selective 
                recruitment to P&I matters.
              </p>
              <p>
                All work processes are in compliance with ISO 9001 and MLC 2006.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Quality Policy Section */}
      <section id="safety" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Safety & Quality Policy</h2>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-12">
              <span>Home</span>
              <span>/</span>
              <span>Safety & Quality Policy</span>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-gray-600 space-y-6 text-left">
            <p>
              It is in PT Cipta Wira Tirta's (CWT) set of policies to provide safe and high quality of manning services by having 
              safety management system and operating procedures.
            </p>
            <p>
              CWT requires an active commitment and accountability for QHSE from all employees, customers and contractors. 
              Line management has a leadership role in the communication, implementation and improvements in compliance 
              with QHSE standard policy.
            </p>
            <p className="font-semibold">CWT is committed to:</p>
            
            <div className="space-y-4 pl-4">
              <p>
                - Comply with mandatory rules and regulations in conducting day to day operation and take into account other 
                relevant practices as required by the ISM Code.
              </p>
              <p>
                - Protect, and strive for improvement of, the health, safety and security of our people at all times.
              </p>
              <p>
                - Zero non-conformance and HSE accidents.
              </p>
              <p>
                - Meet specified customer requirements and ensure continuous customer satisfaction.
              </p>
              <p>
                - Plan and prepare for emergency, crisis and business disruption.
              </p>
              <p>
                - Set Quality & HSE performance objectives, measure results, assess and continually improve processes, services 
                and product quality, through the use of an effective management system.
              </p>
              <p>
                - Learn from undesired events (accidents, near-accident, non-conformities and hazardous situations) through 
                analysis of possible causes and provide prevention system through improved compliance.
              </p>
              <p>
                - It is imperative that all employees have a sense of ownership towards clients vessels so that the objective of 
                having the right personnel at the right time and at the right place could be performed.
              </p>
            </div>

            <p className="mt-8">
              This policy directs all employees to recognize their role for the safety and quality of services. All employees are 
              reminded to take time out for safety to properly plan prior executing the operation and stop the job if the possible 
              undesired outcome of the operation is seen or in doubt.
            </p>
          </div>
        </div>
      </section>

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
    </div>
  );
};

export default LandingPage;