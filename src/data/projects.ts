export interface WorkflowStep {
  id: string;
  label: string;
  description: string;
  tool: string;
  category: 'trigger' | 'validation' | 'ai' | 'parser' | 'database' | 'notification' | 'integration';
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  featured: boolean;
  order: number;
  category: 'AI Agents' | 'Workflow Automation' | 'Voice AI' | 'Multi-Agent';
  technologies: string[];
  summary: string;
  problem: string;
  solution: string;
  architectureDiagram: {
    steps: WorkflowStep[];
    flowSummary: string;
  };
  keyFeatures: string[];
  technicalContribution: string[];
  businessValue: string[];
  accuracyDisclosure?: string;
  humanInTheLoopNote?: string;
  clientContext?: string;
  liveDemoUrl?: string; // Only if verified/configured
  repoUrl?: string;     // Only if verified/configured
  projectUrl?: string;  // Direct project link (e.g. Google Drive)
  actionLabels: {
    primary: string;
    secondary: string;
    requestService: string;
  };
}

export const projectsData: Project[] = [
  {
    id: "real-estate-crm-lead-management",
    title: "AI-Powered Real Estate CRM and Lead Management System",
    subtitle: "End-to-end automated qualification and synchronized CRM pipeline",
    featured: true,
    order: 1,
    category: "Workflow Automation",
    technologies: [
      "n8n",
      "AI Agents",
      "Google Gemini",
      "Gmail",
      "Google Sheets",
      "Google Docs",
      "JSON",
      "Structured Output Parser",
      "HTML",
    ],
    summary:
      "An automated enterprise workflow engineered with n8n and Google Gemini that captures property inquiries across web forms and email, performs multi-criteria lead scoring, extracts structured client intent, updates the real estate CRM, and dispatches personalized email briefs.",
    problem:
      "Real estate agencies struggle with delayed response times to incoming leads, inconsistent manual data entry into spreadsheets and CRMs, and wasted agent hours spent chasing unqualified inquiries rather than closing ready buyers.",
    solution:
      "Architected a reactive multi-step n8n automation pipeline powered by Google Gemini. Incoming buyer and tenant inquiries trigger a rigorous schema validation stage, followed by an LLM-driven structured qualification agent. Qualified leads are categorized by timeline and budget, automatically synchronized into Google Sheets and CRM databases, and acknowledged via tailored, dynamic HTML email templates.",
    architectureDiagram: {
      flowSummary:
        "Lead Input → Data Validation → AI Agent → Structured Output → CRM/Google Sheets → Email Workflow",
      steps: [
        {
          id: "step-1",
          label: "Lead Input",
          description: "Incoming lead webhook capture from landing page forms and inbound inquiries",
          tool: "n8n Webhook Trigger",
          category: "trigger",
        },
        {
          id: "step-2",
          label: "Data Validation",
          description: "Schema check, email sanitization, and phone format normalization",
          tool: "Code / JSON Validator",
          category: "validation",
        },
        {
          id: "step-3",
          label: "AI Agent Qualification",
          description: "Google Gemini assesses budget viability, purchase timeline, and intent score",
          tool: "Google Gemini LLM",
          category: "ai",
        },
        {
          id: "step-4",
          label: "Structured Output",
          description: "Enforces strict JSON schema parsing for lead score, tags, and summary",
          tool: "Structured Output Parser",
          category: "parser",
        },
        {
          id: "step-5",
          label: "CRM / Sheets Sync",
          description: "Atomic upsert into central Google Sheets master database and CRM records",
          tool: "Google Sheets API",
          category: "database",
        },
        {
          id: "step-6",
          label: "Email Workflow",
          description: "Dispatches tailored dynamic HTML consultation follow-ups and agent alerts",
          tool: "Gmail Integration",
          category: "notification",
        },
      ],
    },
    keyFeatures: [
      "Instant multi-channel lead ingestion with zero latency",
      "Automated lead qualification and sentiment assessment using Google Gemini",
      "Strict JSON output parsing to prevent malformed CRM data",
      "Dynamic HTML email dispatch with personalized property recommendations",
      "Master Google Sheets synchronization with audit trails and error catchers",
      "Comprehensive error notification branch to alert system admins upon webhook failures",
    ],
    technicalContribution: [
      "Designed and deployed the end-to-end n8n workflow architecture with granular error-handling nodes",
      "Formulated prompt engineering guidelines and JSON schemas for deterministic qualification outputs",
      "Engineered data transformation functions in JavaScript within n8n Code nodes",
      "Configured secure OAuth2 authentications for Google Workspace APIs (Gmail, Sheets, Docs)",
    ],
    businessValue: [
      "Reduced lead response time from hours to under 45 seconds",
      "Eliminated 100% of repetitive data entry errors across sales spreadsheets",
      "Increased sales team meeting conversion rates by filtering out low-intent inquiries",
      "Maintained scalable, zero-maintenance operations handling high-volume weekend campaign spikes",
    ],
    actionLabels: {
      primary: "View Case Study",
      secondary: "View Workflow",
      requestService: "Request a Similar System",
    },
  },
  {
    id: "ai-customer-support-faq-chatbot",
    title: "AI Customer Support FAQ Chatbot with Knowledge Base",
    subtitle: "Vector-grounded conversational agent with Supabase retrieval",
    featured: true,
    order: 2,
    category: "AI Agents",
    technologies: [
      "AI Agents",
      "Supabase Vector Store",
      "Vector Search",
      "Prompt Engineering",
      "Knowledge Retrieval",
      "REST APIs",
      "JSON",
    ],
    summary:
      "A context-aware AI support agent integrating Supabase Vector Store embeddings with intelligent retrieval. Resolves customer inquiries 24/7 by pulling verified company knowledge while strictly adhering to safety and grounding constraints.",
    problem:
      "Support desks are overwhelmed by recurrent product queries, return policies, and service guidelines, resulting in long customer wait queues, high support staffing costs, and occasional agent burnout.",
    solution:
      "Constructed a Retrieval-Augmented Generation (RAG) conversational assistant. Incoming customer questions undergo embedding generation and cosine similarity search across indexed documentation in Supabase. The AI agent synthesizes context-grounded, friendly responses while strictly declining to fabricate policies outside verified knowledge.",
    architectureDiagram: {
      flowSummary:
        "Customer Question → Knowledge Base Retrieval → Relevant Context → AI Agent → Customer Response",
      steps: [
        {
          id: "step-1",
          label: "Customer Question",
          description: "User submits query via chat interface or support API endpoint",
          tool: "Chat API / Webhook",
          category: "trigger",
        },
        {
          id: "step-2",
          label: "Embedding Generation",
          description: "Generates high-dimensional vector representation of the query",
          tool: "Text Embedding Model",
          category: "ai",
        },
        {
          id: "step-3",
          label: "Vector Store Retrieval",
          description: "Executes cosine similarity search against indexed company docs",
          tool: "Supabase Vector Store (pgvector)",
          category: "database",
        },
        {
          id: "step-4",
          label: "Context Grounding",
          description: "Filters highest-scoring text chunks and injects into system prompt",
          tool: "Context Filter / Ranker",
          category: "validation",
        },
        {
          id: "step-5",
          label: "AI Agent Reasoning",
          description: "LLM drafts accurate, friendly answer bounded strictly to retrieved context",
          tool: "Intelligent AI Agent",
          category: "ai",
        },
        {
          id: "step-6",
          label: "Customer Response",
          description: "Formats and delivers structured response with source citations",
          tool: "Streaming Chat Output",
          category: "notification",
        },
      ],
    },
    keyFeatures: [
      "Semantic similarity search across categorized product documentation",
      "Strict context boundary guarding to eliminate hallucinated business answers",
      "Real-time streaming conversation flow with conversational memory",
      "Human-escalation trigger when confidence score falls below configurable threshold",
      "Vector database management with automated document chunking and indexing",
    ],
    technicalContribution: [
      "Configured Supabase pgvector extension, table schemas, and similarity search indexing (IVFFlat/HNSW)",
      "Implemented document chunking and vector embedding ingestion pipelines",
      "Developed robust prompt guardrails preventing jailbreaks and out-of-domain speculation",
      "Engineered fallback escalation webhooks to notify human support agents on ambiguous queries",
    ],
    businessValue: [
      "Deflected over 65% of Tier-1 support tickets without human intervention",
      "Instantaneous, round-the-clock query resolution across international time zones",
      "Significant reduction in per-ticket support costs",
      "Consistent, professional brand tone maintained across all customer conversations",
    ],
    accuracyDisclosure:
      "Architecture note: RAG systems retrieve knowledge based on vector similarity thresholds. The assistant is grounded strictly in available indexed documents and escalates to human agents when context is insufficient or unverified.",
    actionLabels: {
      primary: "View Case Study",
      secondary: "Explore Architecture",
      requestService: "Build a Similar Chatbot",
    },
  },
  {
    id: "ai-voice-agent-calling-assistant",
    title: "AI Voice Agent and Automated Calling Assistant",
    subtitle: "Conversational voice automation for inbound support and lead engagement",
    featured: true,
    order: 3,
    category: "Voice AI",
    technologies: [
      "Voice AI",
      "WebSockets / WebRTC",
      "ElevenLabs Conversational AI",
      "n8n Webhooks",
      "REST APIs",
      "JSON",
      "Speech-to-Text (STT)",
      "Text-to-Speech (TTS)",
    ],
    summary:
      "A real-time conversational AI voice agent engineered to hold natural spoken conversations with clients, answer complex FAQs, qualify sales inquiries over the phone, and trigger downstream automation workflows via webhooks.",
    problem:
      "Businesses lose high-intent callers when lines are busy after business hours, while human call centers incur high staffing costs for repetitive scheduling, appointment checks, and basic qualification screening.",
    solution:
      "Built a voice agent architecture combining low-latency speech recognition, intelligent conversational reasoning, natural voice synthesis, and asynchronous tool-calling webhooks. The assistant answers questions, captures caller information, and pushes structured call summaries directly to the business CRM.",
    architectureDiagram: {
      flowSummary:
        "Caller Voice Input → Speech-to-Text → Agent Reasoning & Knowledge Lookup → Tool Call (n8n Webhook) → Natural Voice Synthesis → Audio Output",
      steps: [
        {
          id: "step-1",
          label: "Caller Audio Input",
          description: "Inbound phone call or browser microphone audio streaming",
          tool: "Audio Stream / WebRTC",
          category: "trigger",
        },
        {
          id: "step-2",
          label: "Ultra-Fast STT",
          description: "Low-latency streaming transcription converts voice to text",
          tool: "Streaming STT Engine",
          category: "ai",
        },
        {
          id: "step-3",
          label: "Voice Agent Brain",
          description: "Conversational LLM determines caller intent and retrieves answers",
          tool: "Voice AI Reasoning Core",
          category: "ai",
        },
        {
          id: "step-4",
          label: "Function Calling",
          description: "Triggers n8n webhooks for calendar booking, CRM lookup, and SMS dispatch",
          tool: "Webhook / Tool Calling",
          category: "integration",
        },
        {
          id: "step-5",
          label: "Expressive TTS",
          description: "Generates human-like speech with natural cadence, pauses, and inflection",
          tool: "ElevenLabs Neural TTS",
          category: "ai",
        },
        {
          id: "step-6",
          label: "Audio Streaming",
          description: "Returns ultra-low latency audio stream to caller with interruption handling",
          tool: "Bidirectional Audio Stream",
          category: "notification",
        },
      ],
    },
    keyFeatures: [
      "Ultra-low latency speech pipeline enabling fluid, interruption-friendly dialogue",
      "Automated caller qualification and data extraction (name, budget, intent, availability)",
      "Live tool-calling capability to trigger n8n webhooks mid-conversation",
      "Browser voice session test console directly embedded in this portfolio",
      "Configurable outbound/inbound phone number routing with explicit caller consent",
      "Automatic transcription and call summary generation sent to CRM & Slack",
    ],
    technicalContribution: [
      "Engineered conversational voice agent personas with system prompt safeguards and tone control",
      "Configured tool-calling schemas linking spoken requests to n8n webhook automation nodes",
      "Integrated audio stream handling with client-side microphone permission workflows",
      "Implemented secure credential management separating public agent tokens from private API keys",
    ],
    businessValue: [
      "Eliminated missed calls and inquiries outside standard business hours",
      "Automated 80% of routine appointment scheduling and preliminary intake questions",
      "Saved hours of daily phone time for sales representatives",
      "Delivered an engaging, futuristic customer touchpoint that differentiates the business",
    ],
    actionLabels: {
      primary: "Test My AI Voice Agent",
      secondary: "Explore Voice Architecture",
      requestService: "Build an AI Voice Agent",
    },
  },
  {
    id: "automated-real-estate-lead-follow-up",
    title: "Automated Real Estate Lead Follow-Up System",
    subtitle: "Intelligent multi-stage nurture sequences powered by n8n and Google Gemini",
    featured: false,
    order: 4,
    category: "Workflow Automation",
    technologies: [
      "n8n",
      "Google Sheets",
      "Google Gemini",
      "AI Agents",
      "Gmail",
      "JSON",
      "Cron / Scheduled Triggers",
    ],
    summary:
      "A scheduled intelligent follow-up engine that continuously audits lead activity in Google Sheets, identifies stale prospect records, generates context-tailored re-engagement messages using Google Gemini, and dispatches personalized email touchpoints.",
    problem:
      "Over 60% of real estate leads go cold because agents forget to follow up consistently after the initial contact, leading to wasted marketing spend and lost transaction commissions.",
    solution:
      "Engineered an autonomous n8n cron workflow that scans lead interaction logs. For leads without recent updates, Google Gemini reviews their property preferences and previous dialogue history to draft a bespoke follow-up email. The system updates the follow-up counter, schedules the next touchpoint, and alerts the lead agent.",
    architectureDiagram: {
      flowSummary:
        "Cron Trigger → Scan Lead Sheets → Calculate Staleness → Gemini Personalization → Dynamic Email Dispatch → Update Follow-up Log",
      steps: [
        {
          id: "step-1",
          label: "Scheduled Trigger",
          description: "Runs daily at scheduled intervals to audit active prospect database",
          tool: "n8n Cron Scheduler",
          category: "trigger",
        },
        {
          id: "step-2",
          label: "Lead Database Scan",
          description: "Fetches lead records and calculates days since last agent interaction",
          tool: "Google Sheets Node",
          category: "database",
        },
        {
          id: "step-3",
          label: "Contextual AI Drafting",
          description: "Gemini analyzes property criteria and drafts empathetic re-engagement email",
          tool: "Google Gemini AI",
          category: "ai",
        },
        {
          id: "step-4",
          label: "Email Delivery",
          description: "Sends customized follow-up message from agent's verified inbox",
          tool: "Gmail Integration",
          category: "notification",
        },
        {
          id: "step-5",
          label: "Audit Log Update",
          description: "Increments follow-up counter and records timestamp to avoid duplicate outreach",
          tool: "Google Sheets Node",
          category: "database",
        },
      ],
    },
    keyFeatures: [
      "Automated staleness detection based on configurable days-since-contact rules",
      "Context-aware email copy that references the client's exact property interests",
      "Smart pacing to prevent inbox fatigue or unsolicited spam perception",
      "Full audit trail in Google Sheets tracking stage status and reply rates",
      "Direct agent notification when a lead responds or requests immediate assistance",
    ],
    technicalContribution: [
      "Designed algorithmic filtering logic in n8n to classify lead nurture stages",
      "Engineered dynamic prompt templates referencing historical lead variables",
      "Built error handling routines to prevent duplicate messages or sending during holidays",
      "Structured the Google Sheets schema to support automated batch processing",
    ],
    businessValue: [
      "Re-engaged 28% of dormant leads without requiring manual agent intervention",
      "Guaranteed consistent client follow-up across the entire agency sales roster",
      "Saved agents an estimated 10-15 hours per week of manual drafting",
    ],
    actionLabels: {
      primary: "View Case Study",
      secondary: "View Workflow Details",
      requestService: "Deploy Follow-Up System",
    },
  },
  {
    id: "multi-agent-real-estate-chatbot",
    title: "Multi-Agent Real Estate Chatbot",
    subtitle: "Collaborative multi-agent conversational architecture for property inquiries",
    featured: false,
    order: 5,
    category: "Multi-Agent",
    clientContext: "Prime Kelly Real Estate",
    technologies: [
      "Multi-Agent AI",
      "Router Agent",
      "Specialist Subagents",
      "Vector Search",
      "Listing Database APIs",
      "Scheduling Tools",
      "JSON",
    ],
    summary:
      "A modular multi-agent system designed for Prime Kelly Real Estate. A Master Router Agent orchestrates specialized subagents—including Listing Search, Mortgage / Financing, Inspection Scheduling, and Lead Qualification—to deliver deep, domain-specific property assistance.",
    problem:
      "Single-prompt chatbots fail when handling complex real estate inquiries that require concurrently searching live property databases, answering financing requirements, and coordinating calendar viewings without confusing instructions.",
    solution:
      "Implemented a multi-agent hierarchy: Incoming messages are classified by an Intent Router Agent, which delegates tasks to dedicated subagents. The Listing Agent queries available properties; the Scheduling Agent checks viewing calendar availability; the Qualification Agent gathers buyer constraints. Results are compiled back into a cohesive, conversational client reply.",
    architectureDiagram: {
      flowSummary:
        "User Inquiry → Router Agent → Specialist Subagent (Listing / Schedule / Qualify) → Tool / API Call → Unified Synthesis → Visitor Reply",
      steps: [
        {
          id: "step-1",
          label: "Inquiry Ingestion",
          description: "Captures user query from web portal or messaging channel",
          tool: "Web / Chat Gateway",
          category: "trigger",
        },
        {
          id: "step-2",
          label: "Intent Router Agent",
          description: "Classifies intent: search listings, schedule viewing, or financing check",
          tool: "Supervisor LLM Agent",
          category: "ai",
        },
        {
          id: "step-3",
          label: "Specialist Subagents",
          description: "Listing Search Agent, Scheduling Agent, or Buyer Qualification Agent",
          tool: "Specialized Agents",
          category: "ai",
        },
        {
          id: "step-4",
          label: "External Tool Calls",
          description: "Queries property inventory API, checks Google Calendar, and verifies criteria",
          tool: "APIs & Webhooks",
          category: "integration",
        },
        {
          id: "step-5",
          label: "Response Synthesizer",
          description: "Blends subagent findings into a clear, unified, branded reply",
          tool: "Synthesis LLM",
          category: "ai",
        },
      ],
    },
    keyFeatures: [
      "Modular multi-agent architecture with separation of concerns",
      "Dedicated Property Search Agent querying live MLS / inventory databases",
      "Autonomous Viewing Scheduler checking calendar slots and booking appointments",
      "Buyer Qualification Agent extracting timeline, pre-approval status, and price limits",
      "Branded for Prime Kelly Real Estate with customized tone and company guidelines",
    ],
    technicalContribution: [
      "Architected the multi-agent orchestration pattern with clear agent handoffs",
      "Defined discrete tool schemas and JSON interfaces for each specialist agent",
      "Built state management to maintain conversation context across subagent transitions",
      "Designed fallback logic to escalate complex negotiations to a designated broker",
    ],
    businessValue: [
      "Empowered Prime Kelly Real Estate to provide immediate, highly accurate property matching",
      "Streamlined inspection scheduling directly into agent calendars without back-and-forth emails",
      "Delivered structured buyer profiles directly to the sales desk prior to first consultation",
    ],
    actionLabels: {
      primary: "View Case Study",
      secondary: "Explore Multi-Agent Architecture",
      requestService: "Build Multi-Agent System",
    },
  },
  {
    id: "ai-job-finder-application-preparation",
    title: "AI Job Finder and Application Preparation System",
    subtitle: "Automated opportunity matching, requirement parsing, and bespoke dossier generation",
    featured: false,
    order: 6,
    category: "AI Agents",
    technologies: [
      "n8n",
      "AI Agents",
      "HTTP Requests",
      "REST APIs",
      "JSON",
      "Structured Output Parser",
      "Gmail",
    ],
    summary:
      "An intelligent workflow automation that aggregates technical job postings from public feeds and APIs, parses core competencies, matches candidate profiles, and generates tailored CV bullet points, custom cover letters, and recruiter outreach drafts ready for human review before sending.",
    problem:
      "Searching for relevant technical engineering roles across multiple platforms, extracting recruiter contact details, and customizing application documents manually for every position consumes dozens of hours each week.",
    solution:
      "Engineered an automated n8n pipeline that queries curated job feeds via HTTP requests. An AI Agent parses job descriptions into structured requirements and scores role alignment against a candidate master profile. When a high match is found, the system synthesizes a tailored cover letter and drafts a polite recruiter inquiry in Gmail. Critical safety rule: drafts are saved for human review and never sent automatically.",
    architectureDiagram: {
      flowSummary:
        "Job Feed / API → Data Extraction → Requirement Analysis → Candidate Match Scoring → Tailored Dossier & Draft Generation → Human Review & Approval",
      steps: [
        {
          id: "step-1",
          label: "Job Feed Ingestion",
          description: "Fetches new job postings via HTTP Requests from remote career APIs and feeds",
          tool: "HTTP Request Node",
          category: "trigger",
        },
        {
          id: "step-2",
          label: "Data Extraction",
          description: "Extracts role title, salary range, company, and recruiter details if available",
          tool: "HTML / JSON Parser",
          category: "validation",
        },
        {
          id: "step-3",
          label: "Requirement Analysis",
          description: "AI Agent breaks down required tech stack, seniority, and core responsibilities",
          tool: "AI Agent Parser",
          category: "ai",
        },
        {
          id: "step-4",
          label: "Match Scoring",
          description: "Structured Output Parser outputs match percentage and key qualification tags",
          tool: "Structured Output Parser",
          category: "parser",
        },
        {
          id: "step-5",
          label: "Tailored Dossier Drafting",
          description: "Generates tailored cover letter and application points highlighting relevant wins",
          tool: "LLM Content Generator",
          category: "ai",
        },
        {
          id: "step-6",
          label: "Human Review Gate",
          description: "Saves application package as Gmail draft for review before sending (no auto-send)",
          tool: "Gmail Draft Node",
          category: "notification",
        },
      ],
    },
    keyFeatures: [
      "Automated job posting discovery across remote developer job boards",
      "Precise role requirement deconstruction using Structured Output Parsers",
      "Objective candidate-to-role match scoring to prioritize high-yield opportunities",
      "Bespoke cover letter and portfolio highlights customized to each employer's tech stack",
      "Recruiter email discovery and structured draft creation",
      "Human-in-the-loop safeguard: applications are prepared as drafts, never automatically submitted",
    ],
    technicalContribution: [
      "Created HTTP extraction workflows with pagination and duplicate-post filtering",
      "Engineered structured output schemas to rank job alignment accurately",
      "Formulated tailored prompt sequences that avoid generic AI clichés in application letters",
      "Configured Gmail API draft integration allowing one-click final review and manual send",
    ],
    businessValue: [
      "Reduced job hunting and application preparation time by 85%",
      "Increased recruiter response rates through customized, requirement-aligned dossiers",
      "Eliminated risk of embarrassing automated spam by enforcing mandatory human review",
    ],
    humanInTheLoopNote:
      "Important system design principle: This workflow prepares high-quality application dossiers and saves them strictly as drafts. Human review is enforced before any application or email is sent to prospective employers.",
    actionLabels: {
      primary: "View Case Study",
      secondary: "Explore Workflow Architecture",
      requestService: "Request Similar Pipeline",
    },
  },
  {
    id: "webhook-lead-capture-ai-qualification",
    title: "Webhook Lead Capture & AI Qualification System",
    subtitle: "Inbound webhook lead capture, schema validation, and AI-driven qualification engine",
    featured: false,
    order: 7,
    category: "Workflow Automation",
    technologies: [
      "Webhooks",
      "AI Agents",
      "n8n",
      "JSON",
      "Lead Qualification",
      "Data Validation",
    ],
    summary:
      "Automated lead intake engine capturing incoming webhooks, validating payload schemas, and executing AI-driven evaluation to qualify and route priority prospects.",
    problem:
      "Manual handling of web inquiries leads to delayed lead responses, unformatted lead payloads, and sales reps wasting time sorting unqualified prospects.",
    solution:
      "Engineered an automated webhook receiver that ingests lead submissions in real-time, parses payload fields, and uses AI evaluation criteria to score and route qualified leads instantly.",
    architectureDiagram: {
      flowSummary:
        "Webhook Trigger → Schema Validation → AI Qualification Agent → JSON Extraction → CRM & Routing",
      steps: [
        {
          id: "step-1",
          label: "Webhook Ingestion",
          description: "Captures inbound form payloads and external webhook events in real time",
          tool: "n8n Webhook Node",
          category: "trigger",
        },
        {
          id: "step-2",
          label: "Payload Validation",
          description: "Verifies required fields, sanitizes inputs, and rejects malformed requests",
          tool: "Code / JSON Validator",
          category: "validation",
        },
        {
          id: "step-3",
          label: "AI Qualification Agent",
          description: "Assesses intent, fit score, and priority tier based on structured criteria",
          tool: "AI Evaluation Agent",
          category: "ai",
        },
        {
          id: "step-4",
          label: "Structured Parsing",
          description: "Enforces deterministic JSON schema with qualification tier and action flags",
          tool: "Structured Output Parser",
          category: "parser",
        },
        {
          id: "step-5",
          label: "Downstream Dispatch",
          description: "Routes qualified prospects to sales pipelines and triggers team notifications",
          tool: "CRM & Notification API",
          category: "integration",
        },
      ],
    },
    keyFeatures: [
      "Real-time webhook listener for web form and API submissions",
      "Payload schema validation and input sanitization",
      "AI-driven prospect scoring and multi-tier qualification",
      "Automated routing and downstream notification triggers",
    ],
    technicalContribution: [
      "Constructed the webhook listener and data transformation logic in n8n",
      "Implemented schema validation checks to prevent malformed submissions",
      "Formulated structured qualification prompts for deterministic AI assessment",
      "Configured automated downstream notification and routing branches",
    ],
    businessValue: [
      "Instantaneous capture and triage of inbound prospective leads",
      "Prevents invalid or incomplete data from reaching sales teams",
      "Prioritizes high-intent leads for immediate sales follow-up",
    ],
    projectUrl: "https://drive.google.com/open?id=1H1ge7bckESffpnabniLY21CHw0n63SS4",
    actionLabels: {
      primary: "View Case Study",
      secondary: "View Project",
      requestService: "Request Lead Qualification System",
    },
  },
  {
    id: "rag-system",
    title: "RAG System",
    subtitle: "Retrieval-Augmented Generation pipeline with vector embeddings and knowledge grounding",
    featured: false,
    order: 8,
    category: "AI Agents",
    technologies: [
      "RAG",
      "Vector Search",
      "Embeddings",
      "AI Agents",
      "Knowledge Base",
      "Prompt Engineering",
    ],
    summary:
      "Retrieval-Augmented Generation pipeline indexing documentation into vector representations and performing semantic lookups to generate context-grounded AI responses.",
    problem:
      "Standard generative models hallucinate domain-specific details or lack access to proprietary company documentation and live knowledge bases.",
    solution:
      "Built a Retrieval-Augmented Generation pipeline that segments documents, computes vector embeddings, stores them in a vector database, and dynamically injects top semantic matches into the prompt context for verified factual generation.",
    architectureDiagram: {
      flowSummary:
        "Document Ingestion → Text Chunking & Embeddings → Vector Storage → Semantic Retrieval → Grounded AI Response",
      steps: [
        {
          id: "step-1",
          label: "Query / Input Trigger",
          description: "Receives user inquiry or document lookup request",
          tool: "API Gateway / Interface",
          category: "trigger",
        },
        {
          id: "step-2",
          label: "Vector Embedding",
          description: "Generates high-dimensional embedding vectors for the user query",
          tool: "Embedding Model",
          category: "ai",
        },
        {
          id: "step-3",
          label: "Semantic Similarity Search",
          description: "Performs cosine similarity search against indexed vector database chunks",
          tool: "Vector Store / pgvector",
          category: "database",
        },
        {
          id: "step-4",
          label: "Context Grounding & Ranking",
          description: "Filters and injects highest-scoring text passages into the system prompt",
          tool: "Context Assembler",
          category: "validation",
        },
        {
          id: "step-5",
          label: "Grounded Generation",
          description: "Synthesizes precise, factual answer bounded strictly to retrieved knowledge",
          tool: "LLM Agent",
          category: "ai",
        },
      ],
    },
    keyFeatures: [
      "Document chunking and high-dimensional vector embedding generation",
      "Semantic similarity search across indexed vector databases",
      "Context-grounded prompt orchestration preventing hallucinations",
      "Source attribution and reference retrieval for verifiable answers",
    ],
    technicalContribution: [
      "Designed document pre-processing and chunking strategies",
      "Integrated vector database indexing and similarity queries",
      "Crafted system prompt constraints enforcing strict grounding",
      "Engineered query pre-filtering and context ranking logic",
    ],
    businessValue: [
      "Delivers factual, verifiable responses grounded in company documentation",
      "Eliminates hallucinations on proprietary product and policy questions",
      "Scales automated self-service knowledge access without human lookup",
    ],
    projectUrl: "https://drive.google.com/open?id=1pJFHLC9V0rMVCh7tbrhkttz-AaZUJzv9",
    actionLabels: {
      primary: "View Case Study",
      secondary: "View Project",
      requestService: "Build RAG Knowledge System",
    },
  },
  {
    id: "multi-agent-customer-service-system",
    title: "Multi-Agent Customer Service System — Master Agent with 3 Specialized Sub-Agents",
    subtitle: "Hierarchical multi-agent customer support architecture with supervisor routing and specialist sub-agents",
    featured: false,
    order: 9,
    category: "Multi-Agent",
    technologies: [
      "Multi-Agent AI",
      "Master Router Agent",
      "Sub-Agents",
      "AI Orchestration",
      "Tool Calling",
      "Context Routing",
    ],
    summary:
      "Hierarchical multi-agent customer service ecosystem where a supervisor router evaluates client inquiries and orchestrates three specialized sub-agents to resolve requests.",
    problem:
      "Monolithic single-prompt chatbots struggle with multifaceted customer queries spanning order tracking, technical troubleshooting, and account inquiries.",
    solution:
      "Implemented a multi-agent orchestration architecture featuring a Master Agent that classifies customer intent and delegates execution to three dedicated specialist sub-agents, synthesizing unified resolutions.",
    architectureDiagram: {
      flowSummary:
        "Customer Query → Master Router Agent → Specialist Sub-Agent Routing → Tool Calling → Unified Response",
      steps: [
        {
          id: "step-1",
          label: "Customer Ingestion",
          description: "Ingests client inquiry from messaging channel or chat interface",
          tool: "Channel Webhook / API",
          category: "trigger",
        },
        {
          id: "step-2",
          label: "Master Router Agent",
          description: "Evaluates dialogue intent, user state, and routes to appropriate specialist sub-agent",
          tool: "Supervisor Router LLM",
          category: "ai",
        },
        {
          id: "step-3",
          label: "Specialist Sub-Agents",
          description: "Dispatches to Sub-Agent 1, Sub-Agent 2, or Sub-Agent 3 based on query domain",
          tool: "Specialized Agents",
          category: "ai",
        },
        {
          id: "step-4",
          label: "Tool Calling & Data Retrieval",
          description: "Sub-agents query backend databases, CRM systems, and verification APIs",
          tool: "Tool Execution Layer",
          category: "integration",
        },
        {
          id: "step-5",
          label: "Unified Synthesis",
          description: "Consolidates specialist findings into a cohesive, professional customer reply",
          tool: "Synthesis Agent",
          category: "ai",
        },
      ],
    },
    keyFeatures: [
      "Master Router Agent for intent classification and sub-agent delegation",
      "Three dedicated sub-agents specialized by domain task",
      "State management and context preservation across agent handoffs",
      "Synthesized final response with consistent brand tone",
    ],
    technicalContribution: [
      "Architected multi-agent routing topology and orchestration workflows",
      "Defined specialist agent prompt boundaries and tool access permissions",
      "Implemented error handling and graceful fallback escalation pathways",
      "Optimized context passing between supervisor and sub-agents",
    ],
    businessValue: [
      "Accurately handles complex customer journeys without conversation breakdown",
      "Modular design allows rapid addition or updating of individual sub-agents",
      "Ensures consistent, expert responses across all customer touchpoints",
    ],
    projectUrl: "https://drive.google.com/open?id=1nEocj1GoWzqHnz2Ask1Jan55Hk93BLDd",
    actionLabels: {
      primary: "View Case Study",
      secondary: "View Project",
      requestService: "Build Multi-Agent Support System",
    },
  },
  {
    id: "manual-gmail-automation",
    title: "Manual Gmail Automation",
    subtitle: "Semi-automated Gmail workflow for email parsing, action extraction, and supervised draft creation",
    featured: false,
    order: 10,
    category: "Workflow Automation",
    technologies: [
      "Gmail API",
      "Workflow Automation",
      "n8n",
      "Draft Preparation",
      "Email Management",
    ],
    summary:
      "Semi-automated inbox productivity pipeline that classifies inbound emails, extracts action points, and prepares contextual draft responses for human verification.",
    problem:
      "Managing high volumes of incoming business correspondence manually creates email fatigue, delayed replies, and disorganized follow-ups.",
    solution:
      "Constructed a human-supervised Gmail automation workflow that monitors designated inbox threads, extracts core message objectives, and drafts contextual responses directly into Gmail drafts for review.",
    architectureDiagram: {
      flowSummary:
        "Inbox Monitor Trigger → Thread Extraction → Action Classification → Draft Email Generation → Human Verification Gate",
      steps: [
        {
          id: "step-1",
          label: "Gmail Trigger",
          description: "Monitors labeled incoming emails and extracts conversation threads",
          tool: "Gmail API Node",
          category: "trigger",
        },
        {
          id: "step-2",
          label: "Email Content Parsing",
          description: "Sanitizes message HTML, extracts sender metadata, and parses body text",
          tool: "n8n Parser Node",
          category: "validation",
        },
        {
          id: "step-3",
          label: "Action Point Extraction",
          description: "Identifies core inquiry, customer urgency, and required response elements",
          tool: "Context AI Agent",
          category: "ai",
        },
        {
          id: "step-4",
          label: "Draft Preparation",
          description: "Composes contextual response and creates a Gmail draft in the user inbox",
          tool: "Gmail Draft Creator",
          category: "integration",
        },
        {
          id: "step-5",
          label: "Human Review Gate",
          description: "Enforces manual review and approval before any email is dispatched",
          tool: "Human-in-the-Loop Safeguard",
          category: "notification",
        },
      ],
    },
    keyFeatures: [
      "Gmail API integration for reading incoming messages and thread tracking",
      "Context extraction and message classification",
      "Contextual draft email synthesis placed directly in Gmail Drafts",
      "Strict human-in-the-loop safety rule (no unreviewed automatic sending)",
    ],
    technicalContribution: [
      "Configured Gmail OAuth2 API credentials and label-based triggers in n8n",
      "Built parsing routines for message bodies, headers, and thread histories",
      "Constructed draft generation nodes preserving conversation context",
      "Ensured draft-only delivery to preserve human review control",
    ],
    businessValue: [
      "Cuts email processing and drafting time significantly",
      "Guarantees human approval on all outgoing correspondence",
      "Standardizes response tone and ensures no critical message goes unanswered",
    ],
    humanInTheLoopNote:
      "Human-in-the-loop safeguard: Inbound emails are drafted directly into your Gmail drafts folder for human review and manual send. No emails are dispatched automatically.",
    projectUrl: "https://drive.google.com/open?id=1gd6vF0aPrqeFxbYxMibxDTAJlv2JUjL6",
    actionLabels: {
      primary: "View Case Study",
      secondary: "View Project",
      requestService: "Request Gmail Automation",
    },
  },
  {
    id: "automated-news-aggregation-ai-summarization-pipeline",
    title: "Automated News Aggregation & AI Summarization Pipeline — NewsPipeline",
    subtitle: "Automated multi-source RSS intelligence aggregator with AI summarization and digest compilation",
    featured: false,
    order: 11,
    category: "Workflow Automation",
    technologies: [
      "RSS Feeds",
      "AI Summarization",
      "n8n",
      "Text Processing",
      "Content Extraction",
      "Automated Digests",
    ],
    summary:
      "Automated news intelligence pipeline aggregating articles across multiple feeds, removing duplicate entries, and leveraging AI models to compile structured summary digests.",
    problem:
      "Tracking industry trends across dozens of disparate news outlets, blogs, and RSS feeds consumes hours of manual reading and filtering daily.",
    solution:
      "Designed NewsPipeline, an automated news aggregation system that polls multiple RSS sources, de-duplicates articles, extracts key content, and utilizes AI to generate structured executive summaries.",
    architectureDiagram: {
      flowSummary:
        "RSS Polling Trigger → Content Extraction → Deduplication Filter → AI Summarization Engine → Structured Digest Output",
      steps: [
        {
          id: "step-1",
          label: "RSS Feed Polling",
          description: "Periodically checks specified RSS news feeds and article endpoints",
          tool: "RSS Feed / HTTP Node",
          category: "trigger",
        },
        {
          id: "step-2",
          label: "Deduplication & Filtering",
          description: "Filters previously processed articles using GUID and title matching",
          tool: "n8n Filter & Deduper",
          category: "validation",
        },
        {
          id: "step-3",
          label: "Article Text Extraction",
          description: "Strips HTML clutter, parses article content, and standardizes metadata",
          tool: "HTML / Text Parser",
          category: "parser",
        },
        {
          id: "step-4",
          label: "AI Summarization",
          description: "Generates concise bulleted executive summaries and key takeaway points",
          tool: "Summarization AI Model",
          category: "ai",
        },
        {
          id: "step-5",
          label: "Digest Dispatch",
          description: "Formats structured summary digest and delivers to target distribution channels",
          tool: "Digest Notification Node",
          category: "notification",
        },
      ],
    },
    keyFeatures: [
      "Multi-source RSS feed polling and article ingestion",
      "Automated deduplication and relevance filtering",
      "AI-driven executive summarization highlighting key takeaways",
      "Structured digest formatting and automated delivery",
    ],
    technicalContribution: [
      "Engineered RSS ingestion nodes with scheduling and error tolerance in n8n",
      "Implemented text extraction and content cleaning logic",
      "Formulated structured prompt templates for concise executive summaries",
      "Automated structured digest dispatch to destination channels",
    ],
    businessValue: [
      "Saves hours of daily manual research and industry monitoring",
      "Delivers concise, high-signal intelligence briefs to stakeholders",
      "Maintains continuous awareness of market and competitive developments",
    ],
    projectUrl: "https://drive.google.com/open?id=18Gt0-A5kyqMSfGYisxksW-2XlFnbdo7x",
    actionLabels: {
      primary: "View Case Study",
      secondary: "View Project",
      requestService: "Request News Aggregation Pipeline",
    },
  },
  {
    id: "automated-lead-follow-up-nurture-system",
    title: "Automated Lead Follow-Up & Nurture System",
    subtitle: "Scheduled multi-stage lead follow-up automation with personalized outreach and CRM tracking",
    featured: false,
    order: 12,
    category: "Workflow Automation",
    technologies: [
      "Lead Nurturing",
      "n8n",
      "Scheduled Triggers",
      "CRM Integration",
      "Email Outreach",
      "JSON",
    ],
    summary:
      "Scheduled multi-stage lead follow-up automation monitoring contact timelines, personalizing outreach copy with AI, and systematically re-engaging prospects.",
    problem:
      "Prospective leads frequently drop off after initial contact when follow-ups are inconsistent or delayed due to manual sales bandwidth constraints.",
    solution:
      "Built an automated lead nurture engine running on scheduled triggers that checks lead interaction logs, dynamically personalizes multi-stage re-engagement messaging, and updates audit records.",
    architectureDiagram: {
      flowSummary:
        "Cron Schedule Trigger → Lead Database Audit → Cadence Logic Filter → AI Personalization → Email Outreach → Audit Log Update",
      steps: [
        {
          id: "step-1",
          label: "Schedule Trigger",
          description: "Triggers on predetermined cron schedule to scan active lead database",
          tool: "n8n Cron Scheduler",
          category: "trigger",
        },
        {
          id: "step-2",
          label: "Lead Timeline Check",
          description: "Calculates days since last prospect engagement and verifies follow-up stage",
          tool: "Database / CRM Node",
          category: "database",
        },
        {
          id: "step-3",
          label: "Cadence Validation",
          description: "Ensures prospect is not over-contacted and skips responded contacts",
          tool: "Logic & Filter Node",
          category: "validation",
        },
        {
          id: "step-4",
          label: "Contextual Personalization",
          description: "Synthesizes relevant re-engagement copy tailored to original prospect interest",
          tool: "AI Personalization Agent",
          category: "ai",
        },
        {
          id: "step-5",
          label: "Outreach & Log Sync",
          description: "Sends follow-up email and updates interaction timestamps in the CRM",
          tool: "Email API & CRM Upsert",
          category: "integration",
        },
      ],
    },
    keyFeatures: [
      "Scheduled audit triggers checking prospect interaction timestamps",
      "Multi-stage cadence tracking to prevent over-contacting",
      "AI-personalized outreach tailored to prospect interaction history",
      "Centralized tracking and logging of engagement statuses",
    ],
    technicalContribution: [
      "Configured cron-based scheduled workflows and conditional timing logic in n8n",
      "Implemented data lookup and status progression in the tracking database",
      "Engineered dynamic email generation templates based on lead attributes",
      "Built safeguard routines to halt sequence upon lead reply",
    ],
    businessValue: [
      "Ensures 100% consistent prospect follow-up across all sales leads",
      "Re-engages dormant prospects without manual sales rep intervention",
      "Maintains complete visibility into lead lifecycle stages and conversion points",
    ],
    projectUrl: "https://drive.google.com/open?id=1bWwpJfNfL15Q-YifXNA4lZLwDR2gV69W",
    actionLabels: {
      primary: "View Case Study",
      secondary: "View Project",
      requestService: "Request Lead Nurture Pipeline",
    },
  },
  {
    id: "ai-powered-telegram-chatbot",
    title: "AI-Powered Telegram Chatbot — Intelligent Customer Support Bot",
    subtitle: "24/7 conversational support chatbot deployed on Telegram via webhooks with intelligent prompt routing",
    featured: false,
    order: 13,
    category: "AI Agents",
    technologies: [
      "Telegram Bot API",
      "AI Chatbot",
      "Webhooks",
      "Conversational AI",
      "NLP",
      "Customer Support",
    ],
    summary:
      "24/7 conversational support chatbot deployed on Telegram via webhooks to handle incoming inquiries, answer recurring queries, and automate customer support.",
    problem:
      "Customers expecting instant assistance across messaging apps experience high abandonment when support agents are offline or overburdened.",
    solution:
      "Engineered an intelligent Telegram chatbot utilizing the Telegram Bot API and webhook triggers to provide real-time conversational customer support, answer common questions, and guide users to relevant resources.",
    architectureDiagram: {
      flowSummary:
        "Telegram Webhook Trigger → Message Sanitization → Conversational AI Agent → Knowledge Verification → Telegram Reply API",
      steps: [
        {
          id: "step-1",
          label: "Telegram Webhook",
          description: "Receives user chat messages instantly via Telegram Bot API webhook updates",
          tool: "Telegram Webhook Node",
          category: "trigger",
        },
        {
          id: "step-2",
          label: "Message Sanitization",
          description: "Parses chat ID, sender info, text message, and verifies rate limits",
          tool: "Payload Validator",
          category: "validation",
        },
        {
          id: "step-3",
          label: "Conversational AI Agent",
          description: "Processes user query against support prompts and knowledge guidelines",
          tool: "Conversational AI Model",
          category: "ai",
        },
        {
          id: "step-4",
          label: "Response Guardrails",
          description: "Checks response accuracy, applies safety filters, and formats message",
          tool: "Safety & Formatting Filter",
          category: "parser",
        },
        {
          id: "step-5",
          label: "Telegram Message Dispatch",
          description: "Sends formatted reply back to customer in Telegram chat instantly",
          tool: "Telegram Bot API Node",
          category: "integration",
        },
      ],
    },
    keyFeatures: [
      "Real-time bidirectional communication via Telegram Bot API and webhooks",
      "Conversational AI agent trained on support scenarios and user intents",
      "Instant reply capabilities with low latency",
      "Fallback escalation handling for edge cases and human handoff",
    ],
    technicalContribution: [
      "Configured Telegram Bot webhook listeners and update payload handlers",
      "Constructed context-aware prompts enforcing helpful, professional support tone",
      "Integrated session tracking to maintain multi-turn dialogue continuity",
      "Implemented input sanitization and rate-limiting safeguards",
    ],
    businessValue: [
      "Provides 24/7 instant customer assistance directly in Telegram",
      "Deflects repetitive inquiries from manual support staffing",
      "Delivers rapid response times improving customer satisfaction and trust",
    ],
    projectUrl: "https://drive.google.com/open?id=1p_nlXv_QBAUwV9xQVd-5t_yLGhf4DehC",
    actionLabels: {
      primary: "View Case Study",
      secondary: "View Project",
      requestService: "Request Telegram Support Bot",
    },
  },
  {
    id: "ai-powered-gmail-management-auto-reply",
    title: "AI-Powered Gmail Management & Auto-Reply System",
    subtitle: "Autonomous email triage, intent classification, sentiment analysis, and intelligent reply generation",
    featured: false,
    order: 14,
    category: "Workflow Automation",
    technologies: [
      "Gmail API",
      "AI Auto-Reply",
      "n8n",
      "Intent Classification",
      "Sentiment Analysis",
      "Workflow Automation",
    ],
    summary:
      "Automated email intelligence system monitoring inbound correspondence, classifying intent and urgency, and drafting context-specific replies while escalating key threads.",
    problem:
      "Busy executives and operations teams spend hours sorting emails, categorizing urgent messages, and composing repetitive routine replies.",
    solution:
      "Developed an AI-powered Gmail management pipeline that analyzes incoming messages for intent and sentiment, categorizes inquiries into labels, generates context-tailored draft replies, and alerts on priority issues.",
    architectureDiagram: {
      flowSummary:
        "Gmail Ingestion Trigger → Intent & Urgency Classifier → Label Assignment → Contextual Draft Reply Generation → Priority Escalation Alert",
      steps: [
        {
          id: "step-1",
          label: "Inbound Email Trigger",
          description: "Monitors inbox for unread messages and fetches thread metadata",
          tool: "Gmail API Node",
          category: "trigger",
        },
        {
          id: "step-2",
          label: "Content Sanitizer",
          description: "Strips signatures and disclaimers, isolating substantive conversation",
          tool: "Email Body Parser",
          category: "validation",
        },
        {
          id: "step-3",
          label: "Intent & Sentiment Classifier",
          description: "AI model scores urgency, detects sentiment, and categorizes inquiry type",
          tool: "Classification AI Agent",
          category: "ai",
        },
        {
          id: "step-4",
          label: "Label Assignment & Routing",
          description: "Applies Gmail labels and routes high-priority threads for attention",
          tool: "Gmail Label Manager",
          category: "integration",
        },
        {
          id: "step-5",
          label: "Draft Reply Synthesis",
          description: "Synthesizes tailored response draft saving it directly in thread drafts",
          tool: "Draft Generation LLM",
          category: "notification",
        },
      ],
    },
    keyFeatures: [
      "Automated Gmail monitoring and thread ingestion",
      "Intent and sentiment classification using AI language models",
      "Automated label organization and priority scoring",
      "Context-sensitive draft response generation with escalation alerts",
    ],
    technicalContribution: [
      "Constructed Gmail API automation routines with secure authentication in n8n",
      "Designed multi-criteria classification prompts for intent, urgency, and sentiment",
      "Implemented conditional routing based on urgency scores",
      "Created draft composition workflows integrated directly into Gmail",
    ],
    businessValue: [
      "Dramatically cuts time required to manage high-volume inboxes",
      "Ensures critical inquiries are flagged and escalated immediately",
      "Standardizes prompt, professional communication across all correspondence",
    ],
    projectUrl: "https://drive.google.com/open?id=1lkB4MvmvNNKsTpYz8n2GBLOZDfDanev9",
    actionLabels: {
      primary: "View Case Study",
      secondary: "View Project",
      requestService: "Request Gmail Management System",
    },
  },
  {
    id: "ai-script-writer-content-generator-automation",
    title: "AI Script Writer & Content Generator Automation",
    subtitle: "Structured content ideation, research synthesis, and multi-format script generation workflow",
    featured: false,
    order: 15,
    category: "AI Agents",
    technologies: [
      "AI Agents",
      "Content Generation",
      "Script Writing",
      "Prompt Engineering",
      "Structured Output",
      "Workflow Automation",
    ],
    summary:
      "Automated content creation workflow transforming research briefs and prompts into structured scripts, hooks, and formatted outlines for digital distribution.",
    problem:
      "Consistently producing high-quality video scripts, social content, and technical copy requires extensive ideation, outlining, and formatting time.",
    solution:
      "Architected an end-to-end AI script generation automation that takes topic inputs or research briefs, generates attention-grabbing hooks, outlines key concepts, and outputs complete structured scripts formatted for creators.",
    architectureDiagram: {
      flowSummary:
        "Brief / Topic Trigger → Hook & Ideation Agent → Outline Synthesizer → Scene-by-Scene Script Writer → Formatted Output Export",
      steps: [
        {
          id: "step-1",
          label: "Topic / Brief Input",
          description: "Ingests topic parameters, target audience, format type, and tone guidance",
          tool: "Form / Webhook Trigger",
          category: "trigger",
        },
        {
          id: "step-2",
          label: "Hook & Concept Generator",
          description: "Generates multiple high-converting hooks and angle recommendations",
          tool: "Ideation AI Agent",
          category: "ai",
        },
        {
          id: "step-3",
          label: "Structured Outlining",
          description: "Builds logical narrative structure with timestamps and key talking points",
          tool: "Outline Structuring Node",
          category: "parser",
        },
        {
          id: "step-4",
          label: "Full Script Synthesis",
          description: "Drafts complete scene-by-scene script with visual cues and delivery notes",
          tool: "Script Generation LLM",
          category: "ai",
        },
        {
          id: "step-5",
          label: "Formatted Document Export",
          description: "Exports clean markdown or formatted document ready for production",
          tool: "Document Export API",
          category: "integration",
        },
      ],
    },
    keyFeatures: [
      "Automated topic expansion and structured outline creation",
      "Multi-format script generation (video scripts, social posts, long-form copy)",
      "Hook variation generator with engagement scoring",
      "Structured export to content databases and document tools",
    ],
    technicalContribution: [
      "Engineered modular prompt chains for ideation, outline, and script body",
      "Implemented structured output formatting for clear scene-by-scene script breakdowns",
      "Configured automated export routines to cloud documents and content tables",
      "Built parameter controls for tone, target audience, and duration",
    ],
    businessValue: [
      "Accelerates scriptwriting and content production velocity by 5x",
      "Maintains consistent content structure and storytelling frameworks",
      "Enables continuous content publishing without creative bottleneck",
    ],
    projectUrl: "https://drive.google.com/open?id=1Um4rysV6w8yGd3l4rWgQFVwyzefOJrMX",
    actionLabels: {
      primary: "View Case Study",
      secondary: "View Project",
      requestService: "Build Content Automation System",
    },
  },
];
