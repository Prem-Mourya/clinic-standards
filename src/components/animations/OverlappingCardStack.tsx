import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle2,
  Layers,
  LayoutGrid,
  ArrowDown
} from 'lucide-react';
import type { TestimonialItem } from '../../data/testimonialsData';

interface OverlappingCardStackProps {
  testimonials: TestimonialItem[];
  className?: string;
  allowViewToggle?: boolean;
  scrollDriven?: boolean;
}

// Curated pastel palettes per card index matching the video reference
const CARD_PALETTES = [
  {
    bg: 'bg-[#F2EDFD] dark:bg-[#1E1730]',
    border: 'border-[#DDD2F8] dark:border-[#3C2D5C]',
    text: 'text-[#1D1135] dark:text-[#EFEAFC]',
    subtext: 'text-[#564573] dark:text-[#A79AC2]',
    tagBg: 'bg-[#E2D5FA] dark:bg-[#2C2147]',
    tagText: 'text-[#532DB0] dark:text-[#C7ACFA]'
  },
  {
    bg: 'bg-[#EBF8F2] dark:bg-[#122A1E]',
    border: 'border-[#C5EBD8] dark:border-[#1F4C36]',
    text: 'text-[#0E3523] dark:text-[#E3F7EE]',
    subtext: 'text-[#3E6D56] dark:text-[#96C7AF]',
    tagBg: 'bg-[#D3F2E3] dark:bg-[#1B3E2D]',
    tagText: 'text-[#1B7349] dark:text-[#78E2AE]'
  },
  {
    bg: 'bg-[#FFF0E8] dark:bg-[#2E1C15]',
    border: 'border-[#F8D2C2] dark:border-[#522E22]',
    text: 'text-[#3E1A11] dark:text-[#FDEAE2]',
    subtext: 'text-[#7B4D41] dark:text-[#CBB0A7]',
    tagBg: 'bg-[#FDE0D3] dark:bg-[#43251B]',
    tagText: 'text-[#A84523] dark:text-[#FCA587]'
  },
  {
    bg: 'bg-[#ECF5FE] dark:bg-[#112338]',
    border: 'border-[#C8E1FC] dark:border-[#1E3E64]',
    text: 'text-[#0A2946] dark:text-[#E4F1FD]',
    subtext: 'text-[#3B6286] dark:text-[#96BBDC]',
    tagBg: 'bg-[#D5E9FD] dark:bg-[#1B3654]',
    tagText: 'text-[#1A62A6] dark:text-[#7EB9F7]'
  },
  {
    bg: 'bg-[#FEF9E8] dark:bg-[#2B2513]',
    border: 'border-[#F7E7B8] dark:border-[#4C411D]',
    text: 'text-[#382D08] dark:text-[#FAF4DC]',
    subtext: 'text-[#706030] dark:text-[#C7BA8E]',
    tagBg: 'bg-[#FDF0C8] dark:bg-[#3D3417]',
    tagText: 'text-[#8A6A0B] dark:text-[#F4CE5E]'
  }
];

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
  const [isMobile, setIsMobile] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number>(0);
  const isManualNavRef = useRef<number>(0);

  const total = testimonials.length;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    isManualNavRef.current = Date.now();
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % total);
    setTimeout(() => setIsAnimating(false), 420);
  }, [isAnimating, total]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    isManualNavRef.current = Date.now();
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setTimeout(() => setIsAnimating(false), 420);
  }, [isAnimating, total]);

  // Scroll-driven sticky card sliding
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

          // Skip scroll sync for 800ms after user clicks manual button
          if (Date.now() - isManualNavRef.current < 800) {
            ticking = false;
            return;
          }

          const rect = trackRef.current.getBoundingClientRect();
          const stickyTopOffset = 88; // Navbar clearance (5.5rem)
          const scrollDistance = stickyTopOffset - rect.top;
          const maxScrollDistance = rect.height - window.innerHeight;

          if (maxScrollDistance <= 0) {
            ticking = false;
            return;
          }

          const currentlyPinned = rect.top <= stickyTopOffset && rect.bottom >= window.innerHeight;
          setIsPinned(currentlyPinned);

          if (rect.top <= stickyTopOffset && rect.bottom >= window.innerHeight) {
            // Within scroll track: Map progress strictly to [0, total - 1]
            const rawProgress = scrollDistance / maxScrollDistance;
            const progress = Math.min(1, Math.max(0, rawProgress));
            const targetIdx = Math.min(total - 1, Math.floor(progress * total));

            setCurrentIndex((prev) => {
              if (prev !== targetIdx) {
                return targetIdx;
              }
              return prev;
            });
          } else if (rect.top > stickyTopOffset) {
            setCurrentIndex(0);
          } else if (rect.bottom < window.innerHeight) {
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

  // Touch & Pointer drag gestures
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

  // Grid view option
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
          {testimonials.map((item, idx) => {
            const palette = CARD_PALETTES[idx % CARD_PALETTES.length];
            return (
              <div
                key={item.id}
                className={`rounded-3xl p-6 sm:p-7 border ${palette.bg} ${palette.border} ${palette.text} flex flex-col justify-between card-hover shadow-xs`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className={`text-[11px] font-semibold ${palette.subtext}`}>{item.date}</span>
                  </div>

                  <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${palette.tagBg} ${palette.tagText}`}>
                    {item.category}
                  </span>

                  <p className="text-sm sm:text-base leading-relaxed italic font-medium pt-1">
                    "{item.comment}"
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-black/10 dark:border-white/10">
                  <div className="font-bold text-sm">
                    {item.patientName}, <span className="tabular-nums">{item.age} yrs</span>
                  </div>
                  <div className={`text-xs mt-0.5 ${palette.subtext}`}>
                    Consulted for: <strong>{item.condition}</strong> · {item.location}
                  </div>
                  <div className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-2 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Patient Consent
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const isLastCard = currentIndex === total - 1;
  const trackHeight = scrollDriven ? `${Math.max(220, (total + 0.5) * 55)}vh` : 'auto';

  return (
    <div
      ref={trackRef}
      className={`relative ${className}`}
      style={{ height: trackHeight }}
    >
      {/* Sticky Viewport Stage */}
      <div className={`space-y-6 ${scrollDriven ? 'sticky top-20 sm:top-24 z-20 pb-4' : ''}`}>
        {/* Controls Bar: Pill counter, scroll guidance hint & navigation arrows (No Play/Pause button) */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-2">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent-subtle)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/20">
              <Layers className="w-3.5 h-3.5" />
              <span>Interactive Overlap Stack</span>
            </span>

            <span className="text-xs font-bold text-[var(--text-structure)] tabular-nums">
              {currentIndex + 1} of {total} stories
            </span>

            {/* Scroll guidance hint badge */}
            {scrollDriven && (
              <span
                className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  isLastCard
                    ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                    : isPinned
                    ? 'bg-[var(--bg-card)] text-[var(--text-structure)] border border-[var(--border-subtle)] shadow-xs'
                    : 'bg-transparent text-[var(--text-muted)]'
                }`}
              >
                <ArrowDown className={`w-3.5 h-3.5 ${isLastCard ? 'animate-bounce text-emerald-600' : 'text-[var(--accent-primary)]'}`} />
                <span>{isLastCard ? 'Release & scroll ahead ↓' : 'Scroll to change cards ↓'}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Grid view switcher */}
            {allowViewToggle && (
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className="press-tactile p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-structure)] cursor-pointer"
                title="Switch to 3-column grid"
                aria-label="Switch to grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            )}

            {/* Prev / Next arrows */}
            <div className="inline-flex items-center gap-1.5">
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

        {/* Video Reference Style: Overlapping Horizontal Card Deck Stage */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative h-[480px] sm:h-[450px] w-full overflow-hidden select-none cursor-grab active:cursor-grabbing touch-pan-y"
          style={{ perspective: '1400px' }}
        >
          {testimonials.map((item, idx) => {
            const offset = idx - currentIndex;
            const palette = CARD_PALETTES[idx % CARD_PALETTES.length];
            const stepX = isMobile ? 200 : 290;

            // Card Geometry matching the video:
            // - Center card: offset = 0, scale 1, rotate 0deg, full opacity
            // - Left card (previous): offset = -1, tilted negative rotate(-6deg), peeking left
            // - Right card (next): offset = 1, upright peeking right, scale 0.96
            // - Far right cards: offset >= 2, stacked further right
            let translateX = 0;
            let translateY = 0;
            let rotate = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 30;
            let pointerEvents: 'auto' | 'none' = 'none';

            if (offset === 0) {
              // Active Center Card
              translateX = 0;
              translateY = 0;
              rotate = 0;
              scale = 1;
              opacity = 1;
              zIndex = 30;
              pointerEvents = 'auto';

              if (isDragging) {
                translateX += dragOffset;
                rotate += dragOffset * 0.04;
              }
            } else if (offset === -1) {
              // Previous card peeking on the left, tilted (exactly as in the reference video!)
              translateX = -stepX;
              translateY = 10;
              rotate = -6;
              scale = 0.94;
              opacity = 0.88;
              zIndex = 20;
              pointerEvents = 'auto';
            } else if (offset === 1) {
              // Next card peeking on the right, ready to enter
              translateX = stepX;
              translateY = 6;
              rotate = 2;
              scale = 0.96;
              opacity = 0.9;
              zIndex = 25;
              pointerEvents = 'auto';
            } else if (offset === 2) {
              // Second card to the right
              translateX = stepX * 1.9;
              translateY = 12;
              rotate = 4;
              scale = 0.92;
              opacity = 0.55;
              zIndex = 15;
            } else if (offset < -1) {
              // Passed card far to the left
              translateX = -stepX * 2;
              translateY = 16;
              rotate = -10;
              scale = 0.88;
              opacity = 0;
              zIndex = 10;
            } else {
              // Upcoming cards far to the right
              translateX = stepX * 2.8;
              translateY = 16;
              rotate = 6;
              scale = 0.88;
              opacity = 0;
              zIndex = 10;
            }

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (offset !== 0 && !isAnimating) {
                    if (offset === 1) handleNext();
                    else if (offset === -1) handlePrev();
                  }
                }}
                className={`absolute top-2 left-1/2 -ml-[150px] sm:-ml-[190px] w-[300px] sm:w-[380px] h-[450px] sm:h-[430px] rounded-3xl p-6 sm:p-8 border ${palette.bg} ${palette.border} ${palette.text} shadow-xl will-change-transform flex flex-col justify-between transition-all ${
                  offset === 0
                    ? 'cursor-grab active:cursor-grabbing'
                    : 'cursor-pointer hover:opacity-100'
                }`}
                style={{
                  transform: `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotate}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  pointerEvents,
                  transitionDuration: isDragging && offset === 0 ? '0ms' : '440ms',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow:
                    offset === 0
                      ? '0 24px 48px -12px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(0, 0, 0, 0.05)'
                      : '0 12px 28px -8px rgba(0, 0, 0, 0.1)'
                }}
              >
                {/* Card Top: Stars & Category Tag */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className={`text-xs font-semibold ${palette.subtext}`}>{item.date}</span>
                  </div>

                  <span
                    className={`inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${palette.tagBg} ${palette.tagText}`}
                  >
                    {item.category}
                  </span>

                  {/* Main Quote */}
                  <p className="text-base sm:text-lg leading-relaxed font-medium pt-1">
                    "{item.comment}"
                  </p>
                </div>

                {/* Card Bottom: Patient info & verification */}
                <div className="pt-4 border-t border-black/10 dark:border-white/10 space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="font-bold text-base">{item.patientName}</span>
                    <span className={`text-xs font-semibold tabular-nums ${palette.subtext}`}>
                      {item.age} years
                    </span>
                  </div>
                  <div className={`text-xs ${palette.subtext}`}>
                    Consulted for: <strong>{item.condition}</strong>
                  </div>
                  <div className="text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold flex items-center gap-1.5 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Verified Authorized Patient Consent</span>
                  </div>
                </div>

                {/* Click to flip indicator on peeking cards */}
                {offset !== 0 && (
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-white/70 dark:bg-black/40 backdrop-blur-xs text-[10px] font-bold">
                    {offset === 1 ? 'Next →' : '← Previous'}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Story Scrubber Progress Dots */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                if (currentIndex !== i && !isAnimating) {
                  isManualNavRef.current = Date.now();
                  setIsAnimating(true);
                  setCurrentIndex(i);
                  setTimeout(() => setIsAnimating(false), 420);
                }
              }}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === i
                  ? 'w-10 bg-[var(--accent-primary)] shadow-xs'
                  : 'w-2.5 bg-[var(--border-subtle)] hover:bg-[var(--text-muted)]'
              }`}
              aria-label={`Jump to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
