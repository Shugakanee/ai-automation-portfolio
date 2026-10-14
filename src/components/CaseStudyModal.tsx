import React, { useEffect } from 'react';
import { Project } from '../data/projects';
import { ArchitectureDiagram } from './workflow/ArchitectureDiagram';
import {
  X,
  ExternalLink,
  Code2,
  CheckCircle,
  AlertCircle,
  Layers,
  ArrowRight,
  ShieldAlert,
  Building2,
} from 'lucide-react';
import { siteConfig } from '../config/site';

interface CaseStudyModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestService: (serviceName: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  isOpen,
  onClose,
  onRequestService,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const handleBuildSimilar = () => {
    onClose();
    // Pre-select service in contact form
    const serviceMap: Record<string, string> = {
      'real-estate-crm-lead-management': 'CRM Integration',
      'ai-customer-support-faq-chatbot': 'AI Customer Support Chatbot',
      'ai-voice-agent-calling-assistant': 'AI Voice Agent Development',
      'automated-real-estate-lead-follow-up': 'Workflow Automation',
      'multi-agent-real-estate-chatbot': 'Multi-Agent Systems',
      'ai-job-finder-application-preparation': 'AI Agent Development',
      'webhook-lead-capture-ai-qualification': 'Lead Qualification Automation',
      'rag-system': 'RAG & Knowledge Base Systems',
      'multi-agent-customer-service-system': 'Multi-Agent Systems',
      'manual-gmail-automation': 'Gmail Automation & Draft Systems',
      'automated-news-aggregation-ai-summarization-pipeline': 'Content Aggregation & AI Summarization',
      'automated-lead-follow-up-nurture-system': 'Lead Follow-Up & Nurture Workflows',
      'ai-powered-telegram-chatbot': 'Telegram Chatbot Development',
      'ai-powered-gmail-management-auto-reply': 'AI Email Management Systems',
      'ai-script-writer-content-generator-automation': 'AI Content & Script Generation',
    };
    const mapped = serviceMap[project.id] || 'Custom AI Automation Solution';
    onRequestService(mapped);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto animate-fadeIn">
        {/* Header bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-2.5 py-1 rounded-md border border-indigo-800">
              Project Case Study #{project.order}
            </span>
            {project.clientContext && (
              <span className="flex items-center text-xs text-slate-300 font-mono bg-slate-800 px-2.5 py-1 rounded-md">
                <Building2 className="w-3.5 h-3.5 mr-1 text-slate-400" />
                {project.clientContext}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-thin">
          {/* Title & Subtitle */}
          <div>
            <div className="inline-block text-xs font-bold font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              {project.category}
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mt-2 font-medium">
              {project.subtitle}
            </p>
          </div>

          {/* Tech Stack Chips */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-2.5">
              Tools & Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40">
              <div className="flex items-center space-x-2 text-rose-700 dark:text-rose-400 font-bold text-sm mb-2">
                <AlertCircle className="w-4 h-4" />
                <span>The Business Problem</span>
              </div>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40">
              <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm mb-2">
                <CheckCircle className="w-4 h-4" />
                <span>The Engineered Solution</span>
              </div>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Architecture Diagram */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-indigo-500" />
                <span>Solution Architecture & Workflow Logic</span>
              </h4>
              <span className="text-[11px] font-mono text-slate-400">Interactive Node View</span>
            </div>
            <ArchitectureDiagram
              steps={project.architectureDiagram.steps}
              flowSummary={project.architectureDiagram.flowSummary}
            />
          </div>

          {/* Accuracy Disclosure / Human In The Loop Notice */}
          {project.accuracyDisclosure && (
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 flex items-start space-x-3 text-xs text-blue-900 dark:text-blue-300">
              <ShieldAlert className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Knowledge Retrieval Disclosure: </span>
                {project.accuracyDisclosure}
              </div>
            </div>
          )}

          {project.humanInTheLoopNote && (
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start space-x-3 text-xs text-amber-900 dark:text-amber-300">
              <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Ethical Automation Guardrail: </span>
                {project.humanInTheLoopNote}
              </div>
            </div>
          )}

          {/* Key Features & Technical Contribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-3">
                Key System Capabilities
              </h4>
              <ul className="space-y-2">
                {project.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start text-xs text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5 mr-2" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-3">
                My Technical Contribution
              </h4>
              <ul className="space-y-2">
                {project.technicalContribution.map((item, idx) => (
                  <li key={idx} className="flex items-start text-xs text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0 mt-1.5 mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Business Value Delivered */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-3">
              Measurable Business Value
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.businessValue.map((val, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-2 text-xs text-slate-800 dark:text-slate-200"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links (Only if genuinely configured or provided) */}
          {(project.projectUrl || project.liveDemoUrl || project.repoUrl) && (
            <div className="flex flex-wrap gap-4 pt-2">
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all hover:scale-105"
                >
                  <span>View Project Workflow / System Documentation</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-slate-800 text-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-700 transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>View Repository</span>
                </a>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="sticky bottom-0 z-20 flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Interested in deploying a similar automation pipeline for your business?
          </div>
          <div className="flex items-center space-x-3">
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
            >
              Ask on WhatsApp
            </a>
            <button
              type="button"
              onClick={handleBuildSimilar}
              className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white text-xs font-bold rounded-xl shadow-md transition-all hover:scale-105"
            >
              <span>Build Something Similar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
