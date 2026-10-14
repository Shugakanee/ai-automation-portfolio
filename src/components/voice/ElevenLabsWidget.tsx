import React, { useEffect, useState } from 'react';
import { siteConfig } from '../../config/site';

export const ElevenLabsWidget: React.FC = () => {
  const voiceConfig = siteConfig.integrations.voiceAgent;
  const isElevenLabs = voiceConfig.provider === 'elevenlabs';
  const agentId = voiceConfig.publicId;

  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!isElevenLabs || !agentId) return;

    // Check if script is already present in document
    const existingScript = document.querySelector(
      'script[src*="@elevenlabs/convai-widget-embed"]'
    );

    if (existingScript) {
      return;
    }

    // Dynamically inject script if not yet loaded
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';

    script.onerror = () => {
      console.error('[ElevenLabs] Failed to load @elevenlabs/convai-widget-embed script.');
      setLoadError('Failed to load ElevenLabs widget script from CDN.');
    };

    document.body.appendChild(script);

    return () => {
      // Keep script intact across lifecycle
    };
  }, [isElevenLabs, agentId]);

  // If ElevenLabs is not active or no agentId, do not render widget
  if (!isElevenLabs || !agentId) {
    return null;
  }

  return (
    <>
      {/* Official ElevenLabs Web Component Element */}
      <elevenlabs-convai
        agent-id={agentId}
        action-text="Talk to Precious's AI Voice Assistant"
        avatar-orb-color-1="#6366f1"
        avatar-orb-color-2="#06b6d4"
      />

      {loadError && (
        <div className="fixed bottom-4 right-4 z-50 p-3 bg-rose-900/90 text-white text-xs rounded-xl border border-rose-700 shadow-xl max-w-sm">
          <p className="font-bold">ElevenLabs Widget Notice</p>
          <p className="text-[11px] text-rose-200 mt-0.5">{loadError}</p>
        </div>
      )}
    </>
  );
};
