import { useEffect } from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
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

function AppContent() {
  const { currentPage } = useNavigation();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return currentPage === 'main' ? <MainPage /> : <InternshipsPage />;
}

function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}

export default App;
