import { useState } from 'react';
import { useEffect } from 'react';
import { ArrowRight, MapPin, Clock, Briefcase, Users, Award, CheckCircle2, Check, Sparkles, Rocket, Target, X, Upload } from 'lucide-react';
import Footer from './Footer';

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

interface ApplicationForm {
  fullName: string;
  email: string;
  age: string;
  qualification: string;
  resume: File | null;
  availableImmediately: boolean;
  remoteWork: boolean;
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

// Custom hook for animated counter
function useCounter(maxValue: number, duration: number = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setCount(Math.floor(progress * maxValue));
      
      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [maxValue, duration]);

  return count;
}

export default function CareerPage() {
  const [selectedCategory, setSelectedCategory] = useState<'intern' | 'parttime' | 'fulltime'>('intern');
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [viewingApplicationPage, setViewingApplicationPage] = useState(false);
  const [selectedJobForApplication, setSelectedJobForApplication] = useState<JobListing | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState<ApplicationForm>({
    fullName: '',
    email: '',
    age: '',
    qualification: '',
    resume: null,
    availableImmediately: false,
    remoteWork: true,
  });

  // Animated counters
  const positionsCount = useCounter(40, 2000);
  const membersCount = useCounter(86, 2000);
  const typesCount = useCounter(4, 2000);

  const categorizedJobs = jobs.filter(job => job.category === selectedCategory);

  const handleApplyClick = (job: JobListing) => {
    setSelectedJobForApplication(job);
    setViewingApplicationPage(true);
    window.scrollTo(0, 0);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        resume: e.target.files![0]
      }));
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.age || !formData.qualification || !formData.resume) {
      alert('Please fill all required fields and upload a resume');
      return;
    }

    setSubmitting(true);
    
    try {
      if (!formData.fullName || !formData.email || !formData.age || !formData.qualification || !formData.resume) {
        alert('Please fill all required fields and upload a resume');
        return;
      }

      setSubmitting(true);
      
      // Read resume file and convert to base64
      let resumeBase64 = '';
      if (formData.resume) {
        const reader = new FileReader();
        resumeBase64 = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(formData.resume!);
        });
      }

      // Call the API to send application email
      // Use relative path for production (Vercel), or VITE_API_URL for development
      const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? (process.env.VITE_API_URL || 'http://localhost:3001')
        : '';
      const endpoint = `${apiUrl}/api/send-application`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          age: formData.age,
          qualification: formData.qualification,
          jobTitle: selectedJobForApplication?.title || 'Not specified',
          resumeBase64: resumeBase64,
          resumeFileName: formData.resume?.name || 'resume.pdf',
        }),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      let result;
      
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Server error (${response.status}): ${text.substring(0, 100)}`);
      }

      if (!response.ok) {
        throw new Error(result.message || `Failed to submit application (${response.status})`);
      }

      setSuccessMessage(`✓ Application submitted successfully! Check your email for confirmation.`);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          age: '',
          qualification: '',
          resume: null,
          availableImmediately: false,
          remoteWork: true,
        });
        setViewingApplicationPage(false);
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Application error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Please try again later.';
      alert(`Error submitting application: ${errorMessage}`);
    } finally {
      setSubmitting(false);
    }
  };

  const categoryTabs = [
    { id: 'intern', label: 'Internship Programs', icon: Award, count: 2, bgGradient: 'from-blue-50 via-cyan-50 to-blue-50', borderColor: 'border-blue-200', activeGradient: 'from-blue-600 via-blue-500 to-cyan-600', shadowColor: 'shadow-blue-200' },
    { id: 'parttime', label: 'Part-Time Roles', icon: Clock, count: 4, bgGradient: 'from-purple-50 via-pink-50 to-purple-50', borderColor: 'border-purple-200', activeGradient: 'from-purple-600 via-purple-500 to-pink-600', shadowColor: 'shadow-purple-200' },
    { id: 'fulltime', label: 'Full-Time Careers', icon: Briefcase, count: 3, bgGradient: 'from-orange-50 via-amber-50 to-orange-50', borderColor: 'border-orange-200', activeGradient: 'from-orange-600 via-orange-500 to-amber-600', shadowColor: 'shadow-orange-200' }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      <style>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-transparent rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-100 to-transparent rounded-full mix-blend-multiply filter blur-3xl opacity-20" style={{ animation: 'blob 7s infinite 2s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-tr from-pink-100 to-transparent rounded-full mix-blend-multiply filter blur-3xl opacity-20" style={{ animation: 'blob 7s infinite 4s' }}></div>
      </div>

      {/* Application Page - Full Page View */}
      {viewingApplicationPage && selectedJobForApplication && (
        <div className="min-h-screen bg-white">
          {/* Top Navigation Bar */}
          <div className="fixed top-0 left-0 right-0 z-30 backdrop-blur-3xl bg-white/5 border-b border-white/10 shadow-sm rounded-2xl sm:rounded-3xl mt-2 sm:mt-4 mx-2 sm:mx-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <a className="text-xl sm:text-3xl md:text-4xl font-plusJakarta font-bold tracking-wider text-black transition-colors duration-300 flex-shrink-0">
                  UBITY
                </a>
              </div>
              <button
                onClick={() => setViewingApplicationPage(false)}
                className="px-3 sm:px-5 py-1.5 sm:py-2 bg-black text-white rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 hover:shadow-lg hover:bg-gray-900 flex-shrink-0"
              >
                ← Back
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="pt-32 sm:pt-40 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              {/* Job Header */}
              <div className="mb-8 sm:mb-12">
                <div className="mb-4 sm:mb-6">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">{selectedJobForApplication.title}</h1>
                  <div className="flex flex-wrap gap-3 sm:gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                      <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600 flex-shrink-0" />
                      <span className="font-semibold">{selectedJobForApplication.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                      <Briefcase className="w-4 sm:w-5 h-4 sm:h-5 text-purple-600 flex-shrink-0" />
                      <span className="font-semibold">{selectedJobForApplication.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                      <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-orange-600 flex-shrink-0" />
                      <span className="font-semibold">{selectedJobForApplication.role}</span>
                    </div>
                  </div>
                </div>

                {/* Job Description */}
                <div className="bg-gradient-to-r from-blue-50/40 via-transparent to-blue-50/30 border border-gray-300 rounded-lg p-4 sm:p-6 backdrop-blur-sm mb-6 sm:mb-8">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Job Description</h2>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{selectedJobForApplication.description}</p>
                </div>

                {/* Responsibilities */}
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Responsibilities</h2>
                  <ul className="space-y-2 sm:space-y-3">
                    {selectedJobForApplication.perks.map((perk, idx) => (
                      <li key={idx} className="flex gap-3 text-sm sm:text-base text-gray-700">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs sm:text-sm font-bold mt-0.5 flex-shrink-0">
                          ✓
                        </div>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Qualifications / Requirements */}
                <div className="bg-white border border-gray-300 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Qualifications & Requirements</h2>
                  <ul className="space-y-2 sm:space-y-3">
                    {selectedJobForApplication.requirements.map((req, idx) => (
                      <li key={idx} className="flex gap-3 text-sm sm:text-base text-gray-700">
                        <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Application Form Section */}
                <div className="bg-white border border-gray-300 rounded-lg p-4 sm:p-6 md:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Apply for this position</h2>
                  
                  <form onSubmit={handleSubmitApplication} className="space-y-4 sm:space-y-6">
                    {successMessage && (
                      <div className="p-3 sm:p-4 bg-green-50 border border-green-200 rounded-xl text-sm sm:text-base text-green-700 font-semibold">
                        {successMessage}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleFormChange}
                          placeholder="John Doe"
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>

                      {/* Age */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Age *</label>
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleFormChange}
                          placeholder="25"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                          min="18"
                          max="80"
                        />
                      </div>

                      {/* Qualification */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Qualification *</label>
                        <select
                          name="qualification"
                          value={formData.qualification}
                          onChange={handleFormChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                        >
                          <option value="">Select your qualification</option>
                          <option value="highschool">High School / 12th Pass</option>
                          <option value="diploma">Diploma</option>
                          <option value="bachelor">Bachelor's Degree</option>
                          <option value="master">Master's Degree</option>
                          <option value="phd">PhD</option>
                        </select>
                      </div>
                    </div>

                    {/* Resume Upload - Full Width */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Resume (PDF/DOC) *</label>
                      <label className="w-full px-4 py-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center gap-3">
                        <Upload className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700 font-medium">
                          {formData.resume ? formData.resume.name : 'Click to upload or drag and drop'}
                        </span>
                        <input
                          type="file"
                          name="resume"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          required
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-2">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-4 bg-gray-50 p-5 rounded-lg">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="availableImmediately"
                          checked={formData.availableImmediately}
                          onChange={handleFormChange}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-blue-600 font-semibold">Available to start immediately</span>
                      </label>
                      
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="remoteWork"
                          checked={formData.remoteWork}
                          onChange={handleFormChange}
                          className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                        />
                        <span className="text-purple-600 font-semibold">Prefer remote work</span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full px-8 py-4 bg-black hover:bg-gray-900 text-white font-bold text-lg rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Career Page - Show only when not viewing application page */}
      {!viewingApplicationPage && (
        <>
          {/* Navigation Bar */}
          <div className="fixed top-0 left-0 right-0 z-30 backdrop-blur-3xl bg-white/5 border-b border-white/10 shadow-sm rounded-2xl sm:rounded-3xl mt-2 sm:mt-4 mx-2 sm:mx-4">
        <div className="max-w-7xl mx-auto px-6 py-3 sm:py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a className="text-xl sm:text-3xl md:text-4xl font-plusJakarta font-bold tracking-wider text-black transition-colors duration-300 flex-shrink-0">
              UBITY
            </a>
          </div>
          <a
            href="/internships"
            className="px-3 sm:px-5 py-1.5 sm:py-2 bg-black text-white rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 hover:shadow-lg hover:bg-gray-900"
          >
            ← Back
          </a>
        </div>
      </div>

      {/* Hero Section with Gradient Background */}
      <div className="relative pt-32 sm:pt-40 md:pt-44 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-100 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
          <div className="absolute -bottom-32 right-10 w-72 h-72 bg-gradient-to-tl from-purple-500/20 to-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12 md:mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-cyan-300 px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-full mb-4 sm:mb-6 md:mb-8 font-semibold text-xs sm:text-sm border border-blue-400/30 shadow-lg shadow-blue-500/20">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            We're Growing & We Want You
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Build Your Future<br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              With UBITY
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            Join a talented team of innovators and builders. We're looking for exceptional people to help us revolutionize the industry.
          </p>
          
          {/* Stats */}
          <div className="flex flex-row gap-3 sm:gap-8 justify-center bg-gradient-to-r from-white/10 to-blue-500/10 backdrop-blur-md p-4 sm:p-8 rounded-2xl border border-white/20 shadow-xl">
            <div className="text-center group">
              <div className="text-2xl sm:text-4xl font-bold bg-gradient-to-br from-blue-400 to-cyan-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-cyan-300 transition-all">{positionsCount}+</div>
              <div className="text-xs sm:text-sm text-gray-300 mt-1 sm:mt-2 font-medium">Open Positions</div>
            </div>
            <div className="h-6 sm:h-12 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
            <div className="text-center group">
              <div className="text-2xl sm:text-4xl font-bold bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-300 transition-all">{membersCount}+</div>
              <div className="text-xs sm:text-sm text-gray-300 mt-1 sm:mt-2 font-medium">Happy Team Members</div>
            </div>
            <div className="h-6 sm:h-12 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
            <div className="text-center group">
              <div className="text-2xl sm:text-4xl font-bold bg-gradient-to-br from-orange-400 to-amber-400 bg-clip-text text-transparent group-hover:from-orange-300 group-hover:to-amber-300 transition-all">{typesCount}+</div>
              <div className="text-xs sm:text-sm text-gray-300 mt-1 sm:mt-2 font-medium">Employment Types</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 sm:mb-16 text-center">Find Your Perfect Role</h2>
        
        {/* Category Selection - Mobile Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {categoryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedCategory === tab.id as any;
            return (
              <div key={tab.id}>
                <button
                  onClick={() => setSelectedCategory(tab.id as any)}
                  className={`w-full relative p-4 sm:p-6 rounded-lg transition-all duration-200 group cursor-pointer border ${
                    isActive
                      ? `bg-gradient-to-b from-gray-950 to-gray-900 text-white border-gray-700 shadow-lg`
                      : `bg-white border-gray-200 text-gray-900 hover:border-gray-300 hover:shadow-md`
                  }`}
                >
                  {/* Top accent line - minimal */}
                  <div className={`absolute top-0 left-0 right-0 h-0.5 transition-colors duration-200 ${
                    isActive
                      ? tab.id === 'intern' ? 'bg-blue-600' :
                        tab.id === 'parttime' ? 'bg-purple-600' :
                        'bg-emerald-600'
                      : 'bg-gray-200'
                  }`}></div>

                  <div className="relative space-y-4">
                    {/* Custom Animated Icons */}
                    <div className={`w-12 h-12 rounded-md flex items-center justify-center ${
                      isActive 
                        ? 'bg-gradient-to-b from-gray-800 to-gray-700' 
                        : tab.id === 'intern'
                        ? 'bg-blue-50'
                        : tab.id === 'parttime'
                        ? 'bg-purple-50'
                        : 'bg-orange-50'
                    }`}>
                      {/* Internship Animated Bars */}
                      {tab.id === 'intern' && (
                        <div className="flex items-end gap-1.5 h-6">
                          <div className={`w-1.5 rounded-sm animate-pulse ${isActive ? 'bg-blue-400' : 'bg-blue-600'}`} style={{height: '12px', animationDelay: '0s'}}></div>
                          <div className={`w-1.5 rounded-sm animate-pulse ${isActive ? 'bg-blue-400' : 'bg-blue-600'}`} style={{height: '16px', animationDelay: '0.2s'}}></div>
                          <div className={`w-1.5 rounded-sm animate-pulse ${isActive ? 'bg-blue-400' : 'bg-blue-600'}`} style={{height: '20px', animationDelay: '0.4s'}}></div>
                        </div>
                      )}
                      
                      {/* Part-Time Animated Clock */}
                      {tab.id === 'parttime' && (
                        <div className="relative w-5 h-5">
                          <svg className={`w-5 h-5 ${isActive ? 'text-purple-400' : 'text-purple-600'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="9"></circle>
                            <polyline points="12 6 12 12 16 14" style={{transformOrigin: '12px 12px', animation: 'rotate 4s linear infinite'}}></polyline>
                          </svg>
                        </div>
                      )}
                      
                      {/* Full-Time Animated Stacks */}
                      {tab.id === 'fulltime' && (
                        <div className="flex flex-col gap-1" style={{animation: 'none'}}>
                          <div className={`w-4 h-1.5 rounded-sm ${isActive ? 'bg-orange-400' : 'bg-orange-600'} animate-pulse`} style={{animationDelay: '0s'}}></div>
                          <div className={`w-4 h-1.5 rounded-sm ${isActive ? 'bg-orange-400' : 'bg-orange-600'} animate-pulse`} style={{animationDelay: '0.15s'}}></div>
                          <div className={`w-4 h-1.5 rounded-sm ${isActive ? 'bg-orange-400' : 'bg-orange-600'} animate-pulse`} style={{animationDelay: '0.3s'}}></div>
                        </div>
                      )}
                    </div>

                    {/* Content - clean and professional */}
                    <div className="space-y-1 sm:space-y-2">
                      <h3 className={`text-base sm:text-lg font-bold tracking-tight ${
                        isActive ? 'text-white' : 'text-gray-900'
                      }`}>
                        {tab.label}
                      </h3>
                      
                      {/* Openings count */}
                      <div className={`text-sm sm:text-base font-semibold ${
                        isActive ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        {tab.count} {tab.count === 1 ? 'opening' : 'openings'}
                      </div>
                    </div>

                    {/* CTA - minimal */}
                    <div className={`text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1 ${
                      isActive 
                        ? 'text-blue-400' 
                        : tab.id === 'intern'
                        ? 'text-blue-600'
                        : tab.id === 'parttime'
                        ? 'text-purple-600'
                        : 'text-orange-600'
                    }`}>
                      <span>View Roles</span>
                      <ArrowRight className={`w-2.5 h-2.5 sm:w-3 sm:h-3 transition-transform duration-200 ${isActive ? 'translate-x-0.5' : ''}`} />
                    </div>
                  </div>
                </button>

                {/* Mobile: Show jobs directly under active category card */}
                {isActive && categorizedJobs.length > 0 && (
                  <div className="md:hidden space-y-4 mt-4">
                    {categorizedJobs.map((job, index) => (
                      <div
                        key={job.id}
                        className={`group relative bg-white border rounded-lg p-3 sm:p-4 transition-all duration-200 cursor-pointer ${
                          expandedJob === job.id 
                            ? 'border-gray-400 shadow-md' 
                            : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                        }`}
                        onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                      >
                        {/* Header Section */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
                          <div className="flex-1 min-w-0">
                            {/* Position Number */}
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded flex items-center justify-center bg-gray-900 text-white text-xs font-bold flex-shrink-0">
                                {index + 1}
                              </div>
                              <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">{job.title}</h3>
                            </div>
                            
                            {/* Role & Info */}
                            <p className="text-xs text-gray-500 font-medium mb-2 uppercase tracking-tight">{job.role}</p>
                            
                            {/* Job Details Row */}
                            <div className="flex flex-wrap gap-2 text-xs">
                              <div className="flex items-center gap-1 text-gray-700">
                                <MapPin className="w-3 h-3 text-gray-600 flex-shrink-0" />
                                <span className="truncate">{job.location}</span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-700">
                                <Briefcase className="w-3 h-3 text-gray-600 flex-shrink-0" />
                                <span className="truncate">{job.type}</span>
                              </div>
                            </div>
                          </div>

                          {/* Toggle Button */}
                          <button className={`p-1.5 rounded transition-all duration-200 flex-shrink-0 ${
                            expandedJob === job.id
                              ? 'bg-gray-900 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}>
                            <ArrowRight className={`w-4 h-4 transition-transform duration-200 ${expandedJob === job.id ? 'rotate-90' : ''}`} />
                          </button>
                        </div>

                        {/* Expanded Content */}
                        {expandedJob === job.id && (
                          <div className="mt-3 pt-3 border-t border-gray-200 space-y-3 animate-in fade-in duration-200">
                            {/* Role Overview Section */}
                            <div className="bg-gradient-to-r from-blue-50/40 via-transparent to-blue-50/30 border border-gray-300 rounded-lg p-3 backdrop-blur-sm">
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 flex-shrink-0 border border-gray-200">
                                    <Briefcase className="w-4 h-4" />
                                  </div>
                                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Overview</h4>
                                </div>
                                <p className="text-xs text-gray-700 leading-relaxed">{job.description}</p>
                              </div>
                            </div>

                            {/* Requirements Section */}
                            <div className="bg-white border border-gray-300 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 border border-gray-200 flex-shrink-0">
                                  <CheckCircle2 className="w-4 h-4" />
                                </div>
                                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Requirements</h4>
                              </div>
                              <ul className="space-y-1.5">
                                {job.requirements.slice(0, 3).map((req, idx) => (
                                  <li key={idx} className="flex gap-2 text-xs text-gray-700">
                                    <span className="w-5 h-5 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-semibold flex-shrink-0 border border-gray-300">
                                      {idx + 1}
                                    </span>
                                    <span className="leading-relaxed">{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Benefits Section */}
                            <div className="bg-white border border-gray-300 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 border border-gray-200 flex-shrink-0">
                                  <Award className="w-4 h-4" />
                                </div>
                                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Benefits</h4>
                              </div>
                              <ul className="space-y-1.5">
                                {job.perks.slice(0, 2).map((perk, idx) => (
                                  <li key={idx} className="flex gap-2 text-xs text-gray-700">
                                    <Check className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                                    <span className="leading-relaxed">{perk}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-2 pt-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleApplyClick(job);
                                }}
                                className="w-full px-3 py-2 bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5"
                              >
                                <Rocket className="w-3 h-3" />
                                Apply Now
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop: Show jobs in separate section below */}
        <div className="hidden md:block">
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
                className={`group relative bg-white border rounded-lg p-4 sm:p-6 transition-all duration-200 cursor-pointer ${
                  expandedJob === job.id 
                    ? 'border-gray-400 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
                onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
              >
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex-1 min-w-0">
                    {/* Position Number */}
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded flex items-center justify-center bg-gray-900 text-white text-xs font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{job.title}</h3>
                    </div>
                    
                    {/* Role & Info */}
                    <p className="text-xs text-gray-500 font-medium mb-2 sm:mb-3 uppercase tracking-tight">{job.role}</p>
                    
                    {/* Job Details Row */}
                    <div className="flex flex-wrap gap-2 sm:gap-4 text-xs">
                      <div className="flex items-center gap-1 text-gray-700">
                        <MapPin className="w-3 h-3 text-gray-600 flex-shrink-0" />
                        <span className="truncate">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-700">
                        <Briefcase className="w-3 h-3 text-gray-600 flex-shrink-0" />
                        <span className="truncate">{job.type}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-700">
                        <Users className="w-3 h-3 text-gray-600 flex-shrink-0" />
                        <span className="truncate">{job.requirements.length} Req</span>
                      </div>
                    </div>
                  </div>

                  {/* Toggle Button */}
                  <button className={`p-1.5 sm:p-2 rounded transition-all duration-200 flex-shrink-0 ${
                    expandedJob === job.id
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>
                    <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${expandedJob === job.id ? 'rotate-90' : ''}`} />
                  </button>
                </div>

                {/* Expanded Content */}
                {expandedJob === job.id && (
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 space-y-4 sm:space-y-6 animate-in fade-in duration-200">
                    {/* Role Overview Section */}
                    <div className="bg-gradient-to-r from-blue-50/40 via-transparent to-blue-50/30 border border-gray-300 rounded-lg p-4 sm:p-5 backdrop-blur-sm">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 flex-shrink-0 border border-gray-200">
                          <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Overview</h4>
                          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{job.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Requirements & Benefits Two Column */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                      {/* Requirements Section */}
                      <div className="bg-white border border-gray-300 rounded-lg p-4 sm:p-5">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 border border-gray-200 flex-shrink-0">
                            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wide">Requirements</h4>
                        </div>
                        <ul className="space-y-2 sm:space-y-3">
                          {job.requirements.map((req, idx) => (
                            <li key={idx} className="flex gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700">
                              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5 border border-gray-300">
                                {idx + 1}
                              </span>
                              <span className="leading-relaxed">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits Section */}
                      <div className="bg-white border border-gray-300 rounded-lg p-4 sm:p-5">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 border border-gray-200 flex-shrink-0">
                            <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wide">Benefits</h4>
                        </div>
                        <ul className="space-y-2 sm:space-y-3">
                          {job.perks.map((perk, idx) => (
                            <li key={idx} className="flex gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700">
                              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{perk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Job Specifications */}
                    <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 sm:p-5">
                      <h4 className="text-xs font-bold text-gray-700 uppercase tracking-widest mb-3 sm:mb-4">Specifications</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        <div className="border border-gray-200 rounded p-2.5 sm:p-3 bg-white">
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
                            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 flex-shrink-0" />
                            <div className="text-xs text-gray-500 font-semibold uppercase">Location</div>
                          </div>
                          <div className="text-xs sm:text-sm font-semibold text-blue-600 truncate">{job.location}</div>
                        </div>
                        <div className="border border-gray-200 rounded p-2.5 sm:p-3 bg-white">
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
                            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 flex-shrink-0" />
                            <div className="text-xs text-gray-500 font-semibold uppercase">Type</div>
                          </div>
                          <div className="text-xs sm:text-sm font-semibold text-black truncate">{job.type}</div>
                        </div>
                        <div className="border border-gray-200 rounded p-2.5 sm:p-3 bg-white">
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
                            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 flex-shrink-0" />
                            <div className="text-xs text-gray-500 font-semibold uppercase">Role</div>
                          </div>
                          <div className="text-xs sm:text-sm font-semibold text-orange-600 truncate">{job.role}</div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApplyClick(job);
                        }}
                        className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs sm:text-sm rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-1.5 sm:gap-2"
                      >
                        <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Apply Now
                      </button>
                      <button className="flex-1 px-4 sm:px-6 py-2 sm:py-3 border-2 border-gray-900 text-gray-900 hover:bg-gray-50 font-bold text-xs sm:text-sm rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2">
                        <Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
      </div>
      </>
      )}

      {/* Bottom CTA Section - Advanced Professional Design */}
      <div className="relative mx-4 sm:mx-6 my-12 sm:my-20 overflow-hidden">
        {/* Main CTA Card */}
        <div className="relative bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-600/20 to-transparent rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-600/20 to-transparent rounded-full filter blur-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          </div>

          {/* Content Grid */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-16 md:py-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
              {/* Left Section - Content */}
              <div className="space-y-6 sm:space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 border border-blue-500/30 rounded-full backdrop-blur">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-400 animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-semibold text-blue-300">Open Opportunities</span>
                </div>

                {/* Heading */}
                <div className="space-y-3 sm:space-y-4">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                    Ready to Build<br />
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Your Future?
                    </span>
                  </h2>
                  <div className="w-16 sm:w-20 h-1 sm:h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-xl">
                  Can't find the perfect role? No problem! We're always looking for talented individuals who are passionate about innovation and growth. Share your profile with us and let's explore what's possible together.
                </p>

                {/* Benefits */}
                <div className="space-y-2 sm:space-y-3 pt-4 sm:pt-6">
                  <div className="flex items-center gap-2 sm:gap-3 text-gray-200">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium">Quick response within 24-48 hours</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-gray-200">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium">Join a team of 86+ innovators</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-gray-200">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium">Competitive benefits & growth opportunities</span>
                  </div>
                </div>
              </div>

              {/* Right Section - Interactive Card */}
              <div className="relative group">
                {/* Card Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                
                {/* Card */}
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg group-hover:border-white/40 transition-all duration-300">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-2xl font-bold text-white">Upload Profile</h3>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center border border-blue-400/30 flex-shrink-0">
                      <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" />
                    </div>
                  </div>

                  {/* Upload Area */}
                  <div className="mb-4 sm:mb-6">
                    <label className="group/upload cursor-pointer block">
                      <div className="relative flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 border-2 border-dashed border-white/30 rounded-lg sm:rounded-xl hover:border-blue-400/50 hover:bg-blue-500/5 transition-all duration-300">
                        <div className="text-center">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover/upload:scale-110 transition-transform">
                            <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300" />
                          </div>
                          <p className="text-xs sm:text-sm font-semibold text-white mb-1">Drag & drop your resume</p>
                          <p className="text-xs text-gray-400">or click to select (PDF, DOC)</p>
                        </div>
                      </div>
                      <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                    </label>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-2 sm:space-y-3">
                    <button className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-sm sm:text-base rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-1.5 sm:gap-2 group/btn">
                      <span>Submit Your Profile</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    <button className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm sm:text-base rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300">
                      Browse Open Positions
                    </button>
                  </div>

                  {/* Footer Text */}
                  <p className="text-xs text-gray-400 text-center mt-3 sm:mt-4">
                    We'll review your profile and reach out if there's a great fit
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer badgeText="We are hiring" hideProjectDescription={true} hideCallSectionDescription={true} hideCallButton={true} hideEnquireSection={true} hideDirectLineSection={true} />

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
      `}</style>
    </div>
  );
}
