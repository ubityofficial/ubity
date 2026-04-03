import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';

const CountingNumber = ({ target, suffix = '' }: { target: string | number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = typeof target === 'number' ? target : parseInt(target);
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

export default function InternshipsFinalSection() {
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

        <div className={`mt-6 sm:mt-8 grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto pt-6 sm:pt-8 border-t ${borderClass}`}>
          <div>
            <div className={`text-2xl sm:text-3xl font-light mb-1 ${textClass}`}><CountingNumber target="800" suffix="+" /></div>
            <div className={`${descClass} text-xs font-light`}>Students Enrolled</div>
          </div>
          <div>
            <div className={`text-2xl sm:text-3xl font-light mb-1 ${textClass}`}><CountingNumber target="20" suffix="+" /></div>
            <div className={`${descClass} text-xs font-light`}>industry Experts</div>
          </div>
          <div>
            <div className={`text-2xl sm:text-3xl font-light mb-1 ${textClass}`}>40%+</div>
            <div className={`${descClass} text-xs font-light`}>Stipend distributions</div>
          </div>
        </div>
      </div>
    </section>
  );
}
