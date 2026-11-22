import React, { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface StepItem {
  step: number;
  title: string;
  description: string;
}

interface StepCardStackProps {
  steps: StepItem[];
  className?: string;
}

export const StepCardStack: React.FC<StepCardStackProps> = ({ steps, className = '' }) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Step Indicators Scrubber */}
      <div className="flex items-center justify-between sm:justify-center gap-2 sm:gap-4 overflow-x-auto pb-2">
        {steps.map((s, idx) => {
          const isActive = activeStep === idx;
          const isDone = activeStep > idx;

          return (
            <button
              key={s.step}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`press-tactile flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[var(--accent-primary)] text-white border-[var(--accent-primary)] shadow-sm'
                  : isDone
                  ? 'bg-[var(--bg-card)] border-emerald-500/40 text-[var(--text-structure)]'
                  : 'bg-[var(--bg-card)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--accent-primary)]'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold tabular-nums ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : isDone
                    ? 'bg-emerald-500/10 text-emerald-600'
                    : 'bg-[var(--bg-canvas)] text-[var(--text-structure)]'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : s.step}
              </span>
              <span className="whitespace-nowrap">{s.title.split(' ')[0]} {s.title.split(' ')[1]}</span>
            </button>
          );
        })}
      </div>

      {/* Overlapping Progressive Card Deck */}
      <div className="relative min-h-[220px] sm:min-h-[190px] w-full" style={{ perspective: '1000px' }}>
        {steps.map((step, idx) => {
          const offset = idx - activeStep;
          const isPast = offset < 0;
          const isCurrent = offset === 0;
          const isFuture = offset > 0;

          // Compute geometric transforms for stacking and sliding
          let translateX = 0;
          let translateY = 0;
          let scale = 1;
          let opacity = 1;
          let zIndex = 30;
          let pointerEvents: 'auto' | 'none' = 'none';

          if (isCurrent) {
            translateX = 0;
            translateY = 0;
            scale = 1;
            opacity = 1;
            zIndex = 30;
            pointerEvents = 'auto';
          } else if (isPast) {
            // Slid off to the left
            translateX = -110;
            translateY = 0;
            scale = 0.95;
            opacity = 0;
            zIndex = 10;
          } else {
            // Stacked behind on the right
            translateX = offset * 20;
            translateY = offset * 10;
            scale = 1 - offset * 0.05;
            opacity = Math.max(0.4, 0.8 - offset * 0.25);
            zIndex = 30 - offset * 5;
            pointerEvents = 'auto';
          }

          return (
            <div
              key={step.step}
              onClick={() => {
                if (isFuture) setActiveStep(idx);
              }}
              className={`absolute inset-x-0 top-0 p-6 sm:p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-soft)] transition-all will-change-transform ${
                isFuture ? 'cursor-pointer hover:border-[var(--accent-primary)]' : ''
              }`}
              style={{
                transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                opacity,
                zIndex,
                pointerEvents,
                transitionDuration: '380ms',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-[var(--accent-primary)] text-white font-editorial font-bold text-base flex items-center justify-center tabular-nums shadow-xs">
                      {step.step}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-primary)]">
                      Step {step.step} of {steps.length}
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl font-bold text-[var(--text-structure)]">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Next step button */}
                <div className="shrink-0 flex items-center gap-2 pt-2 sm:pt-0">
                  {idx < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveStep(idx + 1);
                      }}
                      className="press-tactile px-4 py-2.5 rounded-xl bg-[var(--text-structure)] text-[var(--bg-card)] hover:bg-[var(--accent-primary)] text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>Next Step</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-500/10 px-3 py-1.5 rounded-full dark:text-emerald-300">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Ready for consultation</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
