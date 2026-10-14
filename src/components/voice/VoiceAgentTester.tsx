import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../../config/site';
import {
  Phone,
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Settings,
  ShieldCheck,
  Sparkles,
  Info,
  RefreshCw,
  Bot,
  User,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import {
  startElevenLabsConversation,
} from '../../utils/elevenlabs';

interface TranscriptMessage {
  id: string;
  sender: 'agent' | 'user' | 'system';
  text: string;
  timestamp: string;
}

export const VoiceAgentTester: React.FC = () => {
  const voiceConfig = siteConfig.integrations.voiceAgent;
  const isElevenLabs = voiceConfig.provider === 'elevenlabs';

  const [activeTab, setActiveTab] = useState<'elevenlabs' | 'browser' | 'phone' | 'setup'>(
    isElevenLabs ? 'elevenlabs' : 'browser'
  );
  const [elevenLabsCallState, setElevenLabsCallState] = useState<'idle' | 'starting' | 'active' | 'error'>('idle');
  const [elevenLabsFeedback, setElevenLabsFeedback] = useState<string>('');

  const [isCalling, setIsCalling] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Assistant ready to talk');
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([
    {
      id: 'init-1',
      sender: 'system',
      text: 'Voice session initialized. Click "Start Conversation" to begin speaking with Precious\'s AI Voice Assistant.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  // Phone Call State
  const [userPhone, setUserPhone] = useState('');
  const [phoneConsent, setPhoneConsent] = useState(false);
  const [phoneCallState, setPhoneCallState] = useState<'idle' | 'requesting' | 'success' | 'error'>('idle');
  const [phoneFeedback, setPhoneFeedback] = useState('');

  // Audio wave animation simulator
  const [audioLevels, setAudioLevels] = useState<number[]>([15, 25, 40, 20, 60, 30, 45, 15]);

  // Timer Ref (browser-compatible number type)
  const timerRef = useRef<any>(null);
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);

  // Web Speech references
  const recognitionRef = useRef<any>(null);

  // Auto-scroll transcript
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  // Call duration counter
  useEffect(() => {
    if (isCalling) {
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
        // Randomize audio wave heights while active
        setAudioLevels([
          Math.floor(Math.random() * 65) + 15,
          Math.floor(Math.random() * 85) + 15,
          Math.floor(Math.random() * 95) + 20,
          Math.floor(Math.random() * 70) + 15,
          Math.floor(Math.random() * 90) + 20,
          Math.floor(Math.random() * 80) + 15,
          Math.floor(Math.random() * 60) + 10,
          Math.floor(Math.random() * 40) + 10,
        ]);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setCallDuration(0);
      setAudioLevels([15, 20, 25, 20, 25, 20, 15, 10]);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isCalling]);

  // Format call duration MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Agent Knowledge Responses
  const getAIResponse = (userQuery: string): string => {
    const q = userQuery.toLowerCase();
    if (q.includes('service') || q.includes('what do you build') || q.includes('help')) {
      return "Precious specializes in developing custom AI agents, n8n workflow automations, conversational voice assistants, and CRM integrations. He automates repetitive manual business processes and connects siloed software systems.";
    }
    if (q.includes('crm') || q.includes('lead') || q.includes('real estate')) {
      return "Precious has built end-to-end AI Real Estate CRM workflows using n8n and Google Gemini that validate lead inquiries, score readiness, update central Google Sheets, and dispatch tailored HTML follow-up emails in seconds.";
    }
    if (q.includes('voice') || q.includes('call') || q.includes('phone')) {
      return "This voice assistant demonstrates low-latency natural language dialogue with tool-calling capabilities. He integrates ElevenLabs, WebSockets, and webhook triggers to qualify callers and record appointments.";
    }
    if (q.includes('hire') || q.includes('cost') || q.includes('contact') || q.includes('pricing') || q.includes('project')) {
      return "You can reach Precious directly on WhatsApp at +234 913 552 3468, email him at chimezieachionye@gmail.com, or submit a project enquiry using the n8n-connected form on this website!";
    }
    if (q.includes('n8n') || q.includes('automation') || q.includes('webhook')) {
      return "With n8n, Precious designs resilient workflows with custom logic, conditional branching, webhook listeners, automated data transformations, and full error alerting.";
    }
    return "Thank you for reaching out! I am Precious's conversational AI voice assistant. I can answer questions regarding his AI engineering capabilities, real estate automation systems, or how to get started on your project.";
  };

  // Speak agent response
  const speakText = (text: string) => {
    if (isSpeakerMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Pick best English voice
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(
      (v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha'))
    );
    if (naturalVoice) utterance.voice = naturalVoice;

    utterance.onstart = () => {
      setStatusMessage('AI Assistant speaking...');
    };
    utterance.onend = () => {
      if (isCalling) {
        setStatusMessage('Listening to your voice... (Speak into microphone)');
      }
    };
    utterance.onerror = () => {
      setStatusMessage('Voice output finished');
    };

    window.speechSynthesis.speak(utterance);
  };

  // Start Browser Voice Call
  const handleStartCall = () => {
    setIsCalling(true);
    setStatusMessage('Connecting to AI Voice Core...');

    // Welcome message
    const welcomeMsg =
      "Hello! Welcome to Precious Achionye's AI automation portfolio. I am his AI voice assistant. How can I help you today?";

    setTimeout(() => {
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setTranscript((prev) => [
        ...prev,
        {
          id: `call-start-${Date.now()}`,
          sender: 'agent',
          text: welcomeMsg,
          timestamp: now,
        },
      ]);
      speakText(welcomeMsg);

      // Start Speech Recognition if supported
      initSpeechRecognition();
    }, 1000);
  };

  // End Browser Voice Call
  const handleEndCall = () => {
    setIsCalling(false);
    setStatusMessage('Call ended');
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
    }
    setTranscript((prev) => [
      ...prev,
      {
        id: `call-end-${Date.now()}`,
        sender: 'system',
        text: 'Voice call disconnected. You can review the conversation transcript above or restart a test call.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Speech Recognition Setup
  const initSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setStatusMessage('Browser speech input not supported; listening simulation ready');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const lastResultIndex = event.results.length - 1;
        const speechText = event.results[lastResultIndex][0].transcript.trim();

        if (speechText.length > 0) {
          const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          setTranscript((prev) => [
            ...prev,
            {
              id: `user-${Date.now()}`,
              sender: 'user',
              text: speechText,
              timestamp: now,
            },
          ]);

          setStatusMessage('Processing agent response...');
          const reply = getAIResponse(speechText);

          setTimeout(() => {
            setTranscript((prev) => [
              ...prev,
              {
                id: `agent-${Date.now()}`,
                sender: 'agent',
                text: reply,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ]);
            speakText(reply);
          }, 800);
        }
      };

      recognition.onerror = (err: any) => {
        console.warn('Speech recognition status:', err.error);
        if (err.error === 'not-allowed') {
          setStatusMessage('Microphone access denied. Please allow microphone permissions in browser.');
        }
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (e) {
      console.warn('SpeechRecognition initialization note:', e);
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    } else if (isMuted && isCalling) {
      initSpeechRecognition();
    }
  };

  // Handle Quick Question Clicks
  const handleQuickQuestion = (question: string) => {
    if (!isCalling) {
      setIsCalling(true);
    }
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTranscript((prev) => [
      ...prev,
      {
        id: `user-quick-${Date.now()}`,
        sender: 'user',
        text: question,
        timestamp: now,
      },
    ]);

    const reply = getAIResponse(question);
    setTimeout(() => {
      setTranscript((prev) => [
        ...prev,
        {
          id: `agent-quick-${Date.now()}`,
          sender: 'agent',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      speakText(reply);
    }, 600);
  };

  // Handle Phone Call Initiation
  const handleInitiatePhoneCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneConsent) {
      setPhoneFeedback('Please confirm your consent to receive an automated test call.');
      return;
    }
    if (!userPhone.trim()) {
      setPhoneFeedback('Please enter a valid phone number with country code (e.g. +1... or +234...).');
      return;
    }

    setPhoneCallState('requesting');
    setPhoneFeedback('Checking telephony provider endpoint...');

    // Check if backend call endpoint is configured
    if (voiceConfig.callEndpoint) {
      fetch(voiceConfig.callEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone_number: userPhone,
          consent: true,
          agent_id: voiceConfig.publicId || 'default-agent',
          requested_at: new Date().toISOString(),
        }),
      })
        .then((res) => {
          if (res.ok) {
            setPhoneCallState('success');
            setPhoneFeedback('Test call queued successfully! Expect a call on your device shortly.');
          } else {
            throw new Error('Call request was declined by telephony provider');
          }
        })
        .catch((err) => {
          setPhoneCallState('error');
          setPhoneFeedback(
            `Telephony endpoint returned an error: ${err.message}. You can test the browser voice call right now instead!`
          );
        });
    } else {
      // Endpoint not configured: explain setup clearly without fake success
      setTimeout(() => {
        setPhoneCallState('error');
        setPhoneFeedback(
          'VITE_VOICE_CALL_ENDPOINT is not yet configured in environment variables. To trigger actual PSTN phone calls, connect your Twilio, Vapi, or Bland AI calling webhook.'
        );
      }, 1000);
    }
  };

  const handleStartElevenLabs = async () => {
    setElevenLabsCallState('starting');
    setElevenLabsFeedback('Connecting to ElevenLabs conversational session...');
    const result = await startElevenLabsConversation();
    if (result.success) {
      setElevenLabsCallState('active');
      setElevenLabsFeedback(
        'ElevenLabs voice session started! Speak directly into your microphone or look at the widget in the corner.'
      );
    } else {
      setElevenLabsCallState('error');
      setElevenLabsFeedback(
        result.message || 'Could not connect to ElevenLabs widget. Check your network or permissions.'
      );
    }
  };

  return (
    <div className="w-full bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
      {/* Top Bar with Mode Switcher */}
      <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-white text-base">Conversational AI Voice Console</h3>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded-full border border-emerald-500/30 font-semibold">
                VOICE AI v2.4
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive test console for Precious Achionye&apos;s Voice Automation Systems
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs gap-1">
          {isElevenLabs && (
            <button
              type="button"
              onClick={() => setActiveTab('elevenlabs')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 ${
                activeTab === 'elevenlabs'
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>ElevenLabs Live Agent</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setActiveTab('browser')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'browser'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Browser Voice Simulator
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('phone')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'phone'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Direct Phone Call
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('setup')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1 ${
              activeTab === 'setup'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Settings className="w-3.5 h-3.5 mr-1" />
            <span>Setup Checklist</span>
          </button>
        </div>
      </div>

      {/* Mode 0: ElevenLabs Live Voice Call */}
      {activeTab === 'elevenlabs' && (
        <div className="p-6 md:p-8">
          {/* Disclosure Banner */}
          <div className="mb-6 p-4 bg-gradient-to-r from-indigo-950/70 via-slate-900 to-slate-900 rounded-xl border border-indigo-800/60 flex items-start space-x-3 text-xs text-indigo-200">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold text-white">Live ElevenLabs Voice Demo: </span>
              Connected directly to Precious&apos;s configured ElevenLabs Conversational AI voice agent (ID:{' '}
              <code className="text-cyan-300 font-mono font-semibold bg-indigo-950 px-1.5 py-0.5 rounded border border-indigo-800">
                {voiceConfig.publicId}
              </code>
              ). When you click &ldquo;Call My AI Agent&rdquo;, you can converse directly through your
              microphone using real-time WebRTC audio streaming.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Agent Console */}
            <div className="lg:col-span-5 flex flex-col items-center text-center p-6 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-slate-800">
              {/* Agent Orb Avatar */}
              <div className="relative mb-5">
                <div
                  className={`w-28 h-28 rounded-full flex items-center justify-center p-1 transition-all duration-300 ${
                    elevenLabsCallState === 'active'
                      ? 'bg-gradient-to-tr from-cyan-400 via-indigo-500 to-violet-600 shadow-2xl shadow-cyan-500/40 animate-pulse'
                      : 'bg-gradient-to-tr from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/30'
                  }`}
                >
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                    <Bot
                      className={`w-12 h-12 ${
                        elevenLabsCallState === 'active' ? 'text-cyan-300' : 'text-slate-300'
                      }`}
                    />
                  </div>
                </div>
                {/* Live Pill */}
                <span
                  className={`absolute bottom-1 right-2 w-5 h-5 rounded-full border-4 border-white dark:border-navy-950 ${
                    elevenLabsCallState === 'active' ? 'bg-emerald-500 animate-ping' : 'bg-emerald-500'
                  }`}
                />
              </div>

              <h4 className="font-bold text-slate-900 dark:text-white text-lg">
                Precious&apos;s AI Voice Assistant
              </h4>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-mono mt-0.5">
                ElevenLabs Conversational AI
              </p>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-800 mt-2">
                Agent ID: {voiceConfig.publicId}
              </span>

              {/* Status Banner */}
              <div className="w-full my-4 p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-xs">
                {elevenLabsCallState === 'active' ? (
                  <div className="flex items-center justify-center space-x-2 text-emerald-600 dark:text-emerald-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>ElevenLabs Session Active • Speak into microphone</span>
                  </div>
                ) : elevenLabsCallState === 'starting' ? (
                  <div className="flex items-center justify-center space-x-2 text-indigo-600 dark:text-indigo-400">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Connecting WebSocket audio session...</span>
                  </div>
                ) : elevenLabsCallState === 'error' ? (
                  <div className="text-rose-600 dark:text-rose-400 text-left text-[11px] leading-relaxed">
                    <span className="font-bold">Notice:</span> {elevenLabsFeedback}
                  </div>
                ) : (
                  <div className="text-slate-500 font-mono">
                    Standby • Click below to test live conversation
                  </div>
                )}
              </div>

              {/* Primary Call Trigger Button */}
              <button
                type="button"
                onClick={handleStartElevenLabs}
                disabled={elevenLabsCallState === 'starting'}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-teal-500/25 transition-all hover:scale-105 flex items-center justify-center space-x-2.5 focus:outline-none focus:ring-4 focus:ring-teal-400/30 disabled:opacity-50"
              >
                <PhoneCall className="w-5 h-5 text-white" />
                <span>Call My AI Agent</span>
              </button>

              {elevenLabsCallState === 'active' && (
                <p className="text-[11px] text-emerald-500 font-medium mt-3 animate-pulse">
                  Agent listening via ElevenLabs widget in the corner.
                </p>
              )}

              {/* Engine Metrics */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 w-full flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Protocol: WebRTC/WSS</span>
                <span>Latency: ~250ms</span>
              </div>
            </div>

            {/* Right: Security & Architecture Requirements */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3">
                  <ShieldCheck className="w-4 h-4 text-indigo-500" />
                  <span>ElevenLabs Security & Public Access Checklist</span>
                </div>
                <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                  <div className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white">Public Agent Access:</span>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        In ElevenLabs Console (<em>Agent Settings &gt; Security / Access</em>), the agent must be set to <strong>Public</strong>.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white">Authentication Disabled:</span>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        Client widget embedding requires authentication to be disabled. Zero private API keys are exposed to browsers.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white">Microphone Permissions:</span>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        Grant microphone access when prompted by your browser to enable bidirectional voice communication.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Suggested Questions */}
              <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-3">
                  Suggested Prompts to Speak with the Agent:
                </p>
                <div className="space-y-2">
                  <div className="text-xs p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium">
                    &ldquo;What real estate automation workflows and CRM pipelines have you built?&rdquo;
                  </div>
                  <div className="text-xs p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium">
                    &ldquo;How do you connect n8n workflows with Google Gemini and Supabase vector stores?&rdquo;
                  </div>
                  <div className="text-xs p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium">
                    &ldquo;Can you explain your conversational AI voice agent architecture?&rdquo;
                  </div>
                  <div className="text-xs p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium">
                    &ldquo;How can I hire Precious for my business automation project?&rdquo;
                  </div>
                </div>
              </div>

              {/* Fallback Notice */}
              <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-xl text-center text-xs text-slate-500">
                <span>Want to test in-browser speech synthesis or simulated questions instead? </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('browser')}
                  className="text-blue-600 dark:text-blue-400 font-bold underline ml-1"
                >
                  Switch to Browser Simulator
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 1: Browser Voice Call */}
      {activeTab === 'browser' && (
        <div className="p-6 md:p-8">
          {/* Disclosure Banner */}
          <div className="mb-6 p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900/60 flex items-start space-x-3 text-xs text-blue-900 dark:text-blue-300">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Notice: </span>
              You are interacting with an AI voice agent demo. When active, you can speak directly into
              your microphone or click any of the sample questions below to test reasoning and speech
              synthesis.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Call Control Center */}
            <div className="lg:col-span-5 flex flex-col items-center text-center p-6 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-slate-800">
              {/* Agent Avatar with Audio Wave animation */}
              <div className="relative mb-6">
                <div
                  className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCalling
                      ? 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 shadow-2xl shadow-indigo-500/40 scale-105'
                      : 'bg-slate-200 dark:bg-slate-800'
                  }`}
                >
                  <Bot
                    className={`w-14 h-14 ${
                      isCalling ? 'text-white animate-pulse' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  />
                </div>

                {/* Status Dot */}
                <span
                  className={`absolute bottom-1 right-2 w-5 h-5 rounded-full border-4 border-white dark:border-navy-950 ${
                    isCalling ? 'bg-emerald-500' : 'bg-slate-400'
                  }`}
                />
              </div>

              {/* Title & Status */}
              <h4 className="font-bold text-slate-900 dark:text-white text-lg">
                Precious&apos;s AI Assistant
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 mb-3 font-mono">
                {isCalling ? `LIVE CALL • ${formatTime(callDuration)}` : 'OFFLINE • READY'}
              </p>

              {/* Dynamic Audio Visualizer Wave */}
              <div className="h-12 flex items-center justify-center space-x-1.5 my-2 w-full max-w-[200px]">
                {audioLevels.map((lvl, idx) => (
                  <span
                    key={idx}
                    className={`w-2 rounded-full transition-all duration-150 ${
                      isCalling
                        ? 'bg-gradient-to-t from-blue-600 to-violet-500'
                        : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                    style={{ height: `${isCalling ? Math.max(8, lvl) : 6}px` }}
                  />
                ))}
              </div>

              <div className="text-xs font-mono text-slate-600 dark:text-slate-300 bg-white dark:bg-navy-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 my-3">
                {statusMessage}
              </div>

              {/* Call Control Buttons */}
              <div className="flex items-center space-x-4 mt-4">
                {!isCalling ? (
                  <button
                    type="button"
                    onClick={handleStartCall}
                    className="flex items-center space-x-2.5 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
                  >
                    <PhoneCall className="w-5 h-5 text-white" />
                    <span>Call My AI Agent</span>
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={toggleMute}
                      title={isMuted ? 'Unmute Microphone' : 'Mute Microphone'}
                      className={`p-3.5 rounded-xl border transition-all ${
                        isMuted
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300'
                          : 'bg-white dark:bg-navy-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>

                    <button
                      type="button"
                      onClick={handleEndCall}
                      className="flex items-center space-x-2 px-6 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl shadow-lg shadow-rose-500/30 transition-all hover:scale-105"
                    >
                      <PhoneOff className="w-5 h-5" />
                      <span>End Call</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsSpeakerMuted(!isSpeakerMuted)}
                      title={isSpeakerMuted ? 'Unmute Audio' : 'Mute Audio'}
                      className={`p-3.5 rounded-xl border transition-all ${
                        isSpeakerMuted
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-300'
                          : 'bg-white dark:bg-navy-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {isSpeakerMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                  </>
                )}
              </div>

              {/* Provider Info Pill */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 w-full flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Engine: Web Speech & Voice AI</span>
                <span>Latency: ~350ms</span>
              </div>
            </div>

            {/* Right: Live Transcript & Sample Questions */}
            <div className="lg:col-span-7 flex flex-col h-[480px]">
              {/* Transcript Header */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-violet-500" />
                  <span>Real-time Call Transcript</span>
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setTranscript([
                      {
                        id: 'reset-1',
                        sender: 'system',
                        text: 'Transcript cleared. Start speaking or click a prompt below.',
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                      },
                    ])
                  }
                  className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center space-x-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              </div>

              {/* Message Feed */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                {transcript.map((msg) => {
                  if (msg.sender === 'system') {
                    return (
                      <div
                        key={msg.id}
                        className="text-center my-2 text-[11px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-950/40 p-2 rounded-lg border border-slate-200/50 dark:border-slate-800/50"
                      >
                        {msg.text}
                      </div>
                    );
                  }

                  const isAgent = msg.sender === 'agent';
                  return (
                    <div
                      key={msg.id}
                      className={`flex items-start space-x-2.5 ${
                        isAgent ? 'justify-start' : 'justify-end'
                      }`}
                    >
                      {isAgent && (
                        <div className="w-7 h-7 rounded-lg bg-violet-600 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-sm">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                          isAgent
                            ? 'bg-slate-100 dark:bg-navy-800 text-slate-800 dark:text-slate-200 rounded-tl-sm border border-slate-200/60 dark:border-slate-700/60'
                            : 'bg-blue-600 text-white rounded-tr-sm shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3 mb-1">
                          <span className="font-semibold text-[10px] uppercase font-mono opacity-80">
                            {isAgent ? "Precious's AI Agent" : 'You (Caller)'}
                          </span>
                          <span className="text-[10px] opacity-70 font-mono">{msg.timestamp}</span>
                        </div>
                        <p>{msg.text}</p>
                      </div>
                      {!isAgent && (
                        <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-sm">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  );
                })}
                <div ref={transcriptEndRef} />
              </div>

              {/* Sample Prompt Chips */}
              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <p className="text-[11px] font-medium text-slate-500 mb-2">
                  Test conversational reasoning with one-click questions:
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleQuickQuestion('What real estate automation systems have you built?')
                    }
                    className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-violet-100 dark:hover:bg-violet-950/60 hover:text-violet-700 dark:hover:text-violet-300 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    “What real estate CRM systems have you built?”
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleQuickQuestion('Can you explain your AI voice agent architecture?')
                    }
                    className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-violet-100 dark:hover:bg-violet-950/60 hover:text-violet-700 dark:hover:text-violet-300 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    “How does the voice agent architecture work?”
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleQuickQuestion('How do I hire Precious or get a project quote?')
                    }
                    className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-violet-100 dark:hover:bg-violet-950/60 hover:text-violet-700 dark:hover:text-violet-300 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    “How can I hire Precious for my project?”
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Direct Phone Call Request */}
      {activeTab === 'phone' && (
        <div className="p-6 md:p-8 max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950/80 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-3">
              <Phone className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">
              Receive a Live Test Call from My AI Voice Agent
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
              Test automated outbound calling capabilities. Enter your phone number with your country code
              to receive a direct demonstration call from the voice assistant.
            </p>
          </div>

          <form onSubmit={handleInitiatePhoneCall} className="space-y-5">
            <div>
              <label
                htmlFor="phone-number"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Your Phone Number (International format)
              </label>
              <div className="relative">
                <input
                  id="phone-number"
                  type="tel"
                  placeholder="+1 (555) 000-0000 or +234 913 552 3468"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">
                Standard international formatting with plus symbol (+ country code)
              </p>
            </div>

            {/* Explicit Consent Requirement */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={phoneConsent}
                  onChange={(e) => setPhoneConsent(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  I give explicit consent to receive a single automated test telephone call from Precious
                  Achionye&apos;s AI Voice Agent demo. Calls will never be placed automatically without
                  your request.
                </span>
              </label>
            </div>

            {phoneFeedback && (
              <div
                className={`p-3 rounded-xl text-xs flex items-start space-x-2 ${
                  phoneCallState === 'success'
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    : phoneCallState === 'error'
                    ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                    : 'bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                }`}
              >
                {phoneCallState === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
                )}
                <span>{phoneFeedback}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={phoneCallState === 'requesting'}
              className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {phoneCallState === 'requesting' ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                  <span>Connecting to Telephony Provider...</span>
                </>
              ) : (
                <>
                  <PhoneCall className="w-4 h-4 mr-1" />
                  <span>Request AI Demo Call</span>
                </>
              )}
            </button>

            <div className="text-center">
              <span className="text-xs text-slate-400">
                Prefer to chat directly?{' '}
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 font-semibold underline"
                >
                  Message on WhatsApp
                </a>
              </span>
            </div>
          </form>
        </div>
      )}

      {/* Mode 3: Provider Setup & Checklist */}
      {activeTab === 'setup' && (
        <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-indigo-500" />
              <span>Voice Agent Configuration & Integration Guide</span>
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Production guidelines for connecting external telephony and conversational AI providers
              (ElevenLabs, Vapi, Bland AI, Twilio).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-mono font-semibold uppercase text-slate-400">
                Environment Variable
              </span>
              <p className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                VITE_VOICE_AGENT_PUBLIC_ID
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                Public Agent Identifier for embeddable widgets (e.g. ElevenLabs conversational agent ID or
                Vapi public key). Safe for client-side embedding.
              </p>
              <div className="mt-3 text-[11px] font-mono text-slate-400">
                Status:{' '}
                {voiceConfig.publicId ? (
                  <span className="text-emerald-500 font-bold font-mono">Configured ({voiceConfig.publicId})</span>
                ) : (
                  <span className="text-amber-500">Not set (using browser speech engine)</span>
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-mono font-semibold uppercase text-slate-400">
                Environment Variable
              </span>
              <p className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                VITE_VOICE_AGENT_PROVIDER
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                Identifies the voice service (&apos;browser&apos; | &apos;elevenlabs&apos; | &apos;vapi&apos; | &apos;custom&apos;). Defaults to browser-based speech synthesis.
              </p>
              <div className="mt-3 text-[11px] font-mono text-slate-400">
                Status: <span className="text-blue-500 font-bold">{voiceConfig.provider}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-mono font-semibold uppercase text-slate-400">
                Environment Variable
              </span>
              <p className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                VITE_VOICE_CALL_ENDPOINT
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                Backend webhook URL for triggering verified outbound telephony calls via n8n or API
                server.
              </p>
              <div className="mt-3 text-[11px] font-mono text-slate-400">
                Status:{' '}
                {voiceConfig.callEndpoint ? (
                  <span className="text-emerald-500 font-bold">Configured</span>
                ) : (
                  <span className="text-slate-400">Optional (PSTN phone integration)</span>
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-mono font-semibold uppercase text-slate-400">
                Security Standard
              </span>
              <p className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                Private Server-Side Credentials
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                Private API keys (such as ELEVENLABS_API_KEY, TWILIO_AUTH_TOKEN) are maintained
                strictly in server-side n8n credentials and are never exposed in frontend code.
              </p>
            </div>
          </div>

          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-900/60 text-xs text-indigo-900 dark:text-indigo-300">
            <span className="font-bold">Ready to deploy a custom voice assistant for your company?</span>
            <p className="mt-1">
              Precious configures inbound and outbound voice automations with custom business logic,
              booking tools, and multi-language support. Contact him directly to set up your agent.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
