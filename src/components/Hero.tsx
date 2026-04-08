import { ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface HeroProps {
  tagline?: string;
  heading?: string;
  description?: string;
  showVerticalLine?: boolean;
}

export default function Hero({ tagline = 'Welcome to the future', heading = 'Intelligent Systems Engineered to Scale', description = 'We transform complex challenges into scalable solutions. Building AI-driven platforms that empower enterprises to innovate, compete, and lead.', showVerticalLine = true }: HeroProps) {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToCapabilities = () => {
    document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth' });
  };

  const bgClass = theme === 'light' ? 'bg-white' : 'bg-[#0A0A0A]';
  const textGradient = theme === 'light'
    ? 'bg-gradient-to-b from-gray-900 to-gray-600 bg-clip-text text-transparent'
    : 'bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent';
  const subTextClass = theme === 'light' ? 'text-gray-600' : 'text-gray-400';
  const gridColor = theme === 'light'
    ? 'rgba(59, 130, 246, 0.05)'
    : 'rgba(59, 130, 246, 0.03)';

  return (
    <section id="about" className={`relative min-h-screen flex items-center justify-center overflow-hidden ${bgClass} transition-colors duration-300 pt-1 sm:pt-20 md:pt-24`}>
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${theme === 'light' ? 'rgba(59, 130, 246, 0.08)' : 'rgba(59, 130, 246, 0.15)'}, transparent 40%)`,
            opacity: theme === 'light' ? 0.2 : 0.3
          }}
        />

        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(${gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }} />

        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-500 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto pb-4 sm:pb-0">
        <div className="mb-4 sm:mb-6 inline-block">
          <div className="relative inline-block mb-8">
            {/* Outer glow ring animation */}
            <div className="absolute -inset-3 rounded-full" style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
              animation: 'glowRing 2.5s ease-out infinite',
            }} />
            
            {/* Main rounded box */}
            <div className={`relative px-6 py-1.5 rounded-full border backdrop-blur-sm transition-all duration-300 ${
              theme === 'light'
                ? 'bg-blue-50/40 border-blue-300/50 hover:border-blue-400/80'
                : 'bg-blue-500/5 border-blue-400/30 hover:border-blue-400/60'
            }`} style={{
              animation: 'glowPulse 2s ease-in-out infinite',
            }}>
              {/* Indicator dot */}
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-2.5 h-2.5">
                <div className={`absolute inset-0 rounded-full ${theme === 'light' ? 'bg-blue-600' : 'bg-blue-400'}`} />
                <div className={`absolute inset-0 rounded-full ${theme === 'light' ? 'bg-blue-600' : 'bg-blue-400'}`} style={{
                  animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                }} />
              </div>
              
              <span className={`text-xs sm:text-sm md:text-base font-plusJakarta font-bold tracking-widest uppercase pl-4 block ${
                theme === 'light' ? 'text-blue-700' : 'text-blue-300'
              }`}>
                {tagline}
              </span>
            </div>
          </div>
          <h1 className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-plusJakarta font-bold tracking-tight mb-2 sm:mb-4 ${textGradient}`}>
            UBITY
          </h1>
        </div>

        <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light tracking-widest mb-3 sm:mb-8 leading-tight whitespace-normal sm:whitespace-nowrap ${
          theme === 'light'
            ? 'bg-gradient-to-r from-gray-900 via-blue-600 to-gray-900 bg-clip-text text-transparent'
            : 'bg-gradient-to-r from-white via-blue-400 to-white bg-clip-text text-transparent'
        }`}>
          {heading}
        </h2>

        {description && (
          <p className={`text-xs sm:text-base md:text-lg mb-4 sm:mb-12 max-w-2xl mx-auto font-light px-2 sm:px-0 ${subTextClass}`}>
            {description}
          </p>
        )}

        <button
          onClick={scrollToCapabilities}
          className={`group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-2 sm:py-4 border rounded-full transition-all duration-500 backdrop-blur-sm text-sm sm:text-base ${
            theme === 'light'
              ? 'bg-gray-100 hover:bg-gray-200 border-gray-300 hover:border-blue-400 text-gray-900'
              : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-blue-500/50 text-white'
          }`}
        >
          <span className="font-plusJakarta font-bold tracking-widest">Explore</span>
          <ArrowDown className="w-4 h-4 text-blue-500 group-hover:translate-y-1 transition-transform duration-500" />
        </button>
      </div>

      {showVerticalLine && (
        <div className="absolute -bottom-1 sm:bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="w-[1px] h-16 bg-gradient-to-b from-blue-500 to-transparent" />
        </div>
      )}
    </section>
  );
}
