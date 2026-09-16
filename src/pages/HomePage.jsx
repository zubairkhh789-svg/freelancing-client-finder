import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Cpu,
  FileText,
  UserCheck,
  DollarSign,
  FolderGit2,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
  Target,
  Award
} from 'lucide-react';

export default function HomePage({ onNavigate, theme }) {
  const features = [
    {
      id: 'skill-analyzer',
      title: 'Skill Analyzer & Readiness',
      badge: 'High Impact',
      icon: Cpu,
      color: 'indigo',
      description: 'Discover your market readiness score, identify strong skills, uncover high-demand service offerings, and spot high-ROI gaps.',
      action: 'Run Skill Audit'
    },
    {
      id: 'proposal-generator',
      title: 'Proposal Generator',
      badge: '1-Click Copy',
      icon: FileText,
      color: 'purple',
      description: 'Generate high-converting, tailored proposals based on actual client job descriptions with tone selection and strategic milestone framing.',
      action: 'Generate Proposal'
    },
    {
      id: 'profile-improver',
      title: 'Profile Improver',
      badge: 'Client-Centric',
      icon: UserCheck,
      color: 'blue',
      description: 'Audit your Upwork, LinkedIn, or Fiverr profile for client-first conversion, missing keywords, social proof, and compelling CTAs.',
      action: 'Optimize Profile'
    },
    {
      id: 'pricing-guide',
      title: 'Market Pricing Guide',
      badge: 'Benchmarks',
      icon: DollarSign,
      color: 'emerald',
      description: 'Benchmark your hourly and fixed-project pricing by category and experience level, backed by real-world market ranges.',
      action: 'Check Rates'
    },
    {
      id: 'portfolio-planner',
      title: 'Portfolio Planner',
      badge: 'Case Studies',
      icon: FolderGit2,
      color: 'amber',
      description: 'Generate project ideas that solve real business problems, and track your case study progress from idea to client-ready deliverable.',
      action: 'Plan Portfolio'
    }
  ];

  const valueProps = [
    {
      icon: Target,
      title: 'Client-Centric Positioning',
      text: 'Stop talking only about yourself. Shift your messaging toward the exact business outcomes clients pay top dollar for.'
    },
    {
      icon: Zap,
      title: 'Win Proposals in Minutes',
      text: 'Replace generic copy-paste proposals with targeted problem-breakdown pitches that grab client attention in seconds.'
    },
    {
      icon: Award,
      title: 'Charge What You Are Worth',
      text: 'Eliminate rate anxiety with transparent market benchmarks for beginner, intermediate, and senior freelancers.'
    }
  ];

  return (
    <div className="space-y-16 py-6 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 p-8 sm:p-12 lg:p-16">
        
        {/* Ambient background glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center space-y-6">
          
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${
            theme?.badge || 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>The All-In-One Toolkit for Modern Freelancers</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Win Better Clients, <br className="hidden sm:inline" />
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${
              theme?.textGradient || 'from-emerald-400 via-teal-300 to-cyan-400'
            }`}>
              Command Higher Rates
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Analyze your skill readiness, generate tailored proposals that win contracts, optimize your profile to rank higher, and build a high-converting portfolio.
          </p>

          {/* Call to action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('skill-analyzer')}
              id="hero-cta-analyze"
              className={`px-6 py-3.5 rounded-xl font-bold text-sm shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 ${
                theme?.button || 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white'
              }`}
            >
              <span>Analyze Your Skills</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('proposal-generator')}
              id="hero-cta-proposal"
              className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 hover:border-slate-600 transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-purple-400" />
              <span>Write a Proposal</span>
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              id="hero-cta-dashboard"
              className="px-5 py-3.5 rounded-xl font-semibold text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-all"
            >
              Go to Dashboard
            </button>
          </div>

          {/* Trust badges */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 border-t border-slate-800/80">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% Private & Local Storage</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>No API Keys or Setup Required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Works for Upwork, Fiverr & Direct</span>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Matrix */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Everything You Need to Scale Your Freelance Career
          </h2>
          <p className="text-sm text-slate-400">
            Select any tool below to begin optimizing your client acquisition workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                id={`feature-card-${feature.id}`}
                className="glass-panel glass-panel-hover rounded-xl p-6 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center text-indigo-400 group-hover:scale-105 group-hover:border-indigo-500/50 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {feature.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-800/60">
                  <button
                    onClick={() => onNavigate(feature.id)}
                    id={`feature-btn-${feature.id}`}
                    className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold bg-slate-800/80 hover:bg-indigo-600 hover:text-white text-slate-200 border border-slate-700/80 hover:border-indigo-500 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>{feature.action}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* The 3-Step Growth Engine */}
      <section className="glass-panel rounded-2xl p-8 sm:p-10 border border-slate-800 space-y-8">
        <div className="max-w-xl mx-auto text-center space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">The Blueprint</span>
          <h2 className="text-2xl font-bold text-white">How Top 5% Freelancers Win Consistently</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {valueProps.map((prop, idx) => {
            const Icon = prop.icon;
            return (
              <div key={idx} className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/70 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-400">Step 0{idx + 1}</span>
                </div>
                <h3 className="text-base font-bold text-white">{prop.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{prop.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Launch Banner */}
      <section className="rounded-2xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900 p-8 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl font-bold text-white">Ready to test your freelance readiness?</h3>
          <p className="text-xs text-slate-300 max-w-md">
            Input your skills to receive an instant readiness score, recommended services, and custom portfolio project ideas.
          </p>
        </div>
        <button
          onClick={() => onNavigate('skill-analyzer')}
          id="home-bottom-cta"
          className="px-6 py-3 rounded-xl text-xs font-bold bg-white text-slate-950 hover:bg-slate-100 transition shadow-lg shrink-0"
        >
          Start Skill Analyzer Now
        </button>
      </section>

    </div>
  );
}
