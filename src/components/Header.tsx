import { Menu, X, X as CloseIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openModal, setOpenModal] = useState(null);
  const { navigateTo, currentPage } = useNavigation();

  const scrollToGetInTouch = () => {
    document.getElementById('get-in-touch')?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    let targetId = sectionId;
    if (sectionId === 'contact') targetId = 'get-in-touch';
    if (sectionId === 'services') targetId = 'capabilities';
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const bgLight = 'bg-gradient-to-r from-black/40 via-gray-800/30 to-black/40 dark:from-white/5 dark:via-white/8 dark:to-white/5';
  const textLight = 'text-gray-900 dark:text-white';
  const borderLight = 'border-blue-400/30 dark:border-cyan-400/20';
  const hoverLight = 'hover:text-blue-600 dark:hover:text-cyan-400';

  const navItems = [
    { label: 'Productions', id: 'productions' },
    { label: 'Services', id: 'services' },
    { label: 'Contact', id: 'contact' },
  ];

  const modalContent = {
    about: {
      title: 'About UBITY',
      content: 'UBITY is a leading technology company focused on digital innovation. We provide custom solutions for businesses of all sizes, helping them transform digitally and achieve their goals with cutting-edge technology.\n\nWith our experienced and professional team, we have helped hundreds of clients across various industries achieve their digital success and business transformation.'
    },
    capabilities: {
      title: 'Our Capabilities',
      content: 'We offer complete services including:\n• Web Development\n• Mobile App Development\n• Cloud Solutions\n• AI & Machine Learning\n• Data Analytics\n• UI/UX Design\n• DevOps & Infrastructure\n\nOur expert team is ready to deliver the best solutions for your business needs with the latest technology and industry best practices.'
    },
    approach: {
      title: 'Our Approach',
      content: 'We use an iterative and collaborative Agile methodology. Every project starts with:\n\n1. Discovery - Deep understanding of your needs\n2. Planning - Strategy and detailed planning\n3. Development - Implementation with best practices\n4. Testing - Comprehensive QA and quality assurance\n5. Deployment - Launch and ongoing support\n\nWe ensure transparent communication at every stage of the project.'
    },
    contact: {
      title: 'Contact Us',
      content: 'Email: ubityofficial@gmail.com\nPhone: +91 9999999999\n\nHeadquarters:\nBengaluru, Karnataka, India\n\nOffices:\nHyderabad, Mumbai, Mangaluru\n\nOperating Hours: Available 24/7\n\nContact us for a free consultation about your project. Our team is ready to help your business digital transformation.'
    }
  };

  return (
    <header className={`fixed top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-50 rounded-2xl sm:rounded-3xl backdrop-blur-lg ${bgLight} border ${borderLight} transition-all duration-300 shadow-xl`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className={`text-lg sm:text-2xl md:text-3xl font-plusJakarta font-bold tracking-wider ${textLight} transition-colors duration-300 flex-shrink-0`}>
            UBITY
          </a>

          {/* Center Navigation - Desktop Only */}
          <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 py-2 text-xs sm:text-sm font-bold tracking-wide ${textLight} transition-all duration-300 group rounded-lg hover:bg-white/5 dark:hover:bg-white/10 cursor-pointer`}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-500" />
              </button>
            ))}
          </nav>

          {/* Right Section - Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {currentPage === 'main' ? (
              <>
                <button onClick={() => navigateTo('internships')} className="hidden md:inline-block px-4 sm:px-7 py-2 text-xs sm:text-sm bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Apply for Internships
                </button>

                <button onClick={scrollToGetInTouch} className="hidden md:inline-block px-4 sm:px-7 py-2 text-xs sm:text-sm bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Enquire Now
                </button>

                <button onClick={() => navigateTo('internships')} className="md:hidden px-3 sm:px-3 py-2 sm:py-2 text-[10px] sm:text-[11px] bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap">
                  Apply for Internships
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigateTo('main')} className="hidden md:inline-block px-4 sm:px-7 py-2 text-xs sm:text-sm bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  ← Back to Main
                </button>

                <button onClick={() => navigateTo('main')} className="md:hidden px-3 sm:px-3 py-2 sm:py-2 text-[10px] sm:text-[11px] bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap">
                  ← Back
                </button>
              </>
            )}

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className={`w-5 h-5 ${textLight}`} />
              ) : (
                <Menu className={`w-5 h-5 ${textLight}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className={`md:hidden mt-3 sm:mt-4 space-y-2 pb-4 border-t ${borderLight} pt-3 sm:pt-4 text-center animate-in fade-in slide-in-from-top-2 duration-300`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full relative px-4 sm:px-6 py-2 sm:py-3 text-sm font-bold tracking-wide ${textLight} transition-all duration-300 rounded-lg hover:bg-white/5 dark:hover:bg-white/10 group cursor-pointer`}
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 transform -translate-x-1/2 group-hover:w-3/4 transition-all duration-500" />
              </button>
            ))}
            <button onClick={scrollToGetInTouch} className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white text-sm font-semibold rounded-xl transition-all duration-300 mt-4 shadow-lg hover:shadow-xl transform hover:scale-105">
              Enquire Now
            </button>
          </nav>
        )}
      </div>

      {/* Modal Popup */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6">
          <div className="bg-gray-900/95 border border-cyan-400/20 rounded-2xl max-w-2xl w-full max-h-80 sm:max-h-96 overflow-y-auto animate-in fade-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="sticky top-0 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 border-b border-cyan-400/10 bg-gray-900/98">
              <h2 className="text-lg sm:text-2xl font-bold text-white">
                {modalContent[openModal].title}
              </h2>
              <button
                onClick={() => setOpenModal(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-4 sm:px-8 py-4 sm:py-6">
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                {modalContent[openModal].content}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 px-4 sm:px-8 py-3 sm:py-4 border-t border-cyan-400/10 bg-gray-900/98 flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(null)}
                className="px-4 sm:px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all text-xs sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
