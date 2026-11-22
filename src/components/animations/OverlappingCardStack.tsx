import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle2,
  Layers,
  LayoutGrid,
  BookOpen
} from 'lucide-react';
import type { TestimonialItem } from '../../data/testimonialsData';

interface OverlappingCardStackProps {
  testimonials: TestimonialItem[];
  className?: string;
  allowViewToggle?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

// Curated pastel palettes matching the reference cards
const CARD_PALETTES = [
  {
    bg: 'bg-[#EDE4FF] dark:bg-[#201533]',
    border: 'border-[#DAC8FC] dark:border-[#3E2C5E]',
    text: 'text-[#1D1135] dark:text-[#EFEAFC]',
    subtext: 'text-[#564573] dark:text-[#A79AC2]',
    tagBg: 'bg-[#DDD0FA] dark:bg-[#2D1F47]',
    tagText: 'text-[#4F26B8] dark:text-[#C7ACFA]'
  },
  {
    bg: 'bg-[#D1FAE5] dark:bg-[#062D1D]',
    border: 'border-[#A7F3D0] dark:border-[#0F5135]',
    text: 'text-[#064E3B] dark:text-[#D1FAE5]',
    subtext: 'text-[#047857] dark:text-[#6EE7B7]',
    tagBg: 'bg-[#A7F3D0] dark:bg-[#0B3D28]',
    tagText: 'text-[#065F46] dark:text-[#A7F3D0]'
  },
  {
    bg: 'bg-[#FFE4D6] dark:bg-[#341B12]',
    border: 'border-[#FECBA1] dark:border-[#5C2B1A]',
    text: 'text-[#431B0E] dark:text-[#FFEADF]',
    subtext: 'text-[#7C3620] dark:text-[#E2A58F]',
    tagBg: 'bg-[#FED7AA] dark:bg-[#4A2215]',
    tagText: 'text-[#9A3412] dark:text-[#FDBA74]'
  },
  {
    bg: 'bg-[#E0F2FE] dark:bg-[#0C273D]',
    border: 'border-[#BAE6FD] dark:border-[#14476E]',
    text: 'text-[#0C4A6E] dark:text-[#E0F2FE]',
    subtext: 'text-[#0369A1] dark:text-[#7DD3FC]',
    tagBg: 'bg-[#BAE6FD] dark:bg-[#123856]',
    tagText: 'text-[#0284C7] dark:text-[#BAE6FD]'
  },
  {
    bg: 'bg-[#FEF08A]/40 dark:bg-[#2E280C]',
    border: 'border-[#FDE047]/60 dark:border-[#524612]',
    text: 'text-[#422006] dark:text-[#FEF9C3]',
    subtext: 'text-[#713F12] dark:text-[#FDE047]',
    tagBg: 'bg-[#FEF08A]/80 dark:bg-[#403610]',
    tagText: 'text-[#854D0E] dark:text-[#FEF08A]'
  }
];

export const OverlappingCardStack: React.FC<OverlappingCardStackProps> = ({
  testimonials,
  className = '',
  allowViewToggle = true,
  autoPlay = true,
  autoPlayInterval = 4400
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [viewMode, setViewMode] = useState<'stack' | 'grid'>('stack');
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number>(0);
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = testimonials.length;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % total);
    setTimeout(() => setIsAnimating(false), 540);
  }, [isAnimating, total]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setTimeout(() => setIsAnimating(false), 540);
  }, [isAnimating, total]);

  // Automated Smooth Cycling with Hover & Focus Pause
  useEffect(() => {
    if (!autoPlay || viewMode === 'grid' || isPaused || isDragging || total <= 1) {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
    };
  }, [autoPlay, autoPlayInterval, isPaused, isDragging, viewMode, total, handleNext]);

  // Touch & Pointer drag gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    if (viewMode === 'grid' || isAnimating) return;
    setIsDragging(true);
    setIsPaused(true);
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

    if (dragOffset < -45) {
      handleNext();
    } else if (dragOffset > 45) {
      handlePrev();
    }
    setDragOffset(0);
  };

  // Helper for infinite circular offset relative to currentIndex
  const getCircularOffset = (idx: number, current: number, count: number): number => {
    const rawDiff = ((idx - current) % count + count) % count;
    return rawDiff > count / 2 ? rawDiff - count : rawDiff;
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
              <span>Switch to Cards View</span>
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => {
            const palette = CARD_PALETTES[idx % CARD_PALETTES.length];
            return (
              <div
                key={item.id}
                className={`rounded-[28px] p-6 sm:p-7 border ${palette.bg} ${palette.border} ${palette.text} flex flex-col justify-between card-hover shadow-xs`}
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

  // Card dimensions matching reference image: 1 full card on left, 2nd card next to come showing half on screen
  const cardWidth = isMobile ? 275 : 365;
  const cardGap = isMobile ? 14 : 20;
  const stepX = cardWidth + cardGap;

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="space-y-3">
        {/* Top Mini Control / Reading Status Bar */}
        <div className="flex items-center justify-between flex-wrap gap-2 px-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[var(--text-structure)] tabular-nums">
              Review {currentIndex + 1} of {total}
            </span>

            {/* Reading Status Indicator */}
            {isPaused ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 animate-pulse">
                <BookOpen className="w-3 h-3" />
                <span>Reading (paused)</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Auto-playing</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher */}
            {allowViewToggle && (
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className="press-tactile p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-structure)] cursor-pointer"
                title="Switch to grid view"
                aria-label="Switch to grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            )}

            {/* Prev / Next Controls */}
            <div className="inline-flex items-center gap-1">
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

        {/* 
          Cards Viewport Stage:
          - Shows 1 FULL card on the left
          - Shows 2nd card next to come HALF on the right
          - Animation: when next card arrives, current card goes BACK in 3D depth and moves away
        */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative h-[430px] sm:h-[410px] w-full overflow-hidden select-none cursor-grab active:cursor-grabbing touch-pan-y"
          style={{ perspective: '1200px' }}
        >
          {testimonials.map((item, idx) => {
            const offset = getCircularOffset(idx, currentIndex, total);
            const palette = CARD_PALETTES[idx % CARD_PALETTES.length];

            // Geometry Specification matching user's requested layout:
            // 1) offset === 0 (Active 1 Full Card):
            //    Positioned on the left (translateX = 0), full scale, zIndex = 20
            // 2) offset === 1 (2nd card next to come, showing half in screen):
            //    Positioned right next to card 1 (translateX = stepX), scale 1.0, zIndex = 15
            // 3) offset === -1 (Card that just exited / "goes back"):
            //    Pushes back in 3D (translateZ = -70px, scale = 0.92, translateX = -stepX * 0.95), zIndex = 10, fades out
            // 4) offset >= 2 (Upcoming waiting offscreen right):
            //    translateX = stepX * 1.9, scale = 0.94, opacity = 0
            let translateX = 0;
            let translateY = 0;
            let translateZ = 0;
            let rotate = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 20;
            let pointerEvents: 'auto' | 'none' = 'none';

            if (offset === 0) {
              // 1 FULL CARD (in front on the left)
              translateX = 0;
              translateY = 0;
              translateZ = 0;
              rotate = 0;
              scale = 1;
              opacity = 1;
              zIndex = 20;
              pointerEvents = 'auto';

              if (isDragging) {
                translateX += dragOffset;
                rotate += dragOffset * 0.02;
              }
            } else if (offset === 1) {
              // 2nd CARD NEXT TO COME (showing half in screen on the right)
              translateX = stepX;
              translateY = 0;
              translateZ = 0;
              rotate = 0;
              scale = 1;
              opacity = 1;
              zIndex = 15;
              pointerEvents = 'auto';

              if (isDragging) {
                translateX += dragOffset;
              }
            } else if (offset === -1) {
              // CARD GOES BACK (moves backward in depth and recedes to the left)
              translateX = -stepX * 0.95;
              translateY = 6;
              translateZ = -70;
              rotate = -2;
              scale = 0.92;
              opacity = 0;
              zIndex = 10;
              pointerEvents = 'none';
            } else if (offset === 2) {
              // Card waiting off-screen to the right, ready to become the next half-card
              translateX = stepX * 1.9;
              translateY = 0;
              translateZ = -40;
              rotate = 0;
              scale = 0.95;
              opacity = 0;
              zIndex = 5;
              pointerEvents = 'none';
            } else {
              // Off-screen behind
              translateX = -stepX * 1.8;
              translateY = 10;
              translateZ = -90;
              rotate = -4;
              scale = 0.88;
              opacity = 0;
              zIndex = 5;
              pointerEvents = 'none';
            }

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (offset === 1 && !isAnimating) {
                    handleNext();
                  }
                }}
                className={`absolute top-2 left-0 h-[400px] sm:h-[385px] rounded-[28px] p-6 sm:p-7 border ${palette.bg} ${palette.border} ${palette.text} shadow-lg will-change-transform flex flex-col justify-between transition-all ${
                  offset === 0
                    ? 'cursor-grab active:cursor-grabbing'
                    : offset === 1
                    ? 'cursor-pointer hover:opacity-100'
                    : ''
                }`}
                style={{
                  width: `${cardWidth}px`,
                  transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotate(${rotate}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  pointerEvents,
                  transitionDuration: isDragging && offset === 0 ? '0ms' : '540ms',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow:
                    offset === 0
                      ? '0 20px 40px -12px rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.04)'
                      : '0 10px 24px -8px rgba(0, 0, 0, 0.08)'
                }}
              >
                {/* Card Top: Rating Stars, Date & Category Tag */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className={`text-xs font-semibold ${palette.subtext}`}>{item.date}</span>
                  </div>

                  <span
                    className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${palette.tagBg} ${palette.tagText}`}
                  >
                    {item.category}
                  </span>

                  {/* Main Quote */}
                  <p className="text-sm sm:text-base leading-relaxed font-medium pt-1">
                    "{item.comment}"
                  </p>
                </div>

                {/* Card Bottom: Patient Info & Verification (Styled like the reference) */}
                <div className="pt-3 border-t border-black/10 dark:border-white/10 space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="font-bold text-sm sm:text-base">{item.patientName}</span>
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

                {/* Click indicator on the half-visible next card */}
                {offset === 1 && (
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-xs text-[10px] font-bold shadow-xs">
                    Next card →
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Story Scrubber Progress Dots */}
        <div className="flex items-center justify-start sm:justify-center gap-2 pt-1 px-1">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                if (currentIndex !== i && !isAnimating) {
                  setIsAnimating(true);
                  setCurrentIndex(i);
                  setTimeout(() => setIsAnimating(false), 540);
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === i
                  ? 'w-8 bg-[var(--accent-primary)] shadow-xs'
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
