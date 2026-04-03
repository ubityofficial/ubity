import { useState, useRef, useEffect } from 'react';
import { Send, Loader } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const aiResponses = [
  "I can help you design scalable architectures. What specific challenges are you facing?",
  "Our systems handle millions of requests daily with 99.98% uptime. How can we help yours?",
  "Performance is critical. Let's discuss optimization strategies for your use case.",
  "We specialize in AI-driven solutions. What kind of intelligence do you need to build?",
  "Database scaling, microservices, cloud infrastructure - we do it all. What's your priority?",
  "Real-time systems demand precision. Tell me more about your requirements.",
  "Security is non-negotiable. Let's build something bulletproof together.",
];

export default function AIChat() {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Ubity's AI Assistant. How can I help you build the future?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  const bgLight = theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1A1A1A] border-white/10';
  const msgBgUser = theme === 'light' ? 'bg-blue-100 text-blue-900' : 'bg-blue-600/20 text-blue-100';
  const msgBgAI = theme === 'light' ? 'bg-gray-100 text-gray-900' : 'bg-white/5 text-gray-300';
  const textLight = theme === 'light' ? 'text-gray-900' : 'text-white';
  const subTextLight = theme === 'light' ? 'text-gray-600' : 'text-gray-400';
  const inputBg = theme === 'light' ? 'bg-gray-50 text-gray-900 border-gray-200' : 'bg-white/5 text-white border-white/10';

  return (
    <section className={`py-32 px-6 ${theme === 'light' ? 'bg-gray-50' : 'bg-[#111111]'} relative overflow-hidden transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className={`text-5xl md:text-6xl font-light mb-6 tracking-tight ${textLight}`}>
            AI Assistant
          </h2>
          <p className={`text-lg font-light max-w-2xl mx-auto ${subTextLight}`}>
            Chat with our intelligent assistant to explore solutions
          </p>
        </div>

        <div className={`${bgLight} border rounded-2xl overflow-hidden flex flex-col h-[600px] transition-colors duration-300`}>
          <div className={`flex-1 overflow-y-auto p-6 space-y-4 ${theme === 'light' ? 'bg-white' : 'bg-[#0A0A0A]'}`}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-2xl font-light ${
                    message.sender === 'user' ? msgBgUser : msgBgAI
                  }`}
                >
                  {message.text}
                  <div className={`text-xs mt-1 opacity-60`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className={`px-4 py-3 rounded-2xl ${msgBgAI}`}>
                  <Loader className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className={`p-4 border-t ${theme === 'light' ? 'border-gray-200 bg-white' : 'border-white/10 bg-[#1A1A1A]'}`}>
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(input)}
                placeholder="Ask me anything..."
                className={`flex-1 px-4 py-3 rounded-lg border ${inputBg} focus:outline-none focus:border-blue-500 transition-colors duration-300`}
              />
              <button
                onClick={() => handleSendMessage(input)}
                disabled={!input.trim() || isLoading}
                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
