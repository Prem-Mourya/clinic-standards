import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, CheckCircle2, Layers, LayoutGrid, Pause, Play } from 'lucide-react';
import type { TestimonialItem } from '../../data/testimonialsData';

interface OverlappingCardStackProps {
  testimonials: TestimonialItem[];
  autoPlayInterval?: number;
  className?: string;
  allowViewToggle?: boolean;
}

export const OverlappingCardStack: React.FC<OverlappingCardStackProps> = ({
  testimonials,
  autoPlayInterval = 6000,
  className = '',
  allowViewToggle = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [viewMode, setViewMode] = useState<'stack' | 'grid'>('stack');
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number>(0);
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = testimonials.length;

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % total);
    setTimeout(() => setIsAnimating(false), 380);
  }, [isAnimating, total]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setTimeout(() => setIsAnimating(false), 380);
  }, [isAnimating, total]);

  // Autoplay functionality with pause on hover
  useEffect(() => {
    if (!isAutoPlaying || viewMode === 'grid') return;
    autoPlayTimerRef.current = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlaying, autoPlayInterval, handleNext, viewMode]);

  // Pointer drag gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    if (viewMode === 'grid' || isAnimating) return;
    setIsDragging(true);
    dragStartX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStartX.current;
    // Dampen drag past 120px
    const clampedDiff = Math.max(-140, Math.min(140, diff));
    setDragOffset(clampedDiff);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);

    if (dragOffset < -50) {
      handleNext();
    } else if (dragOffset > 50) {
      handlePrev();
    }
    setDragOffset(0);
  };

  if (viewMode === 'grid') {
    return (
      <div className={`space-y-6 ${className}`}>
        {allowViewToggle && (
          <div className="flex items-center justify-end">
            <button
              onClick={() => setViewMode('stack')}
              className="press-tactile inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-structure)] hover:border-[var(--accent-primary)] cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span>Switch to Overlap Deck View</span>
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl p-6 bg-[var(--bg-card)] border border-[var(--border-subtle)] flex flex-col justify-between card-hover shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[var(--text-muted)]">{item.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-structure)] leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[var(--border-subtle)]">
                <div className="font-bold text-xs text-[var(--text-structure)]">
                  {item.patientName}, <span className="tabular-nums">{item.age} yrs</span>
                </div>
                <div className="text-[11px] text-[var(--text-muted)]">
                  Consulted for: <strong className="text-[var(--text-structure)]">{item.condition}</strong>
                </div>
                <div className="text-[10px] text-emerald-700 dark:text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified Patient Consent
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Overlapping Stack Configuration
  // We render 3 visible stacked layers: index 0 (top/active), 1 (middle peek), 2 (back peek)
  const visibleCards = [0, 1, 2].map((offset) => {
    const itemIndex = (currentIndex + offset) % total;
    return {
      item: testimonials[itemIndex],
      itemIndex,
      depth: offset
    };
  });

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Controls header: View toggle & Deck navigation */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent-subtle)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/20">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Overlap Stack</span>
          </span>
          <span className="text-xs text-[var(--text-muted)] tabular-nums">
            {currentIndex + 1} of {total} stories
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Autoplay toggle */}
          <button
            type="button"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`press-tactile p-2 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
              isAutoPlaying
                ? 'bg-[var(--accent-primary)] text-white border-[var(--accent-primary)]'
                : 'bg-[var(--bg-card)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-structure)]'
            }`}
            title={isAutoPlaying ? 'Pause autoplay' : 'Start autoplay'}
            aria-label={isAutoPlaying ? 'Pause autoplay' : 'Start autoplay'}
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {/* Grid view switch */}
          {allowViewToggle && (
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className="press-tactile p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-structure)] cursor-pointer"
              title="Switch to 3-column grid"
              aria-label="Switch to grid view"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Prev/Next Navigation Buttons */}
          <div className="inline-flex items-center gap-1.5 ml-1">
            <button
              type="button"
              onClick={handlePrev}
              disabled={isAnimating}
              className="press-tactile p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-structure)] hover:bg-[var(--bg-surface)] hover:border-[var(--accent-primary)] cursor-pointer disabled:opacity-40"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={isAnimating}
              className="press-tactile p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-structure)] hover:bg-[var(--bg-surface)] hover:border-[var(--accent-primary)] cursor-pointer disabled:opacity-40"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Overlapping Deck Display */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative min-h-[310px] sm:min-h-[290px] w-full select-none cursor-grab active:cursor-grabbing touch-pan-y"
        style={{ perspective: '1200px' }}
      >
        {visibleCards
          .slice()
          .reverse()
          .map(({ item, depth }) => {
            const isTop = depth === 0;

            // Geometry calculations for overlapping stacking
            let translateY = depth * 14;
            let translateX = depth * 16;
            let scale = 1 - depth * 0.05;
            let opacity = depth === 0 ? 1 : depth === 1 ? 0.88 : 0.65;
            let zIndex = 30 - depth * 10;
            let rotate = depth === 1 ? 1.2 : depth === 2 ? 2.4 : 0;

            // Apply interactive drag offset to top card
            if (isTop && isDragging) {
              translateX += dragOffset;
              rotate += dragOffset * 0.04;
            }

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!isTop && !isAnimating) {
                    handleNext();
                  }
                }}
                className={`absolute inset-x-0 top-0 rounded-2xl p-6 sm:p-8 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-elevated)] transition-all will-change-transform ${
                  isTop ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer hover:border-[var(--accent-primary)]'
                }`}
                style={{
                  transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale}) rotate(${rotate}deg)`,
                  opacity,
                  zIndex,
                  transitionDuration: isDragging && isTop ? '0ms' : '360ms',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isTop
                    ? '0 20px 40px -12px rgba(17, 17, 17, 0.12), 0 0 0 1px var(--border-subtle)'
                    : '0 8px 24px -6px rgba(17, 17, 17, 0.06)'
                }}
              >
                <div className="flex flex-col justify-between h-full space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      {/* Calibrated SVG Stars */}
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent-primary)] bg-[var(--accent-subtle)] px-2.5 py-0.5 rounded-full">
                          {item.category}
                        </span>
                        <span className="text-[11px] text-[var(--text-muted)]">{item.date}</span>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-[var(--text-structure)] leading-relaxed italic pt-1">
                      "{item.comment}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="font-bold text-sm text-[var(--text-structure)]">
                        {item.patientName}, <span className="tabular-nums">{item.age} yrs</span>
                      </div>
                      <div className="text-xs text-[var(--text-muted)]">
                        Consulted for: <strong className="text-[var(--text-structure)]">{item.condition}</strong> · {item.location}
                      </div>
                    </div>

                    <div className="text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-semibold shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified Authorized Patient Consent</span>
                    </div>
                  </div>
                </div>

                {/* Overlap Peek Hint on Second/Third card */}
                {!isTop && (
                  <div className="absolute top-3 right-4 px-2 py-0.5 rounded-full bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[10px] font-bold text-[var(--text-muted)]">
                    Click to view
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* Progress Dots / Story Scrubber */}
      <div className="flex items-center justify-center gap-1.5 pt-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              if (currentIndex !== i && !isAnimating) {
                setIsAnimating(true);
                setCurrentIndex(i);
                setTimeout(() => setIsAnimating(false), 380);
              }
            }}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === i
                ? 'w-8 bg-[var(--accent-primary)]'
                : 'w-2 bg-[var(--border-subtle)] hover:bg-[var(--text-muted)]'
            }`}
            aria-label={`Jump to review ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
