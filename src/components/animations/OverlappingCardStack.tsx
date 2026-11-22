import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, CheckCircle2, Layers, LayoutGrid, ArrowDown } from 'lucide-react';
import type { TestimonialItem } from '../../data/testimonialsData';

interface OverlappingCardStackProps {
  testimonials: TestimonialItem[];
  className?: string;
  allowViewToggle?: boolean;
  scrollDriven?: boolean;
}

export const OverlappingCardStack: React.FC<OverlappingCardStackProps> = ({
  testimonials,
  className = '',
  allowViewToggle = true,
  scrollDriven = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [viewMode, setViewMode] = useState<'stack' | 'grid'>('stack');
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number>(0);
  const isManualNavRef = useRef<number>(0);

  const total = testimonials.length;

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    isManualNavRef.current = Date.now();
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % total);
    setTimeout(() => setIsAnimating(false), 380);
  }, [isAnimating, total]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    isManualNavRef.current = Date.now();
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setTimeout(() => setIsAnimating(false), 380);
  }, [isAnimating, total]);

  // Scroll-driven card transitions: As user scrolls through the track, cards advance
  useEffect(() => {
    if (!scrollDriven || viewMode === 'grid') {
      setIsPinned(false);
      return;
    }

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!trackRef.current) {
            ticking = false;
            return;
          }

          // Don't override if user just clicked next/prev in the last 800ms
          if (Date.now() - isManualNavRef.current < 800) {
            ticking = false;
            return;
          }

          const rect = trackRef.current.getBoundingClientRect();
          const stickyTopOffset = 96; // 6rem navbar clearance
          const scrollDistance = stickyTopOffset - rect.top;
          const maxScrollDistance = rect.height - window.innerHeight;

          if (maxScrollDistance <= 0) {
            ticking = false;
            return;
          }

          // Track pinning state
          const currentlyPinned = rect.top <= stickyTopOffset && rect.bottom >= window.innerHeight;
          setIsPinned(currentlyPinned);

          if (rect.top <= stickyTopOffset && rect.bottom >= window.innerHeight) {
            // Pinned in viewport: Calculate progress (0 to 1)
            const rawProgress = scrollDistance / maxScrollDistance;
            const progress = Math.min(1, Math.max(0, rawProgress));

            // Map progress across total cards
            const targetIdx = Math.min(total - 1, Math.floor(progress * total));

            setCurrentIndex((prev) => {
              if (prev !== targetIdx) {
                return targetIdx;
              }
              return prev;
            });
          } else if (rect.top > stickyTopOffset) {
            // Above track -> Card 0
            setCurrentIndex(0);
          } else if (rect.bottom < window.innerHeight) {
            // Passed track -> Last Card
            setCurrentIndex(total - 1);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollDriven, viewMode, total]);

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

  // Grid View layout
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

  // 3 visible stacked layers: index 0 (top/active), 1 (middle peek), 2 (back peek)
  const visibleCards = [0, 1, 2].map((offset) => {
    const itemIndex = (currentIndex + offset) % total;
    return {
      item: testimonials[itemIndex],
      itemIndex,
      depth: offset
    };
  });

  const isLastCard = currentIndex === total - 1;

  // Track height calculation for scroll driven stacking:
  // Each card is given ~55vh of scroll distance, minimum 220vh total track height
  const trackHeight = scrollDriven ? `${Math.max(220, (total + 0.5) * 55)}vh` : 'auto';

  return (
    <div
      ref={trackRef}
      className={`relative ${className}`}
      style={{ height: trackHeight }}
    >
      {/* Sticky pinned viewport container */}
      <div className={`space-y-6 ${scrollDriven ? 'sticky top-20 sm:top-24 z-20 pb-4' : ''}`}>
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

            {/* Scroll guidance hint badge */}
            {scrollDriven && (
              <span
                className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-all ${
                  isLastCard
                    ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                    : isPinned
                    ? 'bg-[var(--bg-card)] text-[var(--text-structure)] border border-[var(--border-subtle)]'
                    : 'bg-transparent text-[var(--text-muted)]'
                }`}
              >
                <ArrowDown className={`w-3 h-3 ${isLastCard ? 'animate-bounce text-emerald-600' : 'text-[var(--accent-primary)]'}`} />
                <span>{isLastCard ? 'Release & scroll ahead' : 'Scroll down to change cards'}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
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
                  isManualNavRef.current = Date.now();
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
    </div>
  );
};
