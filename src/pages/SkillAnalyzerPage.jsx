import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Sparkles,
  Plus,
  X,
  CheckCircle2,
  TrendingUp,
  Briefcase,
  AlertTriangle,
  Lightbulb,
  FolderPlus,
  Layers,
  Save,
  ArrowRight
} from 'lucide-react';
import { FREELANCE_CATEGORIES } from '../data/freelanceData.js';
import { analyzeSkills } from '../utils/skillEngine.js';
import { getProfile, saveProfile, saveAnalysis, saveProject } from '../utils/storage.js';
import ScoreGauge from '../components/ScoreGauge.jsx';

export default function SkillAnalyzerPage({ onNavigate, showToast }) {
  const [profile] = useState(() => getProfile());
  const [selectedCategory, setSelectedCategory] = useState(profile.category || 'web_dev');
  const [experienceLevel, setExperienceLevel] = useState(profile.experienceLevel || 'Intermediate');
  const [skills, setSkills] = useState(profile.skills || ['React', 'JavaScript', 'Node.js', 'Tailwind CSS']);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [results, setResults] = useState(null);

  // Automatically run initial analysis on mount
  useEffect(() => {
    runAnalysis(skills, experienceLevel, selectedCategory);
  }, []);

  const currentCategoryData = FREELANCE_CATEGORIES.find(c => c.id === selectedCategory) || FREELANCE_CATEGORIES[0];

  const handleAddSkill = (skillToAdd) => {
    const trimmed = (skillToAdd || newSkillInput).trim();
    if (!trimmed) {
      setErrorMsg('Please enter a skill name.');
      return;
    }
    if (skills.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
      setErrorMsg('This skill is already in your list.');
      return;
    }
    setErrorMsg('');
    const updated = [...skills, trimmed];
    setSkills(updated);
    setNewSkillInput('');
    runAnalysis(updated, experienceLevel, selectedCategory);
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updated = skills.filter(s => s !== skillToRemove);
    setSkills(updated);
    if (updated.length === 0) {
      setErrorMsg('Add at least one skill to calculate your readiness.');
    } else {
      setErrorMsg('');
      runAnalysis(updated, experienceLevel, selectedCategory);
    }
  };

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setErrorMsg('');
    runAnalysis(skills, experienceLevel, catId);
  };

  const handleExperienceChange = (lvl) => {
    setExperienceLevel(lvl);
    runAnalysis(skills, lvl, selectedCategory);
  };

  const runAnalysis = (currentSkills, currentLevel, currentCat) => {
    if (!currentSkills || currentSkills.length === 0) {
      setResults(null);
      return;
    }
    const outcome = analyzeSkills({
      skills: currentSkills,
      experienceLevel: currentLevel,
      categoryId: currentCat
    });
    setResults(outcome);
    saveAnalysis(outcome);
  };

  const handleSaveToProfile = () => {
    if (!results) return;
    const currentProf = getProfile();
    const updated = {
      ...currentProf,
      category: selectedCategory,
      experienceLevel,
      skills,
      readyScore: results.readinessScore
    };
    saveProfile(updated);
    showToast({ message: 'Profile updated with your latest skill audit!', type: 'success' });
  };

  const handleAddIdeaToPlanner = (idea) => {
    saveProject({
      title: idea.title,
      category: currentCategoryData.name,
      status: 'Idea',
      targetClient: idea.targetClients,
      problem: idea.summary,
      solution: idea.impactMetric,
      deliverables: idea.deliverables.join(', '),
      estimatedValue: '$2,000 - $4,500'
    });
    showToast({ message: `Saved "${idea.title}" to your Portfolio Planner!`, type: 'success' });
  };

  return (
    <div className="space-y-10 py-4 pb-20">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
          <Cpu className="w-3.5 h-3.5" />
          <span>Intelligent Freelance Audit</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Freelance Skill Analyzer
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Evaluate your market readiness, identify your strongest selling points, discover packaged services clients pay for, and pinpoint high-value skill improvements.
        </p>
      </div>

      {/* Input Configuration Panel */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Category Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Primary Freelance Domain
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              id="analyzer-category-select"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500 transition"
            >
              {FREELANCE_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Experience Level Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Experience Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Beginner', 'Intermediate', 'Senior'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  id={`exp-lvl-${lvl.toLowerCase()}`}
                  onClick={() => handleExperienceChange(lvl)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition text-center ${
                    experienceLevel === lvl
                      ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500 shadow-sm shadow-indigo-500/20'
                      : 'bg-slate-900/80 text-slate-400 border-slate-700 hover:border-slate-600 hover:text-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Skills Management */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Your Skills & Tools ({skills.length})
            </label>
            <span className="text-[11px] text-slate-400">Click any tag to remove</span>
          </div>

          {/* Active Skill Tags */}
          <div className="flex flex-wrap gap-2 min-h-[44px] p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            {skills.length === 0 ? (
              <span className="text-xs text-slate-500 italic">No skills added yet. Type below or pick from recommendations.</span>
            ) : (
              skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-indigo-500/15 text-indigo-200 border border-indigo-500/30 group hover:border-rose-500/40 hover:bg-rose-500/10 transition"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-indigo-400 hover:text-rose-400 p-0.5 rounded transition"
                    title={`Remove ${skill}`}
                    aria-label={`Remove ${skill}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))
            )}
          </div>

          {/* Add custom skill input */}
          <div className="flex gap-2">
            <input
              type="text"
              id="new-skill-input"
              value={newSkillInput}
              onChange={(e) => {
                setNewSkillInput(e.target.value);
                setErrorMsg('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              placeholder="Type a skill (e.g. Next.js, Stripe, Figma) and press Enter..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500 transition placeholder:text-slate-500"
            />
            <button
              type="button"
              id="add-skill-button"
              onClick={() => handleAddSkill()}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>

          {errorMsg && (
            <p className="text-xs text-rose-400 flex items-center gap-1.5 pt-1">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMsg}</span>
            </p>
          )}

          {/* Suggested skills for active category */}
          <div className="pt-2 space-y-2">
            <span className="text-[11px] font-semibold text-slate-400">
              Quick-add popular skills in {currentCategoryData.name}:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {currentCategoryData.skills.filter(s => !skills.includes(s)).slice(0, 10).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleAddSkill(s)}
                  className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition flex items-center gap-1"
                >
                  <Plus className="w-3 h-3 text-slate-500" />
                  <span>{s}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Analysis Results Display */}
      {results && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Top Score Banner */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{results.readinessRating.label}</span>
              </div>
              <h2 className="text-2xl font-bold text-white">
                Readiness Score: {results.readinessScore}/100
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                {results.summary}
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  id="save-analysis-to-profile-btn"
                  onClick={handleSaveToProfile}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center gap-2 shadow-md shadow-indigo-600/20"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Audit to My Profile</span>
                </button>
              </div>
            </div>

            <div className="shrink-0 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <ScoreGauge score={results.readinessScore} size="large" label="Market Readiness" />
            </div>
          </div>

          {/* Strong Skills vs Skills to Improve */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Strong Skills */}
            <div className="glass-panel rounded-xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-indigo-400">
                <Sparkles className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">Your Strongest Selling Points</h3>
              </div>
              <p className="text-xs text-slate-400">
                These core competencies make you competitive for high-demand client assignments:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {results.strongSkills.map((s, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills to Improve */}
            <div className="glass-panel rounded-xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-amber-400">
                <TrendingUp className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">High-ROI Skills to Learn Next</h3>
              </div>
              <p className="text-xs text-slate-400">
                Adding these capabilities unlocks larger client budgets and higher retainers:
              </p>
              <div className="space-y-2.5 pt-1">
                {results.skillsToImprove.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{item.skill}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        {item.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{item.reason}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Recommended Freelance Services */}
          <div className="glass-panel rounded-xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-purple-400">
                <Briefcase className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">Recommended Services to Offer</h3>
              </div>
              <button
                onClick={() => onNavigate('pricing-guide')}
                className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>Check rate benchmarks</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <p className="text-xs text-slate-400">
              Package these specific deliverables instead of billing for ambiguous general hours:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {results.recommendedServices.map((service, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/40 transition space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-white">{service.name}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">
                      {service.demand} Demand
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{service.deliverable}</p>
                  <div className="pt-1 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Benchmark Rate:</span>
                    <span className="font-bold text-emerald-400">{service.avgRate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suitable Job Categories & Profitable Niches */}
          <div className="glass-panel rounded-xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400">
              <Layers className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Suitable Job Categories & Niches</h3>
            </div>
            <p className="text-xs text-slate-400">
              Search for these niches on job boards or pitch these business segments directly:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {results.suitableCategories.map((cat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">{cat.title}</h4>
                    <span className="text-[10px] font-semibold text-indigo-400">{cat.matchRate}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{cat.description}</p>
                  <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-1.5">
                    {cat.niches.map((n, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Portfolio Project Ideas */}
          <div className="glass-panel rounded-xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400">
                <Lightbulb className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">Portfolio Ideas to Build Client Trust</h3>
              </div>
              <button
                onClick={() => onNavigate('portfolio-planner')}
                className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>Open full planner</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <p className="text-xs text-slate-400">
              Clients do not care about toy code. They hire people who solve realistic commercial problems:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {results.portfolioIdeas.map((idea, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-white">{idea.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{idea.summary}</p>
                    <div className="text-[11px] text-indigo-400 pt-1">
                      <span className="font-semibold text-slate-300">Target Client:</span> {idea.targetClients}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddIdeaToPlanner(idea)}
                    className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-200 border border-slate-700/80 transition flex items-center justify-center gap-1.5"
                  >
                    <FolderPlus className="w-3.5 h-3.5" />
                    <span>Save to Portfolio Planner</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
