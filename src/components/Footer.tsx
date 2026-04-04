import { Linkedin, Twitter, Github, Mail, Phone, MapPin, X, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

interface FooterProps {
  badgeText?: string;
  hideProjectDescription?: boolean;
  hideCallSectionDescription?: boolean;
  hideCallButton?: boolean;
}

export default function Footer({ badgeText = 'Available For Projects', hideProjectDescription = false, hideCallSectionDescription = false, hideCallButton = false }: FooterProps) {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [enquireModal, setEnquireModal] = useState(false);
  const [openModal, setOpenModal] = useState(null);
  
  const bgClass = theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#0A0A0A] border-white/10';
  const headingClass = theme === 'light' ? 'text-gray-900' : 'text-white';
  const textClass = theme === 'light' ? 'text-gray-600' : 'text-gray-400';
  const linkHover = theme === 'light' ? 'hover:text-red-800' : 'hover:text-red-700';
  const borderClass = theme === 'light' ? 'border-gray-200' : 'border-white/10';
  const iconBg = theme === 'light' ? 'bg-gray-100 border-gray-200 hover:bg-red-900/10 hover:border-red-800' : 'bg-white/5 border-white/10 hover:bg-red-900/20 hover:border-red-800/50';
  const iconColor = theme === 'light' ? 'text-gray-600 group-hover:text-red-800' : 'text-gray-400 group-hover:text-red-700';
  const inputBg = theme === 'light' ? 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500' : 'bg-white/5 border-white/10 text-white placeholder-gray-500';
  const badgeBg = theme === 'light' ? 'bg-yellow-400 text-yellow-900' : 'bg-yellow-500/30 text-yellow-400';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      let apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      
      // Build the endpoint URL
      let endpoint = '';
      if (apiUrl.startsWith('http')) {
        // Full URL like http://localhost:3001
        endpoint = `${apiUrl}/api/send-enquiry`;
      } else {
        // Relative path like /api or empty
        if (apiUrl === '' || apiUrl === '/') {
          endpoint = '/api/send-enquiry';
        } else {
          endpoint = `${apiUrl}/send-enquiry`;
        }
      }
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: 'success', text: 'Enquiry sent successfully! Check your email.' });
        setFormData({ name: '', email: '', phone: '' });
        setTimeout(() => setMessage(null), 5000);
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to send enquiry' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Connection error. Make sure the backend server is running.' });
    } finally {
      setLoading(false);
    }
  };

  const modalContent = {
    about: {
      title: 'About UBITY',
      content: 'UBITY is a leading technology company focused on digital innovation. We provide custom solutions for businesses of all sizes, helping them transform digitally and achieve their goals with cutting-edge technology.\n\nWith our experienced and professional team, we have helped hundreds of clients across various industries achieve their digital success and business transformation.'
    },
    capabilities: {
      title: 'Our Capabilities',
      content: 'We offer complete services including:\n• Web Development\n• Mobile App Development\n• Cloud Solutions\n• AI & Machine Learning\n• Data Analytics\n• UI/UX Design\n• DevOps & Infrastructure\n\nOur expert team is ready to deliver the best solutions for your business needs with the latest technology and industry best practices.'
    },
    approach: {
      title: 'Our Approach',
      content: 'We use an iterative and collaborative Agile methodology. Every project starts with:\n\n1. Discovery - Deep understanding of your needs\n2. Planning - Strategy and detailed planning\n3. Development - Implementation with best practices\n4. Testing - Comprehensive QA and quality assurance\n5. Deployment - Launch and ongoing support\n\nWe ensure transparent communication at every stage of the project.'
    },
    contact: {
      title: 'Contact Us',
      content: 'Email: ubityofficial@gmail.com\nPhone: +91 9999999999\n\nHeadquarters:\nBengaluru, Karnataka, India\n\nOffices:\nHyderabad, Mumbai, Mangaluru\n\nOperating Hours: Available 24/7\n\nContact us for a free consultation about your project. Our team is ready to help your business digital transformation.'
    },
    privacy: {
      title: 'Privacy Policy',
      content: 'Privacy Policy for UBITY\n\nWe value your privacy and are committed to protecting your personal data. Information we collect is used only for business purposes and will not be shared with third parties without your consent.\n\nWe use encryption technology to protect your data from unauthorized access. Cookies are used to enhance your user experience on our website.\n\nFor more information about how we use your data, please contact us.'
    },
    terms: {
      title: 'Terms and Conditions',
      content: 'Terms and Conditions of Use\n\nLegal Organization: Meenakumari K R\n\n1. Acceptance of Terms\nBy accessing our website and services, you accept all terms and conditions that apply. These terms govern your use of our services.\n\n2. Use of Services\nYou agree to use our services only for lawful purposes and not in violation of applicable laws or regulations. You shall not use our services for any unlawful or fraudulent activities.\n\n3. Internship Programs\nOur internship programs are educational in nature. You agree to comply with all program requirements and schedules. We maintain the right to modify or cancel programs at any time with notice.\n\n4. User Responsibility\nYou are responsible for all activities that occur through your account. You agree to maintain confidentiality of any credentials and promptly notify us of unauthorized access.\n\n5. Intellectual Property\nAll content, materials, and services on our website are intellectual property. Unauthorized use or reproduction is prohibited.\n\n6. Limitation of Liability\nWe are not responsible for damages arising from your use or inability to use our services, including indirect, incidental, or consequential damages.\n\n7. Modifications\nWe reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of updated terms.\n\n8. Governing Law\nThese terms are governed by applicable laws of India.'
    },
    cancellation: {
      title: 'Refund & Cancellation Policy',
      content: 'Refund and Cancellation Policy\n\nLegal Organization: Meenakumari K R\n\n1. Internship Program Cancellation\nStudents may request cancellation within 7 days of enrollment. A refund of 90% of the paid amount will be processed within 10 business days.\n\n2. Refund After 7 Days\nAfter 7 days from enrollment, refunds are not applicable. The enrollment is non-refundable as the program access and training materials have been provided.\n\n3. Payment Refunds\nAll refunds are processed to the original payment method. Please allow 10-15 business days for the funds to reflect in your account.\n\n4. Stipend Terms\nStipends are awarded based on performance and completion of program requirements. Stipends are non-refundable.\n\n5. Service Cancellation by Company\nWe reserve the right to cancel or suspend services if:\n- Terms of service are violated\n- Fraudulent activity is detected\n- Program requirements are not met\n\nIn such cases, a pro-rata refund may be issued at our discretion.\n\n6. Technical Issues\nIf you experience technical issues preventing program access, we will attempt resolution within 24-48 hours. If unresolved, a full refund may be issued.\n\n7. Contact Us\nFor refund requests or cancellation inquiries, contact us at: ubityofficial@gmail.com\n\n8. Processing Timeline\nRefund requests are processed within 7-10 business days from the date of approval.'
    }
  };

  return (
    <footer className={`${bgClass} border-t transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-8 sm:py-20">
        {/* Newsletter & Enquire Section */}
        <div id="get-in-touch" className={`grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-12 mb-8 sm:mb-20 pb-8 sm:pb-20 border-b ${borderClass}`}>
          {/* Enquire Form */}
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-4">
              <div className="relative w-2 h-2 sm:w-2.5 sm:h-2.5">
                <div className="absolute inset-0 bg-red-600 rounded-full animate-pulse" />
                <div className="absolute inset-0 bg-red-600 rounded-full" style={{
                  animation: 'blink-indicator 1.5s ease-in-out infinite',
                  boxShadow: '0 0 8px rgba(220, 38, 38, 0.8)'
                }} />
                <div className="absolute -inset-1 border border-red-500/30 rounded-full" style={{
                  animation: 'ring-pulse 2s ease-out infinite'
                }} />
              </div>
              <span className={`text-xs sm:text-xs font-bold tracking-widest ${theme === 'light' ? 'text-red-600' : 'text-red-500'}`}>ENQUIRE NOW</span>
            </div>
            <h3 className={`text-lg sm:text-3xl font-bold mb-2 sm:mb-4 tracking-tight ${headingClass}`}>Get in Touch</h3>
            {!hideProjectDescription && (
              <p className={`${textClass} font-medium mb-3 sm:mb-6 leading-relaxed max-w-md text-xs sm:text-base`}>
                Share your project details with us and we'll get back to you within 24 hours.
              </p>
            )}
            <div className="space-y-2 sm:space-y-4">
              {message && (
                <div className={`px-4 py-3 rounded-lg text-sm font-medium ${
                  message.type === 'success' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {message.text}
                </div>
              )}
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 sm:px-6 py-2 sm:py-3 border rounded-lg transition-all text-xs sm:text-sm ${inputBg} focus:outline-none focus:ring-2 focus:ring-red-600 font-medium`}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 sm:px-6 py-2 sm:py-3 border rounded-lg transition-all text-xs sm:text-sm ${inputBg} focus:outline-none focus:ring-2 focus:ring-red-600 font-medium`}
              />
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (Whatsapp) *"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 sm:px-6 py-2 sm:py-3 border rounded-lg transition-all text-xs sm:text-sm ${inputBg} focus:outline-none focus:ring-2 focus:ring-red-600 font-medium`}
                />
                <p className={`text-xs ${textClass} mt-1`}>Required field</p>
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full px-4 sm:px-6 py-2.5 sm:py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm sm:text-base rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 sm:w-5 h-4 sm:h-5" />
                    <span>Submit Enquiry</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Call Now Section */}
          <div>
            {!hideCallButton && (
            <div className="flex items-center gap-2 mb-2 sm:mb-4">
              <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500 animate-pulse`} />
              <span className={`text-xs sm:text-xs font-bold tracking-widest ${theme === 'light' ? 'text-green-700' : 'text-green-500'}`}>CALL NOW</span>
            </div>
            )}
            <h3 className={`text-lg sm:text-3xl font-bold mb-2 sm:mb-4 tracking-tight ${headingClass}`}>Direct Line to Success</h3>
            <p className={`${textClass} font-medium mb-3 sm:mb-6 leading-relaxed max-w-md text-xs sm:text-base`}>
              {hideCallSectionDescription ? 'Need immediate assistance? Reach us.' : "Need immediate assistance? Reach us directly via phone or email. We're ready to discuss your unique requirements."}
            </p>
            <div className="flex flex-col gap-2 sm:gap-3">
              {!hideCallButton && (
              <a
                href="tel:+919999999999"
                className="px-3 sm:px-5 py-2.5 sm:py-3.5 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-700 hover:via-blue-600 hover:to-cyan-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/40 hover:shadow-xl hover:shadow-blue-500/60 inline-flex items-center justify-center gap-2 sm:gap-3 group text-sm sm:text-base"
              >
                <Phone className="w-3 sm:w-5 h-3 sm:h-5 group-hover:scale-110 transition-transform" />
              </a>
              )}
              <a
                href="mailto:ubityofficial@gmail.com?subject=Project%20Enquiry&body=Hi%20Ubity%20Team%2C%0A%0AI'm%20interested%20in%20learning%20more%20about%20your%20services.%0A%0AThank%20you"
                className="px-3 sm:px-8 py-2.5 sm:py-3.5 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-1.5 sm:gap-3 group border-2 border-gray-200 text-sm sm:text-base"
              >
                <Mail className="w-3 sm:w-5 h-3 sm:h-5 group-hover:scale-110 transition-transform text-blue-600" />
                <span>ubityofficial@gmail.com</span>
              </a>
            </div>
            <div className="mt-2 sm:mt-4 flex items-center gap-2 text-xs sm:text-xs font-medium">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className={textClass}>Available 24/7</span>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 md:gap-12 mb-8 sm:mb-16">
          <div className="col-span-2 md:col-span-2">
            <h3 className={`text-2xl sm:text-5xl font-plusJakarta font-bold mb-2 sm:mb-3 tracking-wider ${headingClass}`} style={{ letterSpacing: '0.05em' }}>UBITY</h3>
            <p className={`text-xs sm:text-sm font-bold mb-1 sm:mb-2 text-white`}>Powered by IMG Groups</p>
            <p className={`text-xs sm:text-sm font-medium mb-4 sm:mb-6 ${textClass}`}>IMG - I Am God</p>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-200 flex-shrink-0 mt-0.5" />
              <p className={`${textClass} font-semibold leading-relaxed max-w-md text-xs sm:text-base`}>
                HeadQuarters - Bengaluru, Karnataka
              </p>
            </div>
            <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
              {['Hyderabad', 'Mumbai', 'Mangaluru'].map((feature, idx) => (
                <div key={idx} className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold ${theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-blue-500/10 text-blue-400'}`}>
                  {feature}
                </div>
              ))}
            </div>
            <p className={`${textClass} font-semibold leading-relaxed text-xs sm:text-sm mt-4 sm:mt-8 mb-6 sm:mb-0`}>
              Reach out us on Web, Mail, Call, & Social media
            </p>
          </div>

          <div>
            <h4 className={`${headingClass} font-black mb-4 sm:mb-6 tracking-tight text-xs sm:text-base uppercase`} style={{ letterSpacing: '0.08em' }}>Company</h4>
            <ul className="space-y-2 sm:space-y-4">
              {[
                { label: 'About', id: 'about' },
                { label: 'Capabilities', id: 'capabilities' },
                { label: 'Approach', id: 'approach' },
                { label: 'Contact', id: 'contact' }
              ].map((item) => (
                <li key={item.id}>
                  <button onClick={() => setOpenModal(item.id)} className={`${textClass} ${linkHover} transition-all duration-300 font-semibold text-xs sm:text-sm hover:translate-x-0.5 cursor-pointer`}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={`${headingClass} font-black mb-3 sm:mb-6 tracking-tight text-[10px] sm:text-base uppercase`} style={{ letterSpacing: '0.08em' }}>Connect</h4>
            <div className="flex gap-2 sm:gap-4 mb-4 sm:mb-6">
              {[
                { icon: Linkedin, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Github, href: '#' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-8 sm:w-10 h-8 sm:h-10 ${iconBg} rounded-lg flex items-center justify-center transition-all duration-300 group border`}
                >
                  <social.icon className={`w-4 sm:w-5 h-4 sm:h-5 ${iconColor} transition-colors duration-300`} />
                </a>
              ))}
            </div>
            <div className="inline-flex items-center gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-red-600/30 text-red-500 rounded-full text-[10px] sm:text-xs font-semibold">
              {badgeText}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-4 sm:pt-8 border-t ${borderClass} flex flex-col md:flex-row md:justify-between md:items-center gap-4 sm:gap-6 transition-colors duration-300`}>
          <div className={`flex flex-col md:flex-row md:items-center gap-2 sm:gap-3 md:gap-4 w-full md:w-auto`}>
            <p className={`text-xs font-semibold tracking-tight text-center md:text-left ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
              © 2026 Meenakumari K R. All rights reserved.
            </p>
            <div className={`hidden md:block w-px h-5 ${theme === 'light' ? 'bg-gray-300' : 'bg-gray-700'}`} />
            <p className={`text-xs sm:text-sm font-black tracking-tight text-center md:text-left ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Developed by Ubity
            </p>
          </div>
          <div className="flex gap-2 sm:gap-3 md:gap-4 justify-center md:justify-end w-full md:w-auto flex-wrap">
            <button onClick={() => setOpenModal('terms')} className={`${textClass} ${linkHover} text-xs font-black tracking-tight uppercase transition-all duration-300 hover:translate-x-0.5 cursor-pointer`}>
              Terms
            </button>
            <button onClick={() => setOpenModal('cancellation')} className={`${textClass} ${linkHover} text-xs font-black tracking-tight uppercase transition-all duration-300 hover:translate-x-0.5 cursor-pointer`}>
              Refund Policy
            </button>
            <button onClick={() => setOpenModal('privacy')} className={`${textClass} ${linkHover} text-xs font-black tracking-tight uppercase transition-all duration-300 hover:translate-x-0.5 cursor-pointer`}>
              Privacy
            </button>
          </div>
        </div>
      </div>

      {/* Enquire Modal */}
      {enquireModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4" onClick={() => setEnquireModal(false)}>
          <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-900'} rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className={`w-2.5 h-2.5 rounded-full bg-red-900`} />
              <span className={`text-xs font-bold tracking-widest ${theme === 'light' ? 'text-red-800' : 'text-red-700'}`}>ENQUIRY FORM</span>
            </div>
            <h2 className={`text-lg sm:text-2xl font-bold mb-4 sm:mb-6 ${headingClass}`}>Tell Us About Your Project</h2>
            
            <div className="space-y-3 sm:space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg transition-all text-sm ${inputBg} focus:outline-none focus:ring-2 focus:ring-red-600 font-medium`}
              />
              <input
                type="email"
                placeholder="Your Email"
                className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg transition-all text-sm ${inputBg} focus:outline-none focus:ring-2 focus:ring-red-600 font-medium`}
              />
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number (Whatsapp/Contact) *"
                  required
                  className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg transition-all text-sm ${inputBg} focus:outline-none focus:ring-2 focus:ring-red-600 font-medium`}
                />
                <p className={`text-xs ${textClass} mt-1`}>Required field</p>
              </div>
              <button className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                <Check className="w-5 h-5 sm:w-5 sm:h-5" />
                <span>Submit Enquiry</span>
              </button>
            </div>
            
            <button
              onClick={() => setEnquireModal(false)}
              className={`mt-3 sm:mt-4 w-full text-center py-2 text-sm ${textClass} font-medium hover:text-gray-900 dark:hover:text-white transition-colors`}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Privacy Policy & Terms Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6">
          <div className="bg-gray-900/95 border border-cyan-400/20 rounded-2xl max-w-2xl w-full max-h-80 sm:max-h-96 overflow-y-auto animate-in fade-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="sticky top-0 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 border-b border-cyan-400/10 bg-gray-900/98">
              <h2 className="text-lg sm:text-2xl font-bold text-white">
                {modalContent[openModal].title}
              </h2>
              <button
                onClick={() => setOpenModal(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-4 sm:px-8 py-4 sm:py-6">
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                {modalContent[openModal].content}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 px-4 sm:px-8 py-3 sm:py-4 border-t border-cyan-400/10 bg-gray-900/98 flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(null)}
                className="px-4 sm:px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all text-xs sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes blink-indicator {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes ring-pulse {
          0% { 
            transform: scale(1);
            opacity: 1;
          }
          100% { 
            transform: scale(1.8);
            opacity: 0;
          }
        }
      `}</style>
    </footer>
  );
}
