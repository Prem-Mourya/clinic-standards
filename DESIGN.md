# DESIGN.md — Clinic Standards Visual Design System

## 1. Visual Direction & Aesthetic POV
- **Anti-Slop Standard (`taste-skill`):** Commanding editorial presence, authentic clinical photography, balanced headings, equal horizontal edges (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`), zero kickers/eyebrows above headings, and honest copy without marketing buzzwords.
- **Design Engineering Craft (`emil-design-eng`):** Tactile button/card press scaling (`:active { transform: scale(0.97); }`), natural modal scale entrances (`0.95 -> 1` with ease-out cubic-bezier), and explicit composite-only GPU properties (`transform`, `opacity`, `background-color`).
- **Craft Floor Compliance:** Standard card radii of 16px (`rounded-2xl`), single declared elevation (no ghost double-borders), calibrated SVG `Star` icons instead of unicode stars, and `tabular-nums` for currency, phone numbers, and time slots.

## 2. 60-30-10 Color Engine & 12-Theme Support
Built on CSS variable tokens supporting 4 interactive live-switchable signature palettes:

### A. Warm Editorial Tech (Default Baseline)
- **60% Base / Surface:** Cream `#F3EEE3` · Card `#FFFFFF` · Muted Surface `#E8E2D5`
- **30% Structure / Typography:** Ink Black `#111111` · Soft Charcoal `#2A2A2A` · Muted `#666666`
- **10% Brand Accent:** Burnt Orange `#D9541E` · Hover `#BF4515` · Subtle Tint `rgba(217, 84, 30, 0.12)`

### B. Quiet Luxury Alabaster (`[data-theme="quiet-luxury"]`)
- **60% Base / Surface:** Warm Alabaster `#F7F5F0` · Card `#FFFFFF` · Pale Bone `#ECE7DE`
- **30% Structure / Typography:** Deep Espresso `#2D2A26` · Smoked Taupe `#45403B`
- **10% Metallic Accent:** Muted Antique Brass `#C5A059` · Hover `#B28D44`

### C. Modernist Mineral (`[data-theme="modernist-mineral"]`)
- **60% Base / Surface:** Mineral Mist `#EFEFEA` · Card `#FFFFFF` · Soft Stone `#E4E4DD`
- **30% Structure / Typography:** Smoked Iron `#1D2220` · Muted `#606965`
- **10% Warm Accent:** Persimmon Orange `#EA580C` · Hover `#C2410C`

### D. Deep Moss & Lemon Laser (`[data-theme="deep-moss"]`)
- **60% Base / Surface:** Deep Moss `#26332B` · Card `#1E2822` · Muted `#17201B`
- **30% Structure / Typography:** Off-White `#F5F7F6` · Fossil Grey `#B9B4A9`
- **10% High-Contrast Pop:** Lemon Laser `#FFE21F` · Hover `#E5CA14`

## 3. Typography Pairing
- **Display Headings:** *Playfair Display* (Editorial Serif, `text-wrap: balance;`, `letter-spacing: -0.02em;`)
- **Body & Controls:** *Plus Jakarta Sans* (Precision Sans-serif, `line-height: 1.6;`, `max-width: 70ch;`)
- **Numerics:** `font-variant-numeric: tabular-nums` for prices, dates, tokens, and timings.

## 4. Motion Guidelines
- **Modal Entrance:** `scale(0.95)` with `translateY(10px)` to `scale(1)` in `220ms cubic-bezier(0.16, 1, 0.3, 1)`
- **Tactile Feedback:** `transform: scale(0.97)` on active press (`180ms cubic-bezier(0.16, 1, 0.3, 1)`)
- **Live Status Pulse:** `2.2s cubic-bezier(0.4, 0, 0.6, 1)` infinite breathing animation
- **Reduced Motion:** Full `@media (prefers-reduced-motion: reduce)` path suppressing animations while preserving opacity and state clarity.
