import React from 'react';
import { Link } from 'react-router-dom';
import { CLINIC_DATA } from '../data/clinicData';
import { TESTIMONIALS, TESTIMONIALS_DISCLAIMER } from '../data/testimonialsData';
import { useClinic } from '../context/ClinicContext';
import { OpdLiveBadge } from '../components/OpdLiveBadge';
import { FeeTransparencyCard } from '../components/FeeTransparencyCard';
import {
  Calendar,
  MessageSquare,
  ShieldCheck,
  Clock,
  MapPin,
  ChevronRight,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileText,
  HeartPulse,
  Award
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { openAppointmentModal } = useClinic();

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION: Single screen commanding hero (1440x900 standard) */}
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center pt-8 pb-12 overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute inset-0 bg-radial from-[var(--accent-subtle)] via-transparent to-transparent opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left 7 Columns: Editorial Headline, Authority Badge, Actions */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Live OPD Badge & Category */}
              <div className="flex flex-wrap items-center gap-2.5">
                <OpdLiveBadge />
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--bg-surface)] text-[var(--text-structure)] border border-[var(--border-subtle)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Reg. No. {CLINIC_DATA.doctor.registrationNumber}
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
                  className="press-tactile py-3.5 px-7 rounded-2xl bg-[var(--accent-primary)] text-white font-bold text-sm hover:bg-[var(--accent-hover)] shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Consultation Slot</span>
                </button>

                <a
                  href={`https://wa.me/${CLINIC_DATA.contact.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press-tactile py-3.5 px-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-structure)] font-bold text-sm hover:border-emerald-600 hover:text-emerald-700 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Consult on WhatsApp</span>
                </a>
              </div>

              {/* 4 Clinical Pillars */}
              <div className="pt-6 border-t border-[var(--border-subtle)] grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                <div className="p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                  <div className="text-xs font-bold text-[var(--text-structure)]">15-Min Slots</div>
                  <div className="text-[11px] text-[var(--text-muted)] mt-0.5">Unhurried visits</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                  <div className="text-xs font-bold text-[var(--text-structure)]">₹400 Standard</div>
                  <div className="text-[11px] text-[var(--text-muted)] mt-0.5">Transparent fee</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400">7-Day Free</div>
                  <div className="text-[11px] text-[var(--text-muted)] mt-0.5">Complimentary review</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                  <div className="text-xs font-bold text-[var(--text-structure)]">Zero Polypharmacy</div>
                  <div className="text-[11px] text-[var(--text-muted)] mt-0.5">Rational medicines</div>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Doctor Portrait & Authentic Credibility Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl p-3 sm:p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-elevated)] card-hover">
                {/* Genuine Physician Photo with subtle frame */}
                <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-stone-200">
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
                      {CLINIC_DATA.doctor.credentials} · {CLINIC_DATA.doctor.experienceYears}+ Years Clinical Practice
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
                      <div className="text-[10px] text-[var(--text-muted)]">{CLINIC_DATA.doctor.registrationNumber} ({CLINIC_DATA.doctor.almaMater})</div>
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
            </div>
          </div>
        </div>
      </section>

      {/* 2. DEALT MOMENT 1: Live OPD Schedule & Queue Guidance Scrubber */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-6 sm:p-10 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-soft)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent-subtle)] text-[var(--accent-primary)] mb-2">
                <Clock className="w-3.5 h-3.5" />
                Live OPD Hours & Token System
              </span>
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
            {CLINIC_DATA.opdSchedule.map((session) => (
              <div
                key={session.id}
                className="p-5 rounded-2xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-2 card-hover"
              >
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
                <div className="text-lg font-extrabold text-[var(--accent-primary)]">
                  {session.hours}
                </div>
                <p className="text-xs text-[var(--text-muted)] pt-1 border-t border-[var(--border-subtle)]">
                  {session.note}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
              <span>
                Tokens are distributed 15 minutes before each session. Calling or requesting online before your visit avoids waiting room congestion.
              </span>
            </div>
            <a
              href={CLINIC_DATA.contact.phoneTel}
              className="press-tactile font-bold text-[var(--text-structure)] hover:text-[var(--accent-primary)] shrink-0"
            >
              Call Desk: {CLINIC_DATA.contact.phoneDisplay}
            </a>
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent-subtle)] text-[var(--accent-primary)] mb-2">
              <HeartPulse className="w-3.5 h-3.5" />
              Scope of Practice
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[var(--text-structure)]">
              General Outpatient Consultations
            </h2>
            <p className="text-sm text-[var(--text-muted)] mt-1 max-w-xl">
              We specialize in diagnosing and treating everyday medical conditions, managing chronic diseases, and preventive family health.
            </p>
          </div>

          <Link
            to="/services"
            className="press-tactile self-start sm:self-end inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-structure)] hover:border-[var(--accent-primary)]"
          >
            <span>View All Services & Inclusions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLINIC_DATA.services.slice(0, 6).map((service) => (
            <div
              key={service.id}
              className="rounded-3xl p-6 bg-[var(--bg-card)] border border-[var(--border-subtle)] flex flex-col justify-between card-hover shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent-primary)] bg-[var(--accent-subtle)] px-2.5 py-0.5 rounded-full">
                    {service.category}
                  </span>
                  <span className="text-xs text-[var(--text-muted)] font-medium">
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
                <span className="text-[11px] text-[var(--text-structure)] font-medium">
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
            </div>
          ))}
        </div>
      </section>

      {/* 5. APPOINTMENT WALKTHROUGH: 3 Simple Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-primary)]">
              Convenient & Transparent Process
            </span>
            <h2 className="font-editorial text-3xl font-bold text-[var(--text-structure)] mt-1">
              How Your Clinic Visit Works
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-2">
              Designed to minimize waiting room time and provide clear doctor consultations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLINIC_DATA.patientInstructions.appointmentProcess.map((step: any) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3 relative"
              >
                <div className="w-9 h-9 rounded-xl bg-[var(--accent-primary)] text-white font-editorial font-bold text-lg flex items-center justify-center">
                  {step.step}
                </div>
                <h3 className="font-bold text-base text-[var(--text-structure)]">
                  {step.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* What to bring note */}
          <div className="mt-8 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
              Read full preparation checklist →
            </Link>
          </div>
        </div>
      </section>

      {/* 6. PATIENT REVIEWS & TRUST INDICATORS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent-subtle)] text-[var(--accent-primary)] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Patient Experiences
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[var(--text-structure)]">
              Feedback from Our Patients
            </h2>
            <p className="text-sm text-[var(--text-muted)] mt-1 max-w-xl">
              Authentic reviews shared with verified patient authorization. Clinical outcomes depend on individual adherence and health history.
            </p>
          </div>

          <Link
            to="/reviews"
            className="press-tactile self-start sm:self-end inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-structure)] hover:border-[var(--accent-primary)]"
          >
            <span>Read All Verified Reviews</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="rounded-3xl p-6 bg-[var(--bg-card)] border border-[var(--border-subtle)] flex flex-col justify-between card-hover shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-amber-500">★★★★★</span>
                  <span className="text-[11px] text-[var(--text-muted)]">{item.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-structure)] leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[var(--border-subtle)]">
                <div className="font-bold text-xs text-[var(--text-structure)]">
                  {item.patientName}, {item.age} yrs
                </div>
                <div className="text-[11px] text-[var(--text-muted)]">
                  Consulted for: <strong className="text-[var(--text-structure)]">{item.condition}</strong>
                </div>
                <div className="text-[10px] text-emerald-700 dark:text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified Patient Consent
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-center text-[var(--text-muted)] mt-6 italic">
          * {TESTIMONIALS_DISCLAIMER}
        </p>
      </section>

      {/* 7. LOCATION & DIRECTIONS SNAPSHOT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-6 sm:p-10 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-soft)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Info */}
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent-subtle)] text-[var(--accent-primary)]">
                <MapPin className="w-3.5 h-3.5" />
                Clinic Location & Accessibility
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[var(--text-structure)]">
                Easy to Reach on Ring Road
              </h2>
              <div className="text-xs sm:text-sm text-[var(--text-soft)] space-y-2">
                <p className="font-bold text-[var(--text-structure)]">
                  {CLINIC_DATA.contact.addressLines[0]}
                </p>
                <p>{CLINIC_DATA.contact.addressLines[1]}</p>
                <p>
                  {CLINIC_DATA.contact.city}, {CLINIC_DATA.contact.state} – {CLINIC_DATA.contact.pincode}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-xs space-y-1.5">
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
                  className="press-tactile px-5 py-2.5 rounded-full bg-[var(--text-structure)] text-[var(--bg-card)] text-xs font-bold hover:bg-[var(--accent-primary)] flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Open Directions on Google Maps</span>
                </a>
                <Link
                  to="/timings"
                  className="press-tactile px-5 py-2.5 rounded-full border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-structure)] hover:bg-[var(--bg-surface)]"
                >
                  View Landmarks & Buses
                </Link>
              </div>
            </div>

            {/* Map Embed Frame */}
            <div className="lg:col-span-7">
              <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-[var(--border-subtle)] shadow-xs bg-stone-200">
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
      </section>

      {/* 8. BOTTOM CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-[var(--text-structure)] text-[var(--bg-canvas)] text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-5 relative z-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--accent-primary)] text-white">
              Primary Care for All Ages
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-white">
              Need a doctor consultation today?
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Request your appointment slot online or message our desk on WhatsApp. We confirm your token promptly and respect your time.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => openAppointmentModal()}
                className="press-tactile w-full sm:w-auto px-7 py-3 rounded-2xl bg-[var(--accent-primary)] text-white font-bold text-sm hover:bg-[var(--accent-hover)] cursor-pointer"
              >
                Request Appointment Slot
              </button>
              <a
                href={CLINIC_DATA.contact.phoneTel}
                className="press-tactile w-full sm:w-auto px-7 py-3 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-bold text-sm text-center"
              >
                Call Clinic: {CLINIC_DATA.contact.phoneDisplay}
              </a>
            </div>

            <p className="text-[11px] text-white/60 pt-2">
              Morning OPD: 10:00 AM – 1:30 PM · Evening OPD: 5:30 PM – 9:00 PM (Mon–Sat)
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
