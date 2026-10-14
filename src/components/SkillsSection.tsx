import React from 'react';
import { skillsData } from '../data/skills';
import {
  Cpu,
  Workflow,
  Braces,
  Code,
  Briefcase,
  Database,
  CheckCircle,
} from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-indigo-500" />;
      case 'Workflow':
        return <Workflow className="w-5 h-5 text-amber-500" />;
      case 'Braces':
        return <Braces className="w-5 h-5 text-cyan-500" />;
      case 'Code':
        return <Code className="w-5 h-5 text-emerald-500" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-blue-500" />;
      case 'Database':
      default:
        return <Database className="w-5 h-5 text-violet-500" />;
    }
  };

  return (
    <section id="skills" className="py-20 md:py-24 bg-slate-50 dark:bg-navy-900/60 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-md mb-3 inline-block border border-indigo-200 dark:border-indigo-800">
            Technical Stack & Methodologies
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Engineering Competencies
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
            Verified skills backed by tangible production workflows, real-time agent deployments, and
            enterprise integrations.
          </p>
        </div>

        {/* 6 Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((category) => (
            <div
              key={category.title}
              className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80">
                  {getIcon(category.iconName)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {category.title}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">
                    {category.skills.length} core tools
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                {category.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/70"
                  >
                    <CheckCircle className="w-3 h-3 text-emerald-500 mr-1.5 shrink-0" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
