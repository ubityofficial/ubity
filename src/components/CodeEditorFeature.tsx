import { useState } from 'react';
import { Copy, Play, RotateCcw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const templates = {
  react: `function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">
        {count}
      </h1>
      <button
        onClick={() => setCount(count + 1)}
        className="px-6 py-2 bg-blue-500 text-white rounded"
      >
        Increment
      </button>
    </div>
  );
}`,
  api: `const getUser = async (id) => {
  const response = await fetch(
    \`/api/users/\${id}\`
  );
  const user = await response.json();
  return {
    ...user,
    active: true,
    lastUpdate: new Date()
  };
};`,
  query: `SELECT users.name, COUNT(posts.id)
FROM users
LEFT JOIN posts ON users.id = posts.user_id
GROUP BY users.id
ORDER BY COUNT(posts.id) DESC
LIMIT 10;`
};

export default function CodeEditorFeature() {
  const { theme } = useTheme();
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof templates>('react');
  const [code, setCode] = useState(templates.react);
  const [copied, setCopied] = useState(false);
  const [output, setOutput] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setOutput(`✓ Executed at ${new Date().toLocaleTimeString()}\n✓ Code validated\n✓ No errors found`);
  };

  const handleReset = () => {
    setCode(templates[selectedTemplate]);
    setOutput('');
  };

  const switchTemplate = (key: keyof typeof templates) => {
    setSelectedTemplate(key);
    setCode(templates[key]);
    setOutput('');
  };

  const bgEditorLight = theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-[#1A1A1A] border-white/10';
  const textEditorLight = theme === 'light' ? 'text-gray-900' : 'text-gray-100';

  return (
    <section id="features" className={`py-32 px-6 ${theme === 'light' ? 'bg-gray-50' : 'bg-[#111111]'} relative overflow-hidden transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-5xl md:text-6xl font-light mb-6 tracking-tight ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Interactive Code Editor
          </h2>
          <p className={`text-lg font-light max-w-2xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            Write, test, and share code with real-time validation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`lg:col-span-2 ${bgEditorLight} border rounded-2xl overflow-hidden transition-colors duration-300`}>
            <div className={`flex gap-2 p-4 border-b ${theme === 'light' ? 'border-gray-200 bg-gray-100' : 'border-white/10 bg-[#0A0A0A]'}`}>
              {(Object.keys(templates) as Array<keyof typeof templates>).map((key) => (
                <button
                  key={key}
                  onClick={() => switchTemplate(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-light transition-all duration-300 uppercase tracking-wider ${
                    selectedTemplate === key
                      ? `${theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-blue-500/20 text-blue-400'}`
                      : `${theme === 'light' ? 'text-gray-600 hover:bg-gray-200' : 'text-gray-400 hover:bg-white/5'}`
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>

            <div className={`p-6 font-mono text-sm overflow-x-auto ${textEditorLight}`}>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={`w-full h-64 bg-transparent border-0 focus:outline-none resize-none ${textEditorLight}`}
              />
            </div>

            <div className={`flex gap-3 p-4 border-t ${theme === 'light' ? 'border-gray-200' : 'border-white/10'}`}>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${theme === 'light' ? 'bg-gray-200 text-gray-900 hover:bg-gray-300' : 'bg-white/10 text-white hover:bg-white/20'} transition-all duration-300`}
              >
                <Copy className="w-4 h-4" />
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={handleRun}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
              >
                <Play className="w-4 h-4" />
                Execute
              </button>
              <button
                onClick={handleReset}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${theme === 'light' ? 'bg-gray-200 text-gray-900 hover:bg-gray-300' : 'bg-white/10 text-white hover:bg-white/20'} transition-all duration-300`}
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>

          <div className={`${bgEditorLight} border rounded-2xl p-6 transition-colors duration-300`}>
            <h3 className={`text-lg font-light mb-4 tracking-wide ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Output
            </h3>
            <div className={`p-4 rounded-lg ${theme === 'light' ? 'bg-gray-100 text-gray-900' : 'bg-[#0A0A0A] text-green-400'} font-mono text-sm min-h-48 whitespace-pre-wrap`}>
              {output || 'Run code to see output'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
