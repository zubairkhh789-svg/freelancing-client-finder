import React, { useState, useEffect } from 'react';
import {
  FolderGit2,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Tag,
  AlertCircle,
  Lightbulb,
  Clock,
  Briefcase,
  ChevronDown,
  X
} from 'lucide-react';
import { getProfile, getSavedProjects, saveProject, deleteProject, updateProjectStatus } from '../utils/storage.js';
import { FREELANCE_CATEGORIES } from '../data/freelanceData.js';

export default function PortfolioPlannerPage({ showToast }) {
  const profile = getProfile();
  const [projects, setProjects] = useState(() => getSavedProjects());
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Idea' | 'In Progress' | 'Completed'
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [targetClient, setTargetClient] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [deliverables, setDeliverables] = useState('');
  const [techStackInput, setTechStackInput] = useState('');
  const [estimatedValue, setEstimatedValue] = useState('$2,500 - $4,500');
  const [errorMsg, setErrorMsg] = useState('');

  // Find recommendations for current user's profile
  const userCat = FREELANCE_CATEGORIES.find(c => c.id === profile.category) || FREELANCE_CATEGORIES[0];
  const recommendedIdeas = userCat.portfolioIdeas || [];

  const filteredProjects = projects.filter(p => {
    if (statusFilter === 'All') return true;
    return p.status === statusFilter;
  });

  const handleCreateProject = (e) => {
    if (e) e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Please enter a project title.');
      return;
    }
    if (!problem.trim()) {
      setErrorMsg('Please describe the client problem this project solves.');
      return;
    }

    const techArray = techStackInput
      ? techStackInput.split(',').map(s => s.trim()).filter(Boolean)
      : profile.skills.slice(0, 4);

    const newProject = {
      title: title.trim(),
      category,
      status: 'Idea',
      targetClient: targetClient.trim() || 'Early-Stage Founders',
      problem: problem.trim(),
      solution: solution.trim() || 'High-performance responsive deliverable with clear ROI metrics.',
      deliverables: deliverables.trim() || 'Interactive prototype, source code, documentation.',
      techStack: techArray,
      estimatedValue: estimatedValue.trim() || '$2,000 - $5,000'
    };

    const updated = saveProject(newProject);
    setProjects(updated);
    setShowAddModal(false);
    resetForm();
    showToast({ message: 'New portfolio project added to your planner!', type: 'success' });
  };

  const handleSaveRecommendation = (idea) => {
    const isAlreadySaved = projects.some(p => p.title.toLowerCase() === idea.title.toLowerCase());
    if (isAlreadySaved) {
      showToast({ message: 'This project idea is already in your planner.', type: 'info' });
      return;
    }

    const newProject = {
      title: idea.title,
      category: userCat.name,
      status: 'Idea',
      targetClient: idea.targetClients,
      problem: idea.summary,
      solution: idea.impactMetric,
      deliverables: idea.deliverables.join(', '),
      techStack: profile.skills.slice(0, 4),
      estimatedValue: '$2,500 - $5,000'
    };

    const updated = saveProject(newProject);
    setProjects(updated);
    showToast({ message: `Saved "${idea.title}" to your planner!`, type: 'success' });
  };

  const handleDelete = (id) => {
    const updated = deleteProject(id);
    setProjects(updated);
    showToast({ message: 'Project removed from planner.', type: 'info' });
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = updateProjectStatus(id, newStatus);
    setProjects(updated);
    showToast({ message: `Project status updated to ${newStatus}`, type: 'success' });
  };

  const resetForm = () => {
    setTitle('');
    setCategory('Web Development');
    setTargetClient('');
    setProblem('');
    setSolution('');
    setDeliverables('');
    setTechStackInput('');
    setEstimatedValue('$2,500 - $4,500');
    setErrorMsg('');
  };

  return (
    <div className="space-y-10 py-4 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Case Study Pipeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Portfolio Planner
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Clients don't hire code snippets—they hire proven solutions. Plan case studies that clearly outline the business problem, your implementation, and tangible deliverables.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          id="open-add-project-modal-btn"
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Project</span>
        </button>
      </div>

      {/* Recommended Project Ideas for User's Category */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400">
            <Lightbulb className="w-5 h-5" />
            <h3 className="text-sm font-bold text-white">
              Recommended High-Converting Ideas for {userCat.name}
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">Based on your skills</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {recommendedIdeas.map((idea, idx) => {
            const isSaved = projects.some(p => p.title.toLowerCase() === idea.title.toLowerCase());
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between gap-3 hover:border-slate-700 transition"
              >
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-white">{idea.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
                    {idea.summary}
                  </p>
                  <div className="text-[10px] text-indigo-300">
                    <span className="text-slate-500">Ideal Client:</span> {idea.targetClients}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSaveRecommendation(idea)}
                  disabled={isSaved}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
                    isSaved
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 cursor-default'
                      : 'bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white border border-slate-700'
                  }`}
                >
                  {isSaved ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Plus className="w-3.5 h-3.5" />}
                  <span>{isSaved ? 'In Your Planner' : 'Save to Planner'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter and Projects List */}
      <div className="space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white">
              Your Planned Projects ({projects.length})
            </h3>
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start sm:self-auto text-xs">
            {['All', 'Idea', 'In Progress', 'Completed'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                id={`filter-status-${status.toLowerCase().replace(' ', '-')}`}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  statusFilter === status
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="glass-panel rounded-2xl p-12 text-center text-slate-400 space-y-3">
            <FolderGit2 className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm">No projects matching the "{statusFilter}" filter.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
            >
              Add a Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between gap-5 hover:border-slate-700 transition"
              >
                
                <div className="space-y-3">
                  
                  {/* Card Header: Title & Status */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400">
                        {proj.category || 'Freelance Project'}
                      </span>
                      <h4 className="text-base font-bold text-white mt-0.5">{proj.title}</h4>
                    </div>

                    <button
                      onClick={() => handleDelete(proj.id)}
                      className="text-slate-500 hover:text-rose-400 p-1 rounded transition shrink-0"
                      title="Delete Project"
                      aria-label="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Problem & Solution Breakdown */}
                  <div className="space-y-2 text-xs">
                    <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-900 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Problem Solved
                      </span>
                      <p className="text-slate-300 leading-relaxed">{proj.problem}</p>
                    </div>

                    {proj.solution && (
                      <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-900 space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Outcome / Solution
                        </span>
                        <p className="text-slate-300 leading-relaxed">{proj.solution}</p>
                      </div>
                    )}
                  </div>

                  {/* Tech Stack & Deliverables */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(proj.techStack || []).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Footer: Target Client, Value & Status Selector */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-500">Target Client:</span>
                    <p className="font-semibold text-slate-300 text-[11px]">{proj.targetClient || 'Founders'}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500">Status:</span>
                    <select
                      value={proj.status}
                      onChange={(e) => handleStatusChange(proj.id, e.target.value)}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Idea">Idea</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Add Custom Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-700 w-full max-w-xl shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-indigo-400" />
                <span>Plan New Portfolio Project</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Real-Time Healthcare Telehealth Dashboard"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App Dev">Mobile App Dev</option>
                    <option value="UI/UX & Product Design">UI/UX Design</option>
                    <option value="Content & Copywriting">Copywriting</option>
                    <option value="AI & Automations">AI & Automations</option>
                    <option value="Marketing & SEO">Marketing & SEO</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Target Client
                  </label>
                  <input
                    type="text"
                    value={targetClient}
                    onChange={(e) => setTargetClient(e.target.value)}
                    placeholder="e.g. B2B SaaS Founders, Dental Clinics"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Business Problem Solved *
                </label>
                <textarea
                  rows={2}
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="What friction, loss, or pain point does this project address for a client?"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Proposed Solution & Outcome
                </label>
                <textarea
                  rows={2}
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  placeholder="How did you solve it? (e.g. built responsive portal with 95+ performance score)"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Tech Stack (comma separated)
                  </label>
                  <input
                    type="text"
                    value={techStackInput}
                    onChange={(e) => setTechStackInput(e.target.value)}
                    placeholder="React, Tailwind, Node.js, Stripe"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Estimated Project Value
                  </label>
                  <input
                    type="text"
                    value={estimatedValue}
                    onChange={(e) => setEstimatedValue(e.target.value)}
                    placeholder="$2,500 - $4,500"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {errorMsg && (
                <p className="text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errorMsg}</span>
                </p>
              )}

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="submit-create-project-btn"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-md shadow-indigo-600/20"
                >
                  Save Project Plan
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
