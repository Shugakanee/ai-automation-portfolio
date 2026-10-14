/**
 * Centralized Portfolio Configuration
 * Update this single file to change branding, personal details, contact info,
 * social media links, and automation integration endpoints.
 */

export interface SiteConfig {
  personal: {
    name: string;
    professionalTitle: string;
    headline: string;
    supportingDescription: string;
    aboutText: string;
  };
  contact: {
    email: string;
    emailLink: string;
    whatsappNumber: string;
    whatsappBaseUrl: string;
    whatsappDefaultMessage: string;
    whatsappUrl: string;
    linkedinUrl: string;
    tiktokUrl: string;
    githubUrl: string;
  };
  integrations: {
    n8nContactWebhookUrl: string;
    voiceAgent: {
      provider: 'elevenlabs' | 'vapi' | 'browser' | 'custom';
      publicId: string;
      phoneNumber: string;
      callEndpoint: string;
    };
  };
  navigation: {
    label: string;
    href: string;
  }[];
}

const whatsappMessage = "Hello, I visited your portfolio and would like to discuss an AI automation project.";
const encodedWhatsAppMsg = encodeURIComponent(whatsappMessage);

export const siteConfig: SiteConfig = {
  personal: {
    name: "Precious Achionye",
    professionalTitle: "AI Automation Engineer & Specialist",
    headline: "I Build Intelligent AI Agents, Automated Workflows & Connected Business Systems.",
    supportingDescription:
      "I design and build AI agents, CRM integrations, intelligent workflow automations, API-connected systems, and Python-powered solutions that help businesses eliminate repetitive tasks, improve customer experiences, and operate more efficiently.",
    aboutText:
      "I am an AI Automation Engineer and Specialist focused on building intelligent workflows, AI agents, API integrations, CRM automation systems, and Python-powered solutions. I enjoy solving business problems by connecting applications, automating repetitive processes, and designing practical AI systems that improve productivity and customer experience.",
  },
  contact: {
    email: "chimezieachionye@gmail.com",
    emailLink: "mailto:chimezieachionye@gmail.com",
    whatsappNumber: "2349135523468",
    whatsappBaseUrl: "https://wa.me/2349135523468",
    whatsappDefaultMessage: whatsappMessage,
    whatsappUrl: `https://wa.me/2349135523468?text=${encodedWhatsAppMsg}`,
    linkedinUrl: "https://linkedin.com/in/precious-achionye-439906357",
    // Configurable profile URLs - not invented, leave empty or set via environment variable
    tiktokUrl: (import.meta.env.VITE_TIKTOK_URL as string) || "",
    githubUrl: (import.meta.env.VITE_GITHUB_URL as string) || "https://github.com/Shugakanee",
  },
  integrations: {
    // Configured via VITE_N8N_CONTACT_WEBHOOK_URL
    n8nContactWebhookUrl: (import.meta.env.VITE_N8N_CONTACT_WEBHOOK_URL as string) || "",
    voiceAgent: {
      // 'elevenlabs', 'vapi', 'browser', or 'custom'
      provider: ((import.meta.env.VITE_VOICE_AGENT_PROVIDER as string) || "browser") as 'elevenlabs' | 'vapi' | 'browser' | 'custom',
      publicId: (import.meta.env.VITE_VOICE_AGENT_PUBLIC_ID as string) || "",
      phoneNumber: (import.meta.env.VITE_VOICE_AGENT_PHONE_NUMBER as string) || "",
      callEndpoint: (import.meta.env.VITE_VOICE_CALL_ENDPOINT as string) || "",
    },
  },
  navigation: [
    { label: "Home", href: "#hero" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Skills", href: "#skills" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
};
