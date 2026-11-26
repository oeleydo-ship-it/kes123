import { useRef, useState } from 'react';
import { ArchitectureSection } from './components/ArchitectureSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { CaseStudyModal } from './components/CaseStudyModal';
import { EstimatorAndContact } from './components/EstimatorAndContact';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CaseStudy } from './data/studioData';

export default function App() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [referenceNote, setReferenceNote] = useState<string>('');
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const scrollToEstimate = (prefillNote?: string) => {
    if (prefillNote) {
      setReferenceNote(`Interested in an architecture similar to ${prefillNote}.`);
    }
    const el = document.getElementById('estimate');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 350);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] text-slate-900">
      <Header onStartProject={() => scrollToEstimate()} />

      <main className="flex-1">
        <Hero onScopeBuild={() => scrollToEstimate()} />
        <CapabilitiesSection />
        <CaseStudiesSection onSelectCaseStudy={(study) => setSelectedCaseStudy(study)} />
        <ArchitectureSection />
        <EstimatorAndContact
          key={referenceNote}
          nameInputRef={nameInputRef}
          initialReferenceNote={referenceNote}
        />
      </main>

      <Footer />

      <CaseStudyModal
        study={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onRequestSimilar={(clientName) => scrollToEstimate(clientName)}
      />
    </div>
  );
}
