import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { NavigationProvider } from './context/NavigationContext';
import Header from './components/Header';
import Hero from './components/Hero';
import PathwaySection from './components/PathwaySection';
import Capabilities from './components/Capabilities';
import VisualSection from './components/VisualSection';
import Process from './components/Process';
import FinalSection from './components/FinalSection';
import Footer from './components/Footer';
import InternshipsPage from './components/InternshipsPage';

function MainPage() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="bg-[#0A0A0A]">
      <Header />
      <Hero />
      <PathwaySection />
      <Capabilities />
      <VisualSection />
      <Process />
      <FinalSection />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <NavigationProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/internships" element={<InternshipsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </NavigationProvider>
    </Router>
  );
}

export default App;
