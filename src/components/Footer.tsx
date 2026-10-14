import React from 'react';
import { siteConfig } from '../config/site';
import { LinkedInIcon, GitHubIcon } from './icons/SocialIcons';
import {
  Bot,
  Mail,
  MessageCircle,
  ArrowUp,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Title Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center text-white shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-white text-base tracking-tight block">
                  {siteConfig.personal.name}
                </span>
                <span className="text-xs font-mono text-indigo-400 font-medium">
                  {siteConfig.personal.professionalTitle}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Designing intelligent AI agents, n8n automated workflows, CRM pipelines, and voice
              assistants that scale business operations with zero repetitive overhead.
            </p>

            <div className="pt-2 flex items-center space-x-3">
              <a
                href={siteConfig.contact.emailLink}
                className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-800 text-emerald-400 hover:bg-emerald-950 transition-colors"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-800 text-blue-400 hover:bg-blue-950 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              {siteConfig.contact.githubUrl && (
                <a
                  href={siteConfig.contact.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  aria-label="GitHub Profile"
                >
                  <GitHubIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {siteConfig.navigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-slate-400 hover:text-white transition-colors block py-1"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono mb-4">
              Core Capabilities
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>AI Agents & Gemini LLMs</li>
              <li>Conversational Voice AI</li>
              <li>n8n Workflow Engineering</li>
              <li>Real Estate CRM Automation</li>
              <li>Supabase Vector Stores (RAG)</li>
              <li>REST APIs & JSON Pipelines</li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[11px] font-mono text-slate-500 block">Email:</span>
                <a
                  href={siteConfig.contact.emailLink}
                  className="text-slate-300 hover:text-blue-400 transition-colors underline break-all"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-500 block">WhatsApp:</span>
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  +234 913 552 3468
                </a>
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-500 block">LinkedIn:</span>
                <a
                  href={siteConfig.contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-blue-400 transition-colors"
                >
                  precious-achionye
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Dynamic Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} Precious Achionye. All rights reserved. Production-grade AI Automation Systems.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
