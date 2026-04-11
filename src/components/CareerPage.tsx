import { useState } from 'react';
import { ArrowRight, MapPin, Clock, Briefcase, Users, Award, CheckCircle2, Sparkles, Rocket, Target, X, Upload } from 'lucide-react';
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

export default function CareerPage() {
  const [selectedCategory, setSelectedCategory] = useState<'intern' | 'parttime' | 'fulltime'>('intern');
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
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

  const categorizedJobs = jobs.filter(job => job.category === selectedCategory);

  const handleApplyClick = (job: JobListing) => {
    setSelectedJobForApplication(job);
    setShowApplicationForm(true);
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

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit application');
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
        setShowApplicationForm(false);
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Application error:', error);
      alert(`Error submitting application: ${error instanceof Error ? error.message : 'Please try again.'}`);
    } finally {
      setSubmitting(false);
    }
  };

  const categoryTabs = [
    { id: 'intern', label: 'Internship Programs', icon: Award, count: 2, bgGradient: 'from-blue-50 via-cyan-50 to-blue-50', borderColor: 'border-blue-200', activeGradient: 'from-blue-600 via-blue-500 to-cyan-600', shadowColor: 'shadow-blue-200' },
    { id: 'parttime', label: 'Part-Time Roles', icon: Clock, count: 4, bgGradient: 'from-purple-50 via-pink-50 to-purple-50', borderColor: 'border-purple-200', activeGradient: 'from-purple-600 via-purple-500 to-pink-600', shadowColor: 'shadow-purple-200' },
    { id: 'fulltime', label: 'Full-Time Careers', icon: Briefcase, count: 3, bgGradient: 'from-emerald-50 via-teal-50 to-emerald-50', borderColor: 'border-emerald-200', activeGradient: 'from-emerald-600 via-emerald-500 to-teal-600', shadowColor: 'shadow-emerald-200' }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-transparent rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-100 to-transparent rounded-full mix-blend-multiply filter blur-3xl opacity-20" style={{ animation: 'blob 7s infinite 2s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-tr from-pink-100 to-transparent rounded-full mix-blend-multiply filter blur-3xl opacity-20" style={{ animation: 'blob 7s infinite 4s' }}></div>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Apply Now</h2>
                <p className="text-blue-50">{selectedJobForApplication?.title}</p>
              </div>
              <button
                onClick={() => setShowApplicationForm(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmitApplication} className="p-8 space-y-6">
              {successMessage && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-semibold">
                  {successMessage}
                </div>
              )}

              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleFormChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Age Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Age *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleFormChange}
                  placeholder="25"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                  min="18"
                  max="80"
                />
              </div>

              {/* Qualification Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Qualification *</label>
                <select
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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

              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Resume *</label>
                <label className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center gap-3">
                  <Upload className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">
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

              {/* Toggle Options */}
              <div className="space-y-4 bg-gray-50 p-4 rounded-xl">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="availableImmediately"
                    checked={formData.availableImmediately}
                    onChange={handleFormChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-medium">Available to start immediately</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="remoteWork"
                    checked={formData.remoteWork}
                    onChange={handleFormChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-medium">Prefer remote work</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-8 py-4 bg-black hover:bg-gray-900 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-30 backdrop-blur-xl bg-white/80 border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
              U
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">UBITY</span>
          </div>
          <a
            href="/internships"
            className="px-6 py-2.5 bg-black text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:bg-gray-900"
          >
            ← Back
          </a>
        </div>
      </div>

      {/* Hero Section with Gradient Background */}
      <div className="relative pt-32 pb-24 px-6 bg-gradient-to-br from-white via-blue-50/30 to-white overflow-hidden">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute -bottom-32 right-10 w-72 h-72 bg-gradient-to-tl from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 px-4 py-2.5 rounded-full mb-8 font-semibold text-sm border border-blue-200/50 shadow-lg shadow-blue-100">
            <Sparkles className="w-4 h-4" />
            We're Growing & We Want You
          </div>
          <h1 className="text-6xl sm:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Build Your Future<br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              With UBITY
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join a talented team of innovators and builders. We're looking for exceptional people to help us revolutionize the industry.
          </p>
          
          {/* Stats */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center bg-gradient-to-r from-gray-50/80 to-blue-50/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 shadow-xl">
            <div className="text-center group">
              <div className="text-4xl font-bold bg-gradient-to-br from-blue-600 to-blue-700 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-cyan-600 transition-all">9+</div>
              <div className="text-sm text-gray-600 mt-2 font-medium">Open Positions</div>
            </div>
            <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent hidden sm:block"></div>
            <div className="text-center group">
              <div className="text-4xl font-bold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-pink-500 transition-all">100+</div>
              <div className="text-sm text-gray-600 mt-2 font-medium">Happy Team Members</div>
            </div>
            <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent hidden sm:block"></div>
            <div className="text-center group">
              <div className="text-4xl font-bold bg-gradient-to-br from-emerald-600 to-teal-600 bg-clip-text text-transparent group-hover:from-emerald-500 group-hover:to-cyan-600 transition-all">3</div>
              <div className="text-sm text-gray-600 mt-2 font-medium">Employment Types</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">Find Your Perfect Role</h2>
        
        {/* Category Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {categoryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedCategory === tab.id as any;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`relative p-8 rounded-2xl transition-all duration-500 group cursor-pointer overflow-hidden backdrop-blur-lg ${
                  isActive
                    ? `bg-gradient-to-br ${tab.activeGradient} text-white shadow-2xl ${tab.shadowColor} scale-105 border border-white/30 ring-2 ring-white/20`
                    : `bg-gradient-to-br ${tab.bgGradient} border-2 ${tab.borderColor} hover:shadow-2xl hover:border-gray-300 hover:scale-105`
                }`}
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  isActive ? 'from-white/20 to-transparent' : 'from-white/10 to-transparent'
                } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                  tab.id === 'intern' ? 'from-blue-500 via-cyan-500 to-transparent' :
                  tab.id === 'parttime' ? 'from-purple-500 via-pink-500 to-transparent' :
                  'from-emerald-500 via-teal-500 to-transparent'
                } opacity-${isActive ? '100' : '40'} group-hover:opacity-100 transition-opacity duration-300`}></div>

                <div className="relative z-10 space-y-4">
                  {/* Icon Container */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg transform group-hover:scale-110 ${
                    isActive 
                      ? 'bg-white/25 shadow-2xl' 
                      : tab.id === 'intern'
                      ? 'bg-gradient-to-br from-blue-200 to-cyan-100 group-hover:from-blue-300 group-hover:to-cyan-200'
                      : tab.id === 'parttime'
                      ? 'bg-gradient-to-br from-purple-200 to-pink-100 group-hover:from-purple-300 group-hover:to-pink-200'
                      : 'bg-gradient-to-br from-emerald-200 to-teal-100 group-hover:from-emerald-300 group-hover:to-teal-200'
                  }`}>
                    <Icon className={`w-7 h-7 transition-colors duration-300 ${
                      isActive 
                        ? 'text-white' 
                        : tab.id === 'intern'
                        ? 'text-blue-700 group-hover:text-blue-800'
                        : tab.id === 'parttime'
                        ? 'text-purple-700 group-hover:text-purple-800'
                        : 'text-emerald-700 group-hover:text-emerald-800'
                    }`} />
                  </div>

                  {/* Content Section */}
                  <div className="space-y-2">
                    <h3 className={`text-lg font-bold transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-gray-900'
                    }`}>
                      {tab.label}
                    </h3>
                    
                    {/* Opening stats with decoration */}
                    <div className="space-y-2">
                      <div className={`flex items-center gap-2 text-sm font-semibold ${
                        isActive ? 'text-white/90' : 'text-gray-700'
                      }`}>
                        <span className={`w-2 h-2 rounded-full animate-pulse ${
                          tab.id === 'intern' ? 'bg-blue-400' :
                          tab.id === 'parttime' ? 'bg-purple-400' :
                          'bg-emerald-400'
                        }`}></span>
                        <span>
                          {tab.count} {tab.count === 1 ? 'opening' : 'openings'}
                        </span>
                      </div>

                      {/* Badge hint */}
                      <div className={`text-xs font-semibold tracking-widest uppercase opacity-75 transition-opacity duration-300 ${
                        isActive ? 'text-white/75' : 'text-gray-600'
                      }`}>
                        {tab.id === 'intern' ? '🎓 Learning' :
                         tab.id === 'parttime' ? '⏱️ Flexible' :
                         '💼 Career'}
                      </div>
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <div className={`flex items-center gap-2 text-sm font-semibold transition-all duration-300 transform group-hover:translate-x-1 ${
                    isActive ? 'text-white/90' : 'text-gray-600'
                  }`}>
                    <span>View Roles</span>
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'rotate-90' : ''}`} />
                  </div>
                </div>

                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl bg-gradient-to-br ${
                  tab.id === 'intern' ? 'from-blue-500 to-cyan-500' :
                  tab.id === 'parttime' ? 'from-purple-500 to-pink-500' :
                  'from-emerald-500 to-teal-500'
                }`}></div>
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
                className={`group relative bg-gradient-to-br ${
                  selectedCategory === 'intern' ? 'from-white to-blue-50/40' :
                  selectedCategory === 'parttime' ? 'from-white to-purple-50/40' :
                  'from-white to-emerald-50/40'
                } border backdrop-blur-lg rounded-2xl p-8 transition-all duration-300 cursor-pointer overflow-hidden ${
                  expandedJob === job.id 
                    ? selectedCategory === 'intern'
                      ? 'ring-2 ring-blue-500 border-blue-300 shadow-2xl shadow-blue-200/50' 
                      : selectedCategory === 'parttime'
                      ? 'ring-2 ring-purple-500 border-purple-300 shadow-2xl shadow-purple-200/50'
                      : 'ring-2 ring-emerald-500 border-emerald-300 shadow-2xl shadow-emerald-200/50'
                    : 'border-gray-200/80 hover:border-gray-300 shadow-lg hover:shadow-2xl'
                }`}
                onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
              >
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  selectedCategory === 'intern' ? 'from-blue-50/50 to-cyan-50/30' :
                  selectedCategory === 'parttime' ? 'from-purple-50/50 to-pink-50/30' :
                  'from-emerald-50/50 to-teal-50/30'
                } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                {/* Accent Line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                  selectedCategory === 'intern' ? 'from-blue-500 via-cyan-500 to-transparent' :
                  selectedCategory === 'parttime' ? 'from-purple-500 via-pink-500 to-transparent' :
                  'from-emerald-500 via-teal-500 to-transparent'
                }`}></div>

                {/* Job Header */}
                <div className="relative flex items-start justify-between mb-6">
                  <div className="flex-1">
                    {/* Category & Badges Row */}
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      {/* Position Number Badge */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg bg-gradient-to-br ${
                        selectedCategory === 'intern' ? 'from-blue-500 to-cyan-600' :
                        selectedCategory === 'parttime' ? 'from-purple-500 to-pink-600' :
                        'from-emerald-500 to-teal-600'
                      }`}>
                        {index + 1}
                      </div>

                      {/* Highlight Badge */}
                      <div className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide animate-pulse ${
                        selectedCategory === 'intern' 
                          ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                          : selectedCategory === 'parttime'
                          ? 'bg-purple-100 text-purple-700 border border-purple-200'
                          : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      }`}>
                        ⭐ FEATURED
                      </div>

                      {/* Growth Badge */}
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedCategory === 'intern' 
                          ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-700 border border-blue-200' 
                          : selectedCategory === 'parttime'
                          ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-700 border border-purple-200'
                          : 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-700 border border-emerald-200'
                      }`}>
                        📈 Growth Path
                      </div>
                    </div>

                    {/* Title & Role */}
                    <div>
                      <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
                        selectedCategory === 'intern' ? 'from-blue-600 to-cyan-600' :
                        selectedCategory === 'parttime' ? 'from-purple-600 to-pink-600' :
                        'from-emerald-600 to-teal-600'
                      }">{job.title}</h3>
                      <p className="text-sm text-gray-500 mt-2 font-semibold tracking-wide uppercase">{job.role}</p>
                    </div>

                    {/* Info Tags */}
                    <div className="flex flex-wrap gap-4 text-sm mt-4">
                      <div className="flex items-center gap-2 text-gray-700 font-medium bg-white/50 px-3 py-1.5 rounded-lg hover:bg-white transition-colors">
                        <MapPin className={`w-4 h-4 ${
                          selectedCategory === 'intern' ? 'text-blue-500' :
                          selectedCategory === 'parttime' ? 'text-purple-500' :
                          'text-emerald-500'
                        }`} />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700 font-medium bg-white/50 px-3 py-1.5 rounded-lg hover:bg-white transition-colors">
                        <Briefcase className={`w-4 h-4 ${
                          selectedCategory === 'intern' ? 'text-blue-500' :
                          selectedCategory === 'parttime' ? 'text-purple-500' :
                          'text-emerald-500'
                        }`} />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700 font-medium bg-white/50 px-3 py-1.5 rounded-lg hover:bg-white transition-colors">
                        <Users className={`w-4 h-4 ${
                          selectedCategory === 'intern' ? 'text-blue-500' :
                          selectedCategory === 'parttime' ? 'text-purple-500' :
                          'text-emerald-500'
                        }`} />
                        <span>{job.requirements.length} Requirements</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className={`p-3 rounded-xl transition-all duration-300 flex-shrink-0 font-semibold ml-4 ${
                    expandedJob === job.id
                      ? selectedCategory === 'intern'
                        ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/40 scale-110'
                        : selectedCategory === 'parttime'
                        ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/40 scale-110'
                        : 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/40 scale-110'
                      : selectedCategory === 'intern'
                      ? 'bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-600 hover:shadow-lg'
                      : selectedCategory === 'parttime'
                      ? 'bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600 hover:shadow-lg'
                      : 'bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-600 hover:shadow-lg'
                  }`}>
                    <ArrowRight className={`w-6 h-6 transition-transform duration-300 ${expandedJob === job.id ? 'rotate-90' : ''}`} />
                  </button>
                </div>

                {/* Expanded Content */}
                {expandedJob === job.id && (
                  <div className="relative mt-8 pt-8 border-t border-gray-200/50 space-y-8 animate-in fade-in slide-in-from-top-2 duration-300">
                    {/* Description with Icon */}
                    <div className="space-y-4">
                      <h4 className={`text-lg font-bold text-gray-900 flex items-center gap-3 ${
                        selectedCategory === 'intern' ? 'text-blue-900' :
                        selectedCategory === 'parttime' ? 'text-purple-900' :
                        'text-emerald-900'
                      }`}>
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-lg bg-gradient-to-br ${
                          selectedCategory === 'intern' ? 'from-blue-500 to-cyan-600' :
                          selectedCategory === 'parttime' ? 'from-purple-500 to-pink-600' :
                          'from-emerald-500 to-teal-600'
                        }`}>
                          <Rocket className="w-5 h-5" />
                        </div>
                        About This Role
                      </h4>
                      <p className="text-gray-600 leading-relaxed bg-gradient-to-r from-transparent to-blue-50/30 p-4 rounded-lg border border-gray-200/50">{job.description}</p>
                    </div>

                    {/* Two Column Layout with Enhanced Styling */}
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Requirements */}
                      <div className="space-y-4">
                        <h4 className={`text-lg font-bold text-gray-900 flex items-center gap-3 ${
                          selectedCategory === 'intern' ? 'text-blue-900' :
                          selectedCategory === 'parttime' ? 'text-purple-900' :
                          'text-emerald-900'
                        }`}>
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-lg bg-gradient-to-br ${
                            selectedCategory === 'intern' ? 'from-blue-500 to-cyan-600' :
                            selectedCategory === 'parttime' ? 'from-purple-500 to-pink-600' :
                            'from-emerald-500 to-teal-600'
                          }`}>
                            <Users className="w-5 h-5" />
                          </div>
                          What We're Looking For
                        </h4>
                        <ul className="space-y-3">
                          {job.requirements.map((req, idx) => (
                            <li key={idx} className="flex gap-3 text-gray-600 p-3 rounded-lg hover:bg-gray-50/80 transition-colors duration-200 group/item">
                              <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-all duration-200 ${
                                selectedCategory === 'intern' ? 'text-blue-500 group-hover/item:scale-110' :
                                selectedCategory === 'parttime' ? 'text-purple-500 group-hover/item:scale-110' :
                                'text-emerald-500 group-hover/item:scale-110'
                              }`} />
                              <span className="font-medium">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Perks */}
                      <div className="space-y-4">
                        <h4 className={`text-lg font-bold text-gray-900 flex items-center gap-3 ${
                          selectedCategory === 'intern' ? 'text-blue-900' :
                          selectedCategory === 'parttime' ? 'text-purple-900' :
                          'text-emerald-900'
                        }`}>
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-lg bg-gradient-to-br ${
                            selectedCategory === 'intern' ? 'from-blue-500 to-cyan-600' :
                            selectedCategory === 'parttime' ? 'from-purple-500 to-pink-600' :
                            'from-emerald-500 to-teal-600'
                          }`}>
                            <Award className="w-5 h-5" />
                          </div>
                          What You'll Get
                        </h4>
                        <ul className="space-y-3">
                          {job.perks.map((perk, idx) => (
                            <li key={idx} className="flex gap-3 text-gray-600 p-3 rounded-lg hover:bg-gradient-to-r hover:from-yellow-50 hover:to-transparent transition-colors duration-200 group/perk">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5 shadow-lg bg-gradient-to-br transition-transform duration-200 group-hover/perk:scale-110 ${
                                selectedCategory === 'intern' ? 'from-blue-500 to-cyan-600' :
                                selectedCategory === 'parttime' ? 'from-purple-500 to-pink-600' :
                                'from-emerald-500 to-teal-600'
                              }`}>
                                ✨
                              </div>
                              <span className="font-medium">{perk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTA Section */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200/50">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApplyClick(job);
                        }}
                        className={`flex-1 px-8 py-4 font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group shadow-lg hover:shadow-2xl hover:scale-105 text-white bg-gradient-to-r ${
                          selectedCategory === 'intern' 
                            ? 'from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-blue-500/40 hover:shadow-blue-600/60' 
                            : selectedCategory === 'parttime'
                            ? 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-purple-500/40 hover:shadow-pink-600/60'
                            : 'from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-emerald-500/40 hover:shadow-teal-600/60'
                        }`}
                      >
                        <Rocket className="w-5 h-5 relative group-hover:scale-110 transition-transform" />
                        <span className="relative">🎯 Apply Now</span>
                      </button>
                      <button className={`flex-1 px-8 py-4 border-2 font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2 group ${
                        selectedCategory === 'intern'
                          ? 'border-blue-600 text-blue-600 hover:bg-blue-50'
                          : selectedCategory === 'parttime'
                          ? 'border-purple-600 text-purple-600 hover:bg-purple-50'
                          : 'border-emerald-600 text-emerald-600 hover:bg-emerald-50'
                      }`}>
                        <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>💼 Learn More</span>
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
      <div className="relative mx-6 my-20 py-24 px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl -mr-48 -mt-48"></div>
        <div className="max-w-4xl mx-auto text-center text-white relative z-10">
          <h2 className="text-5xl font-bold mb-6 leading-tight">Ready to Join Us?</h2>
          <p className="text-xl text-blue-50 mb-12 leading-relaxed">
            Don't see a perfect fit? We'd still love to hear from you. Send us your profile and let's explore opportunities together.
          </p>
          <button className="px-10 py-4 bg-black text-white font-bold rounded-xl hover:shadow-2xl transition-all hover:scale-110 text-lg border border-white/30 hover:border-white/50 hover:bg-gray-900 whitespace-nowrap">
            Submit Your Profile
          </button>
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
