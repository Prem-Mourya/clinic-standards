import React, { useState, useRef, useEffect } from 'react';
import { useClinic, type ThemeType } from '../context/ClinicContext';
import { Palette, Check } from 'lucide-react';

interface ThemeOption {
  id: ThemeType;
  name: string;
  dotColor1: string;
  dotColor2: string;
  dotColor3: string;
  vibe: string;
}

const THEMES: ThemeOption[] = [
  {
    id: 'warm-editorial',
    name: 'Warm Editorial Tech',
    dotColor1: '#F3EEE3',
    dotColor2: '#111111',
    dotColor3: '#D9541E',
    vibe: 'Cream · Ink Black · Burnt Orange (Default)'
  },
  {
    id: 'quiet-luxury',
    name: 'Quiet Luxury Alabaster',
    dotColor1: '#F7F5F0',
    dotColor2: '#2D2A26',
    dotColor3: '#C5A059',
    vibe: 'Warm Alabaster · Espresso · Muted Brass'
  },
  {
    id: 'modernist-mineral',
    name: 'Modernist Mineral',
    dotColor1: '#EFEFEA',
    dotColor2: '#1D2220',
    dotColor3: '#EA580C',
    vibe: 'Mineral Mist · Smoked Iron · Persimmon'
  },
  {
    id: 'deep-moss',
    name: 'Deep Moss & Lemon Laser',
    dotColor1: '#26332B',
    dotColor2: '#1E2822',
    dotColor3: '#FFE21F',
    vibe: 'Deep Moss · Fossil Grey · Lemon Laser'
  }
];

export const ThemeSwitcher: React.FC = () => {
  const { activeTheme, setTheme, showToast } = useClinic();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (theme: ThemeType, name: string) => {
    setTheme(theme);
    setIsOpen(false);
    showToast(`Switched brand theme to ${name}`);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="press-tactile flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-structure)] hover:border-[var(--accent-primary)] shadow-xs"
        title="Change visual theme palette"
        aria-label="Select signature theme"
      >
        <Palette className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
        <span className="hidden md:inline">Theme</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-2 shadow-2xl z-50 animate-modal-enter">
          <div className="px-3 py-2 border-b border-[var(--border-subtle)] mb-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              SiteForge Theme Gallery
            </p>
            <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
              Select a signature colorway for client demo
            </p>
          </div>

          <div className="space-y-1">
            {THEMES.map((t) => {
              const isSelected = activeTheme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleSelect(t.id, t.name)}
                  className={`press-tactile w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-colors ${
                    isSelected
                      ? 'bg-[var(--accent-subtle)] font-semibold text-[var(--text-structure)]'
                      : 'hover:bg-[var(--bg-surface)] text-[var(--text-structure)]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex -space-x-1">
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 inline-block shadow-xs"
                        style={{ backgroundColor: t.dotColor1 }}
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 inline-block shadow-xs"
                        style={{ backgroundColor: t.dotColor2 }}
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 inline-block shadow-xs"
                        style={{ backgroundColor: t.dotColor3 }}
                      />
                    </div>
                    <div>
                      <div className="font-medium text-[13px]">{t.name}</div>
                      <div className="text-[10px] text-[var(--text-muted)]">{t.vibe}</div>
                    </div>
                  </div>
                  {isSelected && (
                    <Check className="w-4 h-4 text-[var(--accent-primary)]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
