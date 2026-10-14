import React, { useEffect } from 'react';
import { VoiceAgentTester } from './voice/VoiceAgentTester';
import { X } from 'lucide-react';

interface VoiceAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceAgentModal: React.FC<VoiceAgentModalProps> = ({ isOpen, onClose }) => {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl my-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-3 -right-3 z-20 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 shadow-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          aria-label="Close Voice Agent Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Console Box */}
        <VoiceAgentTester />
      </div>
    </div>
  );
};
