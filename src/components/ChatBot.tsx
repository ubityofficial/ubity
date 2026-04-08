import { useState } from 'react';
import { X, Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Modern Sleek AI Bot Icon Component
const TechRobotIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Main head - geometric angular shape */}
    <path
      d="M 25 35 L 75 35 L 80 50 L 75 65 L 25 65 L 20 50 Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    
    {/* Left eye - minimal square */}
    <rect x="30" y="42" width="11" height="11" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="35.5" cy="47.5" r="2" fill="currentColor" />
    
    {/* Right eye - minimal square */}
    <rect x="59" y="42" width="11" height="11" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="64.5" cy="47.5" r="2" fill="currentColor" />
    
    {/* Center accent line */}
    <line x1="50" y1="40" x2="50" y2="62" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    
    {/* Horizontal divider line */}
    <line x1="25" y1="50" x2="75" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    
    {/* Tech accent dots - left side */}
    <circle cx="22" cy="45" r="1.5" fill="currentColor" opacity="0.7" />
    <circle cx="22" cy="50" r="1.5" fill="currentColor" opacity="0.7" />
    <circle cx="22" cy="55" r="1.5" fill="currentColor" opacity="0.7" />
    
    {/* Tech accent dots - right side */}
    <circle cx="78" cy="45" r="1.5" fill="currentColor" opacity="0.7" />
    <circle cx="78" cy="50" r="1.5" fill="currentColor" opacity="0.7" />
    <circle cx="78" cy="55" r="1.5" fill="currentColor" opacity="0.7" />
    
    {/* Bottom tech indicator pattern */}
    <path
      d="M 35 68 L 35 75 M 42 68 L 42 76 M 50 68 L 50 73 M 58 68 L 58 76 M 65 68 L 65 75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.8"
    />
  </svg>
);

export default function ChatBot() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! 👋 Welcome to UBITY. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickReplies = [
    'About Internships',
    'Software Solutions',
    'Pricing Info',
    'Contact Us',
  ];

  const handleSendMessage = async (text: string = inputValue) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponses: Record<string, string> = {
        internships: 'We offer comprehensive internship programs in AI/ML, Full Stack Development, Cybersecurity, and Cloud Computing. Would you like to know more about any specific program?',
        solutions: 'Our software solutions include Web Development, Mobile Apps, Cloud Infrastructure, AI/ML, Data Analytics, and UI/UX Design. What are you interested in?',
        pricing: 'Our pricing varies based on the scope of your project. Please contact our team or fill the enquiry form for a customized quote.',
        contact: 'You can reach us at ubityofficial@gmail.com or use the enquiry form below. Our team responds within 24 hours.',
        default: 'Thank you for your interest! Could you provide more details about what you\'re looking for? You can also fill the enquiry form for personalized assistance.',
      };

      let response = botResponses.default;
      const lowerText = text.toLowerCase();

      if (lowerText.includes('internship')) response = botResponses.internships;
      else if (lowerText.includes('solution') || lowerText.includes('software')) response = botResponses.solutions;
      else if (lowerText.includes('price') || lowerText.includes('cost')) response = botResponses.pricing;
      else if (lowerText.includes('contact') || lowerText.includes('email')) response = botResponses.contact;

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 800);
  };

  const bgClass = theme === 'light' ? 'bg-white' : 'bg-gray-900';
  const borderClass = theme === 'light' ? 'border-gray-200' : 'border-gray-700';
  const textClass = theme === 'light' ? 'text-gray-900' : 'text-white';
  const subtextClass = theme === 'light' ? 'text-gray-600' : 'text-gray-400';
  const inputBgClass = theme === 'light' ? 'bg-gray-50 border-gray-200 text-gray-900' : 'bg-gray-800 border-gray-700 text-white';

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        } bg-black hover:bg-gray-900 border border-gray-800 hover:border-gray-600`}
      >
        <TechRobotIcon className="w-8 h-8 text-white" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl transition-all duration-300 transform origin-bottom-right flex flex-col ${
          isOpen ? 'scale-100 opacity-100 visible' : 'scale-0 opacity-0 invisible'
        } ${bgClass} border ${borderClass}`}
        style={{ height: '600px' }}
      >
        {/* Header */}
        <div className="bg-black text-white px-6 py-5 rounded-t-2xl flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg tracking-wide">UBITY Assistant</h3>
            <p className="text-sm text-gray-300 font-medium">Always here to help</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-gray-800 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 bg-gradient-to-b from-transparent to-gray-50/5">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2.5 rounded-2xl transition-all duration-200 ${
                  message.sender === 'user'
                    ? 'bg-black text-white rounded-br-none'
                    : `${theme === 'light' ? 'bg-gray-100 text-gray-900' : 'bg-gray-800 text-white'} rounded-bl-none`
                }`}
              >
                <p className="text-sm leading-relaxed font-medium">{message.text}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className={`px-4 py-3 rounded-2xl rounded-bl-none ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Replies */}
        {messages.length <= 1 && (
          <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <p className={`text-xs font-semibold tracking-wide uppercase ${subtextClass}`}>Quick replies</p>
            <div className="grid grid-cols-2 gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleSendMessage(reply)}
                  className={`text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200 border ${
                    theme === 'light'
                      ? 'bg-gray-100 text-black border-gray-300 hover:bg-gray-200'
                      : 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700'
                  }`}
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className={`border-t ${borderClass} px-6 py-4 rounded-b-2xl`}>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !isLoading) {
                  handleSendMessage();
                }
              }}
              placeholder="Type your message..."
              disabled={isLoading}
              className={`flex-1 px-4 py-2.5 rounded-full border text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black ${inputBgClass} placeholder-gray-500 disabled:opacity-50`}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isLoading}
              className="p-2.5 rounded-full bg-black hover:bg-gray-900 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Responsive Adjustments */}
      <style>{`
        @media (max-width: 640px) {
          .chat-window {
            width: calc(100vw - 2rem) !important;
            height: 500px !important;
          }
        }
      `}</style>
    </>
  );
}
