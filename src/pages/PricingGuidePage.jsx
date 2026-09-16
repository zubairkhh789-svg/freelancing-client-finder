import React, { useState } from 'react';
import {
  DollarSign,
  Info,
  Clock,
  Briefcase,
  Layers,
  Sparkles,
  Calculator,
  ShieldAlert,
  CheckCircle2,
  TrendingUp,
  HelpCircle
} from 'lucide-react';
import { PRICING_GUIDE_DATA } from '../data/freelanceData.js';
import { getPricingEstimate } from '../utils/pricingEngine.js';

export default function PricingGuidePage() {
  const categoryKeys = Object.keys(PRICING_GUIDE_DATA);
  const [selectedCategory, setSelectedCategory] = useState('web_dev');
  const [selectedServiceId, setSelectedServiceId] = useState(PRICING_GUIDE_DATA.web_dev.services[0].id);
  const [experienceLevel, setExperienceLevel] = useState('intermediate');

  // Calculator helper
  const [calcHours, setCalcHours] = useState(30);
  const [customHourly, setCustomHourly] = useState(60);

  const currentCategory = PRICING_GUIDE_DATA[selectedCategory] || PRICING_GUIDE_DATA.web_dev;
  const currentService = currentCategory.services.find(s => s.id === selectedServiceId) || currentCategory.services[0];

  const estimate = getPricingEstimate(selectedCategory, currentService.id, experienceLevel);

  const handleCategoryChange = (catKey) => {
    setSelectedCategory(catKey);
    const newCat = PRICING_GUIDE_DATA[catKey];
    if (newCat && newCat.services.length > 0) {
      setSelectedServiceId(newCat.services[0].id);
    }
  };

  return (
    <div className="space-y-10 py-4 pb-20">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <DollarSign className="w-3.5 h-3.5" />
          <span>Market Benchmark Rates</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Freelance Pricing Guide
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Select a freelance service and your experience level to discover real-world market pricing benchmarks for hourly and fixed-price contracts.
        </p>
      </div>

      {/* Prominent Mandatory Guideline Disclaimer */}
      <div className="rounded-2xl p-4 sm:p-5 bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1 leading-relaxed">
          <strong className="font-bold text-amber-300 block text-xs sm:text-sm">
            Important Guideline Disclaimer
          </strong>
          <p className="text-amber-200/90 text-[11px] sm:text-xs">
            {estimate.guidelineDisclaimer}
          </p>
        </div>
      </div>

      {/* Selectors */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
        
        {/* Category Tabs */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            1. Select Service Discipline
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {categoryKeys.map((key) => {
              const cat = PRICING_GUIDE_DATA[key];
              const isSelected = selectedCategory === key;
              return (
                <button
                  key={key}
                  id={`cat-pricing-btn-${key}`}
                  onClick={() => handleCategoryChange(key)}
                  className={`p-3 rounded-xl text-xs font-semibold border transition text-left flex flex-col justify-between gap-2 ${
                    isSelected
                      ? 'bg-indigo-600/25 text-indigo-200 border-indigo-500 shadow-md shadow-indigo-500/20'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <span className="line-clamp-2">{cat.name}</span>
                  <span className="text-[10px] text-slate-500 font-normal">
                    {cat.services.length} services
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Specific Service Selection */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            2. Choose Specific Service Deliverable
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentCategory.services.map((svc) => {
              const isSelected = currentService.id === svc.id;
              return (
                <button
                  key={svc.id}
                  id={`svc-pricing-btn-${svc.id}`}
                  onClick={() => setSelectedServiceId(svc.id)}
                  className={`p-4 rounded-xl text-left border transition flex flex-col justify-between gap-2.5 ${
                    isSelected
                      ? 'bg-indigo-600/20 text-white border-indigo-500 shadow-md'
                      : 'bg-slate-900/70 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold">{svc.name}</h4>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{svc.description}</p>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800/80">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-indigo-400" />
                      {svc.typicalDelivery}
                    </span>
                    <span className="text-indigo-400 font-medium">Select</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Experience Level Selector */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            3. Experience Level
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'beginner', label: 'Beginner / Junior', desc: '0 - 2 years experience' },
              { id: 'intermediate', label: 'Intermediate / Mid', desc: '2 - 5 years experience' },
              { id: 'expert', label: 'Senior / Expert', desc: '5+ years specialized expertise' },
            ].map((lvl) => (
              <button
                key={lvl.id}
                id={`pricing-exp-${lvl.id}`}
                onClick={() => setExperienceLevel(lvl.id)}
                className={`p-3.5 rounded-xl border text-left transition ${
                  experienceLevel === lvl.id
                    ? 'bg-indigo-600/25 border-indigo-500 text-indigo-200'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-bold">{lvl.label}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{lvl.desc}</div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Pricing Estimate Result Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Benchmark Display (8 cols) */}
        <div className="lg:col-span-8 glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">
                {estimate.categoryName}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                {estimate.serviceName}
              </h2>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700 self-start sm:self-auto capitalize">
              {estimate.experienceLevel} Tier
            </span>
          </div>

          {/* Pricing Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Hourly Rate */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Estimated Hourly Rate
              </span>
              <div className="text-2xl font-extrabold text-emerald-400">
                {estimate.hourlyRange}
                <span className="text-xs text-slate-400 font-normal"> / hr</span>
              </div>
              <p className="text-[10px] text-slate-500">Based on verified platform averages</p>
            </div>

            {/* Fixed Project Range */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Fixed Project Range
              </span>
              <div className="text-2xl font-extrabold text-indigo-400">
                {estimate.fixedRange}
              </div>
              <p className="text-[10px] text-slate-500">Typical package deliverable fee</p>
            </div>

            {/* Typical Turnaround */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Typical Turnaround
              </span>
              <div className="text-xl font-bold text-white">
                {estimate.typicalDelivery}
              </div>
              <p className="text-[10px] text-slate-500">Standard delivery cadence</p>
            </div>

          </div>

          {/* Expert Advice Note */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400">
              <Sparkles className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Tier Scope & Market Notes</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {estimate.expertAdvice}
            </p>
          </div>

          {/* Pricing Strategy Best Practices */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              3 Rules for Freelance Pricing Power
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-400">
              <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/80 space-y-1">
                <span className="font-semibold text-slate-200">1. Bill by Value, Not Hours</span>
                <p className="text-[11px]">Clients pay for the $10k business problem you solve, not the 8 hours it took you.</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/80 space-y-1">
                <span className="font-semibold text-slate-200">2. Milestone Upfronts</span>
                <p className="text-[11px]">Always require 50% deposit before kickoff and 50% upon completed staging approval.</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/80 space-y-1">
                <span className="font-semibold text-slate-200">3. Anchor with 3 Tiers</span>
                <p className="text-[11px]">Provide a Basic, Standard, and Premium option in your proposal to steer clients to the middle.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Quick Interactive Project Quote Calculator (4 cols) */}
        <div className="lg:col-span-4 glass-panel rounded-2xl p-6 border border-slate-800 space-y-5">
          <div className="flex items-center gap-2 text-indigo-400">
            <Calculator className="w-5 h-5" />
            <h3 className="text-sm font-bold text-white">Project Fee Calculator</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Estimate your project invoice based on expected scope hours and hourly rate:
          </p>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Estimated Effort:</span>
                <span className="font-bold text-indigo-400">{calcHours} hours</span>
              </div>
              <input
                type="range"
                min="5"
                max="120"
                step="5"
                value={calcHours}
                onChange={(e) => setCalcHours(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Your Hourly Rate ($):</span>
                <span className="font-bold text-emerald-400">${customHourly} / hr</span>
              </div>
              <input
                type="range"
                min="20"
                max="180"
                step="5"
                value={customHourly}
                onChange={(e) => setCustomHourly(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Recommended Fixed Quote
                </span>
                <div className="text-3xl font-extrabold text-white">
                  ${(calcHours * customHourly).toLocaleString()}
                </div>
                <p className="text-[10px] text-slate-500">
                  Suggested 50% deposit: ${((calcHours * customHourly) / 2).toLocaleString()}
                </p>
              </div>

              <div className="text-[11px] text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>Weekly Pace (20h/wk):</span>
                  <span className="font-semibold text-slate-200">
                    {(calcHours / 20).toFixed(1)} weeks
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Retainer Cushion (+15%):</span>
                  <span className="font-semibold text-slate-200">
                    ${Math.round(calcHours * customHourly * 1.15).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
