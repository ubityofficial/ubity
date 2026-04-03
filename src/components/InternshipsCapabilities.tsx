import { BookOpen, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

const programs = [
  {
    title: 'AiML',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-500/10 to-pink-500/10',
    description: 'Learn cutting-edge AI and Machine Learning technologies',
    image: '/aiml.webp', // WebP format - 96% smaller & faster
    fullDescription: 'Master artificial intelligence and machine learning technologies. Learn deep learning, neural networks, natural language processing, and computer vision. Build AI-powered applications that transform businesses.',
    duration: '12 months',
    level: 'Intermediate to Advanced'
  },
  {
    title: 'Full Stack Development',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-500/10 to-cyan-500/10',
    description: 'Master web and mobile application development',
    image: '/fullstack.webp', // WebP format - 96% smaller & faster
    fullDescription: 'Learn full-stack web development with modern frameworks and technologies. Master frontend, backend, databases, and cloud deployment. Build production-ready applications.',
    duration: '12 months',
    level: 'Beginner to Intermediate'
  },
  {
    title: 'Cyber Security',
    color: 'from-red-500 to-orange-500',
    bgColor: 'from-red-500/10 to-orange-500/10',
    description: 'Defend against modern security threats',
    image: '/cybersecurity.webp', // WebP format - 96% smaller & faster
    fullDescription: 'Comprehensive cybersecurity training covering offensive and defensive security. Learn penetration testing, vulnerability assessment, and threat prevention strategies.',
    duration: '12 months',
    level: 'Intermediate to Advanced'
  },
  {
    title: 'Cloud Computing',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-500/10 to-emerald-500/10',
    description: 'Build scalable cloud infrastructure',
    image: '/cloud-computing.webp', // WebP format - 96% smaller & faster
    fullDescription: 'Master cloud platforms including AWS, Azure, and Google Cloud. Learn infrastructure as code, containerization, serverless architecture, and cloud security.',
    duration: '12 months',
    level: 'Intermediate'
  }
];

export default function InternshipsCapabilities() {
  const { theme } = useTheme();
  const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
  
  const bgClass = theme === 'light' ? 'bg-white' : 'bg-[#0A0A0A]';
  const textClass = theme === 'light' ? 'text-gray-900' : 'text-white';
  const subTextClass = theme === 'light' ? 'text-gray-600' : 'text-gray-400';

  const selectedItem = selectedProgram !== null ? programs[selectedProgram] : null;

  return (
    <section id="capabilities" className={`pt-4 sm:pt-8 md:pt-12 pb-3 sm:pb-6 px-2 sm:px-6 ${bgClass} relative transition-colors duration-300`}>
      <div className={`absolute inset-0 bg-gradient-to-b ${theme === 'light' ? 'from-transparent via-blue-100/10 to-transparent' : 'from-transparent via-blue-500/5 to-transparent'}`} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-4 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-2 sm:mb-6">
            <BookOpen className="w-6 sm:w-8 h-6 sm:h-8 text-blue-500" />
            <h2 className={`text-xl sm:text-3xl md:text-4xl lg:text-5xl font-plusJakarta font-bold tracking-wider ${textClass}`}>
              Our Programs
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-8">
          {programs.map((program, index) => (
            <div
              key={index}
              onClick={() => setSelectedProgram(index)}
              className={`group relative h-full bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 hover:border-blue-500/50 rounded-lg sm:rounded-2xl transition-all duration-500 backdrop-blur-sm cursor-pointer hover:shadow-xl overflow-hidden hover:scale-105`}
            >
              {/* Image Container */}
              <div className="relative w-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-2 sm:p-4 rounded-t-lg sm:rounded-t-xl">
                <img 
                  src={program.image} 
                  alt={program.title}
                  className="w-full h-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-500 max-h-96"
                  onError={(e) => {
                    e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 300'%3E%3Crect fill='%23374151' width='500' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='24' fill='%239CA3AF' text-anchor='middle' dominant-baseline='middle'%3E${program.title}%3C/text%3E%3C/svg%3E`;
                  }}
                />
                <div className={`absolute inset-0 bg-gradient-to-b ${program.bgColor} pointer-events-none`} />
              </div>

              {/* Content Container */}
              <div className="relative z-10 p-4 sm:p-6">
                <h3 className={`text-base sm:text-lg md:text-xl font-bold tracking-wide mb-2 sm:mb-3 ${textClass}`}>
                  {program.title}
                </h3>

                <p className={`text-xs sm:text-sm font-light leading-relaxed ${subTextClass}`}>
                  {program.description}
                </p>
              </div>

              <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/0 group-hover:via-blue-500/50 to-transparent transition-all duration-500`} />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedProgram(null)}
          />

          <div className={`relative ${theme === 'light' ? 'bg-white' : 'bg-gray-900'} rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
            {/* Close Button */}
            <button
              onClick={() => setSelectedProgram(null)}
              className={`absolute top-3 right-3 sm:top-6 sm:right-6 p-1.5 sm:p-2 ${theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-800'} rounded-lg transition-colors z-10`}
            >
              <X className={`w-4 sm:w-6 h-4 sm:h-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`} />
            </button>

            {/* Modal Content */}
            <div>
              {/* Image */}
              <div className="w-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-2xl sm:rounded-t-2xl flex items-center justify-center p-3 sm:p-6">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.title}
                  className="w-full h-auto object-contain max-h-96 sm:max-h-[500px]"
                  onError={(e) => {
                    e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 300'%3E%3Crect fill='%23374151' width='500' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='24' fill='%239CA3AF' text-anchor='middle' dominant-baseline='middle'%3E${selectedItem.title}%3C/text%3E%3C/svg%3E`;
                  }}
                />
              </div>

              {/* Text Content */}
              <div className="p-4 sm:p-8 md:p-12">
                <h2 className={`text-2xl sm:text-3xl md:text-4xl font-plusJakarta font-bold mb-4 sm:mb-6 ${textClass}`}>
                  {selectedItem.title}
                </h2>

                <p className={`text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 ${subTextClass}`}>
                  {selectedItem.fullDescription}
                </p>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className={`p-4 rounded-lg ${theme === 'light' ? 'bg-gray-50 border border-gray-200' : 'bg-white/5 border border-white/10'}`}>
                    <p className={`text-xs sm:text-sm font-semibold ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mb-2`}>
                      Duration
                    </p>
                    <p className={`text-base sm:text-lg font-bold ${textClass}`}>
                      {selectedItem.duration}
                    </p>
                  </div>

                  <div className={`p-4 rounded-lg ${theme === 'light' ? 'bg-gray-50 border border-gray-200' : 'bg-white/5 border border-white/10'}`}>
                    <p className={`text-xs sm:text-sm font-semibold ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mb-2`}>
                      Level
                    </p>
                    <p className={`text-base sm:text-lg font-bold ${textClass}`}>
                      {selectedItem.level}
                    </p>
                  </div>
                </div>

                {/* Enroll Button */}
                <button className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-sm sm:text-base rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
