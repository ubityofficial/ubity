import { Search, Compass, Code2, TrendingUp, BookOpen, Briefcase, Award, Coins } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ReactNode } from 'react';

interface ProcessStep {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface ProcessProps {
  customSteps?: ProcessStep[];
  title?: string;
  subtitle?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const defaultSteps: ProcessStep[] = [
  {
    icon: Search,
    title: 'Connect',
    description: 'Let\'s talk about your needs and goals',
  },
  {
    icon: Compass,
    title: 'Discuss',
    description: 'We understand your project requirements',
  },
  {
    icon: Code2,
    title: 'Develop',
    description: 'We build your solution with best practices',
  },
  {
    icon: TrendingUp,
    title: 'Configure',
    description: 'Deploy and optimize for your success',
  },
];

export default function Process({ customSteps, title = 'Our Approach', subtitle = 'A systematic process refined through years of building world-class digital products', icon: IconComponent = Compass }: ProcessProps) {
  const { theme } = useTheme();
  const steps = customSteps || defaultSteps;
  const bgClass = theme === 'light' ? 'bg-white' : 'bg-[#0A0A0A]';
  const textClass = theme === 'light' ? 'text-gray-900' : 'text-white';
  const descClass = theme === 'light' ? 'text-gray-600' : 'text-gray-400';
  const cardBg = theme === 'light' ? 'bg-gray-50 border-gray-200 hover:border-blue-400' : 'bg-gradient-to-b from-white/5 to-white/[0.02] border-white/10 hover:border-blue-500/50';
  const lineColor = theme === 'light' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.3)';
  const numberColor = theme === 'light' ? 'text-gray-200' : 'text-white/5';
  const borderColor = theme === 'light' ? 'border-gray-200' : 'border-[#0A0A0A]';

  return (
    <section id="approach" className={`py-12 sm:py-20 md:py-32 px-4 sm:px-6 ${bgClass} relative transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-20">
          <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
            <IconComponent className="w-7 sm:w-10 h-7 sm:h-10 text-blue-500" />
            <h2 className={`text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-plusJakarta font-bold tracking-tight ${textClass}`}>
              {title}
            </h2>
          </div>
          <p className={`${descClass} text-sm sm:text-base md:text-lg font-light max-w-2xl mx-auto`}>
            {subtitle}
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-16 sm:top-20 lg:top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className={`relative ${cardBg} rounded-lg sm:rounded-2xl p-2 sm:p-8 transition-all duration-500 group border`}>
                  <div className={`absolute -top-3 sm:-top-6 left-1/2 transform -translate-x-1/2 w-6 sm:w-12 h-6 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center border-4 ${borderColor} group-hover:scale-110 transition-transform duration-500`}>
                    <step.icon className="w-3 sm:w-5 h-3 sm:h-5 text-white" />
                  </div>

                  <div className="mt-3 sm:mt-8 text-center">
                    <h3 className={`text-xs sm:text-lg md:text-xl font-semibold mb-1 sm:mb-4 tracking-wide ${textClass}`}>
                      {step.title}
                    </h3>
                    <p className={`${descClass} text-xs sm:text-sm leading-relaxed font-medium text-[11px] sm:text-sm`}>
                      {step.description}
                    </p>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-24 -right-4 w-8 h-px bg-gradient-to-r from-blue-500/50 to-transparent" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
