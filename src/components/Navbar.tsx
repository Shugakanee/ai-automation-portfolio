import React, { useState, useEffect } from 'react';
import { siteConfig } from '../config/site';
import {
  Bot,
  Sun,
  Moon,
  PhoneCall,
  Menu,
  X,
  Mail,
  Send,
  MessageCircle,
} from 'lucide-react';

interface NavbarProps {
  onOpenVoiceModal: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenVoiceModal,
  darkMode,
  onToggleDarkMode,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-navy-950/90 backdrop-blur-md shadow-md py-3 border-b border-slate-200/80 dark:border-slate-800/80'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a
            href="#hero"
            className="flex items-center space-x-3 group focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {siteConfig.personal.name}
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 tracking-wide font-medium">
                AI Automation Specialist
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-7">
            {siteConfig.navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Test Voice Agent Button */}
            <button
              type="button"
              onClick={onOpenVoiceModal}
              className="flex items-center space-x-2 px-3.5 py-2 text-xs font-bold text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800/80 rounded-xl hover:bg-violet-100 dark:hover:bg-violet-900/60 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <PhoneCall className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400 animate-pulse" />
              <span>Test AI Voice Agent</span>
            </button>

            {/* Let's Work Together CTA */}
            <button
              type="button"
              onClick={() => handleNavClick('#contact')}
              className="flex items-center space-x-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-md shadow-blue-500/25 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Let&apos;s Work Together</span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              type="button"
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 animate-fadeIn">
            <nav className="flex flex-col space-y-3">
              {siteConfig.navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 py-1"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenVoiceModal();
                }}
                className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 text-xs font-bold text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800 rounded-xl"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Test AI Voice Agent</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('#contact')}
                className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 text-xs font-bold text-white bg-blue-600 rounded-xl shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Let&apos;s Work Together</span>
              </button>

              <div className="flex items-center justify-center space-x-4 pt-2">
                <a
                  href={siteConfig.contact.emailLink}
                  className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1 hover:text-blue-600"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Me</span>
                </a>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center space-x-1 font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
