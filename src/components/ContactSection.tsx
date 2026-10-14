import React, { useState, useEffect } from 'react';
import { siteConfig } from '../config/site';
import { LinkedInIcon, GitHubIcon, TikTokIcon } from './icons/SocialIcons';
import {
  Send,
  Mail,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Settings,
  RefreshCw,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface ContactSectionProps {
  initialService?: string;
}

const SERVICE_OPTIONS = [
  'AI Agent Development',
  'AI Voice Agent Development',
  'Workflow Automation',
  'CRM Integration',
  'API Integration',
  'AI Customer Support Chatbot',
  'Python Automation',
  'Email Automation',
  'Multi-Agent Systems',
  'Custom AI Automation Solution',
  'Other',
];

const BUDGET_OPTIONS = [
  'Select estimated budget (Optional)',
  'Under $1,000',
  '$1,000 - $3,000',
  '$3,000 - $5,000',
  '$5,000 - $10,000',
  '$10,000+',
  'Flexible / To be scoped',
];

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    serviceNeeded: initialService || '',
    projectDetails: '',
    budgetRange: '',
  });

  // Track field-specific errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showSetupGuide, setShowSetupGuide] = useState(false);

  // Update selected service if parent triggers change
  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceNeeded: initialService }));
    }
  }, [initialService]);

  const webhookUrl = siteConfig.integrations.n8nContactWebhookUrl;
  const isWebhookConfigured = Boolean(webhookUrl && webhookUrl.trim().length > 0);

  // Validation function
  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email Address is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = 'Please provide a valid email address';
      }
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Phone Number is required';
    } else {
      const cleaned = formData.phone.replace(/[\s\-\(\)\.]/g, '');
      if (cleaned.length < 7) {
        errs.phone = 'Please provide a valid phone number';
      }
    }

    if (!formData.companyName.trim()) {
      errs.companyName = 'Company Name is required';
    }

    if (!formData.serviceNeeded.trim() || !SERVICE_OPTIONS.includes(formData.serviceNeeded)) {
      errs.serviceNeeded = 'Please select a valid service from the dropdown';
    }

    if (!formData.projectDetails.trim()) {
      errs.projectDetails = 'Project Details are required';
    } else if (formData.projectDetails.trim().length < 10) {
      errs.projectDetails = 'Please provide a bit more detail about your project (minimum 10 characters)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent duplicate submissions if already in-flight
    if (isSubmitting) {
      return;
    }

    if (!validate()) {
      return;
    }

    if (!isWebhookConfigured) {
      setSubmitStatus('error');
      setFeedbackMessage(
        'The n8n contact webhook URL (VITE_N8N_CONTACT_WEBHOOK_URL) has not been configured in the environment yet. Please verify your .env file or contact Precious directly via Email or WhatsApp!'
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setFeedbackMessage('');

    // Payload containing fullName, email, phone, companyName, serviceNeeded, projectDetails, optional budget
    // Also includes snake_case aliases for universal n8n node compatibility
    const payload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      companyName: formData.companyName.trim(),
      serviceNeeded: formData.serviceNeeded,
      projectDetails: formData.projectDetails.trim(),
      budget: formData.budgetRange || undefined,
      full_name: formData.fullName.trim(),
      company_name: formData.companyName.trim(),
      service_needed: formData.serviceNeeded,
      project_details: formData.projectDetails.trim(),
      budget_range: formData.budgetRange || undefined,
      source: 'AI Automation Portfolio',
      submitted_at: new Date().toISOString(),
    };

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`n8n webhook returned status ${response.status} (${response.statusText || 'Request failed'})`);
      }

      // Check response body if available
      let responseData: any = null;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        try {
          responseData = await response.json();
        } catch {
          // ignore parsing error if body empty
        }
      }

      // If n8n explicitly returned an unsuccessful status
      if (responseData && responseData.success === false) {
        throw new Error(responseData.message || responseData.error || 'n8n workflow rejected the enquiry.');
      }

      // Display success ONLY after n8n confirms successful response
      setSubmitStatus('success');
      setFeedbackMessage(
        (responseData && responseData.message)
          ? responseData.message
          : 'Thank you! Your project enquiry was successfully delivered to Precious via the n8n automation pipeline. Expect a response within 24 hours.'
      );

      // Reset form only on confirmed success
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        serviceNeeded: '',
        projectDetails: '',
        budgetRange: '',
      });
      setErrors({});
    } catch (err: any) {
      // Display error and preserve entered form data
      setSubmitStatus('error');
      const isNetworkOrCors =
        (err instanceof TypeError && err.message.toLowerCase().includes('fetch')) ||
        err.message.toLowerCase().includes('network');

      const errorDetail = isNetworkOrCors
        ? `Could not reach n8n webhook at ${webhookUrl}. Please ensure your n8n server is active, listening for test events, and has CORS allowed (Allowed Origins: * in Webhook node options).`
        : err.message || 'An error occurred during submission.';

      setFeedbackMessage(
        `${errorDetail} (Your entered form data has been preserved. You can also reach Precious directly via Email or WhatsApp below.)`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-white dark:bg-navy-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Headline, Supporting Text, and Persistent Direct Links */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-md mb-4 border border-blue-200 dark:border-blue-800">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Get In Touch</span>
              </div>

              {/* Exact Prompt Headline */}
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                “Have a Business Process You Want to Automate?”
              </h2>

              {/* Exact Prompt Supporting Text */}
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mt-4 leading-relaxed font-normal">
                “Tell me about your project. Whether you need an AI voice agent, an intelligent chatbot,
                a CRM integration, or a complete workflow automation system, let&apos;s explore how I can help.”
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4 pt-2">
              {/* Clickable Email Card */}
              <a
                href={siteConfig.contact.emailLink}
                className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 transition-all group shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold">
                    Direct Email
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {siteConfig.contact.email}
                  </div>
                </div>
              </a>

              {/* WhatsApp Contact Button */}
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 hover:border-emerald-500 transition-all group shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-md shadow-emerald-500/20">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase text-emerald-700 dark:text-emerald-400 font-semibold">
                    Instant WhatsApp Chat
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                    +234 913 552 3468
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Pre-filled with project inquiry
                  </div>
                </div>
              </a>

              {/* LinkedIn & Configured Socials */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800">
                <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold mb-3">
                  Professional Networks
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={siteConfig.contact.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-blue-600 hover:border-blue-400 transition-colors"
                  >
                    <LinkedInIcon className="w-4 h-4 text-blue-600" />
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>

                  {siteConfig.contact.githubUrl ? (
                    <a
                      href={siteConfig.contact.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-slate-950 dark:hover:text-white transition-colors"
                    >
                      <GitHubIcon className="w-4 h-4" />
                      <span>GitHub</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  ) : (
                    <span className="text-[11px] font-mono text-slate-400 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800/50">
                      GitHub: Configurable via .env
                    </span>
                  )}

                  {siteConfig.contact.tiktokUrl ? (
                    <a
                      href={siteConfig.contact.tiktokUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-slate-950 transition-colors"
                    >
                      <TikTokIcon className="w-4 h-4 text-rose-500" />
                      <span>TikTok Profile</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>

            {/* n8n Webhook Status Notice */}
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono font-bold uppercase text-[11px] text-slate-500">
                  n8n Webhook Integration
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    isWebhookConfigured
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}
                >
                  {isWebhookConfigured ? 'CONNECTED' : 'SETUP REQUIRED'}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                {isWebhookConfigured
                  ? 'All enquiries submit real-time JSON payloads directly to your active n8n workflow.'
                  : 'VITE_N8N_CONTACT_WEBHOOK_URL is not yet set in environment. Direct email and WhatsApp remain fully active!'}
              </p>
              <button
                type="button"
                onClick={() => setShowSetupGuide(!showSetupGuide)}
                className="mt-2 text-indigo-600 dark:text-indigo-400 hover:underline font-mono text-[11px] flex items-center space-x-1"
              >
                <Settings className="w-3 h-3" />
                <span>{showSetupGuide ? 'Hide n8n Setup Instructions' : 'View n8n Setup Instructions'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: The n8n Webhook Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl p-6 sm:p-8 bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Submit Project Enquiry
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Structured submission powered by n8n Webhooks
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-400 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700">
                  Step 1 of 1
                </span>
              </div>

              {/* Success Message Banner */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-start space-x-3 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm">Enquiry Dispatched!</h5>
                    <p className="mt-1 leading-relaxed">{feedbackMessage}</p>
                  </div>
                </div>
              )}

              {/* Error Message Banner */}
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-200 flex items-start space-x-3 animate-fadeIn">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm">Submission Status Notice</h5>
                    <p className="mt-1 leading-relaxed">{feedbackMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Row 1: Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: '' });
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                        errors.fullName
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="sarah@company.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                        errors.email
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Row 2: Phone Number & Company Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 234-5678 or +234..."
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                        errors.phone
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Company Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="companyName"
                      type="text"
                      placeholder="Apex Realty or Self"
                      value={formData.companyName}
                      onChange={(e) => {
                        setFormData({ ...formData, companyName: e.target.value });
                        if (errors.companyName) setErrors({ ...errors, companyName: '' });
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                        errors.companyName
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                      }`}
                    />
                    {errors.companyName && (
                      <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.companyName}</p>
                    )}
                  </div>
                </div>

                {/* Row 3: Service Needed (Exact 11 Items) & Budget Range */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="serviceNeeded"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Service Needed <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="serviceNeeded"
                      value={formData.serviceNeeded}
                      onChange={(e) => {
                        setFormData({ ...formData, serviceNeeded: e.target.value });
                        if (errors.serviceNeeded) setErrors({ ...errors, serviceNeeded: '' });
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                        errors.serviceNeeded
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                      }`}
                    >
                      <option value="">Select a service...</option>
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.serviceNeeded && (
                      <p className="text-[11px] text-rose-500 mt-1 font-medium">
                        {errors.serviceNeeded}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="budgetRange"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Budget Range <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <select
                      id="budgetRange"
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {BUDGET_OPTIONS.map((b) => (
                        <option key={b} value={b.startsWith('Select') ? '' : b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Project Details Textarea */}
                <div>
                  <label
                    htmlFor="projectDetails"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Project Details & Business Goal <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="projectDetails"
                    rows={4}
                    placeholder="Describe your current manual workflow, what systems you want connected, or the AI agent capabilities you require..."
                    value={formData.projectDetails}
                    onChange={(e) => {
                      setFormData({ ...formData, projectDetails: e.target.value });
                      if (errors.projectDetails) setErrors({ ...errors, projectDetails: '' });
                    }}
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                      errors.projectDetails
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                    }`}
                  />
                  {errors.projectDetails && (
                    <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.projectDetails}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-blue-500/30"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                      <span>Transmitting Payload to n8n Webhook...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-1" />
                      <span>Send Project Enquiry</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-slate-400 font-mono">
                  Guaranteed privacy. Your information is never sold or shared.
                </p>
              </form>

              {/* Developer Setup Instructions Accordion */}
              {showSetupGuide && (
                <div className="mt-8 p-5 rounded-2xl bg-slate-950 text-slate-200 border border-slate-800 text-xs space-y-4 animate-fadeIn font-mono">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="font-bold text-indigo-400 flex items-center space-x-2">
                      <Settings className="w-4 h-4" />
                      <span>n8n Webhook & Email Notification Setup</span>
                    </span>
                    <span className="text-[10px] text-slate-400">Step-by-step guide</span>
                  </div>

                  <div>
                    <p className="text-slate-300 font-semibold mb-1">
                      1. In your n8n workflow editor:
                    </p>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Add a <strong>Webhook node</strong>. Set HTTP Method to <code>POST</code> and
                      Path to <code>/webhook/portfolio-contact</code>. In node settings, enable{' '}
                      <code>Respond: When Last Node Finishes</code> or <code>Immediately (200)</code>.
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-300 font-semibold mb-1">
                      2. Configure CORS in n8n Webhook:
                    </p>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      In the Webhook node, add option <strong>Allowed Origins (CORS)</strong> set to{' '}
                      <code>*</code> or your deployed portfolio domain (e.g.{' '}
                      <code>https://preciousachionye.vercel.app</code>).
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-300 font-semibold mb-1">
                      3. Send Email Notification to Precious:
                    </p>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Connect a <strong>Gmail</strong> or <strong>Send Email</strong> node downstream:
                      <br />
                      • To: <code>chimezieachionye@gmail.com</code>
                      <br />
                      • Subject: <code>New AI Automation Enquiry: &#123;&#123;$json.service_needed&#125;&#125;</code>
                      <br />
                      • Body: Include <code>full_name</code>, <code>email</code>, <code>phone</code>,{' '}
                      <code>company_name</code>, and <code>project_details</code>.
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-300 font-semibold mb-1">4. Set Frontend Environment Variable:</p>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800 text-emerald-400 text-[11px]">
                      VITE_N8N_CONTACT_WEBHOOK_URL=https://your-n8n-instance.com/webhook/portfolio-contact
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
