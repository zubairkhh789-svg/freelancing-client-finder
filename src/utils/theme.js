export const THEMES = [
  {
    id: 'emerald',
    name: 'Emerald Mint',
    accentColor: '#10b981',
    dotBg: 'bg-emerald-500',
    primary: 'emerald',
    badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    button: 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-emerald-600/25',
    activeNav: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-sm shadow-emerald-500/10',
    textGradient: 'from-emerald-400 via-teal-300 to-cyan-400',
    logoGradient: 'from-emerald-600 via-emerald-500 to-teal-400 shadow-emerald-500/25',
    iconText: 'text-emerald-400',
    cardBorderHover: 'hover:border-emerald-500/40 hover:shadow-emerald-500/10',
    selection: 'selection:bg-emerald-500/30 selection:text-emerald-200'
  },
  {
    id: 'cyan',
    name: 'Electric Cyan',
    accentColor: '#06b6d4',
    dotBg: 'bg-cyan-500',
    primary: 'cyan',
    badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    button: 'bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-500 hover:from-cyan-500 hover:to-blue-400 text-white shadow-cyan-600/25',
    activeNav: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40 shadow-sm shadow-cyan-500/10',
    textGradient: 'from-cyan-400 via-sky-300 to-blue-400',
    logoGradient: 'from-cyan-600 via-cyan-500 to-blue-400 shadow-cyan-500/25',
    iconText: 'text-cyan-400',
    cardBorderHover: 'hover:border-cyan-500/40 hover:shadow-cyan-500/10',
    selection: 'selection:bg-cyan-500/30 selection:text-cyan-200'
  },
  {
    id: 'blue',
    name: 'Sapphire Blue',
    accentColor: '#3b82f6',
    dotBg: 'bg-blue-500',
    primary: 'blue',
    badge: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    button: 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 text-white shadow-blue-600/25',
    activeNav: 'bg-blue-500/15 text-blue-300 border-blue-500/40 shadow-sm shadow-blue-500/10',
    textGradient: 'from-blue-400 via-indigo-300 to-cyan-400',
    logoGradient: 'from-blue-600 via-blue-500 to-indigo-400 shadow-blue-500/25',
    iconText: 'text-blue-400',
    cardBorderHover: 'hover:border-blue-500/40 hover:shadow-blue-500/10',
    selection: 'selection:bg-blue-500/30 selection:text-blue-200'
  },
  {
    id: 'violet',
    name: 'Royal Violet',
    accentColor: '#8b5cf6',
    dotBg: 'bg-purple-500',
    primary: 'violet',
    badge: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    button: 'bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white shadow-purple-600/25',
    activeNav: 'bg-purple-500/15 text-purple-300 border-purple-500/40 shadow-sm shadow-purple-500/10',
    textGradient: 'from-purple-400 via-pink-300 to-indigo-300',
    logoGradient: 'from-purple-600 via-indigo-500 to-pink-500 shadow-purple-500/25',
    iconText: 'text-purple-400',
    cardBorderHover: 'hover:border-purple-500/40 hover:shadow-purple-500/10',
    selection: 'selection:bg-purple-500/30 selection:text-purple-200'
  },
  {
    id: 'amber',
    name: 'Gold & Amber',
    accentColor: '#f59e0b',
    dotBg: 'bg-amber-500',
    primary: 'amber',
    badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    button: 'bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-white shadow-amber-600/25',
    activeNav: 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/10',
    textGradient: 'from-amber-400 via-yellow-300 to-orange-400',
    logoGradient: 'from-amber-500 via-orange-500 to-yellow-400 shadow-amber-500/25',
    iconText: 'text-amber-400',
    cardBorderHover: 'hover:border-amber-500/40 hover:shadow-amber-500/10',
    selection: 'selection:bg-amber-500/30 selection:text-amber-200'
  },
  {
    id: 'rose',
    name: 'Crimson Rose',
    accentColor: '#f43f5e',
    dotBg: 'bg-rose-500',
    primary: 'rose',
    badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    button: 'bg-gradient-to-r from-rose-600 via-rose-500 to-pink-500 hover:from-rose-500 hover:to-pink-400 text-white shadow-rose-600/25',
    activeNav: 'bg-rose-500/15 text-rose-300 border-rose-500/40 shadow-sm shadow-rose-500/10',
    textGradient: 'from-rose-400 via-pink-300 to-orange-300',
    logoGradient: 'from-rose-600 via-rose-500 to-pink-400 shadow-rose-500/25',
    iconText: 'text-rose-400',
    cardBorderHover: 'hover:border-rose-500/40 hover:shadow-rose-500/10',
    selection: 'selection:bg-rose-500/30 selection:text-rose-200'
  }
];

export function getThemeById(themeId) {
  return THEMES.find(t => t.id === themeId) || THEMES[0];
}
