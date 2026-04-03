import { Brain, Layers, Cpu, Network, X, Gift } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

const capabilities = [
  {
    icon: Brain,
    title: 'AI Automations and Systems',
    fullDetails: 'Our AI automation platform leverages machine learning and intelligent algorithms to automate complex business processes. We design systems that learn from data, adapt to changes, and continuously improve performance. From process automation to predictive analytics, we deliver solutions that drive measurable business impact.',
    features: [
      { title: 'Automations', desc: 'Process automation' },
      { title: 'Bots', desc: 'Intelligent agents' },
      { title: 'LLMs', desc: 'Large language models' },
      { title: 'Tools', desc: 'Enterprise tools' },
    ]
  },
  {
    icon: Layers,
    title: 'Full Stack Softwares',
    subtitle: 'with Cloud & DB',
    fullDetails: 'We deliver end-to-end application development across web and mobile platforms. Our expertise spans frontend UI/UX design, backend architecture, database optimization, and cloud deployment. We build applications that are performant, secure, and built to scale with your business growth.',
    features: [
      { title: 'Web Applications', desc: 'Responsive web apps' },
      { title: 'Mobile Apps', desc: 'iOS & Android native' },
      { title: 'Database', desc: 'Optimized data layer' },
      { title: 'Cloud', desc: 'Scalable infrastructure' },
    ]
  },
  {
    icon: Cpu,
    title: 'Cyber Security',
    fullDetails: 'Comprehensive cybersecurity solutions protecting your organization from evolving threats. We provide penetration testing, vulnerability assessments, security architecture design, and compliance management. Our team ensures your systems remain secure, compliant, and resilient against cyber threats.',
    features: [
      { title: 'Offensive', desc: 'Penetration testing' },
      { title: 'Defensive', desc: 'Threat prevention' },
      { title: 'Security', desc: 'Risk management' },
      { title: 'Protection', desc: 'Compliance assured' },
    ]
  },
  {
    icon: Network,
    title: 'IoT Products & Automations',
    fullDetails: 'We design and develop IoT products that connect, communicate, and collect data at scale. From embedded firmware to cloud integration, we build smart devices and automation systems that enhance operational efficiency and create new business opportunities.',
    features: [
      { title: 'Home', desc: 'Smart home solutions' },
      { title: 'Agriculture', desc: 'Smart farming tech' },
      { title: 'Offices', desc: 'Smart workspace' },
      { title: 'Commercials', desc: 'Retail automation' },
    ]
  },
];

export default function Capabilities() {
  const { theme } = useTheme();
  const [selectedCapability, setSelectedCapability] = useState<number | null>(null);
  
  const bgClass = theme === 'light' ? 'bg-white' : 'bg-[#0A0A0A]';
  const textClass = theme === 'light' ? 'text-gray-900' : 'text-white';
  const descClass = theme === 'light' ? 'text-gray-600' : 'text-gray-400';
  const cardClass = theme === 'light'
    ? 'from-blue-50/30 to-white/30 border-gray-200 hover:border-blue-400'
    : 'from-white/5 to-white/[0.02] border-white/10 hover:border-blue-500/50';

  const selectedItem = selectedCapability !== null ? capabilities[selectedCapability] : null;

  return (
    <>
      <section id="capabilities" className={`pt-4 sm:pt-8 md:pt-12 pb-3 sm:pb-6 px-2 sm:px-6 ${bgClass} relative transition-colors duration-300`}>
        <div className={`absolute inset-0 bg-gradient-to-b ${theme === 'light' ? 'from-transparent via-blue-100/10 to-transparent' : 'from-transparent via-blue-500/5 to-transparent'}`} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-4 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-2 sm:mb-6">
              <Gift className="w-6 sm:w-8 h-6 sm:h-8 text-blue-500" />
              <h2 className={`text-xl sm:text-3xl md:text-4xl lg:text-5xl font-plusJakarta font-bold tracking-wider ${textClass}`}>
                What We Deliver
              </h2>
            </div>
            <p className={`${descClass} text-[10px] sm:text-sm md:text-base font-light max-w-2xl mx-auto tracking-wide`}>
              Comprehensive solutions spanning software engineering, cloud infrastructure, and talent development
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-8">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <div
                  key={index}
                  className={`group relative p-5 sm:p-6 md:p-8 bg-gradient-to-b ${cardClass} rounded-lg sm:rounded-2xl transition-all duration-500 backdrop-blur-sm border cursor-pointer hover:shadow-lg`}
                  onClick={() => setSelectedCapability(index)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-b from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-blue-500/0 rounded-2xl transition-all duration-500`} />

                  <div className="relative z-10 flex flex-row sm:flex-col items-start sm:items-center text-left sm:text-center gap-3 sm:gap-0">
                    <div className={`mb-0 sm:mb-6 flex-shrink-0 inline-flex p-2 sm:p-3 ${theme === 'light' ? 'bg-blue-100' : 'bg-blue-500/10'} rounded-lg sm:rounded-xl transition-colors duration-500`}>
                      <Icon className="w-5 sm:w-8 h-5 sm:h-8 text-blue-500" />
                    </div>

                    <div className="flex-1 sm:flex-none ml-3 sm:ml-0">
                      <h3 className={`text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 tracking-wide ${textClass}`}>
                        {capability.title}
                      </h3>
                      {capability.subtitle && (
                        <p className={`text-xs sm:text-sm font-plusJakarta tracking-wide mb-3 sm:mb-4 ${descClass}`}>
                          {capability.subtitle}
                        </p>
                      )}

                      <p className={`font-plusJakarta font-bold text-xs sm:text-sm tracking-wide cursor-pointer border-b-2 border-blue-600 hover:border-blue-700 pb-1 sm:pb-1 transition-all duration-300 w-fit sm:mx-auto ${
                      theme === 'light'
                        ? 'text-blue-600 hover:text-blue-700'
                        : 'text-blue-400 hover:text-blue-500'
                    }`}>
                      click to know more.. !
                    </p>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/0 group-hover:via-blue-500/50 to-transparent transition-all duration-500" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedCapability(null)}
          />

          <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-2xl w-full p-4 sm:p-8 md:p-12 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCapability(null)}
              className="absolute top-3 right-3 sm:top-6 sm:right-6 p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 sm:w-6 h-4 sm:h-6 text-gray-900" />
            </button>

            <div className="flex items-start gap-2 sm:gap-4 mb-4 sm:mb-6">
              <div className="inline-flex p-2 sm:p-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg sm:rounded-xl flex-shrink-0">
                {(() => {
                  const IconComponent = selectedItem.icon;
                  return <IconComponent className="w-5 sm:w-8 h-5 sm:h-8 text-blue-600" />;
                })()}
              </div>
              <div>
                <h3 className="text-lg sm:text-3xl font-plusJakarta font-bold text-gray-900 mb-1 sm:mb-2">
                  {selectedItem.title}
                </h3>
                {selectedItem.subtitle && (
                  <p className="text-xs sm:text-sm font-plusJakarta text-gray-600 tracking-wide">
                    {selectedItem.subtitle}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2 sm:space-y-4 mb-4 sm:mb-6">
              <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />

              <div>
                <p className="text-gray-700 leading-relaxed text-xs sm:text-base font-light">
                  {selectedItem.fullDetails}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                {selectedItem.features && selectedItem.features.map((feature, idx) => {
                  const colors = ['border-red-600', 'border-yellow-600', 'border-black', 'border-gray-600'];
                  const bgColors = ['bg-red-50', 'bg-yellow-50', 'bg-gray-50', 'bg-gray-100'];
                  return (
                    <div key={idx} className={`p-2 sm:p-4 rounded-lg border-l-4 border-b ${colors[idx]} ${bgColors[idx]} border-r border-t border-gray-200`}>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">{feature.title}</p>
                      <p className="text-[10px] sm:text-xs text-gray-700 mt-0.5 sm:mt-1">{feature.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setSelectedCapability(null)}
              className="w-full py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-plusJakarta font-bold text-xs sm:text-base rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
