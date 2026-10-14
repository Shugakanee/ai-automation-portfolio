import React from 'react';
import { siteConfig } from '../config/site';
import { LinkedInIcon } from './icons/SocialIcons';
import {
  ArrowRight,
  PhoneCall,
  MessageCircle,
  Briefcase,
  Mail,
  Workflow,
  Cpu,
  Database,
  CheckCircle2,
} from 'lucide-react';
import { isElevenLabsConfigured, startElevenLabsConversation } from '../utils/elevenlabs';

interface HeroProps {
  onOpenVoiceModal: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenVoiceModal, onNavigate }) => {
  const handleVoiceAgentClick = async () => {
    if (isElevenLabsConfigured()) {
      const res = await startElevenLabsConversation();
      if (!res.success) {
        onOpenVoiceModal();
      }
    } else {
      onOpenVoiceModal();
    }
  };

  return (
    <section
      id="hero"
      className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-100 via-slate-50 to-white dark:from-navy-950 dark:via-navy-900 dark:to-navy-950"
    >
      {/* Background Subtle Tech Grid Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#2563eb12_1px,transparent_1px)] dark:bg-[radial-gradient(#38bdf815_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Ambient gradient orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-violet-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Availability Status Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 mb-6 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-900 dark:text-blue-300">
              {siteConfig.personal.professionalTitle} • Open for Projects
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-6">
            “I Build{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Intelligent AI Agents,
            </span>{' '}
            Automated Workflows & Connected Business Systems.”
          </h1>

          {/* Supporting Description */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-3xl mb-9">
            {siteConfig.personal.supportingDescription}
          </p>

          {/* 4 Primary Call-to-Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 w-full max-w-2xl mb-10">
            {/* CTA 1: Explore My Projects */}
            <button
              type="button"
              onClick={() => onNavigate('#projects')}
              className="flex items-center space-x-2 px-6 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
            >
              <span>Explore My Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* CTA 2: Test My AI Voice Agent */}
            <button
              type="button"
              onClick={handleVoiceAgentClick}
              className="flex items-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-violet-500/25 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
              <span>Test My AI Voice Agent</span>
            </button>

            {/* CTA 3: Chat on WhatsApp */}
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>

            {/* CTA 4: Hire Me */}
            <button
              type="button"
              onClick={() => onNavigate('#contact')}
              className="flex items-center space-x-2 px-5 py-3.5 bg-white dark:bg-navy-900 text-blue-600 dark:text-blue-400 font-bold text-sm rounded-xl border border-blue-200 dark:border-blue-800/80 hover:bg-blue-50 dark:hover:bg-navy-800 transition-all shadow-sm hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Briefcase className="w-4 h-4" />
              <span>Hire Me</span>
            </button>
          </div>

          {/* Quick Clickable Contact & Social Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 pb-10 border-b border-slate-200/80 dark:border-slate-800/80 w-full max-w-3xl">
            <a
              href={siteConfig.contact.emailLink}
              className="flex items-center space-x-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1"
            >
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              <span className="underline decoration-slate-300 dark:decoration-slate-700 underline-offset-4">
                {siteConfig.contact.email}
              </span>
            </a>

            <span className="text-slate-300 dark:text-slate-700">•</span>

            <a
              href={siteConfig.contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1"
            >
              <LinkedInIcon className="w-3.5 h-3.5 text-blue-700" />
              <span>LinkedIn Profile</span>
            </a>

            <span className="text-slate-300 dark:text-slate-700">•</span>

            <span className="flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400 font-semibold py-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified n8n & Voice AI Integration</span>
            </span>
          </div>

          {/* Interactive AI Architecture Mockup Card */}
          <div className="w-full max-w-4xl mt-10 rounded-2xl bg-slate-900 border border-slate-800 p-6 md:p-8 shadow-2xl text-left overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                <span className="text-xs font-mono text-slate-400 pl-3">
                  Autonomous Multi-App Orchestration Engine
                </span>
              </div>
              <span className="text-[11px] font-mono text-indigo-400 bg-indigo-950/80 px-2.5 py-1 rounded border border-indigo-800">
                PROD ENVIRONMENT
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800">
                <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono font-bold mb-1.5">
                  <Workflow className="w-4 h-4" />
                  <span>n8n Workflows</span>
                </div>
                <p className="text-xs text-slate-400 leading-snug">
                  Dynamic triggers, error catchers, and automated multi-branch routing.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800">
                <div className="flex items-center space-x-2 text-indigo-400 text-xs font-mono font-bold mb-1.5">
                  <Cpu className="w-4 h-4" />
                  <span>AI Agents & LLMs</span>
                </div>
                <p className="text-xs text-slate-400 leading-snug">
                  Google Gemini & OpenAI integration with structured JSON schemas.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800">
                <div className="flex items-center space-x-2 text-violet-400 text-xs font-mono font-bold mb-1.5">
                  <PhoneCall className="w-4 h-4" />
                  <span>Voice AI Engine</span>
                </div>
                <p className="text-xs text-slate-400 leading-snug">
                  Sub-second speech response, telephony bridging, and tool execution.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800">
                <div className="flex items-center space-x-2 text-emerald-400 text-xs font-mono font-bold mb-1.5">
                  <Database className="w-4 h-4" />
                  <span>CRM & Vector DBs</span>
                </div>
                <p className="text-xs text-slate-400 leading-snug">
                  Real-time synchronization across Google Sheets, Supabase, and CRMs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
