import { useTheme } from '../context/ThemeContext';
import { Code, TrendingUp, Database, Workflow, Video, Tv, Network, Smartphone, Award } from 'lucide-react';

export default function VisualSection() {
  const { theme } = useTheme();
  const bgClass = theme === 'light' ? 'bg-gray-50' : 'bg-[#111111]';
  const textClass = theme === 'light' ? 'text-gray-900' : 'text-white';
  const descClass = theme === 'light' ? 'text-gray-600' : 'text-gray-400';
  
  const projects = [
    { name: 'Service Mobile Application (Multi vendor)', icon: Code },
    { name: 'SEO Optimization Tool (AI Based)', icon: TrendingUp },
    { name: 'ERP System (Large scale)', icon: Database },
    { name: 'Automation Bots (AiML)', icon: Workflow },
    { name: 'Media Projects (Applications)', icon: Video },
    { name: 'OTT Platform (Entertainments)', icon: Tv },
    { name: 'IoT Products (Hardware with hardcode)', icon: Network }
  ];
  
  return (
    <section id="productions" className={`py-12 sm:py-20 md:py-32 px-4 sm:px-6 ${bgClass} relative overflow-hidden transition-colors duration-300`}>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start lg:items-center">
          <div>
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <Award className="w-6 sm:w-8 h-6 sm:h-8 text-blue-500" />
              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-plusJakarta font-bold ${textClass} tracking-tight leading-tight`}>
                Our Recent Productions
              </h2>
            </div>
            <p className={`${descClass} text-sm sm:text-base md:text-lg leading-relaxed font-light mb-6 sm:mb-8`}>
              Check out the innovative solutions we've delivered for businesses transforming their industries.
            </p>
            <div className="space-y-4">
              {projects.map((project, i) => {
                const IconComponent = project.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <IconComponent className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span className="text-white font-light text-xs sm:text-base">{project.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative h-auto">
            {/* Tech visualization with minimal professional design */}
            <div className="flex justify-center items-center px-2">
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
                {[
                  { icon: Code, label: 'Mobile App' },
                  { icon: TrendingUp, label: 'SEO Tool' },
                  { icon: Database, label: 'ERP' },
                  { icon: Workflow, label: 'Automation' },
                  { icon: Video, label: 'Media' },
                  { icon: Tv, label: 'OTT' },
                  { icon: Network, label: 'IoT' },
                ].map((node, i) => {
                  const Icon = node.icon;
                  return (
                    <div key={i} className="group relative flex flex-col items-center">
                      {/* Tech node - minimal design */}
                      <div className="relative">
                        {/* Outer hexagon effect with border */}
                        <div className="w-12 h-12 sm:w-14 sm:h-14 relative flex items-center justify-center">
                          {/* Tech border frame */}
                          <div className="absolute inset-0 border border-gray-400/40 rounded-lg group-hover:border-blue-500/60 transition-colors duration-300" />
                          
                          {/* Corner accents - tech style */}
                          <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-gray-400/40 group-hover:border-blue-500/60 transition-colors duration-300" />
                          <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-gray-400/40 group-hover:border-blue-500/60 transition-colors duration-300" />
                          <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-gray-400/40 group-hover:border-blue-500/60 transition-colors duration-300" />
                          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-gray-400/40 group-hover:border-blue-500/60 transition-colors duration-300" />

                          {/* Inner glow on hover */}
                          <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 rounded-lg transition-colors duration-300" />

                          {/* Icon */}
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 group-hover:text-blue-500 transition-colors duration-300 relative z-10" />
                        </div>

                        {/* Pulse line on hover */}
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent group-hover:w-full transition-all duration-500" />
                      </div>

                      {/* Tech label - minimal */}
                      <p className={`text-[10px] sm:text-xs font-mono font-medium mt-3 text-gray-600 group-hover:text-blue-500 transition-colors duration-300 text-center whitespace-nowrap ${textClass}`}>
                        {node.label}
                      </p>

                      {/* Data transfer indicator */}
                      <div className="mt-1 flex gap-0.5">
                        {[0, 1, 2].map((bar) => (
                          <div
                            key={bar}
                            className="w-0.5 h-1 bg-gray-400/30 group-hover:bg-blue-500/60 rounded-full transition-all duration-500 origin-bottom"
                            style={{
                              animation: `pulse ${0.8 + bar * 0.2}s ease-in-out infinite`,
                              opacity: 0,
                              animationPlayState: 'paused',
                            }}
                            onMouseEnter={(e) => {
                              const el = e.currentTarget as HTMLElement;
                              el.style.animationPlayState = 'running';
                              el.style.opacity = '1';
                            }}
                            onMouseLeave={(e) => {
                              const el = e.currentTarget as HTMLElement;
                              el.style.animationPlayState = 'paused';
                              el.style.opacity = '0';
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 1;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.5;
          }
        }

        @keyframes pulse {
          0%, 100% {
            height: 4px;
            opacity: 0.3;
          }
          50% {
            height: 12px;
            opacity: 1;
          }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin {
          animation: spin 2s linear infinite;
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}
