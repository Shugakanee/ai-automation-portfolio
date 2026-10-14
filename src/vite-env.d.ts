/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_N8N_CONTACT_WEBHOOK_URL: string;
  readonly VITE_VOICE_AGENT_PROVIDER: string;
  readonly VITE_VOICE_AGENT_PUBLIC_ID: string;
  readonly VITE_VOICE_AGENT_PHONE_NUMBER: string;
  readonly VITE_VOICE_CALL_ENDPOINT: string;
  readonly VITE_TIKTOK_URL: string;
  readonly VITE_GITHUB_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace JSX {
  interface IntrinsicElements {
    'elevenlabs-convai': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        'agent-id': string;
        variant?: 'compact' | 'expanded';
        placement?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
        'action-text'?: string;
        'start-call-text'?: string;
        'end-call-text'?: string;
        'avatar-image-url'?: string;
        'avatar-orb-color-1'?: string;
        'avatar-orb-color-2'?: string;
        'default-expanded'?: boolean | string;
        'always-expanded'?: boolean | string;
        dismissible?: boolean | string;
      },
      HTMLElement
    >;
  }
}
