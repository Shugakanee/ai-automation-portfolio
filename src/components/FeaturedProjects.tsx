import React, { useState } from 'react';
import { Project, projectsData } from '../data/projects';
import { ArchitectureDiagram } from './workflow/ArchitectureDiagram';
import {
  PhoneCall,
  ArrowRight,
  Layers,
  Sparkles,
  Zap,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { isElevenLabsConfigured, startElevenLabsConversation } from '../utils/elevenlabs';

interface FeaturedProjectsProps {
  onSelectProject: (project: Project) => void;
  onOpenVoiceModal: () => void;
  onRequestService: (serviceName: string) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  onSelectProject,
  onOpenVoiceModal,
  onRequestService,
}) => {
  // Sort and pick only the 3 featured projects in exact order
  const featured = projectsData
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order);

  // Expanded workflow toggle states
  const [expandedWorkflows, setExpandedWorkflows] = useState<Record<string, boolean>>({
    'real-estate-crm-lead-management': true, // open by default to showcase architecture immediately
    'ai-customer-support-faq-chatbot': false,
    'ai-voice-agent-calling-assistant': false,
  });

  const toggleWorkflow = (projectId: string) => {
    setExpandedWorkflows((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  const handleCallAgent = async () => {
    if (isElevenLabsConfigured()) {
      const res = await startElevenLabsConversation();
      if (!res.success) {
        // Fall back to modal to display error feedback or configuration checklist
        onOpenVoiceModal();
      }
    } else {
      onOpenVoiceModal();
    }
  };

  return (
    <section id="projects" className="py-20 md:py-28 bg-white dark:bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-md mb-3 border border-blue-200 dark:border-blue-800">
              <Zap className="w-3.5 h-3.5" />
              <span>Project-Driven Engineering</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Featured AI Systems & Workflows
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base mt-2">
              Real-world automation pipelines, AI agents, CRM connectors, and conversational voice
              assistants engineered for high-impact business outcomes.
            </p>
          </div>

          <a
            href="#additional-projects"
            className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-mono group"
          >
            <span>View All {projectsData.length} Projects & Automations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* The 3 Featured Projects in Exact Specified Order */}
        <div className="space-y-16">
          {featured.map((project, index) => {
            const isVoiceProject = project.id === 'ai-voice-agent-calling-assistant';
            const isWorkflowOpen = !!expandedWorkflows[project.id];

            return (
              <div
                key={project.id}
                className={`relative rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isVoiceProject
                    ? 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white border-indigo-500/50 shadow-2xl shadow-indigo-500/10'
                    : 'bg-white dark:bg-navy-900/90 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800 shadow-xl hover:border-blue-400/50 dark:hover:border-blue-500/40'
                }`}
              >
                {/* Visual Highlight Badge */}
                <div className="p-6 sm:p-8 md:p-10">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center space-x-3">
                      <span
                        className={`text-xs font-mono font-bold px-3 py-1 rounded-md uppercase tracking-wider ${
                          isVoiceProject
                            ? 'bg-violet-600 text-white'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                        }`}
                      >
                        Featured System #{index + 1} • {project.category}
                      </span>
                      {isVoiceProject && (
                        <span className="flex items-center space-x-1.5 text-xs text-emerald-400 font-mono bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                          <span>LIVE CALL TEST AVAILABLE</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
                      <span>{project.technologies.length} Tech Stack Nodes</span>
                    </div>
                  </div>

                  {/* Project Title & Subtitle */}
                  <h3
                    className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 ${
                      isVoiceProject ? 'text-white' : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`text-sm md:text-base font-medium mb-6 ${
                      isVoiceProject ? 'text-indigo-200' : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {project.subtitle}
                  </p>

                  {/* Project Summary */}
                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-6 max-w-4xl ${
                      isVoiceProject ? 'text-slate-300' : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {project.summary}
                  </p>

                  {/* Technologies Pill Grid */}
                  <div className="mb-8">
                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Architecture Technologies:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`text-xs font-mono px-3 py-1 rounded-lg border font-medium ${
                            isVoiceProject
                              ? 'bg-slate-800/90 text-slate-200 border-slate-700'
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Featured Project 3: Prominent AI Call Testing Hero Banner */}
                  {isVoiceProject && (
                    <div className="my-8 p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-violet-900/60 via-indigo-900/60 to-slate-900/80 border border-violet-500/40 shadow-xl">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="max-w-xl">
                          <div className="flex items-center space-x-2 text-violet-300 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                            <Sparkles className="w-4 h-4 text-violet-400" />
                            <span>Interactive Telephony & Voice Demonstration</span>
                          </div>
                          <p className="text-white text-base font-bold">
                            “Talk to my AI voice assistant and experience conversational AI automation
                            firsthand.”
                          </p>
                          <p className="text-xs text-slate-300 mt-1">
                            Tests ultra-low latency speech recognition, contextual reasoning, and real-time
                            tool-calling webhooks.
                          </p>
                        </div>

                        {/* Working Call My AI Agent Button */}
                        <div className="shrink-0">
                          <button
                            type="button"
                            onClick={handleCallAgent}
                            className="flex items-center space-x-3 px-7 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-sm rounded-2xl shadow-xl shadow-emerald-500/30 transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
                          >
                            <PhoneCall className="w-5 h-5 text-white animate-bounce" />
                            <span>Call My AI Agent</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Collapsible Architecture Diagram Preview */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                      <button
                        type="button"
                        onClick={() => toggleWorkflow(project.id)}
                        className={`flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider hover:underline focus:outline-none ${
                          isVoiceProject
                            ? 'text-indigo-300 hover:text-white'
                            : 'text-blue-600 dark:text-blue-400 hover:text-blue-700'
                        }`}
                      >
                        <Layers className="w-4 h-4" />
                        <span>
                          {isWorkflowOpen ? 'Hide Architecture Diagram' : 'View Architecture Diagram'}
                        </span>
                        {isWorkflowOpen ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                      <span className="text-[11px] font-mono text-slate-400">
                        {project.architectureDiagram.steps.length} Pipeline Stages
                      </span>
                    </div>

                    {isWorkflowOpen && (
                      <div className="animate-fadeIn">
                        <ArchitectureDiagram
                          steps={project.architectureDiagram.steps}
                          flowSummary={project.architectureDiagram.flowSummary}
                        />
                      </div>
                    )}
                  </div>

                  {/* Action Buttons as specified per featured project */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200/60 dark:border-slate-800">
                    {/* Primary Button */}
                    <button
                      type="button"
                      onClick={() => {
                        if (isVoiceProject) {
                          handleCallAgent();
                        } else {
                          onSelectProject(project);
                        }
                      }}
                      className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-105 shadow-md ${
                        isVoiceProject
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100'
                      }`}
                    >
                      {isVoiceProject ? (
                        <>
                          <PhoneCall className="w-4 h-4" />
                          <span>{project.actionLabels.primary}</span>
                        </>
                      ) : (
                        <>
                          <span>{project.actionLabels.primary}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    {/* Secondary Button: View Workflow / Explore Architecture */}
                    <button
                      type="button"
                      onClick={() => {
                        if (!isWorkflowOpen) toggleWorkflow(project.id);
                        onSelectProject(project);
                      }}
                      className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors ${
                        isVoiceProject
                          ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700'
                          : 'bg-white dark:bg-navy-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Layers className="w-4 h-4" />
                      <span>{project.actionLabels.secondary}</span>
                    </button>

                    {/* Request a Similar System / Build Similar Button */}
                    <button
                      type="button"
                      onClick={() => {
                        const serviceMap: Record<string, string> = {
                          'real-estate-crm-lead-management': 'CRM Integration',
                          'ai-customer-support-faq-chatbot': 'AI Customer Support Chatbot',
                          'ai-voice-agent-calling-assistant': 'AI Voice Agent Development',
                        };
                        onRequestService(serviceMap[project.id] || 'Workflow Automation');
                      }}
                      className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                        isVoiceProject
                          ? 'text-emerald-400 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800'
                          : 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800/80'
                      }`}
                    >
                      <span>{project.actionLabels.requestService}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
