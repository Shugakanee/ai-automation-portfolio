import React, { useState } from 'react';
import { WorkflowStep } from '../../data/projects';
import { ArrowRight, CheckCircle2, Zap, ShieldCheck, Cpu, Database, Mail, Link as LinkIcon } from 'lucide-react';

interface ArchitectureDiagramProps {
  steps: WorkflowStep[];
  flowSummary?: string;
  compact?: boolean;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
  steps,
  flowSummary,
  compact = false,
}) => {
  const [activeStepId, setActiveStepId] = useState<string>(steps[0]?.id || '');

  const getCategoryIcon = (category: WorkflowStep['category']) => {
    switch (category) {
      case 'trigger':
        return <Zap className="w-4 h-4 text-amber-500" />;
      case 'validation':
        return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
      case 'ai':
        return <Cpu className="w-4 h-4 text-indigo-500" />;
      case 'parser':
        return <LinkIcon className="w-4 h-4 text-cyan-500" />;
      case 'database':
        return <Database className="w-4 h-4 text-blue-500" />;
      case 'notification':
        return <Mail className="w-4 h-4 text-violet-500" />;
      case 'integration':
      default:
        return <CheckCircle2 className="w-4 h-4 text-purple-500" />;
    }
  };

  const getCategoryBadgeClass = (category: WorkflowStep['category']) => {
    switch (category) {
      case 'trigger':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800/50';
      case 'validation':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50';
      case 'ai':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/50';
      case 'parser':
        return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800/50';
      case 'database':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800/50';
      case 'notification':
        return 'bg-violet-100 text-violet-800 dark:bg-violet-950/60 dark:text-violet-300 border-violet-200 dark:border-violet-800/50';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700';
    }
  };

  const activeStep = steps.find((s) => s.id === activeStepId) || steps[0];

  return (
    <div className="w-full bg-slate-900 text-slate-100 rounded-xl p-5 border border-slate-800 shadow-xl overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
          </div>
          <span className="text-xs font-mono text-slate-400 pl-2">System Architecture Pipeline</span>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono text-indigo-400 bg-indigo-950/60 px-2.5 py-1 rounded-md border border-indigo-800/60">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>LIVE PIPELINE ACTIVE</span>
        </div>
      </div>

      {flowSummary && (
        <div className="mb-4 text-xs font-mono text-slate-300 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 overflow-x-auto whitespace-nowrap scrollbar-thin">
          <span className="text-indigo-400 font-semibold">Flow: </span>
          {flowSummary}
        </div>
      )}

      {/* Interactive Step Track */}
      <div className="relative py-2 overflow-x-auto">
        <div className="flex items-center space-x-2 min-w-max pb-3">
          {steps.map((step, index) => {
            const isSelected = step.id === activeStepId;
            return (
              <React.Fragment key={step.id}>
                <button
                  type="button"
                  onClick={() => setActiveStepId(step.id)}
                  className={`group relative text-left p-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isSelected
                      ? 'bg-slate-800/95 border-indigo-500 shadow-lg shadow-indigo-500/20 translate-y-[-2px]'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-800 text-[10px] font-mono font-bold text-slate-300 border border-slate-700">
                      {index + 1}
                    </span>
                    <span
                      className={`text-xs font-semibold tracking-wide ${
                        isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    {getCategoryIcon(step.category)}
                    <span className="text-[11px] font-mono text-slate-400 truncate max-w-[140px]">
                      {step.tool}
                    </span>
                  </div>
                </button>

                {index < steps.length - 1 && (
                  <div className="flex items-center px-1 text-slate-600">
                    <ArrowRight className="w-4 h-4 text-indigo-400/70" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Step Detail Card */}
      {activeStep && !compact && (
        <div className="mt-4 p-4 rounded-lg bg-slate-950/90 border border-slate-800/90">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-semibold uppercase px-2 py-0.5 rounded border text-indigo-300 bg-indigo-950/70 border-indigo-800">
                Stage {steps.findIndex((s) => s.id === activeStep.id) + 1} of {steps.length}
              </span>
              <h4 className="text-sm font-bold text-white">{activeStep.label}</h4>
            </div>
            <span
              className={`text-[11px] font-mono px-2 py-0.5 rounded border ${getCategoryBadgeClass(
                activeStep.category
              )}`}
            >
              Node: {activeStep.tool}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{activeStep.description}</p>
        </div>
      )}
    </div>
  );
};
