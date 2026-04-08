import { useState } from 'react';
import { ArrowRight, MapPin, Clock, Briefcase, Users, Award } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface JobListing {
  id: string;
  title: string;
  category: 'intern' | 'parttime' | 'fulltime';
  role: string;
  description: string;
  requirements: string[];
  perks: string[];
  location: string;
  type: string;
}

const jobs: JobListing[] = [
  // Interns
  {
    id: 'intern-bda',
    title: 'Business Development Associate',
    category: 'intern',
    role: 'Intern - BDA',
    description: 'Join our team as a Business Development Intern and help drive growth through strategic partnerships and client engagement.',
    requirements: [
      'Currently pursuing graduation',
      'Strong communication skills',
      'Ability to work in a fast-paced environment',
      'Basic understanding of business development',
      'Proficiency in English'
    ],
    perks: [
      'Hands-on experience in business development',
      'Mentorship from industry experts',
      'Certificate upon completion',
      'Flexible working hours',
      'Opportunity to convert to full-time'
    ],
    location: 'Remote',
    type: 'Internship'
  },
  {
    id: 'intern-tech',
    title: 'Tech & Software Development',
    category: 'intern',
    role: 'Intern - Technology',
    description: 'Work on cutting-edge projects and contribute to our technology stack while learning from experienced developers.',
    requirements: [
      'Basic programming knowledge (Python, JavaScript, or similar)',
      'Strong problem-solving skills',
      'Willingness to learn new technologies',
      'Currently enrolled in a relevant degree program',
      'Git and version control basics'
    ],
    perks: [
      'Work on real-world projects',
      'Mentorship from senior developers',
      'Portfolio-building opportunities',
      'Flexible schedule',
      'Potential full-time offer'
    ],
    location: 'Remote',
    type: 'Internship'
  },

  // Part-Time
  {
    id: 'parttime-bda',
    title: 'Business Development Associate',
    category: 'parttime',
    role: 'Part-Time - BDA',
    description: 'Drive business growth and manage client relationships while maintaining flexibility in your schedule.',
    requirements: [
      'Bachelor\'s degree or equivalent',
      'Proven experience in business development or sales',
      '2+ years of relevant experience',
      'Excellent negotiation skills',
      'Available 20-25 hours per week'
    ],
    perks: [
      'Competitive hourly compensation',
      'Performance bonuses',
      'Flexible working hours',
      'Skill development',
      'Career growth opportunities'
    ],
    location: 'Remote',
    type: 'Part-Time'
  },
  {
    id: 'parttime-marketing',
    title: 'Marketing Executive',
    category: 'parttime',
    role: 'Part-Time - Marketing',
    description: 'Create and execute marketing strategies to enhance our brand presence across digital platforms.',
    requirements: [
      'Experience with digital marketing tools',
      'Knowledge of social media marketing',
      'Basic content creation skills',
      'Available 20-30 hours per week',
      'Diploma or degree in marketing'
    ],
    perks: [
      'Flexible schedule',
      'Creative freedom',
      'Competitive pay',
      'Portfolio improvement',
      'Collaboration with creative team'
    ],
    location: 'Remote',
    type: 'Part-Time'
  },
  {
    id: 'parttime-sales',
    title: 'Sales Executive',
    category: 'parttime',
    role: 'Part-Time - Sales',
    description: 'Build relationships with clients and drive revenue growth through effective sales strategies.',
    requirements: [
      '1+ years of sales experience',
      'Strong phone and email communication skills',
      'Ability to meet targets',
      'Available 20-25 hours per week',
      'Diploma or above'
    ],
    perks: [
      'Commission-based earnings',
      'Flexible hours',
      'Sales training',
      'Growth opportunities',
      'Team support'
    ],
    location: 'Remote',
    type: 'Part-Time'
  },
  {
    id: 'parttime-client-handling',
    title: 'Client Success Manager',
    category: 'parttime',
    role: 'Part-Time - Client Handling',
    description: 'Ensure client satisfaction and manage ongoing client relationships with professionalism and care.',
    requirements: [
      'Excellent customer service skills',
      'Problem-solving ability',
      'Available 20-25 hours per week',
      'Communication skills',
      'Experience in customer support preferred'
    ],
    perks: [
      'Flexible working hours',
      'Competitive compensation',
      'Client relationship skills',
      'Remote work',
      'Team collaboration'
    ],
    location: 'Remote',
    type: 'Part-Time'
  },

  // Full-Time
  {
    id: 'fulltime-1',
    title: 'Senior Software Engineer',
    category: 'fulltime',
    role: 'Full-Time - Software Development',
    description: 'Lead technical projects and mentor junior developers in our innovative tech environment.',
    requirements: [
      '4+ years of software development experience',
      'Proficiency in modern programming languages',
      'System design knowledge',
      'Leadership and mentoring experience',
      'Bachelor\'s in Computer Science or related field'
    ],
    perks: [
      'Competitive salary',
      'Health insurance',
      'Professional development budget',
      'Flexible work policy',
      'Career advancement opportunities'
    ],
    location: 'Remote / On-Site',
    type: 'Full-Time'
  },
  {
    id: 'fulltime-2',
    title: 'Product Manager',
    category: 'fulltime',
    role: 'Full-Time - Product Management',
    description: 'Shape product strategy and oversee the development of our core products.',
    requirements: [
      '3+ years of product management experience',
      'Strong analytical skills',
      'Leadership capabilities',
      'Understanding of market trends',
      'Bachelor\'s degree required'
    ],
    perks: [
      'Attractive compensation',
      'Stock options',
      'Comprehensive benefits',
      'Remote flexibility',
      'Leadership opportunities'
    ],
    location: 'Remote / On-Site',
    type: 'Full-Time'
  },
  {
    id: 'fulltime-3',
    title: 'Business Development Manager',
    category: 'fulltime',
    role: 'Full-Time - Business Development',
    description: 'Identify new business opportunities and drive strategic partnerships.',
    requirements: [
      '3+ years in business development or sales',
      'Track record of closing deals',
      'Strategic thinking skills',
      'Networking abilities',
      'Bachelor\'s degree'
    ],
    perks: [
      'Competitive base salary',
      'Performance bonuses',
      'Comprehensive health coverage',
      'Flexible working',
      'Continuous learning'
    ],
    location: 'Remote / On-Site',
    type: 'Full-Time'
  },
];

export default function CareerPage() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<'intern' | 'parttime' | 'fulltime'>('intern');
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const bgClass = theme === 'light' ? 'bg-white text-gray-900' : 'bg-[#0A0A0A] text-white';
  const cardClass = theme === 'light' ? 'bg-gray-50 hover:bg-gray-100' : 'bg-gray-900 hover:bg-gray-800';
  const textMutedClass = theme === 'light' ? 'text-gray-600' : 'text-gray-400';

  const categorizedJobs = jobs.filter(job => job.category === selectedCategory);

  const categoryTabs = [
    { id: 'intern', label: 'Internships', icon: Award, color: 'from-blue-500 to-cyan-500' },
    { id: 'parttime', label: 'Part-Time', icon: Clock, color: 'from-purple-500 to-pink-500' },
    { id: 'fulltime', label: 'Full-Time', icon: Briefcase, color: 'from-emerald-500 to-teal-500' }
  ];

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-30 backdrop-blur-md bg-opacity-80 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            UBITY Careers
          </h1>
          <a
            href="/internships"
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
          >
            Back
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Join Our Team
          </h2>
          <p className={`text-xl ${textMutedClass} mb-6`}>
            Grow with us at UBITY. We're looking for talented individuals across all levels.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {categoryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedCategory === tab.id as any;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`p-6 rounded-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  isActive
                    ? `bg-gradient-to-br ${tab.color} text-white shadow-2xl`
                    : cardClass
                }`}
              >
                <Icon className={`w-8 h-8 mb-3 ${isActive ? 'text-white' : 'text-current'}`} />
                <h3 className="text-lg font-bold">{tab.label}</h3>
                <p className={`text-sm mt-2 ${isActive ? 'text-white/80' : textMutedClass}`}>
                  {jobs.filter(j => j.category === tab.id).length} Openings
                </p>
              </button>
            );
          })}
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {categorizedJobs.length === 0 ? (
            <div className="text-center py-12">
              <p className={`text-lg ${textMutedClass}`}>No positions available in this category.</p>
            </div>
          ) : (
            categorizedJobs.map((job) => (
              <div
                key={job.id}
                className={`${cardClass} rounded-xl p-6 cursor-pointer transition-all duration-300 border border-gray-200 dark:border-gray-700`}
                onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
              >
                {/* Job Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className={textMutedClass}>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span className={textMutedClass}>{job.type}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
                    <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${expandedJob === job.id ? 'rotate-90' : ''}`} />
                  </button>
                </div>

                {/* Expanded Content */}
                {expandedJob === job.id && (
                  <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 animate-in">
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      {/* Requirements */}
                      <div>
                        <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                          <Users className="w-5 h-5" />
                          Requirements
                        </h4>
                        <ul className="space-y-3">
                          {job.requirements.map((req, idx) => (
                            <li key={idx} className={`flex gap-3 ${textMutedClass}`}>
                              <span className="text-blue-500 font-bold flex-shrink-0">✓</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Perks */}
                      <div>
                        <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                          <Award className="w-5 h-5" />
                          What We Offer
                        </h4>
                        <ul className="space-y-3">
                          {job.perks.map((perk, idx) => (
                            <li key={idx} className={`flex gap-3 ${textMutedClass}`}>
                              <span className="text-purple-500 font-bold flex-shrink-0">★</span>
                              <span>{perk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                      <h4 className="text-lg font-bold mb-3">About This Role</h4>
                      <p className={textMutedClass}>{job.description}</p>
                    </div>

                    {/* Apply Button */}
                    <div className="flex gap-4">
                      <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105">
                        Apply Now
                      </button>
                      <button className={`px-8 py-3 border-2 border-current rounded-lg font-semibold hover:bg-opacity-10 transition-all`}>
                        Learn More
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* CTA Section */}
        <div className={`mt-20 p-12 rounded-xl text-center bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20`}>
          <h3 className="text-3xl font-bold mb-4">Don't see your perfect role?</h3>
          <p className={`text-lg ${textMutedClass} mb-6`}>
            Send us your profile and let's explore opportunities together.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105">
            Submit Your Profile
          </button>
        </div>
      </div>
    </div>
  );
}
