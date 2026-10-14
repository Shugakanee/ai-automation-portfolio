import React, { useState } from 'react';
import { siteConfig } from '../config/site';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [tooltipVisible, setTooltipVisible] = useState(true);

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center space-x-2.5 group">
      {/* WhatsApp Floating Action Button */}
      <a
        href={siteConfig.contact.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
        aria-label="Chat with Precious Achionye on WhatsApp"
      >
        {/* Pulsing halo */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none"></span>

        <MessageCircle className="w-7 h-7 text-white fill-white/20 relative z-10" />
      </a>

      {/* Tooltip speech bubble */}
      {tooltipVisible && (
        <div className="hidden sm:flex items-center space-x-2 px-3.5 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-xs font-medium text-slate-800 dark:text-slate-200 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Chat on WhatsApp</span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setTooltipVisible(false);
            }}
            className="p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full"
            aria-label="Dismiss WhatsApp hint"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};
