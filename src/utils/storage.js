import {
  DEFAULT_USER_PROFILE,
  SAMPLE_SAVED_PROJECTS,
  SAMPLE_RECENT_PROPOSALS
} from '../data/freelanceData.js';

const STORAGE_KEYS = {
  PROFILE: 'ff_freelancer_profile',
  ANALYSIS: 'ff_skill_analysis',
  PROPOSALS: 'ff_saved_proposals',
  PROJECTS: 'ff_portfolio_projects',
  SETTINGS: 'ff_app_settings'
};

function safeGet(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch (err) {
    console.warn(`LocalStorage read error for key ${key}:`, err);
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(`LocalStorage write error for key ${key}:`, err);
    return false;
  }
}

// Freelancer Profile
export function getProfile() {
  return safeGet(STORAGE_KEYS.PROFILE, DEFAULT_USER_PROFILE);
}

export function saveProfile(profile) {
  return safeSet(STORAGE_KEYS.PROFILE, profile);
}

// Skill Analysis
export function getLatestAnalysis() {
  return safeGet(STORAGE_KEYS.ANALYSIS, null);
}

export function saveAnalysis(analysisData) {
  return safeSet(STORAGE_KEYS.ANALYSIS, analysisData);
}

// Proposals
export function getProposals() {
  return safeGet(STORAGE_KEYS.PROPOSALS, SAMPLE_RECENT_PROPOSALS);
}

export function saveProposal(proposal) {
  const current = getProposals();
  const updated = [
    {
      id: 'prop_' + Date.now(),
      createdAt: 'Just now',
      ...proposal
    },
    ...current
  ];
  safeSet(STORAGE_KEYS.PROPOSALS, updated);
  return updated;
}

export function deleteProposal(id) {
  const current = getProposals();
  const updated = current.filter(p => p.id !== id);
  safeSet(STORAGE_KEYS.PROPOSALS, updated);
  return updated;
}

// Portfolio Projects
export function getSavedProjects() {
  return safeGet(STORAGE_KEYS.PROJECTS, SAMPLE_SAVED_PROJECTS);
}

export function saveProject(project) {
  const current = getSavedProjects();
  let updated;
  if (project.id && current.some(p => p.id === project.id)) {
    updated = current.map(p => (p.id === project.id ? { ...p, ...project } : p));
  } else {
    updated = [
      {
        id: 'proj_' + Date.now(),
        status: 'Idea',
        ...project
      },
      ...current
    ];
  }
  safeSet(STORAGE_KEYS.PROJECTS, updated);
  return updated;
}

export function deleteProject(id) {
  const current = getSavedProjects();
  const updated = current.filter(p => p.id !== id);
  safeSet(STORAGE_KEYS.PROJECTS, updated);
  return updated;
}

export function updateProjectStatus(id, newStatus) {
  const current = getSavedProjects();
  const updated = current.map(p => p.id === id ? { ...p, status: newStatus } : p);
  safeSet(STORAGE_KEYS.PROJECTS, updated);
  return updated;
}

// Theme & Logo preferences
const THEME_KEY = 'ff_accent_theme';
const LOGO_KEY = 'ff_logo_style';

export function getAppTheme() {
  return safeGet(THEME_KEY, 'emerald');
}

export function saveAppTheme(themeId) {
  return safeSet(THEME_KEY, themeId);
}

export function getLogoStyle() {
  return safeGet(LOGO_KEY, 'radar');
}

export function saveLogoStyle(styleId) {
  return safeSet(LOGO_KEY, styleId);
}

// App Settings & Backups
export function exportAllData() {
  return {
    profile: getProfile(),
    analysis: getLatestAnalysis(),
    proposals: getProposals(),
    projects: getSavedProjects(),
    exportedAt: new Date().toISOString()
  };
}

export function importAllData(importedObj) {
  if (!importedObj || typeof importedObj !== 'object') {
    throw new Error('Invalid backup file format');
  }
  if (importedObj.profile) safeSet(STORAGE_KEYS.PROFILE, importedObj.profile);
  if (importedObj.analysis) safeSet(STORAGE_KEYS.ANALYSIS, importedObj.analysis);
  if (importedObj.proposals) safeSet(STORAGE_KEYS.PROPOSALS, importedObj.proposals);
  if (importedObj.projects) safeSet(STORAGE_KEYS.PROJECTS, importedObj.projects);
  return true;
}

export function resetAllData() {
  safeSet(STORAGE_KEYS.PROFILE, DEFAULT_USER_PROFILE);
  safeSet(STORAGE_KEYS.ANALYSIS, null);
  safeSet(STORAGE_KEYS.PROPOSALS, SAMPLE_RECENT_PROPOSALS);
  safeSet(STORAGE_KEYS.PROJECTS, SAMPLE_SAVED_PROJECTS);
  return true;
}
