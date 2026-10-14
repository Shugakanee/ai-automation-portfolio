export interface Service {
  id: string;
  name: string;
  shortDescription: string;
  deliverables: string[];
  iconName: string;
  formServiceValue: string;
}

export const servicesData: Service[] = [
  {
    id: "ai-agent-development",
    name: "AI Agent Development",
    shortDescription:
      "Autonomous AI agents that execute reasoning, invoke tools, extract structured data, and interface with business systems.",
    deliverables: [
      "Task-specific autonomous agent architectures",
      "Function and tool-calling integration",
      "Deterministic structured output parsing",
      "Memory, conversation context, and guardrails",
    ],
    iconName: "Bot",
    formServiceValue: "AI Agent Development",
  },
  {
    id: "ai-voice-agent-development",
    name: "AI Voice Agent Development",
    shortDescription:
      "Conversational voice agents capable of handling inbound customer calls, lead screening, and automated voice workflows.",
    deliverables: [
      "Ultra-low latency speech pipelines (STT & TTS)",
      "Interactive voice response (IVR) replacement",
      "Mid-call tool-calling & CRM webhook dispatch",
      "Browser voice widgets and telephony routing",
    ],
    iconName: "PhoneCall",
    formServiceValue: "AI Voice Agent Development",
  },
  {
    id: "n8n-workflow-automation",
    name: "n8n Workflow Automation",
    shortDescription:
      "Complex multi-stage automated workflows connecting business apps, webhooks, databases, and scheduled processes.",
    deliverables: [
      "Custom self-hosted or cloud n8n orchestrations",
      "Robust error handling and retry mechanisms",
      "Conditional branching and data transformation",
      "Scheduled triggers and asynchronous webhooks",
    ],
    iconName: "Workflow",
    formServiceValue: "Workflow Automation",
  },
  {
    id: "crm-integration-lead-management",
    name: "CRM Integration & Lead Management",
    shortDescription:
      "Automated lead capture, validation, qualification scoring, and real-time synchronization across CRM platforms.",
    deliverables: [
      "Instant multi-channel lead ingestion pipelines",
      "AI-driven lead qualification & enrichment",
      "Google Sheets, HubSpot, or custom CRM sync",
      "Automated notification triggers for sales reps",
    ],
    iconName: "Users",
    formServiceValue: "CRM Integration",
  },
  {
    id: "rest-api-json-integration",
    name: "REST API & JSON Integration",
    shortDescription:
      "Bridging siloed software through custom HTTP integrations, webhook listeners, and normalized data pipelines.",
    deliverables: [
      "Secure OAuth2 and API key authentication flows",
      "JSON payload mapping and sanitization",
      "Third-party software interoperability",
      "Rate-limit handling and webhook reliability",
    ],
    iconName: "Code2",
    formServiceValue: "API Integration",
  },
  {
    id: "ai-customer-support-chatbots",
    name: "AI Customer Support Chatbots",
    shortDescription:
      "24/7 intelligent support chatbots grounded in company documentation to resolve customer inquiries accurately.",
    deliverables: [
      "Context-grounded FAQ answering",
      "Hallucination prevention guardrails",
      "Human-in-the-loop escalation paths",
      "Embeddable modern web chat interfaces",
    ],
    iconName: "MessageSquare",
    formServiceValue: "AI Customer Support Chatbot",
  },
  {
    id: "knowledge-base-vector-store",
    name: "Knowledge Base & Vector Store Integration",
    shortDescription:
      "Retrieval-Augmented Generation (RAG) pipelines utilizing vector databases to provide LLMs with proprietary company context.",
    deliverables: [
      "Supabase pgvector / vector store setup",
      "Document ingestion, chunking, and embedding",
      "Semantic similarity search optimization",
      "Dynamic prompt injection and context ranking",
    ],
    iconName: "Database",
    formServiceValue: "Knowledge Base and Vector Store Integration",
  },
  {
    id: "python-automation-data-processing",
    name: "Python Automation & Data Processing",
    shortDescription:
      "Tailored Python automation scripts for data extraction, automated file parsing, report generation, and system operations.",
    deliverables: [
      "Automated ETL and tabular data processing",
      "Custom web scrapers and feed parsers",
      "Headless browser and document generation scripts",
      "Scheduled background worker scripts",
    ],
    iconName: "Terminal",
    formServiceValue: "Python Automation",
  },
  {
    id: "email-business-process-automation",
    name: "Email & Business Process Automation",
    shortDescription:
      "Intelligent email parsing, automated drafting, personalized nurture sequences, and administrative task elimination.",
    deliverables: [
      "Inbound email classification and routing",
      "Dynamic HTML email generation and delivery",
      "Multi-stage automated nurture sequences",
      "Administrative overhead reduction",
    ],
    iconName: "Mail",
    formServiceValue: "Email Automation",
  },
  {
    id: "multi-agent-ai-systems",
    name: "Multi-Agent AI Systems",
    shortDescription:
      "Collaborative agent networks where specialized subagents handle distinct business responsibilities under a supervisor router.",
    deliverables: [
      "Supervisor / Router orchestration architecture",
      "Inter-agent messaging and state management",
      "Domain-specific specialist agent delegation",
      "Unified synthesis of distributed responses",
    ],
    iconName: "Network",
    formServiceValue: "Multi-Agent Systems",
  },
];
