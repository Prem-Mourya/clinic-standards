import React, { useRef, useState, useCallback } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  glowRadius?: number;
  interactive?: boolean;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'var(--accent-subtle)',
  glowRadius = 380,
  interactive = true,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, [interactive]);

  const handleMouseEnter = useCallback(() => {
    if (interactive) setIsHovered(true);
  }, [interactive]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setCoords(null);
  }, []);

  return (
    <div
      ref={cardRef}
      onPointerMove={handleMouseMove}
      onPointerEnter={handleMouseEnter}
      onPointerLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-soft)] transition-[transform,box-shadow,border-color] duration-200 ease-out will-change-transform ${
        interactive ? 'hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)] hover:border-[var(--accent-primary)]/40 active:scale-[0.98]' : ''
      } ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Radial Glow (Vengence UI / Skiper UI pattern) */}
      {interactive && isHovered && coords && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(${glowRadius}px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 75%)`,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '1px'
          }}
          aria-hidden="true"
        />
      )}

      {/* Surface ambient reflection */}
      {interactive && isHovered && coords && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-40 transition-opacity duration-300"
          style={{
            background: `radial-gradient(${glowRadius * 0.8}px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 80%)`
          }}
          aria-hidden="true"
        />
      )}

      {/* Card Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
