import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Cpu,
  FileText,
  UserCheck,
  DollarSign,
  FolderGit2,
  TrendingUp,
  Award,
  ArrowUpRight,
  Copy,
  Check,
  Plus,
  Clock,
  Briefcase
} from 'lucide-react';
import { getProfile, getLatestAnalysis, getProposals, getSavedProjects } from '../utils/storage.js';
import ScoreGauge from '../components/ScoreGauge.jsx';

export default function DashboardPage({ onNavigate, showToast }) {
  const [profile, setProfile] = useState(() => getProfile());
  const [analysis, setAnalysis] = useState(() => getLatestAnalysis());
  const [proposals, setProposals] = useState(() => getProposals());
  const [projects, setProjects] = useState(() => getSavedProjects());
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    setProfile(getProfile());
    setAnalysis(getLatestAnalysis());
    setProposals(getProposals());
    setProjects(getSavedProjects());
  }, []);

  const readinessScore = analysis?.readinessScore || profile.readyScore || 78;
  const skillsList = analysis?.strongSkills || profile.skills || ['React', 'JavaScript', 'Node.js', 'Tailwind CSS'];

  const handleCopyProposal = (prop) => {
    const textToCopy = prop.proposalText || prop.excerpt || `${prop.jobTitle}\n${prop.clientName}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(prop.id);
    showToast({ message: 'Proposal copied to clipboard!', type: 'success' });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'In Progress':
        return 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30';
      default:
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
    }
  };

  return (
    <div className="space-y-8 py-4 pb-16">
      
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Welcome back, {profile.name || 'Freelancer'}
            </h1>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
              {profile.experienceLevel || 'Intermediate'} Level
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {profile.title || 'Freelance Specialist'} • Target: {profile.currency || 'USD'} ${profile.hourlyRate || 55}/hr
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('proposal-generator')}
            id="dash-quick-proposal-btn"
            className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Proposal</span>
          </button>
          <button
            onClick={() => onNavigate('skill-analyzer')}
            id="dash-quick-analyzer-btn"
            className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
          >
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span>Audit Skills</span>
          </button>
        </div>
      </div>

      {/* Top Row: Key Metrics & Scores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Readiness Score Card */}
        <div className="glass-panel rounded-xl p-5 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Freelance Readiness</span>
            <div className="text-2xl font-extrabold text-white">{readinessScore}%</div>
            <p className="text-[11px] text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>{readinessScore >= 75 ? 'Market Ready' : 'Developing'}</span>
            </p>
          </div>
          <ScoreGauge score={readinessScore} size="small" label="" />
        </div>

        {/* Profile Strength Card */}
        <div className="glass-panel rounded-xl p-5 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Profile Optimization</span>
            <div className="text-2xl font-extrabold text-white">82%</div>
            <button
              onClick={() => onNavigate('profile-improver')}
              className="text-[11px] text-indigo-400 hover:underline flex items-center gap-0.5"
            >
              <span>Audit details</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Saved Proposals Card */}
        <div className="glass-panel rounded-xl p-5 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Recent Proposals</span>
            <div className="text-2xl font-extrabold text-white">{proposals.length}</div>
            <button
              onClick={() => onNavigate('proposal-generator')}
              className="text-[11px] text-indigo-400 hover:underline flex items-center gap-0.5"
            >
              <span>Create another</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        {/* Saved Projects Card */}
        <div className="glass-panel rounded-xl p-5 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Portfolio Projects</span>
            <div className="text-2xl font-extrabold text-white">{projects.length}</div>
            <button
              onClick={() => onNavigate('portfolio-planner')}
              className="text-[11px] text-indigo-400 hover:underline flex items-center gap-0.5"
            >
              <span>Manage case studies</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <FolderGit2 className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Middle Section: Skills & Recommended Services */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active & Strong Skills */}
        <div className="glass-panel rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-white">Your Strong Skills</h3>
            </div>
            <button
              onClick={() => onNavigate('skill-analyzer')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Edit in Analyzer
            </button>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Skills identified as high-leverage for freelance contracts:
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {skillsList.map((skill, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800/90 text-slate-200 border border-slate-700/80 hover:border-indigo-500/50 transition"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800/80 text-xs text-slate-400 space-y-2">
            <span className="font-semibold text-slate-300">Category Focus:</span>
            <p className="text-[11px] text-slate-400">
              {analysis?.category || 'Web & Full-Stack Development'}
            </p>
          </div>
        </div>

        {/* Recommended Freelance Services */}
        <div className="lg:col-span-2 glass-panel rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white">Recommended Service Offerings</h3>
            </div>
            <button
              onClick={() => onNavigate('pricing-guide')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
            >
              View Rate Guide
            </button>
          </div>

          <p className="text-xs text-slate-400">
            Packaged services you can offer immediately based on your skills:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {(analysis?.recommendedServices || [
              { name: 'Custom Web Application MVP', demand: 'High', avgRate: '$45 - $95/hr', deliverable: 'End-to-end web app with auth and database' },
              { name: 'High-Converting Landing Page', demand: 'Very High', avgRate: '$35 - $75/hr', deliverable: 'Fast, responsive marketing site' },
              { name: 'Third-Party API & Payment Gateway', demand: 'High', avgRate: '$50 - $110/hr', deliverable: 'Secure API connects and webhook integration' },
              { name: 'Performance & Speed Optimization', demand: 'Medium', avgRate: '$40 - $80/hr', deliverable: 'Core Web Vitals & mobile audit' }
            ]).slice(0, 4).map((service, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 rounded-lg p-3.5 border border-slate-800 hover:border-indigo-500/40 transition space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-semibold text-slate-200 line-clamp-1">{service.name}</h4>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 shrink-0">
                    {service.demand} Demand
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2">{service.deliverable}</p>
                <div className="text-[11px] font-semibold text-emerald-400">{service.avgRate}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Row: Saved Projects & Recent Proposals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Saved Portfolio Projects */}
        <div className="glass-panel rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Portfolio Projects ({projects.length})</h3>
            </div>
            <button
              onClick={() => onNavigate('portfolio-planner')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
            >
              <span>Open Planner</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {projects.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400 space-y-2">
                <p>No portfolio projects saved yet.</p>
                <button
                  onClick={() => onNavigate('portfolio-planner')}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-medium"
                >
                  Generate Project Ideas
                </button>
              </div>
            ) : (
              projects.slice(0, 3).map((proj) => (
                <div
                  key={proj.id}
                  className="bg-slate-900/60 rounded-lg p-3.5 border border-slate-800/80 hover:border-slate-700 transition flex flex-col justify-between gap-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-semibold text-white">{proj.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{proj.problem || proj.summary}</p>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getStatusBadge(proj.status)} shrink-0`}>
                      {proj.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Target: {proj.targetClient || 'B2B Founders'}</span>
                    <span className="text-emerald-400 font-medium">{proj.estimatedValue || '$1,500+'}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Proposals */}
        <div className="glass-panel rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white">Recent Proposals ({proposals.length})</h3>
            </div>
            <button
              onClick={() => onNavigate('proposal-generator')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
            >
              <span>Write New</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {proposals.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400 space-y-2">
                <p>No proposals generated yet.</p>
                <button
                  onClick={() => onNavigate('proposal-generator')}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-medium"
                >
                  Create Your First Proposal
                </button>
              </div>
            ) : (
              proposals.slice(0, 3).map((prop) => (
                <div
                  key={prop.id}
                  className="bg-slate-900/60 rounded-lg p-3.5 border border-slate-800/80 hover:border-slate-700 transition space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-semibold text-white line-clamp-1">{prop.jobTitle}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Client: {prop.clientName || 'Direct Client'}</p>
                    </div>
                    <button
                      onClick={() => handleCopyProposal(prop)}
                      id={`copy-prop-btn-${prop.id}`}
                      className="p-1.5 rounded-md bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition shrink-0"
                      title="Copy proposal text"
                      aria-label="Copy proposal"
                    >
                      {copiedId === prop.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 italic line-clamp-2 bg-slate-950/40 p-2 rounded border border-slate-900">
                    "{prop.excerpt || prop.proposalText?.slice(0, 110)}..."
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {prop.createdAt || 'Recent'}
                    </span>
                    <span className="text-indigo-400 font-medium">{prop.tone || 'Consultative'}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
