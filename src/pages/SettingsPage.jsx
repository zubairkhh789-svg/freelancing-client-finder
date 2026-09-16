import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Save,
  Download,
  Upload,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  User,
  Palette,
  Sparkles,
  Check
} from 'lucide-react';
import { getProfile, saveProfile, exportAllData, importAllData, resetAllData } from '../utils/storage.js';
import { THEMES } from '../utils/theme.js';
import BrandLogo from '../components/BrandLogo.jsx';

export default function SettingsPage({ showToast, theme, onSelectTheme, logoStyle, onSelectLogoStyle }) {
  const [profile, setProfile] = useState(() => getProfile());
  const [name, setName] = useState(profile.name || 'Alex Rivera');
  const [title, setTitle] = useState(profile.title || 'Full-Stack React & Node.js Developer');
  const [hourlyRate, setHourlyRate] = useState(profile.hourlyRate || 55);
  const [currency, setCurrency] = useState(profile.currency || 'USD');
  const [primaryPlatform, setPrimaryPlatform] = useState(profile.primaryPlatform || 'Upwork');
  const [experienceLevel, setExperienceLevel] = useState(profile.experienceLevel || 'Intermediate');
  const [errorMsg, setErrorMsg] = useState('');

  const logoStyles = [
    { id: 'radar', name: 'Client Radar', desc: 'Precision client scanner' },
    { id: 'compass', name: 'Pathfinder', desc: 'Career compass' },
    { id: 'briefcase', name: 'Portfolio', desc: 'Professional suite' },
    { id: 'target', name: 'Bullseye', desc: 'High-ticket target' }
  ];

  const handleSaveProfileSettings = (e) => {
    if (e) e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!title.trim()) {
      setErrorMsg('Please enter your title.');
      return;
    }

    setErrorMsg('');
    const updated = {
      ...profile,
      name: name.trim(),
      title: title.trim(),
      hourlyRate: Number(hourlyRate),
      currency,
      primaryPlatform,
      experienceLevel
    };
    saveProfile(updated);
    setProfile(updated);
    showToast({ message: 'Settings saved successfully!', type: 'success' });
  };

  const handleExportBackup = () => {
    const data = exportAllData();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `freelance_client_finder_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast({ message: 'Backup JSON downloaded!', type: 'success' });
  };

  const handleImportBackup = (e) => {
    const fileReader = new FileReader();
    const file = e.target.files?.[0];
    if (!file) return;

    fileReader.readAsText(file, 'UTF-8');
    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        importAllData(parsed);
        const updatedProf = getProfile();
        setProfile(updatedProf);
        setName(updatedProf.name);
        setTitle(updatedProf.title);
        setHourlyRate(updatedProf.hourlyRate);
        setCurrency(updatedProf.currency);
        setPrimaryPlatform(updatedProf.primaryPlatform);
        setExperienceLevel(updatedProf.experienceLevel);
        showToast({ message: 'Data imported successfully!', type: 'success' });
      } catch (err) {
        showToast({ message: 'Failed to import: Invalid JSON format', type: 'error' });
      }
    };
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all proposals, projects, and settings to starter demo data?')) {
      resetAllData();
      const updatedProf = getProfile();
      setProfile(updatedProf);
      setName(updatedProf.name);
      setTitle(updatedProf.title);
      setHourlyRate(updatedProf.hourlyRate);
      setCurrency(updatedProf.currency);
      setPrimaryPlatform(updatedProf.primaryPlatform);
      setExperienceLevel(updatedProf.experienceLevel);
      showToast({ message: 'Reset to sample data completed.', type: 'info' });
    }
  };

  return (
    <div className="space-y-10 py-4 pb-20">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold">
          <SettingsIcon className="w-3.5 h-3.5" />
          <span>Configuration & Branding</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          App Settings & Branding
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
          Customize your brand logo, theme color palette, and default freelancer profile parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Profile Settings (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSaveProfileSettings} className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-5">
            
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <User className={`w-4 h-4 ${theme?.iconText || 'text-emerald-400'}`} />
              <h3 className="text-sm font-bold text-white">Freelancer Profile Defaults</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Your Name
                </label>
                <input
                  type="text"
                  id="settings-name-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Primary Freelance Channel
                </label>
                <select
                  id="settings-platform-select"
                  value={primaryPlatform}
                  onChange={(e) => setPrimaryPlatform(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500 transition"
                >
                  <option value="Upwork">Upwork</option>
                  <option value="Direct Outreach">Direct Inbound / Cold Email</option>
                  <option value="LinkedIn">LinkedIn Services</option>
                  <option value="Fiverr">Fiverr Pro</option>
                  <option value="Toptal">Toptal</option>
                  <option value="Freelancer.com">Freelancer.com</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Headline / Professional Title
              </label>
              <input
                type="text"
                id="settings-title-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Target Hourly Rate
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500 text-xs">$</span>
                  <input
                    type="number"
                    id="settings-rate-input"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Currency
                </label>
                <select
                  id="settings-currency-select"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500 transition"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="CAD">CAD ($)</option>
                  <option value="AUD">AUD ($)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Experience Tier
                </label>
                <select
                  id="settings-exp-select"
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500 transition"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Senior">Senior / Expert</option>
                </select>
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{errorMsg}</span>
              </p>
            )}

            <button
              type="submit"
              id="save-settings-btn"
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md ${
                theme?.button || 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Profile Defaults</span>
            </button>

          </form>
        </div>

        {/* Branding & Data Tools (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Logo & Theme Customizer Card */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Palette className={`w-4 h-4 ${theme?.iconText || 'text-emerald-400'}`} />
                <span>Brand Logo & Theme Color</span>
              </h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${theme?.badge || 'bg-emerald-500/15 text-emerald-300'}`}>
                {theme?.name}
              </span>
            </div>

            {/* Live Logo Preview Box */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Live Brand Logo Preview</span>
                <BrandLogo theme={theme} styleId={logoStyle} size="large" showSubtitle={true} />
              </div>
            </div>

            {/* Color Palette Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
                Choose Website Accent Color
              </label>
              <div className="grid grid-cols-3 gap-2">
                {THEMES.map((t) => {
                  const isSelected = theme?.id === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      id={`settings-color-${t.id}`}
                      onClick={() => onSelectTheme && onSelectTheme(t.id)}
                      className={`p-2.5 rounded-xl border flex items-center gap-2 transition text-xs font-semibold ${
                        isSelected
                          ? 'bg-slate-800 border-white/80 text-white shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center text-white"
                        style={{ backgroundColor: t.accentColor }}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </span>
                      <span className="truncate text-[11px]">{t.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Logo Emblem Selector */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
                Choose Logo Emblem Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {logoStyles.map((item) => {
                  const isSelected = logoStyle === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      id={`settings-logo-${item.id}`}
                      onClick={() => onSelectLogoStyle && onSelectLogoStyle(item.id)}
                      className={`px-3 py-2 rounded-xl border text-left transition text-xs flex items-center justify-between ${
                        isSelected
                          ? 'bg-slate-800 border-emerald-500 text-white font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div>{item.name}</div>
                        <div className="text-[10px] text-slate-500 font-normal">{item.desc}</div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* LocalStorage Data Controls */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Local Storage & Backup</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              All your skills, generated proposals, project ideas, and profile notes are stored privately in your browser's local memory.
            </p>

            <div className="space-y-2.5 pt-2">
              
              {/* Export Button */}
              <button
                type="button"
                onClick={handleExportBackup}
                id="export-backup-btn"
                className="w-full py-2.5 px-3.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 transition flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Export Backup (JSON)</span>
                </span>
                <span className="text-[10px] text-slate-500">Download</span>
              </button>

              {/* Import Button */}
              <label
                htmlFor="import-backup-file-input"
                id="import-backup-label"
                className="w-full py-2.5 px-3.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 transition flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-cyan-400" />
                  <span>Import Backup</span>
                </span>
                <span className="text-[10px] text-slate-500">Select file</span>
                <input
                  id="import-backup-file-input"
                  type="file"
                  accept=".json"
                  onChange={handleImportBackup}
                  className="hidden"
                />
              </label>

              {/* Reset to sample data */}
              <button
                type="button"
                onClick={handleResetDefaults}
                id="reset-demo-data-btn"
                className="w-full py-2.5 px-3.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-amber-950/40 text-slate-300 hover:text-amber-300 border border-slate-700 hover:border-amber-700/50 transition flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-amber-400" />
                  <span>Reset to Demo Sample Data</span>
                </span>
                <span className="text-[10px] text-slate-500">Restore</span>
              </button>

            </div>
          </div>

          {/* Privacy Note */}
          <div className="rounded-2xl p-5 bg-slate-900/40 border border-slate-800 text-xs text-slate-400 space-y-2">
            <span className="font-semibold text-slate-300 block">Security & Privacy Assurance</span>
            <p className="text-[11px] leading-relaxed">
              No personal data or proposals are uploaded to external tracking servers. Everything executes 100% client-side.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
