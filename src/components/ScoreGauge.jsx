import React from 'react';

export default function ScoreGauge({ score = 75, label = 'Readiness Score', size = 'normal', color = 'indigo' }) {
  const normalizedScore = Math.min(100, Math.max(0, score));

  // Determine accent color
  let strokeColor = '#6366f1'; // indigo
  let bgColor = 'rgba(99, 102, 241, 0.15)';
  let textColor = 'text-indigo-400';

  if (normalizedScore >= 80) {
    strokeColor = '#10b981'; // emerald
    bgColor = 'rgba(16, 185, 129, 0.15)';
    textColor = 'text-emerald-400';
  } else if (normalizedScore >= 60) {
    strokeColor = '#6366f1'; // indigo
    bgColor = 'rgba(99, 102, 241, 0.15)';
    textColor = 'text-indigo-400';
  } else if (normalizedScore >= 45) {
    strokeColor = '#f59e0b'; // amber
    bgColor = 'rgba(245, 158, 11, 0.15)';
    textColor = 'text-amber-400';
  } else {
    strokeColor = '#f43f5e'; // rose
    bgColor = 'rgba(244, 63, 94, 0.15)';
    textColor = 'text-rose-400';
  }

  const radius = size === 'large' ? 56 : 42;
  const strokeWidth = size === 'large' ? 9 : 7;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;
  const dimension = size === 'large' ? 140 : 108;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: dimension, height: dimension }}>
        <svg
          className="transform -rotate-90"
          width={dimension}
          height={dimension}
        >
          {/* Background circle */}
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Active progress circle */}
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`font-bold ${size === 'large' ? 'text-3xl' : 'text-2xl'} ${textColor}`}>
            {normalizedScore}
            <span className="text-xs text-slate-400 font-normal">%</span>
          </span>
        </div>
      </div>

      {label && (
        <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </span>
      )}
    </div>
  );
}
