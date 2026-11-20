# SiteForge Master Template: Solo Doctor Clinic Website (Master Template A)

This repository is an official **SiteForge Master Template (Tier 2)** designed to be published to GitHub and reused as the master blueprint for solo physician and family clinic websites across India.

## 1. Agency Architecture & Factory Link
- **Template ID**: `clinic-standard`
- **Global Factory Engine**: `C:\Users\jayav\OneDrive\Desktop\clinic website demo\factory`
- **Central Registry**: `siteforge.db`
- **Core Philosophy**: *"WE DO NOT SELL WEBSITES. WE SELL BUSINESS VALUE."*

## 2. Strict Engineering & Design Standards
When developing or modifying this codebase, you MUST adhere to:
1. **`taste-skill` (Anti-Slop Standard)**:
   - One section per screen (1440x900).
   - Equal left and right content margins.
   - Plain, honest, authoritative copy (zero generic AI buzzwords).
   - Real, authentic clinical photography (no tacky 3D cartoon models or blank placeholder boxes).
   - Dealt micro-moments: interactive OPD consultation timeline and transparent fee card.
2. **`emil-design-eng` (Design Engineering Craft)**:
   - Tactile feedback: buttons and cards must have active press scaling (`:active { transform: scale(0.97); }`).
   - Natural transitions: modals scale in from `scale(0.95)` with `opacity: 0 -> 1` using ease-out (never scale from `0`).
   - Explicit properties only: ban `transition: all`. Use `transition: transform 180ms ease-out, opacity 180ms ease`.
3. **Master Color Gallery & 60-30-10 Token System**:
   - Built on CSS variable tokens (`--bg-canvas`, `--text-structure`, `--accent-primary`) supporting the 12 Signature Themes.
   - Baseline Theme: **Warm Editorial Tech** (Cream `#F3EEE3`, Ink Black `#111111`, Burnt Orange `#D9541E`).

## 3. Template Contract & Deliverables
This repository must maintain:
- `template.json`: Declaring capabilities, customizable slots, feature flags, and quality audit stats.
- `siteforge.config.example.json`: Parameter schema for client personalization.
- Complete modular components for:
  - Doctor credibility & credentials card
  - Clinic address, landmarks & OPD consultation timings
  - Services & consultation fee transparency
  - Dual appointment enquiry system (WhatsApp Direct + Web Enquiry Form)
  - Testimonials & patient trust indicators
  - Full Schema.org JSON-LD local medical clinic SEO
