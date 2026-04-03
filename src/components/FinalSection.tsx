import { ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';

const CountingNumber = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return <>{count}{suffix}</>;
};

export default function FinalSection() {
  const { theme } = useTheme();
  const bgClass = theme === 'light' ? 'bg-gray-50' : 'bg-[#111111]';
  const textClass = theme === 'light' ? 'text-gray-900' : 'text-white';
  const descClass = theme === 'light' ? 'text-gray-600' : 'text-gray-400';
  const badgeBg = theme === 'light' ? 'bg-blue-100 border-blue-200' : 'bg-blue-500/10 border-blue-500/20';
  const borderClass = theme === 'light' ? 'border-gray-200' : 'border-white/10';
  const gradientBg = theme === 'light' ? 'from-blue-500/5 via-transparent to-transparent' : 'from-blue-500/10 via-transparent to-transparent';

  return (
    <section className={`pt-2 sm:pt-4 pb-6 sm:pb-12 px-4 sm:px-6 ${bgClass} relative overflow-hidden transition-colors duration-300`}>
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-gradient-to-b ${gradientBg}`} />
        <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent`} />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-3 sm:mb-4">
          <div className={`inline-block p-2 sm:p-3 ${badgeBg} rounded-2xl backdrop-blur-sm border mb-3 sm:mb-4`}>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-3 h-3 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>

        <h2 className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-plusJakarta font-bold mb-3 sm:mb-4 tracking-wider leading-relaxed ${textClass}`}>
          Explain your concept/Dream today<br/><span className="text-blue-500 font-inter font-semibold text-sm sm:text-base md:text-lg">We are ready to listen and shape u</span>
        </h2>

        <a href="https://wa.me/919513186030" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-full transition-all duration-500 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105">
          <span className="text-xs sm:text-base font-light tracking-wider">Start a conversation</span>
          <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform duration-500" />
        </a>

        <div className={`mt-6 sm:mt-8 grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto pt-6 sm:pt-8 border-t ${borderClass}`}>
          <div>
            <div className={`text-2xl sm:text-3xl font-light mb-1 ${textClass}`}><CountingNumber target="10" suffix="+" /></div>
            <div className={`${descClass} text-xs font-light`}>Systems Built</div>
          </div>
          <div>
            <div className={`text-2xl sm:text-3xl font-light mb-1 ${textClass}`}><CountingNumber target="6" suffix="+" /></div>
            <div className={`${descClass} text-xs font-light`}>Industries</div>
          </div>
          <div>
            <div className={`text-2xl sm:text-3xl font-light mb-1 ${textClass}`}>99.9%</div>
            <div className={`${descClass} text-xs font-light`}>Uptime</div>
          </div>
        </div>
      </div>
    </section>
  );
}
