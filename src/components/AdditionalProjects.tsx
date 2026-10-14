import React, { useState, useMemo } from 'react';
import { Project, projectsData } from '../data/projects';
import {
  ArrowRight,
  Building2,
  ShieldAlert,
  ExternalLink,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  Layers,
} from 'lucide-react';

interface AdditionalProjectsProps {
  onSelectProject: (project: Project) => void;
  onRequestService: (serviceName: string) => void;
}

const INITIAL_DISPLAY_COUNT = 6;

export const AdditionalProjects: React.FC<AdditionalProjectsProps> = ({
  onSelectProject,
  onRequestService,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAll, setShowAll] = useState<boolean>(false);

  // Filter options
  const filterOptions = ['All', 'Workflow Automation', 'AI Agents', 'Multi-Agent'];

  const additionalProjects = useMemo(
    () => projectsData.filter((p) => !p.featured),
    []
  );

  const filteredProjects = useMemo(() => {
    return additionalProjects.filter((project) => {
      const matchesCategory =
        selectedFilter === 'All' || project.category === selectedFilter;

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch =
        project.title.toLowerCase().includes(query) ||
        project.subtitle.toLowerCase().includes(query) ||
        project.summary.toLowerCase().includes(query) ||
        project.technologies.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [additionalProjects, selectedFilter, searchQuery]);

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_DISPLAY_COUNT);

  const serviceMap: Record<string, string> = {
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

  return (
    <section
      id="additional-projects"
      className="py-20 md:py-28 bg-slate-50 dark:bg-navy-950/80 border-t border-slate-200/80 dark:border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/60 px-3 py-1 rounded-md mb-3 inline-block border border-violet-200 dark:border-violet-800">
              Enterprise Deployments & Automations
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Production AI Systems & Automations
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base mt-2">
              Explore 12+ real-world automation pipelines, multi-agent frameworks, RAG knowledge systems,
              webhook engines, and autonomous email intelligence solutions.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-navy-900 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm self-start md:self-auto">
            <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>
              Showing <strong className="text-slate-900 dark:text-white">{displayedProjects.length}</strong> of{' '}
              <strong className="text-slate-900 dark:text-white">{filteredProjects.length}</strong> Automations
            </span>
          </div>
        </div>

        {/* Controls: Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => {
                  setSelectedFilter(filter);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedFilter === filter
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-navy-800'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search automations or tech..."
              className="w-full pl-9 pr-8 py-1.5 text-xs rounded-xl bg-white dark:bg-navy-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Project Cards Grid */}
        {displayedProjects.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              No automation projects match your selected filter or search terms.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedFilter('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col justify-between rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 shadow-md hover:shadow-xl hover:border-blue-400/50 dark:hover:border-blue-500/40 transition-all duration-300 group"
              >
                <div>
                  {/* Header Tag Bar */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                      Project #{project.order} • {project.category}
                    </span>
                    {project.clientContext && (
                      <span className="text-[11px] font-mono text-slate-500 flex items-center">
                        <Building2 className="w-3 h-3 mr-1" />
                        {project.clientContext}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-4">
                    {project.subtitle}
                  </p>

                  {/* Summary */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-5 line-clamp-3">
                    {project.summary}
                  </p>

                  {/* Human in the loop badge */}
                  {project.humanInTheLoopNote && (
                    <div className="mb-4 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-[11px] text-amber-900 dark:text-amber-300 flex items-start space-x-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-amber-600 mt-0.5" />
                      <span>{project.humanInTheLoopNote}</span>
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                          +{project.technologies.length - 5}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    {project.projectUrl ? (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm hover:shadow transition-all group/btn"
                      >
                        <span>View Project</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    ) : null}

                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center space-x-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 py-1.5 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <span>Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRequestService(serviceMap[project.id] || 'Custom AI Automation Solution')}
                    className="text-[11px] font-mono font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                  >
                    Request Similar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Show More / Show Less Toggle Button */}
        {filteredProjects.length > INITIAL_DISPLAY_COUNT && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-white dark:bg-navy-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 font-bold text-xs shadow-md hover:shadow-lg transition-all"
            >
              {showAll ? (
                <>
                  <span>Show Less</span>
                  <ChevronUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </>
              ) : (
                <>
                  <span>
                    Show More Projects ({filteredProjects.length - INITIAL_DISPLAY_COUNT} More)
                  </span>
                  <ChevronDown className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
