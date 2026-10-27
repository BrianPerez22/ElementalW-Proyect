import { useCallback, useEffect, useState } from 'react';
import About from './components/About';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Investigaciones from './components/Investigaciones';
import Metrics from './components/Metrics';
import Pillars from './components/Pillars';
import ResearchModal from './components/ResearchModal';
import { investigaciones } from './data/investigaciones';

const idFromHash = (): string | null => {
  const id = window.location.hash.replace('#', '');
  return investigaciones.some((r) => r.id === id) ? id : null;
};

export default function App() {
  // Si la URL trae #investigacion-N, se abre directo (útil para compartir enlaces).
  const [selectedId, setSelectedId] = useState<string | null>(idFromHash);
  const [coverVisible, setCoverVisible] = useState<boolean>(() => idFromHash() === null);

  const scrollToSection = (id: string) => {
    setCoverVisible(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const openResearch = (id: string) => {
    setSelectedId(id);
    window.history.replaceState(null, '', `#${id}`);
  };

  const closeResearch = useCallback(() => {
    setSelectedId(null);
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    const onHash = () => {
      const id = idFromHash();
      setSelectedId(id);
      if (id) setCoverVisible(false);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const selected = investigaciones.find((r) => r.id === selectedId) ?? null;

  return (
    <div className="min-h-screen bg-[#FAF7F8] text-[#2D1A22] font-sans relative selection:bg-rose-200 selection:text-rose-950 overflow-x-hidden">
      <Hero visible={coverVisible} onEnter={() => setCoverVisible(false)} />
      <Header onNavigate={scrollToSection} />

      <main className="relative z-10 pt-28 pb-24 space-y-28 max-w-7xl mx-auto px-6 sm:px-10">
        <About />
        <Pillars />
        <Metrics />
        <Investigaciones onOpen={openResearch} />
      </main>

      <Footer />

      {selected && <ResearchModal research={selected} onClose={closeResearch} />}
    </div>
  );
}
