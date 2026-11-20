# SiteForge Master Template: Solo Doctor Clinic Website (Master Template A)

You are operating inside the official **SiteForge Master Template Repository** (`clinic-standards`).

## 1. Role & Objective
This repository is the reusable, production-grade master codebase for independent solo doctor clinics in India (fictional demo baseline: *Aarogya Family Clinic — Dr. Arjun Mehta, MBBS, MD*).
It will be pushed to GitHub as an official template repository and cloned by the SiteForge factory to produce independent client websites (e.g. `Desktop/usha-clinic`).

## 2. Core Design & Craft Principles
1. **`taste-skill` (Anti-Slop Standard)**:
   - One section per screen (1440x900).
   - Equal left and right margins.
   - Plain clinical copy with zero marketing fluff.
   - Real photographs of clinic rooms and medical equipment.
2. **`emil-design-eng` (Emil Kowalski's Craft)**:
   - Tactile button press feedback (`:active:scale(0.97)`).
   - Natural scale entrances (`scale(0.95)` -> `1`, ease-out).
   - No `transition: all`. Composite-only GPU properties (`transform`, `opacity`).
3. **12 Signature Themes Support**:
   - 60% Canvas / Surface, 30% Structure / Typography, 10% High-Impact Accent.

## 3. Mandatory Contract Files
- `template.json`: Declaring niche `clinic-standard`, customizable slots, and feature flags.
- `siteforge.config.example.json`: Schema for client injection.
