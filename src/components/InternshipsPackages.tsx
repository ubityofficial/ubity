import { Check, Zap, Sparkles, Crown, Rocket, Shield, Award, TrendingUp, Lock, Target } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const packages = [
  {
    name: 'Experience',
    price: 'Free',
    color: 'from-blue-500 to-cyan-500',
    borderColor: 'border-blue-500/40',
    bgGradient: 'from-blue-500/5 to-cyan-500/5',
    icon: Sparkles,
    accentColor: 'text-blue-400',
    badge: 'Only for Final year Students',
    badgeColor: 'bg-blue-500/10',
    features: [
      'Basic Training',
      'Real world Projects',
      'Certificates',
      'LOR based on performance'
    ],
    recommended: false
  },
  {
    name: 'Students',
    price: '₹3,000 /-',
    color: 'from-purple-500 to-pink-500',
    borderColor: 'border-purple-500/40',
    bgGradient: 'from-purple-500/5 to-pink-500/5',
    icon: Crown,
    accentColor: 'text-purple-400',
    badge: 'RECOMMENDED',
    badgeColor: 'bg-purple-500/10',
    features: [
      'One-on-one mentoring',
      'Access to Courses',
      'Advanced projects',
      'Internship Completion Certificate',
      'Project Completion Certificate',
      'LOR based on performance',
      'Stipend Based on Performance'
    ],
    recommended: true
  },
  {
    name: 'Stipend',
    price: 'Variable',
    color: 'from-green-500 to-emerald-500',
    borderColor: 'border-green-500/40',
    bgGradient: 'from-green-500/5 to-emerald-500/5',
    icon: Rocket,
    accentColor: 'text-green-400',
    badge: 'Selected Members only*',
    badgeColor: 'bg-green-500/10',
    features: [
      'All Professional features',
      'Monthly ₹5,000+ stipend',
      'Performance bonus (up to ₹10K)',
      'Fast-track to freelancing',
      '12/7 priority support',
      'Exclusive career opportunities'
    ],
    recommended: false
  }
];

export default function InternshipsPackages() {
  const { theme } = useTheme();
  
  const bgClass = theme === 'light' ? 'bg-white' : 'bg-[#0A0A0A]';
  const textClass = theme === 'light' ? 'text-gray-900' : 'text-white';
  const descClass = theme === 'light' ? 'text-gray-600' : 'text-gray-400';

  return (
    <section className={`py-12 md:py-32 px-3 sm:px-6 ${bgClass} relative transition-colors duration-300 overflow-hidden`}>
      {/* Subtle Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-gradient-to-br from-blue-500/3 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-purple-500/3 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <p className={`text-xs md:text-sm font-semibold tracking-widest uppercase ${descClass} mb-2 md:mb-4`}>
            Pricing Plans
          </p>
          <h2 className={`text-2xl md:text-5xl font-bold tracking-tight mb-2 md:mb-4 ${textClass}`}>
            Choose Your Learning Path
          </h2>
          <p className={`${descClass} text-xs md:text-lg max-w-2xl mx-auto`}>
            Select the plan that best fits your goals and accelerate your tech career
          </p>
        </div>

        {/* Trust Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-8 mb-8 md:mb-16 px-2">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
            <span className={`text-xs md:text-sm font-medium ${descClass}`}>100% Secure</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
            <span className={`text-xs md:text-sm font-medium ${descClass}`}>Industry Certified</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
            <span className={`text-xs md:text-sm font-medium ${descClass}`}>95% Success Rate</span>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8">
          {packages.map((pkg, index) => {
            const Icon = pkg.icon;
            return (
              <div
                key={index}
                className={`group relative transition-all duration-300 ${pkg.recommended ? 'md:scale-105 md:z-20' : ''}`}
              >
                {/* Recommended Label */}
                {pkg.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-30">
                    <span className="px-3 py-0.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full whitespace-nowrap">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {/* Card */}
                <div className={`relative h-full bg-gradient-to-b ${pkg.bgGradient} border ${pkg.borderColor} rounded-lg md:rounded-2xl p-3 md:p-8 transition-all duration-300 hover:border-opacity-100 ${
                  pkg.recommended ? 'border-opacity-100 ring-1 ring-purple-500/20' : 'border-opacity-60'
                }`}>
                  {/* Badge */}
                  <div className={`inline-block ${pkg.badgeColor} px-2 py-0.5 rounded-md mb-2 md:mb-6`}>
                    <p className={`text-xs font-bold tracking-wide ${pkg.accentColor}`}>
                      {pkg.badge}
                    </p>
                  </div>

                  {/* Icon & Name */}
                  <div className="flex items-start gap-2 mb-2 md:mb-6">
                    <div className={`p-1.5 rounded-lg bg-${pkg.accentColor.split('-')[1]}-500/10`}>
                      <Icon className={`w-4 h-4 md:w-5 md:h-5 ${pkg.accentColor}`} />
                    </div>
                    <div>
                      <h3 className={`text-lg md:text-2xl font-bold ${textClass}`}>
                        {pkg.name}
                      </h3>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className={`h-px bg-gradient-to-r ${pkg.color} opacity-20 mb-2 md:mb-6`} />

                  {/* Price */}
                  <div className="mb-3 md:mb-8">
                    <p className={`text-xl md:text-3xl font-bold bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent`}>
                      {pkg.price}
                    </p>
                    {pkg.price !== 'Variable' && (
                      <p className={`text-xs ${descClass} mt-1 md:mt-2`}>
                        {pkg.price === 'Free' ? 'Forever access' : '+ Taxes *'}
                      </p>
                    )}
                    {pkg.price === 'Variable' && (
                      <p className={`text-xs ${descClass} mt-1 md:mt-2`}>
                        Based on performance and merit
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-2 md:space-y-4 mb-3 md:mb-8">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className={`w-3 h-3 md:w-4 md:h-4 ${pkg.accentColor} flex-shrink-0 mt-0.5`} />
                        <span className={`text-xs md:text-sm ${textClass}`}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Button */}
                  <button className={`w-full py-2 md:py-3 px-4 md:px-6 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-xs md:text-sm ${
                    pkg.recommended
                      ? `bg-gradient-to-r ${pkg.color} text-white hover:shadow-lg hover:scale-105 active:scale-95`
                      : `border ${pkg.borderColor} text-white hover:bg-opacity-10 hover:bg-gradient-to-r ${pkg.color}`
                  }`}>
                    <Zap className="w-3 h-3 md:w-4 md:h-4" />
                    Get Started
                  </button>

                  {/* Footer Info */}
                  <p className={`text-center text-xs ${descClass} mt-2 md:mt-4`}>
                    {pkg.recommended ? 'Most interns choose this plan' : 'Flexible Timings'}
                  </p>

                  {/* Money Back Guarantee */}
                  <div className={`mt-2 md:mt-6 pt-2 md:pt-6 border-t border-white/5 flex items-center justify-center gap-1`}>
                    <Lock className="w-3 h-3 text-green-400" />
                    <p className={`text-xs ${descClass}`}>Guaranted Benifits</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-8 md:mt-16">
          <p className={`${descClass} text-xs md:text-sm mb-3 md:mb-4`}>
            Need help choosing the right plan?
          </p>
          <button className={`px-4 md:px-8 py-2 md:py-3 border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 rounded-lg font-semibold transition-all duration-300 text-xs md:text-sm flex items-center gap-2 mx-auto`}>
            <Target className="w-3 h-3 md:w-4 md:h-4" />
            Book a Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
