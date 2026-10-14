# Precious Achionye — AI Automation Engineer & Specialist Portfolio

> **“I Build Intelligent AI Agents, Automated Workflows & Connected Business Systems.”**

A production-ready, responsive, project-driven portfolio website engineered for **Precious Achionye**, AI Automation Engineer & Specialist.

---

## 🌟 Key Features

1. **Project-Driven Architecture**:
   - **Featured Project 1**: *AI-Powered Real Estate CRM and Lead Management System* (n8n, Gemini, Sheets, Gmail, Structured Output Parser).
   - **Featured Project 2**: *AI Customer Support FAQ Chatbot with Knowledge Base* (Vector Search, Supabase Vector Store, RAG).
   - **Featured Project 3**: *AI Voice Agent and Automated Calling Assistant* with real-time test console, browser speech engine, audio waveform animations, and telephony integration.
   - **Enterprise Case Studies**: Automated Real Estate Lead Follow-Up System, Multi-Agent Real Estate Chatbot (Prime Kelly Real Estate), and AI Job Finder & Dossier Preparation System (with mandatory human-in-the-loop safeguards).

2. **Interactive AI Voice Agent Testing Console**:
   - Working **“Call My AI Agent”** button with conversational speech recognition and natural speech synthesis directly in the browser.
   - Plug-and-play support for **ElevenLabs Conversational AI** or **Vapi** widgets via environment variables.
   - Outbound telephony test call request form with explicit caller consent.
   - Live transcript feed and quick prompt chips.

3. **n8n Webhook-Powered Contact Form**:
   - Fully validated form submitting structured JSON payloads to your self-hosted or cloud n8n webhook endpoint.
   - Handles loading states, validation errors, success states, and error retries.
   - Includes importable **`n8n-contact-enquiry-workflow.json`** for 1-click workflow deployment that notifies `chimezieachionye@gmail.com`.

4. **Multi-Channel Contact Integration**:
   - Direct clickable email (`mailto:chimezieachionye@gmail.com`).
   - Persistent floating WhatsApp contact button (`https://wa.me/2349135523468`) with pre-filled message encoding.
   - LinkedIn profile link (`https://linkedin.com/in/precious-achionye-439906357`).
   - Configurable TikTok and GitHub settings.

5. **Design & Visual Identity**:
   - High-contrast, clean light mode with deep navy text, and functional dark mode toggle with persistent local storage.
   - Interactive SVG architecture workflow diagrams for each project.
   - Fully responsive for mobile, tablet, and desktop screens.

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Installation
```bash
# Clone or navigate into the project directory
cd ai-automation-portfolio

# Install dependencies
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Configure your variables in `.env`:
```env
# n8n Webhook for contact form submissions
VITE_N8N_CONTACT_WEBHOOK_URL=https://your-n8n-instance.com/webhook/portfolio-contact

# AI Voice Agent settings
VITE_VOICE_AGENT_PROVIDER=browser
VITE_VOICE_AGENT_PUBLIC_ID=
VITE_VOICE_AGENT_PHONE_NUMBER=+2349135523468
VITE_VOICE_CALL_ENDPOINT=

# Social profile links (optional)
VITE_TIKTOK_URL=
VITE_GITHUB_URL=
```

### 4. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 5. Production Build
```bash
npm run build
```
The compiled, optimized production files will be output to the `dist/` directory.

---

## ⚡ Connecting the n8n Contact Webhook

1. Open your **n8n instance** (cloud or self-hosted).
2. Click **Add Workflow** > **Import from File...** and select **`n8n-contact-enquiry-workflow.json`** located in the root of this project.
3. In the **Webhook Node**:
   - Verify the Path is set to `portfolio-contact`.
   - Set HTTP Method to `POST`.
   - In Options, ensure **Allowed Origins (CORS)** is set to `*` or your production domain.
4. In the **Send Email Node**:
   - Configure your Gmail or SMTP credentials.
   - The workflow will automatically forward all submitted contact data (`full_name`, `email`, `phone`, `company_name`, `service_needed`, `project_details`) to `chimezieachionye@gmail.com`.
5. Copy the **Production URL** of the Webhook node and paste it into `VITE_N8N_CONTACT_WEBHOOK_URL` in your `.env` or deployment dashboard.

---

## 🎙️ Configuring the AI Voice Agent

The portfolio supports three voice interaction modes:

1. **Built-in Browser Voice Engine (Default)**:
   - Works immediately out-of-the-box using the browser's Web Speech API (SpeechRecognition + SpeechSynthesis).
   - No external API key required.

2. **ElevenLabs Conversational AI Widget**:
   - In your ElevenLabs dashboard, create a Conversational Agent.
   - Copy the public Agent ID (e.g., `agent_123456789`).
   - Set `VITE_VOICE_AGENT_PROVIDER=elevenlabs` and `VITE_VOICE_AGENT_PUBLIC_ID=agent_123456789` in `.env`.

3. **PSTN Telephony Call Initiation**:
   - To trigger real phone calls to visitors who request an automated demo call, provide your webhook endpoint in `VITE_VOICE_CALL_ENDPOINT`.
   - In your telephony provider (Vapi, Bland AI, or Twilio via n8n), process the inbound POST request and initiate the call.

---

## 🚢 Deployment Guide

### Deploying to Vercel
1. Push your repository to GitHub.
2. In [Vercel](https://vercel.com/), click **Add New** > **Project** and import your repository.
3. Framework Preset: **Vite**
4. Root Directory: `./` (or `ai-automation-portfolio`)
5. Under **Environment Variables**, add:
   - `VITE_N8N_CONTACT_WEBHOOK_URL`
   - `VITE_VOICE_AGENT_PROVIDER`
   - `VITE_VOICE_AGENT_PUBLIC_ID` (if using ElevenLabs/Vapi)
   - `VITE_VOICE_AGENT_PHONE_NUMBER`
6. Click **Deploy**.

### Deploying to Netlify
1. Connect your GitHub repository in [Netlify](https://www.netlify.com/).
2. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Under **Site Configuration** > **Environment variables**, set `VITE_N8N_CONTACT_WEBHOOK_URL`.
4. Click **Deploy Site**.

---

## 📁 Project Structure

```
ai-automation-portfolio/
├── n8n-contact-enquiry-workflow.json # 1-click importable n8n workflow
├── .env.example                      # Template environment variables
├── index.html                        # HTML entry with SEO metadata
├── tailwind.config.js                # Tailwind CSS configuration
├── src/
│   ├── config/
│   │   └── site.ts                   # Centralized branding & contact configuration
│   ├── data/
│   │   ├── projects.ts               # Project database (all 6 case studies)
│   │   ├── services.ts               # 10 specialized service offerings
│   │   └── skills.ts                 # 6 technical competency categories
│   ├── components/
│   │   ├── Navbar.tsx                # Sticky navbar with dark mode & CTA buttons
│   │   ├── Hero.tsx                  # Hero section with 4 primary CTAs
│   │   ├── FeaturedProjects.tsx      # Projects 1, 2, 3 in exact required order
│   │   ├── AdditionalProjects.tsx    # Projects 4, 5, 6 with filtering
│   │   ├── ServicesSection.tsx       # 10 service cards with "Discuss This Service"
│   │   ├── SkillsSection.tsx         # Technical skills matrix
│   │   ├── AboutSection.tsx          # Professional summary & direct actions
│   │   ├── ContactSection.tsx        # n8n webhook form & direct contact pills
│   │   ├── Footer.tsx                # Dynamic copyright & quick links
│   │   ├── FloatingWhatsApp.tsx      # Persistent bottom-right WhatsApp action
│   │   ├── CaseStudyModal.tsx        # Deep case-study reader
│   │   ├── VoiceAgentModal.tsx       # AI voice console modal wrapper
│   │   ├── voice/
│   │   │   └── VoiceAgentTester.tsx  # Browser speech engine & setup checklist
│   │   └── workflow/
│   │       └── ArchitectureDiagram.tsx # Interactive visual workflow pipeline
│   ├── App.tsx                       # App orchestrator
│   ├── main.tsx                      # React root
│   └── index.css                     # Tailwind base and custom animations
```

---

## 📬 Contact & Inquiries
- **Email**: [chimezieachionye@gmail.com](mailto:chimezieachionye@gmail.com)
- **WhatsApp**: [+234 913 552 3468](https://wa.me/2349135523468)
- **LinkedIn**: [Precious Achionye](https://linkedin.com/in/precious-achionye-439906357)
