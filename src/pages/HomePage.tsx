import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CLINIC_DATA } from '../data/clinicData';
import { TESTIMONIALS, TESTIMONIALS_DISCLAIMER } from '../data/testimonialsData';
import { useClinic } from '../context/ClinicContext';
import { OpdLiveBadge } from '../components/OpdLiveBadge';
import { FeeTransparencyCard } from '../components/FeeTransparencyCard';
import {
  OverlappingCardStack,
  SpotlightCard,
  ScrollReveal,
  TiltCard,
  StepCardStack
} from '../components/animations';
import {
  Calendar,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  AlertCircle,
  FileText,
  Award,
  Copy,
  Check,
  Navigation,
  ArrowUpRight,
  Star
} from 'lucide-react';

const SmileBadgeIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg
    viewBox="0 0 100 100"
    className={`${className} drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] select-none`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* 3D bottom-right dark rim */}
    <ellipse cx="50" cy="58" rx="42" ry="38" fill="#111111" />
    <ellipse cx="50" cy="54" rx="42" ry="38" fill="#D97706" />
    {/* Main yellow coin body */}
    <ellipse cx="50" cy="48" rx="42" ry="38" fill="#FACC15" stroke="#111111" strokeWidth="4.5" />
    {/* Glossy top-left highlight */}
    <path
      d="M 22 42 C 24 30, 42 22, 60 22"
      stroke="#FEF08A"
      strokeWidth="3.5"
      strokeLinecap="round"
      opacity="0.8"
    />
    {/* Left Eye: looking up and to the right */}
    <ellipse cx="40" cy="40" rx="6.5" ry="9" fill="#111111" />
    <circle cx="42.5" cy="37" r="2.5" fill="#FFFFFF" />
    {/* Right Eye: looking up and to the right */}
    <ellipse cx="58" cy="38" rx="6.5" ry="9" fill="#111111" />
    <circle cx="60.5" cy="35" r="2.5" fill="#FFFFFF" />
    {/* Expressive Smile Curve */}
    <path
      d="M 36 55 Q 50 67 64 53"
      fill="none"
      stroke="#111111"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

export const HomePage: React.FC = () => {
  const { openAppointmentModal, showToast } = useClinic();
  const [copiedField, setCopiedField] = useState<'address' | 'phone' | null>(null);

  const copyToClipboard = (text: string, field: 'address' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    showToast(`Copied ${field === 'address' ? 'clinic address' : 'phone number'} to clipboard`);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION: Single screen commanding hero (1440x900 standard) */}
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center pt-8 pb-12 overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute inset-0 bg-radial from-[var(--accent-subtle)] via-transparent to-transparent opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left 7 Columns: Editorial Headline, Live Status, Actions */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Live OPD Badge & Council Registration */}
              <div className="flex flex-wrap items-center gap-2.5">
                <OpdLiveBadge />
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--bg-surface)] text-[var(--text-structure)] border border-[var(--border-subtle)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="tabular-nums">Reg. No. {CLINIC_DATA.doctor.registrationNumber}</span>
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-structure)] leading-[1.12]">
                The family doctor you can talk to{' '}
                <span className="curved-underline text-[var(--accent-primary)]">without hurry.</span>
              </h1>

              {/* Subtitle / Value proposition */}
              <p className="text-base sm:text-lg text-[var(--text-soft)] max-w-2xl leading-relaxed">
                Evidence-based outpatient medical care for individuals and families in {CLINIC_DATA.contact.city}. Dedicated 15-minute consultations, rational prescribing, and a transparent ₹400 fee structure.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => openAppointmentModal()}
                  className="press-tactile py-3.5 px-7 rounded-xl bg-[var(--accent-primary)] text-[var(--accent-foreground)] font-bold text-sm hover:opacity-90 shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Consultation Slot</span>
                </button>

                <a
                  href={`https://wa.me/${CLINIC_DATA.contact.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press-tactile py-3.5 px-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-structure)] font-bold text-sm hover:border-emerald-600 hover:text-emerald-700 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Consult on WhatsApp</span>
                </a>
              </div>

              {/* 4 Clinical Pillars with tabular numbers & staggered entry */}
              <div className="pt-6 border-t border-[var(--border-subtle)] grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                <ScrollReveal delay={0}>
                  <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                    <div className="text-xs font-bold text-[var(--text-structure)] tabular-nums">15-Min Slots</div>
                    <div className="text-[11px] text-[var(--text-muted)] mt-0.5">Unhurried visits</div>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={50}>
                  <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                    <div className="text-xs font-bold text-[var(--text-structure)] tabular-nums">₹400 Standard</div>
                    <div className="text-[11px] text-[var(--text-muted)] mt-0.5">Transparent fee</div>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={100}>
                  <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                    <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">7-Day Free</div>
                    <div className="text-[11px] text-[var(--text-muted)] mt-0.5">Complimentary review</div>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={150}>
                  <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                    <div className="text-xs font-bold text-[var(--text-structure)]">Zero Polypharmacy</div>
                    <div className="text-[11px] text-[var(--text-muted)] mt-0.5">Rational medicines</div>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Right 5 Columns: Doctor Portrait & Authentic Credibility Card with 3D Tilt */}
            <div className="lg:col-span-5">
              <TiltCard maxTilt={3.5} scale={1.01}>
                <div className="relative rounded-2xl p-3 sm:p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-elevated)]">
                  {/* Genuine Physician Photo with subtle frame */}
                  <div className="relative aspect-4/5 rounded-xl overflow-hidden bg-stone-200">
                    <img
                      src={CLINIC_DATA.doctor.photoUrl}
                      alt={`${CLINIC_DATA.doctor.fullName} - General Physician`}
                      className="w-full h-full object-cover object-top"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Doctor Info Floating Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[var(--accent-primary)] mb-1.5 shadow-xs">
                        Consultant General Physician
                      </span>
                      <h3 className="font-editorial text-2xl font-bold tracking-tight">
                        {CLINIC_DATA.doctor.fullName}
                      </h3>
                      <p className="text-xs text-white/90 font-medium">
                        {CLINIC_DATA.doctor.credentials} · <span className="tabular-nums">{CLINIC_DATA.doctor.experienceYears}+ Years Clinical Practice</span>
                      </p>
                      <p className="text-[11px] text-white/70 mt-1">
                        {CLINIC_DATA.doctor.formerInstitutions}
                      </p>
                    </div>
                  </div>

                  {/* Sub-card verification tag */}
                  <div className="mt-3 p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
                      <div>
                        <div className="font-bold text-[var(--text-structure)]">Medical Council Registered</div>
                        <div className="text-[10px] text-[var(--text-muted)] tabular-nums">{CLINIC_DATA.doctor.registrationNumber} ({CLINIC_DATA.doctor.almaMater})</div>
                      </div>
                    </div>
                    <Link
                      to="/about"
                      className="press-tactile text-[11px] font-bold text-[var(--accent-primary)] hover:underline flex items-center gap-0.5"
                    >
                      <span>Full Bio</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DEALT MOMENT 1: Live OPD Schedule & Queue Guidance Scrubber */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl p-6 sm:p-10 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-soft)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
            <div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[var(--text-structure)]">
                Daily Consultation Timings
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                Walk-ins are welcome; booked tokens receive priority queue placement.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <OpdLiveBadge />
              <Link
                to="/timings"
                className="press-tactile text-xs font-bold text-[var(--accent-primary)] hover:underline inline-flex items-center gap-1"
              >
                <span>Full Schedule</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            {CLINIC_DATA.opdSchedule.map((session, sIdx) => (
              <ScrollReveal key={session.id} delay={sIdx * 60} direction="up">
                <SpotlightCard className="p-5 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      {session.days}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-structure)]">
                      {session.type}
                    </span>
                  </div>
                  <div className="font-editorial text-xl font-bold text-[var(--text-structure)]">
                    {session.title}
                  </div>
                  <div className="text-lg font-extrabold text-[var(--accent-primary)] tabular-nums">
                    {session.hours}
                  </div>
                  <p className="text-xs text-[var(--text-muted)] pt-1 border-t border-[var(--border-subtle)]">
                    {session.note}
                  </p>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
              <span>
                Tokens are distributed 15 minutes before each session. Calling or requesting online before your visit avoids waiting room congestion.
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={CLINIC_DATA.contact.phoneTel}
                className="press-tactile font-bold text-[var(--text-structure)] hover:text-[var(--accent-primary)] tabular-nums"
              >
                Call Desk: {CLINIC_DATA.contact.phoneDisplay}
              </a>
              <button
                onClick={() => copyToClipboard(CLINIC_DATA.contact.phoneRaw, 'phone')}
                className="press-tactile p-1 text-[var(--text-muted)] hover:text-[var(--text-structure)] cursor-pointer"
                title="Copy phone number"
                aria-label="Copy phone number"
              >
                {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DEALT MOMENT 2: Transparent Fee Card & Consultation Policy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeeTransparencyCard />
      </section>

      {/* 4. CLINIC SERVICES OVERVIEW: Clean General Physician Practice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[var(--text-structure)]">
              General Outpatient Consultations
            </h2>
            <p className="text-sm text-[var(--text-muted)] mt-1 max-w-xl">
              Specialized diagnosis and treatment for everyday acute conditions, chronic metabolic management, and routine family healthcare.
            </p>
          </div>

          <Link
            to="/services"
            className="press-tactile self-start sm:self-end inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-structure)] hover:border-[var(--accent-primary)]"
          >
            <span>View All Services & Inclusions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLINIC_DATA.services.slice(0, 6).map((service, sIdx) => (
            <ScrollReveal key={service.id} delay={sIdx * 50} direction="up">
              <SpotlightCard className="p-6 h-full">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent-primary)] bg-[var(--accent-subtle)] px-2.5 py-0.5 rounded-full">
                      {service.category}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] font-medium tabular-nums">
                      {service.duration}
                    </span>
                  </div>
                  <h3 className="font-editorial text-xl font-bold text-[var(--text-structure)] mb-2">
                    {service.name}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <span className="text-[11px] text-[var(--text-structure)] font-medium tabular-nums">
                    Standard Fee: ₹400
                  </span>
                  <button
                    onClick={() => openAppointmentModal(service.name)}
                    className="press-tactile text-xs font-bold text-[var(--accent-primary)] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Book for this</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 5. APPOINTMENT WALKTHROUGH: Overlapping Progressive Step Stack */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="rounded-2xl p-6 sm:p-10 bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="font-editorial text-3xl font-bold text-[var(--text-structure)]">
                How Your Clinic Visit Works
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-2">
                Designed to minimize waiting room time and provide clear doctor consultations.
              </p>
            </div>

            {/* Interactive Step Card Stack with Overlapping Sliding Animation */}
            <StepCardStack steps={CLINIC_DATA.patientInstructions.appointmentProcess} />

            {/* What to bring note */}
            <div className="mt-8 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-xs text-[var(--text-structure)]">
                <FileText className="w-5 h-5 text-[var(--accent-primary)] shrink-0" />
                <div>
                  <strong>What to bring with you:</strong> Previous medical prescriptions, recent lab reports, and your current medicine strip list.
                </div>
              </div>
              <Link
                to="/services"
                className="press-tactile text-xs font-bold text-[var(--accent-primary)] hover:underline shrink-0"
              >
                Read full checklist →
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 6. PATIENT REVIEWS: Split Editorial Showcase & Automated Smooth Card Deck */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Bold Editorial Typography + 3D Smile Coin + Pill Action */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal direction="left">
              <div className="space-y-6">
                {/* Headline Block with 3D Smile Coin (Styled after reference image) */}
                <div className="relative inline-block pr-12 sm:pr-16">
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black italic tracking-tighter uppercase text-[var(--text-structure)] leading-[0.92]">
                    FEEDBACK<br />
                    FROM OUR<br />
                    PATIENTS
                  </h2>

                  {/* 3D Yellow Smile Coin / Sticker from Reference */}
                  <div className="absolute -top-4 right-0 sm:-top-6 sm:-right-2 rotate-12 transition-transform duration-300 hover:rotate-6 hover:scale-105 pointer-events-none">
                    <SmileBadgeIcon className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20" />
                  </div>
                </div>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-[var(--text-muted)] font-medium leading-relaxed max-w-md">
                  See for yourself — authentic recovery stories and clinical care experiences from patients and families in Indore.
                </p>

                {/* Pill CTA Button (Matching Reference) & Rating Details */}
                <div className="space-y-4 pt-1">
                  <div>
                    <Link
                      to="/reviews"
                      className="press-tactile inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[var(--text-structure)] text-[var(--bg-canvas)] text-xs sm:text-sm font-extrabold uppercase tracking-wider hover:bg-[var(--accent-primary)] hover:text-white transition-all shadow-md group"
                    >
                      <span>Read All Verified Reviews</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-semibold">
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="font-bold text-[var(--text-structure)]">4.9 / 5</span>
                    <span>· 150+ Patient Reviews</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Automated Smooth Overlapping Card Deck (1 Full Card + 1 Half Card) */}
          <div className="lg:col-span-7 overflow-hidden">
            <ScrollReveal direction="right">
              <OverlappingCardStack
                testimonials={TESTIMONIALS}
                allowViewToggle={true}
                autoPlay={true}
                autoPlayInterval={4400}
              />
            </ScrollReveal>
          </div>
        </div>

        <p className="text-[11px] text-center text-[var(--text-muted)] mt-8 italic">
          * {TESTIMONIALS_DISCLAIMER}
        </p>
      </section>

      {/* 7. LOCATION & DIRECTIONS SNAPSHOT with 1-Click Copy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="rounded-2xl p-6 sm:p-10 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-soft)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Info */}
              <div className="lg:col-span-5 space-y-4">
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[var(--text-structure)]">
                  Easy to Reach on Ring Road
                </h2>
                <div className="text-xs sm:text-sm text-[var(--text-soft)] space-y-1.5 pt-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-[var(--text-structure)]">
                        {CLINIC_DATA.contact.addressLines[0]}
                      </p>
                      <p>{CLINIC_DATA.contact.addressLines[1]}</p>
                      <p>
                        {CLINIC_DATA.contact.city}, {CLINIC_DATA.contact.state} – <span className="tabular-nums">{CLINIC_DATA.contact.pincode}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(`${CLINIC_DATA.contact.addressLines[0]}, ${CLINIC_DATA.contact.addressLines[1]}, ${CLINIC_DATA.contact.city} - ${CLINIC_DATA.contact.pincode}`, 'address')}
                      className="press-tactile p-2 rounded-lg border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-structure)] shrink-0 cursor-pointer"
                      title="Copy full address"
                      aria-label="Copy clinic address"
                    >
                      {copiedField === 'address' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-xs space-y-1.5">
                  <div className="font-bold text-[var(--text-structure)]">Parking & Access:</div>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    Ground-floor location with step-free wheelchair ramp. Ample dedicated two-wheeler and four-wheeler parking right in front of Shanti Vihar Complex.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href={CLINIC_DATA.contact.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="press-tactile px-5 py-2.5 rounded-xl bg-[var(--text-structure)] text-[var(--bg-card)] text-xs font-bold hover:bg-[var(--accent-primary)] flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open Directions on Google Maps</span>
                  </a>
                  <Link
                    to="/timings"
                    className="press-tactile px-5 py-2.5 rounded-xl border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-structure)] hover:bg-[var(--bg-surface)]"
                  >
                    View Landmarks & Buses
                  </Link>
                </div>
              </div>

              {/* Map Embed Frame */}
              <div className="lg:col-span-7">
                <div className="w-full h-80 sm:h-96 rounded-xl overflow-hidden border border-[var(--border-subtle)] shadow-xs bg-stone-200">
                  <iframe
                    title="Aarogya Family Clinic Google Maps Location"
                    src={CLINIC_DATA.contact.embedMapsUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 8. BOTTOM CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="rounded-2xl p-8 sm:p-12 bg-stone-900 dark:bg-[var(--bg-card)] border border-stone-800 dark:border-[var(--border-subtle)] text-center relative overflow-hidden shadow-2xl">
            {/* Subtle accent glow */}
            <div className="absolute inset-0 bg-radial from-[var(--accent-subtle)] via-transparent to-transparent opacity-25 pointer-events-none" />

            <div className="max-w-2xl mx-auto space-y-5 relative z-10">
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-white dark:text-[var(--text-structure)]">
                Need a doctor consultation today?
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 dark:text-[var(--text-soft)] leading-relaxed">
                Request your appointment slot online or message our desk on WhatsApp. We confirm your token promptly and respect your time.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => openAppointmentModal()}
                  className="press-tactile w-full sm:w-auto px-7 py-3 rounded-xl bg-[var(--accent-primary)] text-[var(--accent-foreground)] font-bold text-sm hover:opacity-90 shadow-md cursor-pointer"
                >
                  Request Appointment Slot
                </button>
                <a
                  href={CLINIC_DATA.contact.phoneTel}
                  className="press-tactile w-full sm:w-auto px-7 py-3 rounded-xl border border-white/20 dark:border-[var(--border-subtle)] bg-white/10 dark:bg-[var(--bg-surface)] hover:bg-white/20 dark:hover:bg-[var(--bg-subtle)] text-white dark:text-[var(--text-structure)] font-bold text-sm text-center tabular-nums shadow-xs"
                >
                  Call Clinic: {CLINIC_DATA.contact.phoneDisplay}
                </a>
              </div>

              <p className="text-[11px] text-stone-400 dark:text-[var(--text-muted)] pt-2 tabular-nums">
                Morning OPD: 10:00 AM – 1:30 PM · Evening OPD: 5:30 PM – 9:00 PM (Mon–Sat)
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
