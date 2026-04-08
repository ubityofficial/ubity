import Header from './Header';
import Hero from './Hero';
import InternshipsCapabilities from './InternshipsCapabilities';
import VisualSection from './VisualSection';
import InternshipsPackages from './InternshipsPackages';
import Process from './Process';
import InternshipsFinalSection from './InternshipsFinalSection';
import Footer from './Footer';
import { BookOpen, Briefcase, Award, Coins, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const internshipSteps = [
  {
    icon: BookOpen,
    title: 'Complete Training',
    description: 'Comprehensive curriculum covering industry-required skills'
  },
  {
    icon: Briefcase,
    title: 'Hands-On Projects',
    description: 'Work on real-world projects with our expert mentors'
  },
  {
    icon: Award,
    title: 'Get Certified',
    description: 'Industry-recognized certification upon completion'
  },
  {
    icon: Coins,
    title: 'Stipends Based on Performance',
    description: 'Earn competitive stipends based on your excellent performance'
  }
];

export default function InternshipsPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0A0A0A]">
      <Header />
      <Hero tagline="Gain industry Experience" heading="Work with the industry, you are about to join" description="" showVerticalLine={false} />
      <div className="-mt-48 sm:-mt-32">
        <InternshipsCapabilities />
        <Process 
          customSteps={internshipSteps} 
          title="What You'll Gain" 
          subtitle="A complete learning experience designed to launch your tech career"
        />
        <InternshipsPackages />
        <InternshipsFinalSection />
        
        {/* Hiring Section */}
        <div className="max-w-6xl mx-auto px-6 py-20 sm:py-32">
          <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 border border-blue-500/30 rounded-2xl p-8 sm:p-12 text-center">
            <div className="flex justify-center mb-6">
              <Users className="w-12 h-12 text-blue-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              We Are Hiring!
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Looking for talented individuals across Interns, Part-Time, and Full-Time roles. Explore exciting opportunities in BDA, Tech, Marketing, Sales, and more.
            </p>
            <button
              onClick={() => navigate('/careers')}
              className="inline-flex items-center gap-3 px-8 sm:px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 text-lg"
            >
              <Briefcase className="w-6 h-6" />
              Explore Opportunities
              <span className="text-xl">→</span>
            </button>
          </div>
        </div>
      </div>
      <Footer badgeText="We are hiring" hideProjectDescription={true} hideCallSectionDescription={true} hideCallButton={true} />
    </div>
  );
}
