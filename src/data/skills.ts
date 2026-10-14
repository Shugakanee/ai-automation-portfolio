export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
  iconName: string;
}

export const skillsData: SkillCategory[] = [
  {
    title: "AI and Agent Engineering",
    description: "Designing intelligent reasoning loops, tool-calling agents, and grounded knowledge systems.",
    iconName: "Cpu",
    skills: [
      "AI Agents",
      "LLM Integration",
      "Prompt Engineering",
      "Tool Calling",
      "Structured Outputs",
      "RAG",
      "Voice Agents",
      "Knowledge Base Integration",
    ],
  },
  {
    title: "Workflow Automation",
    description: "Architecting resilient, self-healing integration pipelines across distributed services.",
    iconName: "Workflow",
    skills: [
      "n8n",
      "Webhooks",
      "Triggers",
      "Conditional Logic",
      "Scheduled Workflows",
      "Error Handling",
    ],
  },
  {
    title: "API and Data Integration",
    description: "Connecting disparate platforms through robust HTTP protocols and normalized data structures.",
    iconName: "Braces",
    skills: [
      "REST APIs",
      "HTTP Requests",
      "JSON",
      "Authentication",
      "Data Mapping",
      "Third-Party Integrations",
    ],
  },
  {
    title: "Programming",
    description: "Writing clean, maintainable automation scripts and data transformation algorithms.",
    iconName: "Code",
    skills: [
      "Python",
      "JavaScript",
      "Data Processing",
      "Automation Scripts",
    ],
  },
  {
    title: "CRM and Business Tools",
    description: "Streamlining customer pipelines and enterprise workspace tools for maximum operational velocity.",
    iconName: "Briefcase",
    skills: [
      "CRM Integration",
      "Gmail",
      "Google Sheets",
      "Google Docs",
      "Lead Management",
      "Email Automation",
    ],
  },
  {
    title: "Databases",
    description: "Managing structured relational records and vector embeddings for contextual AI memory.",
    iconName: "Database",
    skills: [
      "Supabase",
      "Vector Stores",
      "Vector Search",
      "Database Integration",
    ],
  },
];
