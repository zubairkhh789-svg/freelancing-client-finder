import React from 'react';
import { Shield, Zap } from 'lucide-react';
import BrandLogo from './BrandLogo.jsx';

export default function Footer({ onNavigate, theme, logoStyle }) {
  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/60 backdrop-blur-md text-slate-400 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        <div className="md:col-span-1 space-y-3">
          <div className="cursor-pointer" onClick={() => onNavigate('home')}>
            <BrandLogo theme={theme} styleId={logoStyle} size="normal" showSubtitle={false} />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed pt-1">
            The intelligent freelance command center for analyzing skills, winning clients with high-converting proposals, and mastering your pricing strategy.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 rounded-md px-2.5 py-1 w-fit">
            <Shield className="w-3 h-3" />
            <span>Private & Offline-First (LocalStorage)</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Core Tools</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigate('skill-analyzer')} className="hover:text-white transition text-left">
                Skill Analyzer & Readiness
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('proposal-generator')} className="hover:text-white transition text-left">
                Proposal Generator
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('profile-improver')} className="hover:text-white transition text-left">
                Profile Improver
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('pricing-guide')} className="hover:text-white transition text-left">
                Freelance Pricing Guide
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Portfolio & Workflow</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigate('portfolio-planner')} className="hover:text-white transition text-left">
                Portfolio Planner & Ideas
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition text-left">
                Freelancer Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('settings')} className="hover:text-white transition text-left">
                Profile & Rate Settings
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Freelance Strategy Tip</h4>
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs space-y-1.5">
            <div className={`flex items-center gap-1.5 font-medium ${theme?.iconText || 'text-emerald-400'}`}>
              <Zap className="w-3.5 h-3.5" />
              <span>Conversion Golden Rule</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Clients hire for certainty, not buzzwords. Address their specific problem in the first 2 lines of your proposal to boost response rates by 3x.
            </p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
        <p>© {new Date().getFullYear()} Freelance Client Finder. Built for independent creators & professionals.</p>
        <p className="flex items-center gap-1">
          Designed with modern React + Vite + Tailwind
        </p>
      </div>
    </footer>
  );
}
