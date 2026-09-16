import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  Sparkles,
  Save,
  Trash2,
  AlertCircle,
  Clock,
  Send,
  Zap,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { generateProposal } from '../utils/proposalEngine.js';
import { getProfile, getProposals, saveProposal, deleteProposal } from '../utils/storage.js';

export default function ProposalGeneratorPage({ showToast }) {
  const profile = getProfile();
  
  // Form State
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [clientName, setClientName] = useState('');
  const [tone, setTone] = useState('Consultative');
  const [estimatedTimeline, setEstimatedTimeline] = useState('');
  const [estimatedRate, setEstimatedRate] = useState(`$${profile.hourlyRate || 55}/hr or fixed milestone`);
  
  // UI & Output State
  const [errorMsg, setErrorMsg] = useState('');
  const [generatedProposal, setGeneratedProposal] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [savedProposals, setSavedProposals] = useState(() => getProposals());
  const [activeTab, setActiveTab] = useState('generator'); // 'generator' | 'history'

  const sampleJobs = [
    {
      title: 'Need Modern React + Tailwind Developer for B2B Dashboard MVP',
      desc: 'Looking for an experienced frontend developer to build an interactive analytics dashboard with real-time charts, dark mode, responsive layout, and clean component architecture. Must deliver clean code and meet a tight 2-week deadline.',
      timeline: '2 weeks',
      rate: '$1,500 - $2,500 Fixed'
    },
    {
      title: 'High-Converting SaaS Landing Page Redesign',
      desc: 'Our current SaaS landing page has high bounce rates and low demo signups. We need an expert who understands conversion principles, fast page speeds, and responsive design to overhaul the homepage in Next.js or React.',
      timeline: '5 - 7 days',
      rate: '$800 - $1,600 Fixed'
    },
    {
      title: 'Fix Stripe Webhook & API Data Synchronization Bug',
      desc: 'Our web app occasionally fails to record subscription upgrades when users complete Stripe checkout. Need an experienced backend developer to review our webhook handler, fix the race condition, and test payment events.',
      timeline: '2 - 3 days',
      rate: '$60 - $80/hr'
    }
  ];

  const handleApplySample = (sample) => {
    setJobTitle(sample.title);
    setJobDescription(sample.desc);
    setEstimatedTimeline(sample.timeline);
    setEstimatedRate(sample.rate);
    setErrorMsg('');
  };

  const handleGenerate = (e) => {
    if (e) e.preventDefault();

    if (!jobTitle.trim()) {
      setErrorMsg('Please enter a job title.');
      return;
    }
    if (!jobDescription.trim()) {
      setErrorMsg('Please enter the client job description.');
      return;
    }
    if (jobDescription.trim().length < 20) {
      setErrorMsg('Please provide a bit more detail in the job description so the proposal can be tailored effectively.');
      return;
    }

    setErrorMsg('');
    const result = generateProposal({
      jobTitle,
      jobDescription,
      freelancerName: profile.name || 'Alex Rivera',
      freelancerSkills: profile.skills || [],
      tone,
      clientName,
      estimatedTimeline,
      estimatedRate
    });

    setGeneratedProposal(result);
    setIsCopied(false);
    showToast({ message: 'Tailored proposal generated successfully!', type: 'success' });
  };

  const handleCopyProposal = () => {
    if (!generatedProposal) return;
    navigator.clipboard.writeText(generatedProposal.proposalText);
    setIsCopied(true);
    showToast({ message: 'Proposal copied to clipboard!', type: 'success' });
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleSaveToLibrary = () => {
    if (!generatedProposal) return;
    const newRecord = {
      jobTitle,
      clientName: clientName || 'Direct Client',
      tone,
      rateEstimate: estimatedRate,
      proposalText: generatedProposal.proposalText,
      excerpt: generatedProposal.proposalText.slice(0, 140) + '...'
    };
    const updated = saveProposal(newRecord);
    setSavedProposals(updated);
    showToast({ message: 'Proposal saved to your library!', type: 'success' });
  };

  const handleDeleteSaved = (id) => {
    const updated = deleteProposal(id);
    setSavedProposals(updated);
    showToast({ message: 'Proposal removed from library.', type: 'info' });
  };

  const handleCopyExisting = (text) => {
    navigator.clipboard.writeText(text);
    showToast({ message: 'Copied proposal from history!', type: 'success' });
  };

  return (
    <div className="space-y-8 py-4 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
            <FileText className="w-3.5 h-3.5" />
            <span>High-Conversion Pitch Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Proposal Generator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Turn any job post into a client-attracting proposal that addresses real pain points, outlines a structured solution, and lands interviews.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('generator')}
            id="tab-btn-generator"
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'generator'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Generator
          </button>
          <button
            onClick={() => setActiveTab('history')}
            id="tab-btn-history"
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Saved History</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-indigo-300">
              {savedProposals.length}
            </span>
          </button>
        </div>
      </div>

      {activeTab === 'history' ? (
        /* History View */
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Your Saved Proposals ({savedProposals.length})</h3>
            <button
              onClick={() => setActiveTab('generator')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Back to Generator
            </button>
          </div>

          {savedProposals.length === 0 ? (
            <div className="glass-panel rounded-2xl p-12 text-center text-slate-400 space-y-3">
              <FileText className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-sm">You haven't saved any proposals yet.</p>
              <button
                onClick={() => setActiveTab('generator')}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
              >
                Generate a Proposal Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedProposals.map((prop) => (
                <div
                  key={prop.id}
                  className="glass-panel rounded-xl p-5 border border-slate-800 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-white line-clamp-2">{prop.jobTitle}</h4>
                      <button
                        onClick={() => handleDeleteSaved(prop.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 rounded transition"
                        title="Delete proposal"
                        aria-label="Delete proposal"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {prop.clientName || 'Direct Client'}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300">
                        {prop.tone || 'Consultative'}
                      </span>
                      {prop.rateEstimate && (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300">
                          {prop.rateEstimate}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 whitespace-pre-line bg-slate-950/70 p-3 rounded-lg border border-slate-900 max-h-48 overflow-y-auto leading-relaxed">
                      {prop.proposalText || prop.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <span className="text-[10px] text-slate-500">{prop.createdAt || 'Saved'}</span>
                    <button
                      onClick={() => handleCopyExisting(prop.proposalText || prop.excerpt)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white text-xs font-semibold transition flex items-center gap-1.5"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Proposal</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Generator View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Form (5 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Quick Samples Banner */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" />
                <span>Try a sample job description:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {sampleJobs.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplySample(sample)}
                    className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition border border-slate-700 hover:border-indigo-500"
                  >
                    Sample {idx + 1}: {sample.title.split(' ').slice(0, 4).join(' ')}...
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleGenerate} className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-5">
              
              {/* Job Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>Job Title *</span>
                  <span className="text-[10px] text-slate-500 lowercase font-normal">from client posting</span>
                </label>
                <input
                  type="text"
                  id="proposal-job-title"
                  value={jobTitle}
                  onChange={(e) => {
                    setJobTitle(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="e.g. Senior React Developer for Fintech SaaS Dashboard"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500 transition placeholder:text-slate-500"
                />
              </div>

              {/* Job Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>Job Description *</span>
                  <span className="text-[10px] text-slate-500 lowercase font-normal">paste client requirements</span>
                </label>
                <textarea
                  id="proposal-job-desc"
                  rows={6}
                  value={jobDescription}
                  onChange={(e) => {
                    setJobDescription(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="Paste the client's job requirements, scope, or problem description here..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500 transition placeholder:text-slate-500 resize-y"
                />
              </div>

              {/* Client Name & Tone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Client Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="proposal-client-name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Sarah or Acme Team"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Proposal Tone
                  </label>
                  <select
                    id="proposal-tone-select"
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500 transition"
                  >
                    <option value="Consultative">Consultative & Strategic</option>
                    <option value="Direct & Fast">Direct & Fast Turnaround</option>
                    <option value="Value & ROI">Value & ROI-Focused</option>
                    <option value="Friendly & Collaborative">Friendly & Collaborative</option>
                  </select>
                </div>
              </div>

              {/* Timeline & Budget / Rate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Target Timeline
                  </label>
                  <input
                    type="text"
                    id="proposal-timeline"
                    value={estimatedTimeline}
                    onChange={(e) => setEstimatedTimeline(e.target.value)}
                    placeholder="e.g. 10 - 14 days"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Rate or Project Estimate
                  </label>
                  <input
                    type="text"
                    id="proposal-rate"
                    value={estimatedRate}
                    onChange={(e) => setEstimatedRate(e.target.value)}
                    placeholder="e.g. $55/hr or $1,500 fixed"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800 text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  id="generate-proposal-submit-btn"
                  className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white transition shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Tailored Proposal</span>
                </button>
              </div>

            </form>
          </div>

          {/* Right Proposal Preview (7 cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Generated Proposal Draft</span>
              </h3>

              {generatedProposal && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveToLibrary}
                    id="save-proposal-library-btn"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Save to Library</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyProposal}
                    id="copy-proposal-main-btn"
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-md ${
                      isCopied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'
                    }`}
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied to Clipboard!' : 'Copy Proposal'}</span>
                  </button>
                </div>
              )}
            </div>

            {generatedProposal ? (
              <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4 animate-in fade-in duration-200">
                
                {/* Meta pills */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800/80 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 font-medium">
                      Tone: {generatedProposal.tone}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300">
                      Focus: {generatedProposal.detectedFocus}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span>{generatedProposal.wordCount} words</span>
                    <span>~{generatedProposal.estimatedReadTime} read</span>
                  </div>
                </div>

                {/* Proposal Text Display */}
                <div className="relative">
                  <pre
                    id="generated-proposal-output"
                    className="w-full text-xs sm:text-sm text-slate-200 font-sans whitespace-pre-wrap leading-relaxed bg-slate-950/70 p-5 rounded-xl border border-slate-800/80 max-h-[520px] overflow-y-auto selection:bg-indigo-500/30"
                  >
                    {generatedProposal.proposalText}
                  </pre>
                </div>

                {/* Proposal Advice Footer */}
                <div className="pt-2 flex items-start gap-2.5 text-xs text-slate-400 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed text-[11px]">
                    <strong className="text-slate-200 font-semibold">Pro Freelancer Tip:</strong> Tailor the first 2 sentences with a link to one relevant portfolio project before hitting send. Clients on Upwork and LinkedIn scan the preview snippet first!
                  </p>
                </div>

              </div>
            ) : (
              <div className="glass-panel rounded-2xl p-12 border border-slate-800/80 text-center space-y-4 flex flex-col items-center justify-center min-h-[380px]">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="space-y-1 max-w-sm">
                  <h4 className="text-sm font-bold text-white">Your proposal will appear here</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Paste a job description on the left or select one of the quick samples to test the generator.
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
