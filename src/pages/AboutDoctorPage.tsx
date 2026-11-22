import React from 'react';
import { CLINIC_DATA } from '../data/clinicData';
import { useClinic } from '../context/ClinicContext';
import { TiltCard, SpotlightCard, ScrollReveal } from '../components/animations';
import {
  ShieldCheck,
  Clock,
  HeartPulse,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Building,
  GraduationCap
} from 'lucide-react';

export const AboutDoctorPage: React.FC = () => {
  const { openAppointmentModal } = useClinic();
  const doc = CLINIC_DATA.doctor;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* 1. Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left 5 Columns: Doctor Portrait with 3D Tilt */}
        <div className="lg:col-span-5">
          <TiltCard maxTilt={3.5} scale={1.01}>
            <div className="rounded-2xl p-3 sm:p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-elevated)]">
              <div className="aspect-4/5 rounded-xl overflow-hidden bg-stone-200">
                <img
                  src={doc.photoUrl}
                  alt={`${doc.fullName} - General Physician`}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="mt-4 p-3.5 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-1 text-xs">
                <div className="flex items-center gap-2 font-bold text-[var(--text-structure)]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Verified Registration Notice
                </div>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                  {doc.verifiedRegistrationNotice}
                </p>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Right 7 Columns: Credentials & Practice History */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[var(--text-structure)] tracking-tight">
              Meet {doc.fullName}
            </h1>
            <p className="text-base font-semibold text-[var(--accent-primary)]">
              {doc.credentials} · {doc.designation}
            </p>
          </div>

          <p className="text-sm sm:text-base text-[var(--text-soft)] leading-relaxed">
            With over <strong className="tabular-nums">{doc.experienceYears} years</strong> of clinical experience in hospital internal medicine and outpatient general practice, Dr. Arjun Mehta is dedicated to providing thorough, evidence-based care for individuals and multi-generational families.
          </p>

          {/* Qualifications & Council Registration Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-structure)]">
                <GraduationCap className="w-4 h-4 text-[var(--accent-primary)]" />
                Medical Qualifications
              </div>
              <p className="text-xs text-[var(--text-muted)]">
                {doc.degrees.join(', ')}
              </p>
              <p className="text-[11px] text-[var(--text-structure)] font-medium">
                {doc.almaMater}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-structure)]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Council Registration
              </div>
              <p className="text-xs text-[var(--text-muted)] font-mono tabular-nums">
                Reg No: {doc.registrationNumber}
              </p>
              <p className="text-[11px] text-[var(--text-structure)] font-medium">
                {doc.medicalCouncil}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-1 sm:col-span-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-structure)]">
                <Building className="w-4 h-4 text-[var(--accent-primary)]" />
                Hospital & Residency Experience
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {doc.formerInstitutions}. Managed high-volume outpatient clinics, emergency medical admissions, and supervised junior clinical residents before establishing Aarogya Family Clinic in Indore.
              </p>
            </div>
          </div>

          {/* Quick CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => openAppointmentModal()}
              className="press-tactile py-3 px-6 rounded-xl bg-[var(--accent-primary)] text-[var(--accent-foreground)] font-bold text-sm hover:opacity-90 shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Request Consultation with Dr. Mehta</span>
            </button>
            <a
              href={`https://wa.me/${CLINIC_DATA.contact.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="press-tactile py-3 px-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-structure)] font-bold text-sm hover:bg-[var(--bg-surface)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Clinic</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Practice Philosophy: The Anti-Polypharmacy Commitment */}
      <section className="rounded-2xl p-8 sm:p-12 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-soft)]">
        <div className="max-w-3xl mb-8">
          <h2 className="font-editorial text-3xl font-bold text-[var(--text-structure)]">
            Our 4 Core Consultation Principles
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-2">
            Every clinical decision at Aarogya Family Clinic adheres to these medical standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScrollReveal delay={0} direction="up">
            <SpotlightCard className="p-6 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-2.5 h-full">
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-structure)]">
                <Clock className="w-4 h-4 text-[var(--accent-primary)]" />
                1. 15-Minute Dedicated Consultations
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                We reject 2-minute rush appointments. Adequate time is allocated to listen to symptom progression, review past medications, and answer family queries thoroughly.
              </p>
            </SpotlightCard>
          </ScrollReveal>

          <ScrollReveal delay={60} direction="up">
            <SpotlightCard className="p-6 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-2.5 h-full">
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-structure)]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                2. Zero Tolerance for Polypharmacy
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                We prescribe only medications with clear clinical necessity. Antibiotics are never used for simple viral fevers, and vitamins are recommended only when genuine deficiency exists.
              </p>
            </SpotlightCard>
          </ScrollReveal>

          <ScrollReveal delay={120} direction="up">
            <SpotlightCard className="p-6 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-2.5 h-full">
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-structure)]">
                <HeartPulse className="w-4 h-4 text-[var(--accent-primary)]" />
                3. Transparent Diagnostics
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Laboratory investigations and imaging are ordered only when they change the treatment plan. We never impose redundant testing batteries.
              </p>
            </SpotlightCard>
          </ScrollReveal>

          <ScrollReveal delay={180} direction="up">
            <SpotlightCard className="p-6 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-2.5 h-full">
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-structure)]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                4. Free 7-Day Follow-Up Policy
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                If your symptoms require monitoring or report review within 7 days, your follow-up visit is completely complimentary (₹0 fee). Continuity of care is our priority.
              </p>
            </SpotlightCard>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
