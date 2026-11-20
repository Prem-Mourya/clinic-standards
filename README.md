# Solo Doctor Clinic Website — Master Template A (SiteForge Tier 2)

> **"WE DO NOT SELL WEBSITES. WE SELL BUSINESS VALUE."**

Official **SiteForge Tier 2 Master Template** (`clinic-standard`) designed for solo physicians, general practitioners, and independent family medical clinics in India.

---

## 🏛️ Agency Architecture & Placement

```
┌────────────────────────────────────────────────────────────────────────┐
│                   TIER 1: GLOBAL FACTORY ENGINE                        │
│   Location: website-ai-agency-factory/factory                          │
│   - Persistent SQLite DB (siteforge.db)                                │
│   - Automation Core & CLI (node factory/dist/cli.js)                   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Clones & personalizes
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│             ★ TIER 2: MASTER TEMPLATE (clinic-standards) ★             │
│   Repository: github.com/Prem-Mourya/clinic-standards                  │
│   - Production-grade React 19 + TypeScript + Tailwind CSS v4           │
│   - Governed by template.json & siteforge.config.example.json          │
│   - Baseline Demo: Aarogya Family Clinic (Dr. Arjun Mehta, MBBS, MD)   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Clones for client projects
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   TIER 3: CLIENT WEBSITES (e.g. usha-clinic)           │
│   - Independent Git history + localized siteforge.config.json          │
│   - Verified with Playwright -> Deployed to Vercel                     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🩺 Baseline Fictional Demo Profile

- **Clinic Name:** Aarogya Family Clinic
- **Doctor:** Dr. Arjun Mehta, MBBS, MD (General Medicine)
- **Specialty:** General Physician & Family Medicine Consultant
- **Experience:** 12+ Years Clinical Practice (Alumni of KGMU, Ex-Senior Resident SMS Hospital)
- **Registration:** DMC / State Medical Council Reg. No. `DMC/R/58492`
- **Location:** Shop No. 12, Ground Floor, Shanti Vihar Commercial Complex, Ring Road, Indore, MP - 452001
- **Landmark:** Opposite Central Bank of India, Near Navlakha Square
- **Consultation Fee:** ₹400 Outpatient Consultation (Transparent, 7-Day Free Follow-up)
- **OPD Timings:**
  - Morning OPD: 10:00 AM – 1:30 PM (Mon – Sat)
  - Evening OPD: 5:30 PM – 9:00 PM (Mon – Sat)
  - Sunday OPD: 10:00 AM – 1:00 PM (Prior appointment only)

*Note: All demo details, credentials, testimonials, and contact information are fictional demo data demonstrating the master template capabilities.*

---

## 💎 Design & Interaction Craft Standards

1. **Anti-Slop Standard (`taste-skill`)**:
   - **One Section Per Screen:** Commanding Hero section at standard 1440x900 viewport without awkward content overlaps.
   - **Equal Edges:** Strict horizontal content margins (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`).
   - **Plain Clinical Copy:** Zero generic AI fluff or over-promising buzzwords.
   - **Real Authentic Photography:** High-craft licensed clinical portraits, equipment, and consulting rooms.
   - **Two Dealt Moments:**
     1. *Live OPD Consultation Scrubber:* Real-time status calculating whether the clinic is currently Open or Closed in IST, next session hours, and queue guidance.
     2. *Transparent Fee Card:* Clear ₹400 breakdown, 7-day complimentary follow-up policy, and accepted payment modes (UPI, Cash, Cards).

2. **Design Engineering Craft (`emil-design-eng`)**:
   - **Tactile Feedback:** Active button/card press scaling (`:active { transform: scale(0.97); }`).
   - **Natural Scales:** Modals scale in from `scale(0.95)` with `opacity: 0 -> 1` using ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`).
   - **Explicit Properties Only:** No `transition: all`. Strict composite-only GPU properties (`transform`, `opacity`, `background-color`).

3. **Master Color Gallery (60-30-10 Rule) & Interactive Theme Switcher**:
   - Dynamic CSS variable tokens (`--bg-canvas`, `--text-structure`, `--accent-primary`).
   - Built-in live theme switcher allowing prospective doctors to preview their clinic in 4 signature themes:
     - **Warm Editorial Tech (Default):** Cream `#F3EEE3` · Ink Black `#111111` · Burnt Orange `#D9541E`
     - **Quiet Luxury Alabaster:** Warm Alabaster `#F7F5F0` · Deep Espresso `#2D2A26` · Muted Brass `#C5A059`
     - **Modernist Mineral:** Mineral Mist `#EFEFEA` · Smoked Iron `#1D2220` · Persimmon `#EA580C`
     - **Deep Moss & Lemon Laser:** Deep Moss `#26332B` · Fossil Grey `#B9B4A9` · Lemon Laser `#FFE21F`

---

## ⚡ Core Business Features

### 1. Dual Appointment Enquiry System
- **Method A: Web Enquiry Form:**
  - Collects Patient Name, Phone, Preferred Date, OPD Slot (Morning/Evening), Visit Type (New / 7-Day Follow-Up), Service, and optional short note.
  - Generates unique reference token (e.g. `ENQ-8492`).
  - Clear disclaimer: *Submitting an enquiry does not automatically confirm an appointment. Reception will contact you to confirm your token.*
  - Instant one-click handoff to send the exact details over WhatsApp.
- **Method B: Direct WhatsApp Enquiry:**
  - Opens WhatsApp directly with a pre-filled, structured message for the clinic desk.

### 2. Patient Retention (7-Day Complimentary Follow-up)
- Dedicated `/existing-patients` portal guiding patients on:
  - 7-day free follow-up consultation window (₹0 fee).
  - WhatsApp lab test report review workflow.
  - 3-month routine chronic disease checkups (Diabetes, BP).
  - Replacement of lost digital prescriptions.

### 3. Local SEO & Schema.org JSON-LD
- Full Schema.org `MedicalClinic` and `Physician` structured data.
- Open Graph and Twitter metadata for local search discoverability.
- Interactive Google Maps embed with turn-by-turn navigation link.

---

## 🛠️ Tech Stack & Quality Gates

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 8
- **Styling:** Tailwind CSS v4 (with CSS token variables)
- **Icons:** Lucide React
- **Router:** React Router v7
- **Quality Gates:**
  - `npm run build`: Exit 0 (0 type errors, 0 bundler errors)
  - `npm run lint`: Exit 0 (0 warnings, 0 errors via Oxlint)
  - `npx playwright test`: 8/8 tests passed (Desktop Chromium & Mobile Chrome)

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build production bundle
npm run build

# 4. Run lint check
npm run lint

# 5. Run end-to-end Playwright tests
npm test
```
