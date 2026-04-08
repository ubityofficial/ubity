import { Zap, Rocket } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '../context/NavigationContext';

export default function PathwaySection() {
  const { theme } = useTheme();
  const { navigateTo } = useNavigation();
  const bgClass = theme === 'light' ? 'bg-gray-50' : 'bg-[#0A0A0A]';
  const lineColor = theme === 'light' ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.5)';
  const leftPathColor = theme === 'light' ? 'rgba(37, 99, 235, 0.5)' : 'rgba(59, 130, 246, 0.6)';
  const rightPathColor = theme === 'light' ? 'rgba(34, 197, 94, 0.5)' : 'rgba(74, 222, 128, 0.6)';

  return (
    <section className={`py-0 -mt-8 sm:-mt-16 px-3 sm:px-6 ${bgClass} relative transition-colors duration-300 overflow-hidden`}>
      <div className="max-w-7xl mx-auto">
        {/* MOBILE: Simple Button Layout */}
        <div className="sm:hidden flex flex-col gap-3 py-8">
          <button className={`w-full px-6 py-3 rounded-lg font-plusJakarta font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 border backdrop-blur-md ${
            theme === 'light'
              ? 'bg-gradient-to-r from-indigo-600/75 to-cyan-600/75 hover:from-indigo-700/85 hover:to-cyan-700/85 text-white border-indigo-400/50'
              : 'bg-gradient-to-r from-indigo-600/65 to-cyan-600/65 hover:from-indigo-700/75 hover:to-cyan-700/75 text-white border-indigo-400/40'
          }`}>
            <Zap className="w-5 h-5" />
            <span>Software Solutions</span>
          </button>
          <button 
            onClick={() => navigateTo('internships')}
            className={`w-full px-6 py-3 rounded-lg font-plusJakarta font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 border backdrop-blur-md ${
            theme === 'light'
              ? 'bg-gradient-to-r from-purple-600/75 to-pink-600/75 hover:from-purple-700/85 hover:to-pink-700/85 text-white border-purple-400/50'
              : 'bg-gradient-to-r from-purple-600/65 to-pink-600/65 hover:from-purple-700/75 hover:to-pink-700/75 text-white border-purple-400/40'
          }`}>
            <Rocket className="w-5 h-5" />
            <span>Apply for Internships</span>
          </button>
        </div>

        {/* DESKTOP: SVG Graph with Buttons */}
        <div className="relative h-64 sm:h-80 md:h-96 mb-8 sm:mb-12 hidden sm:block">
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 1 }} viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet">
            <defs>
              <pattern id="leftDots" patternUnits="userSpaceOnUse" width="20" height="20">
                <circle cx="10" cy="10" r="2" fill={leftPathColor} />
              </pattern>
              <pattern id="rightDots" patternUnits="userSpaceOnUse" width="20" height="20">
                <circle cx="10" cy="10" r="2" fill={rightPathColor} />
              </pattern>
            </defs>

            {/* Center origin point */}
            <circle cx="500" cy="50" r="5" fill={lineColor} />

            {/* LEFT ROUTE - Smooth curve to bottom left */}
            {/* Continuous dotted path line */}
            <path
              d="M 500 50 Q 300 120, 250 320"
              fill="none"
              stroke={lineColor}
              strokeWidth="2"
              strokeDasharray="8,6"
              strokeLinecap="round"
            />
            {/* Indicator dots along left path */}
            <circle cx="450" cy="80" r="2.5" fill={leftPathColor} style={{ animation: 'pulse 2s ease-in-out infinite' }} />
            <circle cx="380" cy="130" r="2.5" fill={leftPathColor} style={{ animation: 'pulse 2s ease-in-out infinite', animationDelay: '0.4s' }} />
            <circle cx="310" cy="190" r="2.5" fill={leftPathColor} style={{ animation: 'pulse 2s ease-in-out infinite', animationDelay: '0.8s' }} />
            <circle cx="250" cy="260" r="2.5" fill={leftPathColor} style={{ animation: 'pulse 2s ease-in-out infinite', animationDelay: '1.2s' }} />
            {/* Left endpoint */}
            <circle cx="250" cy="320" r="4" fill={leftPathColor} stroke={leftPathColor} strokeWidth="2" />

            {/* RIGHT ROUTE - Smooth curve to bottom right */}
            {/* Continuous dotted path line */}
            <path
              d="M 500 50 Q 700 120, 750 320"
              fill="none"
              stroke={lineColor}
              strokeWidth="2"
              strokeDasharray="8,6"
              strokeLinecap="round"
            />
            {/* Indicator dots along right path */}
            <circle cx="550" cy="80" r="2.5" fill={rightPathColor} style={{ animation: 'pulse 2s ease-in-out infinite' }} />
            <circle cx="620" cy="130" r="2.5" fill={rightPathColor} style={{ animation: 'pulse 2s ease-in-out infinite', animationDelay: '0.4s' }} />
            <circle cx="690" cy="190" r="2.5" fill={rightPathColor} style={{ animation: 'pulse 2s ease-in-out infinite', animationDelay: '0.8s' }} />
            <circle cx="750" cy="260" r="2.5" fill={rightPathColor} style={{ animation: 'pulse 2s ease-in-out infinite', animationDelay: '1.2s' }} />
            {/* Right endpoint */}
            <circle cx="750" cy="320" r="4" fill={rightPathColor} stroke={rightPathColor} strokeWidth="2" />
          </svg>

          {/* Left Button */}
          <div className="absolute transform -translate-x-1/2 left-1/4 btn-endpoint" style={{ '--mobile-top': '80%' } as any}>
            <button className={`px-3 sm:px-8 py-1 sm:py-3 rounded-lg font-plusJakarta font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center gap-1 sm:gap-2 shadow-xl sm:shadow-2xl hover:shadow-lg sm:hover:shadow-2xl transform hover:scale-105 border backdrop-blur-md whitespace-nowrap ${
              theme === 'light'
                ? 'bg-gradient-to-r from-indigo-600/75 to-cyan-600/75 hover:from-indigo-700/85 hover:to-cyan-700/85 text-white border-indigo-400/50'
                : 'bg-gradient-to-r from-indigo-600/65 to-cyan-600/65 hover:from-indigo-700/75 hover:to-cyan-700/75 text-white border-indigo-400/40'
            }`}>
              <Zap className="w-3 sm:w-5 h-3 sm:h-5" />
              <span className="hidden sm:inline">Software Solutions</span>
              <span className="sm:hidden">Solutions</span>
            </button>
          </div>

          {/* Right Button */}
          <div className="absolute transform -translate-x-1/2 left-3/4 btn-endpoint" style={{ '--mobile-top': '80%' } as any}>
            <button 
              onClick={() => navigateTo('internships')}
              className={`px-3 sm:px-8 py-1 sm:py-3 rounded-lg font-plusJakarta font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center gap-1 sm:gap-2 shadow-xl sm:shadow-2xl hover:shadow-lg sm:hover:shadow-2xl transform hover:scale-105 border backdrop-blur-md whitespace-nowrap ${
              theme === 'light'
                ? 'bg-gradient-to-r from-purple-600/75 to-pink-600/75 hover:from-purple-700/85 hover:to-pink-700/85 text-white border-purple-400/50'
                : 'bg-gradient-to-r from-purple-600/65 to-pink-600/65 hover:from-purple-700/75 hover:to-pink-700/75 text-white border-purple-400/40'
            }`}>
              <Rocket className="w-3 sm:w-5 h-3 sm:h-5" />
              <span className="hidden sm:inline">Apply for Internships</span>
              <span className="sm:hidden">Internships</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .btn-endpoint {
          top: var(--mobile-top, auto);
          bottom: auto;
          transform: translateX(-50%) translateY(-50%);
        }
        @media (min-width: 640px) {
          .btn-endpoint {
            bottom: 0;
            top: auto;
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
