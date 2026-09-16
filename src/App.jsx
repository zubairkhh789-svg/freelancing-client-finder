import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Toast from './components/Toast.jsx';

import HomePage from './pages/HomePage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import SkillAnalyzerPage from './pages/SkillAnalyzerPage.jsx';
import ProposalGeneratorPage from './pages/ProposalGeneratorPage.jsx';
import ProfileImproverPage from './pages/ProfileImproverPage.jsx';
import PricingGuidePage from './pages/PricingGuidePage.jsx';
import PortfolioPlannerPage from './pages/PortfolioPlannerPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

import { getAppTheme, saveAppTheme, getLogoStyle, saveLogoStyle } from './utils/storage.js';
import { getThemeById } from './utils/theme.js';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [toast, setToast] = useState(null);

  // Theme & Logo state
  const [themeId, setThemeId] = useState(() => getAppTheme());
  const [logoStyle, setLogoStyle] = useState(() => getLogoStyle());

  const currentTheme = getThemeById(themeId);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const showToast = ({ message, type = 'success', duration = 3000 }) => {
    setToast({ message, type, duration });
  };

  const handleCloseToast = () => {
    setToast(null);
  };

  const handleSelectTheme = (newThemeId) => {
    setThemeId(newThemeId);
    saveAppTheme(newThemeId);
    const selected = getThemeById(newThemeId);
    showToast({ message: `Color theme updated to ${selected.name}!`, type: 'info' });
  };

  const handleSelectLogoStyle = (newStyleId) => {
    setLogoStyle(newStyleId);
    saveLogoStyle(newStyleId);
    showToast({ message: `Brand logo emblem updated!`, type: 'success' });
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage onNavigate={setActivePage} showToast={showToast} theme={currentTheme} />;
      case 'dashboard':
        return <DashboardPage onNavigate={setActivePage} showToast={showToast} theme={currentTheme} />;
      case 'skill-analyzer':
        return <SkillAnalyzerPage onNavigate={setActivePage} showToast={showToast} theme={currentTheme} />;
      case 'proposal-generator':
        return <ProposalGeneratorPage showToast={showToast} theme={currentTheme} />;
      case 'profile-improver':
        return <ProfileImproverPage showToast={showToast} theme={currentTheme} />;
      case 'pricing-guide':
        return <PricingGuidePage theme={currentTheme} />;
      case 'portfolio-planner':
        return <PortfolioPlannerPage showToast={showToast} theme={currentTheme} />;
      case 'settings':
        return (
          <SettingsPage
            showToast={showToast}
            theme={currentTheme}
            onSelectTheme={handleSelectTheme}
            logoStyle={logoStyle}
            onSelectLogoStyle={handleSelectLogoStyle}
          />
        );
      default:
        return <HomePage onNavigate={setActivePage} showToast={showToast} theme={currentTheme} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-slate-950 text-slate-100 ${currentTheme.selection || 'selection:bg-emerald-500/30 selection:text-emerald-200'}`}>
      
      {/* Background dynamic gradient highlights tailored to theme color */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-3xl opacity-20 transition-all duration-700"
          style={{
            background: `radial-gradient(circle, ${currentTheme.accentColor} 0%, transparent 70%)`
          }}
        />
        <div
          className="absolute top-1/3 -left-40 w-96 h-96 rounded-full blur-3xl opacity-10 transition-all duration-700"
          style={{
            background: currentTheme.accentColor
          }}
        />
        <div
          className="absolute bottom-1/4 -right-40 w-96 h-96 rounded-full blur-3xl opacity-10 transition-all duration-700"
          style={{
            background: currentTheme.accentColor
          }}
        />
      </div>

      {/* Main Navigation Header */}
      <Navbar
        activePage={activePage}
        onNavigate={setActivePage}
        theme={currentTheme}
        onSelectTheme={handleSelectTheme}
        logoStyle={logoStyle}
        onSelectLogoStyle={handleSelectLogoStyle}
      />

      {/* Page Body Container */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderActivePage()}
      </main>

      {/* Footer */}
      <Footer onNavigate={setActivePage} theme={currentTheme} logoStyle={logoStyle} />

      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={handleCloseToast} />

    </div>
  );
}
