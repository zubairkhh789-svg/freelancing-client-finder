import React from 'react';

export default function BrandLogo({ theme, styleId = 'radar', size = 'normal', showSubtitle = true }) {
  const isLarge = size === 'large';
  const boxSize = isLarge ? 'w-12 h-12' : 'w-10 h-10';

  // Render vector badge based on styleId
  const renderIcon = () => {
    switch (styleId) {
      case 'compass':
        return (
          <svg viewBox="0 0 24 24" fill="none" className={isLarge ? 'w-7 h-7' : 'w-5 h-5'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 19 21 12 17 5 21 12 2" fill="rgba(255,255,255,0.2)" />
            <circle cx="12" cy="12" r="2" fill="white" />
          </svg>
        );
      case 'briefcase':
        return (
          <svg viewBox="0 0 24 24" fill="none" className={isLarge ? 'w-6 h-6' : 'w-5 h-5'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            <circle cx="12" cy="14" r="1.5" fill="white" />
          </svg>
        );
      case 'target':
        return (
          <svg viewBox="0 0 24 24" fill="none" className={isLarge ? 'w-6 h-6' : 'w-5 h-5'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" strokeDasharray="3 3" />
            <circle cx="12" cy="12" r="2" fill="white" />
            <path d="M12 2v3m0 14v3M2 12h3m14 0h3" />
          </svg>
        );
      case 'radar':
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" className={isLarge ? 'w-6 h-6' : 'w-5 h-5'} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Outer radar circle */}
            <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
            {/* Inner radar circle */}
            <circle cx="12" cy="12" r="5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
            {/* Center target node */}
            <circle cx="12" cy="12" r="2" fill="white" />
            {/* Radar scan needle pointing northeast */}
            <line x1="12" y1="12" x2="19" y2="5" stroke="white" strokeWidth="2" strokeLinecap="round" />
            {/* Signal blip / client found */}
            <circle cx="17.5" cy="6.5" r="1.5" fill="#fef08a" />
          </svg>
        );
    }
  };

  const gradientClass = theme?.logoGradient || 'from-emerald-600 via-emerald-500 to-teal-400 shadow-emerald-500/25';

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Visual Logo Emblem */}
      <div
        className={`relative ${boxSize} rounded-xl bg-gradient-to-tr ${gradientClass} flex items-center justify-center shadow-lg transition-all duration-300 transform group-hover:scale-105 group-hover:rotate-1`}
      >
        {/* Subtle inner glass highlight */}
        <div className="absolute inset-0 rounded-xl bg-white/10 backdrop-blur-[1px] pointer-events-none" />
        <div className="relative text-white flex items-center justify-center">
          {renderIcon()}
        </div>
      </div>

      {/* Brand Typography */}
      <div>
        <div className="flex items-center gap-1.5 leading-none">
          <span className="text-base sm:text-lg font-black tracking-tight text-white flex items-center">
            Client<span className={theme?.iconText || 'text-emerald-400'}>Finder</span>
          </span>
          <span className={`text-[10px] uppercase font-extrabold tracking-wider px-1.5 py-0.5 rounded-md ${theme?.badge || 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}`}>
            PRO
          </span>
        </div>
        {showSubtitle && (
          <p className="text-[10px] text-slate-400 font-medium tracking-wide mt-1">
            Freelance Client Platform
          </p>
        )}
      </div>
    </div>
  );
}
