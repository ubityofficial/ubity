import { useState } from 'react';
import { ArrowRight, MapPin, Clock, Briefcase, Users, Award, CheckCircle2, Zap, Target, TrendingUp } from 'lucide-react';

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
  const [selectedCategory, setSelectedCategory] = useState<'intern' | 'parttime' | 'fulltime'>('intern');
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const categorizedJobs = jobs.filter(job => job.category === selectedCategory);

  const categoryTabs = [
    { id: 'intern', label: 'Internship Programs', icon: Award, count: 2, color: 'from-blue-600 to-blue-700' },
    { id: 'parttime', label: 'Part-Time Roles', icon: Clock, count: 4, color: 'from-purple-600 to-purple-700' },
    { id: 'fulltime', label: 'Full-Time Careers', icon: Briefcase, count: 3, color: 'from-emerald-600 to-emerald-700' }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-100 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
              U
            </div>
            <span className="text-2xl font-bold text-gray-900">UBITY</span>
          </div>
          <a
            href="/internships"
            className="px-6 py-2 bg-gray-100 text-gray-900 hover:bg-gray-200 rounded-lg font-semibold transition-colors"
          >
            ← Back
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6 font-semibold text-sm">
            <Zap className="w-4 h-4" />
            We're Growing & We Want You
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Build Your Future<br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              With UBITY
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join a talented team of innovators and builders. We're looking for exceptional people to help us revolutionize the industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">9+</div>
              <div className="text-sm text-gray-600">Open Positions</div>
            </div>
            <div className="h-12 w-px bg-gray-200 hidden sm:block"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">100+</div>
              <div className="text-sm text-gray-600">Happy Team Members</div>
            </div>
            <div className="h-12 w-px bg-gray-200 hidden sm:block"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">3</div>
              <div className="text-sm text-gray-600">Employment Types</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Selection */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Find Your Perfect Role</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {categoryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedCategory === tab.id as any;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`p-8 rounded-2xl transition-all duration-300 group cursor-pointer ${
                  isActive
                    ? `bg-gradient-to-br ${tab.color} text-white shadow-2xl scale-105`
                    : 'bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  isActive 
                    ? 'bg-white/20' 
                    : 'bg-blue-100 group-hover:bg-blue-200'
                }`}>
                  <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                </div>
                <h3 className="text-lg font-bold mb-2">{tab.label}</h3>
                <p className={`text-sm ${isActive ? 'text-white/80' : 'text-gray-600'}`}>
                  {tab.count} {tab.count === 1 ? 'opening' : 'openings'}
                </p>
              </button>
            );
          })}
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {categorizedJobs.length === 0 ? (
            <div className="text-center py-16">
              <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg text-gray-600">No positions available in this category.</p>
            </div>
          ) : (
            categorizedJobs.map((job, index) => (
              <div
                key={job.id}
                className={`bg-white border border-gray-200 hover:border-gray-300 rounded-2xl p-8 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                  expandedJob === job.id ? 'ring-2 ring-blue-500 border-blue-200' : ''
                }`}
                onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
              >
                {/* Job Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg bg-gradient-to-br ${
                        selectedCategory === 'intern' ? 'from-blue-500 to-blue-600' :
                        selectedCategory === 'parttime' ? 'from-purple-500 to-purple-600' :
                        'from-emerald-500 to-emerald-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{job.role}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-6 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4 text-purple-500" />
                        {job.type}
                      </div>
                    </div>
                  </div>
                  <button className={`p-3 rounded-xl transition-all duration-300 flex-shrink-0 ${
                    expandedJob === job.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>
                    <ArrowRight className={`w-6 h-6 transition-transform duration-300 ${expandedJob === job.id ? 'rotate-90' : ''}`} />
                  </button>
                </div>

                {/* Expanded Content */}
                {expandedJob === job.id && (
                  <div className="mt-8 pt-8 border-t border-gray-200 space-y-8 animate-in">
                    {/* Description */}
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        About This Role
                      </h4>
                      <p className="text-gray-600 leading-relaxed">{job.description}</p>
                    </div>

                    {/* Two Column Layout */}
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Requirements */}
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <Users className="w-5 h-5 text-blue-600" />
                          What We're Looking For
                        </h4>
                        <ul className="space-y-3">
                          {job.requirements.map((req, idx) => (
                            <li key={idx} className="flex gap-3 text-gray-600">
                              <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Perks */}
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <Award className="w-5 h-5 text-purple-600" />
                          What You'll Get
                        </h4>
                        <ul className="space-y-3">
                          {job.perks.map((perk, idx) => (
                            <li key={idx} className="flex gap-3 text-gray-600">
                              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                                ★
                              </div>
                              <span>{perk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2">
                        <Briefcase className="w-5 h-5" />
                        Apply Now
                      </button>
                      <button className="flex-1 px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold rounded-xl transition-all duration-300">
                        Learn More
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-20 px-6 mt-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Join Us?</h2>
          <p className="text-xl text-blue-50 mb-10">
            Don't see a perfect fit? We'd still love to hear from you. Send us your profile and let's explore opportunities together.
          </p>
          <button className="px-10 py-4 bg-white text-blue-600 font-bold rounded-xl hover:shadow-2xl transition-all hover:scale-105 text-lg">
            Submit Your Profile
          </button>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gray-50 border-t border-gray-200 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600 mb-8">Have questions? Our hiring team is here to help.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:careers@ubity.com" className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-semibold transition-colors">
              Email Us
            </a>
            <a href="/internships" className="px-8 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-50 font-semibold transition-colors">
              Back to Internships
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
