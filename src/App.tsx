import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedProjects } from './components/FeaturedProjects';
import { AdditionalProjects } from './components/AdditionalProjects';
import { ServicesSection } from './components/ServicesSection';
import { SkillsSection } from './components/SkillsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ElevenLabsWidget } from './components/voice/ElevenLabsWidget';
import { VoiceAgentModal } from './components/VoiceAgentModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { Project } from './data/projects';

export const App: React.FC = () => {
  // Dark mode state: default to system or saved preference
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Modal states
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);

  // Preselected service for contact form
  const [preselectedService, setPreselectedService] = useState<string>('');

  // Synchronize 'dark' class on HTML root element
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.querySelector(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceFromCard = (serviceName: string) => {
    setPreselectedService(serviceName);
    handleNavigate('#contact');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 selection:bg-blue-500 selection:text-white">
      {/* Sticky Header Navigation */}
      <Navbar
        onOpenVoiceModal={() => setVoiceModalOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenVoiceModal={() => setVoiceModalOpen(true)}
          onNavigate={handleNavigate}
        />

        {/* Featured Projects (Projects 1, 2, 3 in exact order) */}
        <FeaturedProjects
          onSelectProject={(project) => setSelectedCaseStudy(project)}
          onOpenVoiceModal={() => setVoiceModalOpen(true)}
          onRequestService={handleSelectServiceFromCard}
        />

        {/* Additional Real-World Projects (Projects 4, 5, 6) */}
        <AdditionalProjects
          onSelectProject={(project) => setSelectedCaseStudy(project)}
          onRequestService={handleSelectServiceFromCard}
        />

        {/* Services Section (10 cards with deliverables and 'Discuss This Service') */}
        <ServicesSection onSelectService={handleSelectServiceFromCard} />

        {/* Technical Skills Section (6 clean categories) */}
        <SkillsSection />

        {/* About Me Section (Exact text + direct CTAs) */}
        <AboutSection
          onOpenVoiceModal={() => setVoiceModalOpen(true)}
          onNavigate={handleNavigate}
        />

        {/* Contact Section (n8n Webhook Form, WhatsApp, Email, Socials) */}
        <ContactSection initialService={preselectedService} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Persistent WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Official ElevenLabs Conversational AI Widget */}
      <ElevenLabsWidget />

      {/* AI Voice Agent Modal */}
      <VoiceAgentModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
      />

      {/* Full Project Case Study Modal */}
      <CaseStudyModal
        project={selectedCaseStudy}
        isOpen={Boolean(selectedCaseStudy)}
        onClose={() => setSelectedCaseStudy(null)}
        onRequestService={handleSelectServiceFromCard}
      />
    </div>
  );
};

export default App;
