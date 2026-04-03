import Header from './Header';
import Hero from './Hero';
import InternshipsCapabilities from './InternshipsCapabilities';
import VisualSection from './VisualSection';
import InternshipsPackages from './InternshipsPackages';
import Process from './Process';
import InternshipsFinalSection from './InternshipsFinalSection';
import Footer from './Footer';
import { BookOpen, Briefcase, Award, Coins } from 'lucide-react';

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
      </div>
      <Footer badgeText="We are hiring" hideProjectDescription={true} hideCallSectionDescription={true} hideCallButton={true} />
    </div>
  );
}
