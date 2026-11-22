import React, { useState, useRef, useEffect } from 'react';
import { useClinic, type ThemeType } from '../context/ClinicContext';
import { Palette, Check, Sparkles } from 'lucide-react';

interface ThemeOption {
  id: ThemeType;
  name: string;
  dotColor1: string;
  dotColor2: string;
  dotColor3: string;
  vibe: string;
  isDark?: boolean;
}

export const THEMES: ThemeOption[] = [
  {
    id: 'warm-editorial',
    name: '1. Warm Editorial Tech',
    dotColor1: '#F3EEE3',
    dotColor2: '#111111',
    dotColor3: '#D9541E',
    vibe: 'Cream · Ink Black · Burnt Orange (Default)',
    isDark: false
  },
  {
    id: 'deep-moss',
    name: '2. Deep Moss & Lemon Laser',
    dotColor1: '#26332B',
    dotColor2: '#B9B4A9',
    dotColor3: '#FFE21F',
    vibe: 'Deep Moss · Fossil Grey · Lemon Laser',
    isDark: true
  },
  {
    id: 'avocado-walnut',
    name: '3. Avocado & Peony Neon',
    dotColor1: '#F6F5EE',
    dotColor2: '#2D201A',
    dotColor3: '#FF3D96',
    vibe: 'Warm Linen · Dark Walnut · Peony Neon',
    isDark: false
  },
  {
    id: 'quiet-luxury',
    name: '4. Quiet Luxury Alabaster',
    dotColor1: '#F7F5F0',
    dotColor2: '#2D2A26',
    dotColor3: '#C5A059',
    vibe: 'Warm Alabaster · Espresso · Muted Brass',
    isDark: false
  },
  {
    id: 'midnight-obsidian',
    name: '5. Midnight Obsidian',
    dotColor1: '#0B0F12',
    dotColor2: '#E2D9CE',
    dotColor3: '#D4AF37',
    vibe: 'Midnight Black · Champagne · Gold',
    isDark: true
  },
  {
    id: 'cobalt-runway',
    name: '6. Cobalt Runway',
    dotColor1: '#EAEAE7',
    dotColor2: '#0A0A0A',
    dotColor3: '#002FA7',
    vibe: 'Chalk Concrete · Pitch Ink · Hyper Cobalt',
    isDark: false
  },
  {
    id: 'parisian-atelier',
    name: '7. Parisian Atelier',
    dotColor1: '#FAF8F5',
    dotColor2: '#4A4238',
    dotColor3: '#9E4733',
    vibe: 'Bone White · Raw Umber · Burnt Terracotta',
    isDark: false
  },
  {
    id: 'digital-alpine',
    name: '8. Digital Alpine',
    dotColor1: '#F8FAFC',
    dotColor2: '#091E3A',
    dotColor3: '#1855F4',
    vibe: 'Frost White · Abyss Navy · Ultramarine',
    isDark: false
  },
  {
    id: 'kyoto-cedar',
    name: '9. Kyoto Cedar',
    dotColor1: '#F5F2EB',
    dotColor2: '#201E1D',
    dotColor3: '#E63926',
    vibe: 'Washi Paper · Charred Cedar · Vermilion Red',
    isDark: false
  },
  {
    id: 'cyber-primitivism',
    name: '10. Cyber Primitivism',
    dotColor1: '#F9F6F0',
    dotColor2: '#0D0C0B',
    dotColor3: '#0097B2',
    vibe: 'Sunbaked Sand · Deep Pitch · Electric Azure',
    isDark: false
  },
  {
    id: 'nocturne-velvet',
    name: '11. Nocturne Velvet',
    dotColor1: '#0D0B14',
    dotColor2: '#D8D4E2',
    dotColor3: '#A855F7',
    vibe: 'Deep Velvet Violet · Lavender · Electric Lilac',
    isDark: true
  },
  {
    id: 'modernist-mineral',
    name: '12. Modernist Mineral',
    dotColor1: '#EFEFEA',
    dotColor2: '#1D2220',
    dotColor3: '#EA580C',
    vibe: 'Mineral Mist · Smoked Iron · Persimmon',
    isDark: false
  }
];

interface ThemeSwitcherProps {
  iconOnly?: boolean;
  className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ iconOnly = false, className = '' }) => {
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
    <div className={`relative ${className}`} ref={dropdownRef}>
      {iconOnly ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="press-tactile flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white border border-white/20 transition-all cursor-pointer shadow-xs"
          title="Switch Brand Theme (12 Curated Palettes)"
          aria-label="Select signature theme"
        >
          <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--accent-primary)]" />
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="press-tactile flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-structure)] hover:border-[var(--accent-primary)] shadow-xs cursor-pointer"
          title="Change visual theme palette (12 Palettes)"
          aria-label="Select signature theme"
        >
          <Palette className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
          <span className="hidden md:inline">Theme</span>
        </button>
      )}

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 max-h-[75vh] overflow-hidden rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-2xl z-50 animate-modal-enter flex flex-col text-[var(--text-structure)]">
          {/* Header */}
          <div className="px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] shrink-0 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--text-structure)]">
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                <span>SiteForge Theme Gallery</span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                12 Signature Colorways · 60-30-10 Rule
              </p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--bg-card)] text-[var(--accent-primary)] border border-[var(--border-subtle)]">
              12 Themes
            </span>
          </div>

          {/* Theme List */}
          <div className="overflow-y-auto p-2 space-y-1 divide-y divide-[var(--border-subtle)]/40">
            {THEMES.map((t) => {
              const isSelected = activeTheme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleSelect(t.id, t.name)}
                  className={`press-tactile w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--accent-subtle)] font-semibold text-[var(--text-structure)] ring-1 ring-[var(--accent-primary)]/40'
                      : 'hover:bg-[var(--bg-surface)] text-[var(--text-structure)]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    {/* Swatch Trio */}
                    <div className="flex -space-x-1.5 shrink-0">
                      <span
                        className="w-4 h-4 rounded-full border border-black/20 inline-block shadow-xs"
                        style={{ backgroundColor: t.dotColor1 }}
                        title="60% Canvas / Surface"
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-black/20 inline-block shadow-xs"
                        style={{ backgroundColor: t.dotColor2 }}
                        title="30% Structure / Typography"
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-black/20 inline-block shadow-xs"
                        style={{ backgroundColor: t.dotColor3 }}
                        title="10% Brand Accent"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-xs text-[var(--text-structure)] truncate">
                          {t.name}
                        </span>
                        {t.isDark && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded-sm bg-black/10 dark:bg-white/10 text-[var(--text-muted)] font-mono">
                            Dark
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-[var(--text-muted)] truncate">
                        {t.vibe}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-[var(--accent-primary)] shrink-0 ml-1" />
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
