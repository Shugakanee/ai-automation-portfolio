import React from 'react';
import { siteConfig } from '../config/site';
import {
  ArrowRight,
  PhoneCall,
  Mail,
  CheckCircle,
  Cpu,
  Sparkles,
} from 'lucide-react';
import { isElevenLabsConfigured, startElevenLabsConversation } from '../utils/elevenlabs';

interface AboutSectionProps {
  onOpenVoiceModal: () => void;
  onNavigate: (sectionId: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenVoiceModal,
  onNavigate,
}) => {
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
    <section id="about" className="py-20 md:py-28 bg-white dark:bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Bio Card & Engineering Principles */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-8 bg-gradient-to-br from-slate-900 via-navy-900 to-indigo-950 text-white border border-slate-800 shadow-2xl overflow-hidden">
              {/* Background ambient light */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-violet-500/30">
                  <Cpu className="w-8 h-8" />
                </div>

                <div className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400 mb-1">
                  AI AUTOMATION SPECIALIST
                </div>
                <h3 className="text-2xl font-black text-white mb-4">
                  {siteConfig.personal.name}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-6 font-mono">
                  &gt; Architecting automated business pipelines
                  <br />
                  &gt; Deploying voice assistants & tool-calling agents
                  <br />
                  &gt; Eliminating manual operational bottlenecks
                </p>

                {/* Core Principles */}
                <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
                  <div className="flex items-center space-x-2.5 text-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Deterministic JSON parsing for CRM safety</span>
                  </div>
                  <div className="flex items-center space-x-2.5 text-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>RAG knowledge grounding without hallucinations</span>
                  </div>
                  <div className="flex items-center space-x-2.5 text-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Resilient error-handling branches in n8n</span>
                  </div>
                  <div className="flex items-center space-x-2.5 text-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Human-in-the-loop gates for high-stakes actions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Summary & Primary Action Buttons */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-md mb-4 border border-blue-200 dark:border-blue-800">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About Me</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
              Engineering Practical AI Systems That Drive Business Velocity
            </h2>

            {/* Exact Required Summary Text */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-navy-900/90 border border-slate-200 dark:border-slate-800 mb-8 shadow-sm">
              <p className="text-sm md:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                {siteConfig.personal.aboutText}
              </p>
            </div>

            {/* Prompt Requirement: Include buttons to view my projects, test my AI voice agent, and contact me */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('#projects')}
                className="flex items-center space-x-2 px-6 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-md hover:scale-105"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleVoiceAgentClick}
                className="flex items-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-violet-500/25 transition-all hover:scale-105"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Test My AI Voice Agent</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('#contact')}
                className="flex items-center space-x-2 px-6 py-3.5 bg-white dark:bg-navy-900 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/80 font-bold text-xs rounded-xl hover:bg-blue-50 dark:hover:bg-navy-800 transition-all shadow-sm hover:scale-105"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
