import React from 'react';
import { servicesData } from '../data/services';
import {
  Bot,
  PhoneCall,
  Workflow,
  Users,
  Code2,
  MessageSquare,
  Database,
  Terminal,
  Mail,
  Network,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot':
        return <Bot className="w-6 h-6 text-blue-500" />;
      case 'PhoneCall':
        return <PhoneCall className="w-6 h-6 text-violet-500" />;
      case 'Workflow':
        return <Workflow className="w-6 h-6 text-amber-500" />;
      case 'Users':
        return <Users className="w-6 h-6 text-emerald-500" />;
      case 'Code2':
        return <Code2 className="w-6 h-6 text-cyan-500" />;
      case 'MessageSquare':
        return <MessageSquare className="w-6 h-6 text-indigo-500" />;
      case 'Database':
        return <Database className="w-6 h-6 text-blue-600" />;
      case 'Terminal':
        return <Terminal className="w-6 h-6 text-teal-500" />;
      case 'Mail':
        return <Mail className="w-6 h-6 text-rose-500" />;
      case 'Network':
      default:
        return <Network className="w-6 h-6 text-purple-500" />;
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-white dark:bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-md mb-3 border border-blue-200 dark:border-blue-800">
            <Workflow className="w-3.5 h-3.5" />
            <span>Specialized Offerings</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            AI Engineering & Automation Services
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base mt-2">
            Tailored technical solutions designed to eliminate repetitive operational bottlenecks, connect
            fragmented software, and launch autonomous AI agents.
          </p>
        </div>

        {/* 10 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="flex flex-col justify-between rounded-2xl p-6 bg-slate-50/70 dark:bg-navy-900/80 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/40 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div>
                {/* Icon & Title */}
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center mb-5 shadow-sm border border-slate-200 dark:border-slate-700/80 group-hover:scale-110 transition-transform">
                  {getIcon(service.iconName)}
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  {service.shortDescription}
                </p>

                {/* Deliverables */}
                <div className="space-y-2 mb-6">
                  <div className="text-[10px] font-mono font-bold uppercase text-slate-400">
                    Typical Deliverables:
                  </div>
                  {service.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Discuss This Service CTA */}
              <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => onSelectService(service.formServiceValue)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800/80 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center space-x-2 group-hover:border-blue-500 shadow-sm"
                >
                  <span>Discuss This Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
