import { siteConfig } from '../config/site';

export interface ElevenLabsCallResult {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Checks if ElevenLabs provider and agent ID are configured
 */
export const isElevenLabsConfigured = (): boolean => {
  const provider = siteConfig.integrations.voiceAgent.provider;
  const publicId = siteConfig.integrations.voiceAgent.publicId;
  return provider === 'elevenlabs' && Boolean(publicId && publicId.trim().length > 0);
};

/**
 * Returns configured ElevenLabs Agent ID
 */
export const getElevenLabsAgentId = (): string => {
  return siteConfig.integrations.voiceAgent.publicId || '';
};

/**
 * Triggers the ElevenLabs Conversational AI voice session
 * using the official widget's programmatic interface or fallback launcher trigger.
 */
export const startElevenLabsConversation = async (): Promise<ElevenLabsCallResult> => {
  const agentId = getElevenLabsAgentId();

  if (!agentId) {
    return {
      success: false,
      error: 'AGENT_ID_MISSING',
      message: 'ElevenLabs Agent ID is missing. Please configure VITE_VOICE_AGENT_PUBLIC_ID in .env.',
    };
  }

  // Find the custom element
  const widget = document.querySelector('elevenlabs-convai') as any;

  if (!widget) {
    console.warn('[ElevenLabs] elevenlabs-convai element not found in DOM.');
    return {
      success: false,
      error: 'WIDGET_NOT_FOUND',
      message:
        'ElevenLabs widget element is not ready on the page. Please ensure you allow unpkg scripts or disable content blockers.',
    };
  }

  // 1. Try native method if provided by ElevenLabs widget wrapper
  if (typeof widget.startConversation === 'function') {
    try {
      await widget.startConversation();
      return { success: true, message: 'Voice conversation initiated.' };
    } catch (err: any) {
      console.warn('[ElevenLabs] widget.startConversation() error:', err);
    }
  }

  // 2. Fallback: Pierce open shadowRoot to find the start/call button
  try {
    if (widget.shadowRoot) {
      const button = widget.shadowRoot.querySelector('button');
      if (button) {
        button.click();
        return { success: true, message: 'Voice session launched via widget button.' };
      }
    }

    // 3. Fallback: Trigger direct click on widget element
    widget.click();
    return { success: true, message: 'Widget click event dispatched.' };
  } catch (err: any) {
    console.error('[ElevenLabs] Error triggering widget click:', err);
    return {
      success: false,
      error: 'CALL_FAILED',
      message: err?.message || 'Failed to trigger ElevenLabs voice conversation.',
    };
  }
};

/**
 * Programmatically ends an active ElevenLabs conversation if supported
 */
export const endElevenLabsConversation = (): boolean => {
  const widget = document.querySelector('elevenlabs-convai') as any;
  if (!widget) return false;

  if (typeof widget.endConversation === 'function') {
    try {
      widget.endConversation();
      return true;
    } catch (err) {
      console.warn('[ElevenLabs] endConversation() error:', err);
    }
  }

  if (widget.shadowRoot) {
    const endButton = widget.shadowRoot.querySelector(
      'button[aria-label*="End"], button[title*="End"], button.end-call'
    );
    if (endButton) {
      (endButton as HTMLButtonElement).click();
      return true;
    }
  }

  return false;
};
