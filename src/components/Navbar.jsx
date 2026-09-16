import React, { useState } from 'react';
import {
  Briefcase,
  LayoutDashboard,
  Cpu,
  FileText,
  UserCheck,
  DollarSign,
  FolderGit2,
  Settings,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import BrandLogo from './BrandLogo.jsx';
import ThemeColorPicker from './ThemeColorPicker.jsx';

export default function Navbar({
  activePage,
  onNavigate,
  theme,
  onSelectTheme,
  logoStyle,
  onSelectLogoStyle
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Briefcase },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'skill-analyzer', label: 'Skill Analyzer', icon: Cpu },
    { id: 'proposal-generator', label: 'Proposal Generator', icon: FileText },
    { id: 'profile-improver', label: 'Profile Improver', icon: UserCheck },
    { id: 'pricing-guide', label: 'Pricing Guide', icon: DollarSign },
    { id: 'portfolio-planner', label: 'Portfolio Planner', icon: FolderGit2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (pageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo with Dynamic Style & Color */}
          <button
            onClick={() => handleNavClick('home')}
            id="nav-logo"
            className="flex items-center text-left focus:outline-none group cursor-pointer"
          >
            <BrandLogo theme={theme} styleId={logoStyle} size="normal" showSubtitle={true} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? (theme?.activeNav || 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/10')
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? (theme?.iconText || 'text-emerald-400') : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Color/Logo Picker, Quick CTA & Mobile Hamburger */}
          <div className="flex items-center gap-2.5">
            {/* Color & Logo Switcher Tool */}
            <ThemeColorPicker
              currentTheme={theme}
              onSelectTheme={onSelectTheme}
              currentLogoStyle={logoStyle}
              onSelectLogoStyle={onSelectLogoStyle}
            />

            <button
              onClick={() => handleNavClick('skill-analyzer')}
              id="header-analyze-cta"
              className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-md active:scale-95 ${
                theme?.button || 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
              }`}
            >
              <span>Analyze Skills</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu toggle button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile & Tablet Dropdown Navigation */}
      {mobileMenuOpen && (
        <div id="mobile-nav-menu" className="xl:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-2 pb-5 space-y-2 backdrop-blur-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full text-left transition ${
                    isActive
                      ? (theme?.activeNav || 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40')
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <div className={`p-1.5 rounded-md ${isActive ? 'bg-slate-800 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800/80 mt-2 flex justify-between items-center text-xs text-slate-400 px-1">
            <span>Theme: <strong className="text-white">{theme?.name}</strong></span>
            <span className={theme?.iconText || 'text-emerald-400'}>Active</span>
          </div>
        </div>
      )}
    </header>
  );
}
