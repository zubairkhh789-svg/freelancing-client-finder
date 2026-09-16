import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  Sparkles,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Save,
  ArrowRight,
  TrendingUp,
  Tag,
  ShieldCheck
} from 'lucide-react';
import { analyzeAndImproveProfile } from '../utils/profileEngine.js';
import { getProfile, saveProfile } from '../utils/storage.js';
import ScoreGauge from '../components/ScoreGauge.jsx';

export default function ProfileImproverPage({ showToast }) {
  const [profile, setProfile] = useState(() => getProfile());

  // Form inputs
  const [title, setTitle] = useState(profile.title || '');
  const [bio, setBio] = useState(profile.bio || '');
  const [hourlyRate, setHourlyRate] = useState(profile.hourlyRate || 55);
  const [experienceLevel, setExperienceLevel] = useState(profile.experienceLevel || 'Intermediate');
  
  // Results
  const [auditResult, setAuditResult] = useState(null);
  const [isCopiedBio, setIsCopiedBio] = useState(false);
  const [isCopiedTitle, setIsCopiedTitle] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    runAudit(title, bio, hourlyRate, experienceLevel);
  }, []);

  const runAudit = (currentTitle, currentBio, rate, exp) => {
    const outcome = analyzeAndImproveProfile({
      name: profile.name || 'Alex',
      title: currentTitle,
      bio: currentBio,
      skills: profile.skills || [],
      hourlyRate: rate,
      currency: profile.currency || 'USD',
      experienceLevel: exp
    });
    setAuditResult(outcome);
  };

  const handleAuditSubmit = (e) => {
    if (e) e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Please enter your professional profile title.');
      return;
    }
    if (!bio.trim()) {
      setErrorMsg('Please enter your profile bio or overview.');
      return;
    }
    setErrorMsg('');
    runAudit(title, bio, hourlyRate, experienceLevel);
    showToast({ message: 'Profile analyzed successfully!', type: 'success' });
  };

  const handleCopyBio = () => {
    if (!auditResult) return;
    navigator.clipboard.writeText(auditResult.improvedBio);
    setIsCopiedBio(true);
    showToast({ message: 'Improved bio copied to clipboard!', type: 'success' });
    setTimeout(() => setIsCopiedBio(false), 2500);
  };

  const handleCopyTitle = () => {
    if (!auditResult) return;
    navigator.clipboard.writeText(auditResult.improvedTitle);
    setIsCopiedTitle(true);
    showToast({ message: 'Optimized headline copied!', type: 'success' });
    setTimeout(() => setIsCopiedTitle(false), 2500);
  };

  const handleApplyToProfile = () => {
    if (!auditResult) return;
    const updated = {
      ...profile,
      title: auditResult.improvedTitle,
      bio: auditResult.improvedBio,
      hourlyRate: Number(hourlyRate),
      experienceLevel
    };
    saveProfile(updated);
    setProfile(updated);
    setTitle(auditResult.improvedTitle);
    setBio(auditResult.improvedBio);
    showToast({ message: 'Improved profile applied and saved to LocalStorage!', type: 'success' });
  };

  const handleAddKeywordToBio = (kw) => {
    const updatedBio = bio.trim() ? `${bio.trim()}\n• Specialized in ${kw}` : `Specialized in ${kw}`;
    setBio(updatedBio);
    runAudit(title, updatedBio, hourlyRate, experienceLevel);
    showToast({ message: `Added "${kw}" into bio draft`, type: 'info' });
  };

  return (
    <div className="space-y-10 py-4 pb-20">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <UserCheck className="w-3.5 h-3.5" />
          <span>Profile Optimization Suite</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Profile Improver
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Transform a generic resume-style overview into a high-converting, client-focused profile that gets you invited to high-budget client contracts.
        </p>
      </div>

      {/* Input Form & Instant Audit Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <form onSubmit={handleAuditSubmit} className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-5">
            
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
              <h3 className="text-sm font-bold text-white">Your Current Profile Details</h3>
              <span className="text-[11px] text-slate-400">Upwork, LinkedIn, or Fiverr</span>
            </div>

            {/* Profile Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Professional Title / Headline *
              </label>
              <input
                type="text"
                id="profile-title-input"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="e.g. Full-Stack React & Node.js Developer"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            {/* Profile Bio / Overview */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Profile Bio / Overview *
                </label>
                <span className="text-[10px] text-slate-500">
                  {bio.split(/\s+/).filter(Boolean).length} words
                </span>
              </div>
              <textarea
                id="profile-bio-input"
                rows={8}
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="Paste your current freelance bio or overview text here..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500 transition resize-y placeholder:text-slate-500 leading-relaxed"
              />
            </div>

            {/* Rate & Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Hourly Rate ($ USD)
                </label>
                <input
                  type="number"
                  id="profile-rate-input"
                  min="10"
                  max="500"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Experience Tier
                </label>
                <select
                  id="profile-exp-select"
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500 transition"
                >
                  <option value="Beginner">Beginner (0-2 yrs)</option>
                  <option value="Intermediate">Intermediate (2-5 yrs)</option>
                  <option value="Senior">Senior / Expert (5+ yrs)</option>
                </select>
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-400 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </p>
            )}

            <button
              type="submit"
              id="analyze-profile-btn"
              className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Run Profile Audit & Generate Improvements</span>
            </button>

          </form>
        </div>

        {/* Right Audit & Improved Profile (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {auditResult ? (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Score Card */}
              <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    Profile Conversion Score
                  </span>
                  <div className="text-2xl font-extrabold text-white">
                    {auditResult.score}/100
                  </div>
                  <p className="text-xs font-medium text-indigo-300">
                    {auditResult.grade.label} — {auditResult.grade.text}
                  </p>
                </div>
                <ScoreGauge score={auditResult.score} size="normal" label="Conversion" />
              </div>

              {/* Actionable Improvement Suggestions */}
              <div className="glass-panel rounded-xl p-5 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-amber-400">
                  <Lightbulb className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">Improvement Suggestions</h4>
                </div>

                <div className="space-y-2.5">
                  {auditResult.suggestions.length === 0 ? (
                    <p className="text-xs text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Great job! Your profile hits all client conversion benchmarks.</span>
                    </p>
                  ) : (
                    auditResult.suggestions.map((sug, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-200">{sug.area}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300">
                            {sug.impact} Impact
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{sug.advice}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Useful Search Keywords */}
              <div className="glass-panel rounded-xl p-5 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-indigo-400">
                  <Tag className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    Useful High-Impact Keywords
                  </h4>
                </div>
                <p className="text-[11px] text-slate-400">
                  Click any keyword to append it directly to your draft:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {auditResult.usefulKeywords.map((kw, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddKeywordToBio(kw)}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-900 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-700/70 transition flex items-center gap-1"
                    >
                      <span>+ {kw}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Improved Profile Recommendation */}
              <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <h4 className="text-sm font-bold text-white">Client-Ready Improved Profile</h4>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyBio}
                      id="copy-improved-bio-btn"
                      className="px-3 py-1 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center gap-1.5 shadow-sm"
                    >
                      {isCopiedBio ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopiedBio ? 'Copied' : 'Copy Bio'}</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleApplyToProfile}
                      id="apply-improved-profile-btn"
                      className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-1.5 shadow-sm"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Apply to Profile</span>
                    </button>
                  </div>
                </div>

                {/* Improved Title */}
                <div className="space-y-1.5 bg-slate-950/60 p-3 rounded-xl border border-slate-900">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Optimized Title</span>
                    <button
                      onClick={handleCopyTitle}
                      className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                    >
                      {isCopiedTitle ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>Copy Headline</span>
                    </button>
                  </div>
                  <p className="text-xs font-semibold text-white">{auditResult.improvedTitle}</p>
                </div>

                {/* Improved Bio Text */}
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Transformed Bio (Client-Centric)</span>
                  <pre className="w-full text-xs text-slate-200 font-sans whitespace-pre-wrap leading-relaxed bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 max-h-80 overflow-y-auto">
                    {auditResult.improvedBio}
                  </pre>
                </div>

              </div>

            </div>
          ) : (
            <div className="glass-panel rounded-2xl p-12 text-center text-slate-400 space-y-3 flex flex-col items-center justify-center min-h-[400px]">
              <UserCheck className="w-10 h-10 text-slate-600" />
              <p className="text-sm">Click "Run Profile Audit" to see recommendations.</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
