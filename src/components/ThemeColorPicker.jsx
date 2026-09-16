import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, Sparkles, ChevronDown } from 'lucide-react';
import { THEMES } from '../utils/theme.js';

export default function ThemeColorPicker({ currentTheme, onSelectTheme, currentLogoStyle, onSelectLogoStyle }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const logoStyles = [
    { id: 'radar', name: 'Client Radar', desc: 'Precision client scanner' },
    { id: 'compass', name: 'Pathfinder', desc: 'Career compass' },
    { id: 'briefcase', name: 'Portfolio', desc: 'Professional suite' },
    { id: 'target', name: 'Bullseye', desc: 'High-ticket target' }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        id="theme-color-picker-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200 transition shadow-sm hover:border-slate-600"
        title="Change App Color & Logo"
        aria-label="Change App Color & Logo"
      >
        <span
          className="w-3.5 h-3.5 rounded-full ring-2 ring-slate-700 shadow-sm shrink-0"
          style={{ backgroundColor: currentTheme?.accentColor || '#10b981' }}
        />
        <span className="hidden sm:inline text-[11px] font-medium text-slate-300">
          Color & Logo
        </span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div
          id="theme-color-popover"
          className="absolute right-0 mt-2 w-72 p-4 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150 space-y-4"
        >
          {/* Color Scheme Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-indigo-400" />
                <span>Select Accent Color</span>
              </span>
              <span className="text-[10px] text-slate-400 capitalize font-medium">
                {currentTheme.name}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1">
              {THEMES.map((theme) => {
                const isSelected = currentTheme.id === theme.id;
                return (
                  <button
                    key={theme.id}
                    id={`select-theme-${theme.id}`}
                    onClick={() => {
                      onSelectTheme(theme.id);
                    }}
                    className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition text-center ${
                      isSelected
                        ? 'bg-slate-800 border-white/60 shadow-md ring-1 ring-white/30'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full shadow-sm flex items-center justify-center text-[10px] text-white"
                      style={{ backgroundColor: theme.accentColor }}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </span>
                    <span className="text-[10px] text-slate-300 font-medium truncate w-full">
                      {theme.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Logo Style Section */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Select Logo Style</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {logoStyles.map((item) => {
                const isSelected = currentLogoStyle === item.id;
                return (
                  <button
                    key={item.id}
                    id={`select-logo-${item.id}`}
                    onClick={() => {
                      onSelectLogoStyle(item.id);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg border text-left transition flex items-center justify-between text-xs ${
                      isSelected
                        ? 'bg-slate-800 border-indigo-500 text-white font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <span>{item.name}</span>
                    {isSelected && <Check className="w-3 h-3 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-1 text-[10px] text-slate-500 text-center">
            Saved automatically in your LocalStorage
          </div>
        </div>
      )}
    </div>
  );
}
