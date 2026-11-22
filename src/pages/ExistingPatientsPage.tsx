import React from 'react';
import { CLINIC_DATA } from '../data/clinicData';
import { useClinic } from '../context/ClinicContext';
import {
  Calendar,
  MessageSquare,
  FileCheck,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const ExistingPatientsPage: React.FC = () => {
  const { openAppointmentModal } = useClinic();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header without banned eyebrow */}
      <div className="max-w-3xl space-y-4">
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[var(--text-structure)] tracking-tight">
          Welcome back to Aarogya Family Clinic.
        </h1>
        <p className="text-base text-[var(--text-soft)] leading-relaxed">
          We prioritize continuity of care for our existing patients and families. Whether you need a 7-day complimentary review, chronic medication adjustment, or a new consultation, reconnecting is simple.
        </p>
      </div>

      {/* 1. The 7-Day Complimentary Follow-Up Card */}
      <div className="rounded-2xl p-6 sm:p-10 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-soft)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[var(--text-structure)]">
              Follow-Up Within 7 Days is Completely Free (₹0)
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-soft)] leading-relaxed">
              If Dr. Arjun Mehta advised you to get diagnostic blood tests, monitor fever progression, or return to assess treatment response, your follow-up consultation within <strong className="tabular-nums">7 days of your initial visit</strong> carries zero consultation fee.
            </p>

            <div className="space-y-2 pt-2 text-xs text-[var(--text-structure)]">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Valid for the same illness or diagnostic report review.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Please bring your original physical prescription or show the digital prescription received.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Available during regular morning and evening OPD sessions.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 p-6 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-center space-y-3">
            <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
              Follow-Up Fee
            </div>
            <div className="text-5xl font-extrabold text-emerald-600 tabular-nums">
              ₹0
            </div>
            <div className="text-xs text-[var(--text-muted)]">
              Within 7 Days of Previous Visit
            </div>
            <button
              onClick={() => openAppointmentModal('7-Day Follow-up Review', 'followup')}
              className="press-tactile w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-xs"
            >
              Request Follow-Up Token
            </button>
          </div>
        </div>
      </div>

      {/* 2. Three Reconnection Pathways */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pathway 1: WhatsApp Report Sharing */}
        <div className="rounded-2xl p-6 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-soft)] flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-[var(--text-structure)]">
              1. WhatsApp Report Sharing
            </h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              If Dr. Mehta ordered lab tests (CBC, urine routine, lipid profile), you can send a clear photo or PDF to our clinic WhatsApp along with your name and registration token.
            </p>
          </div>

          <a
            href={`https://wa.me/${CLINIC_DATA.contact.whatsappRaw}?text=${encodeURIComponent('Hello Aarogya Family Clinic, I am an existing patient sharing my lab reports for Dr. Arjun Mehta to review.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="press-tactile py-2.5 px-4 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Send Reports on WhatsApp</span>
          </a>
        </div>

        {/* Pathway 2: Chronic Disease Periodic Review */}
        <div className="rounded-2xl p-6 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-soft)] flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-subtle)] text-[var(--accent-primary)] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-[var(--text-structure)]">
              2. Routine 3-Month Checkups
            </h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              For patients on daily medications for Diabetes, Blood Pressure, or Thyroid. We recommend an updated HbA1c or BP log review every 3 to 6 months to adjust dosages safely.
            </p>
          </div>

          <button
            onClick={() => openAppointmentModal('Chronic Disease Routine Review', 'new')}
            className="press-tactile py-2.5 px-4 rounded-xl bg-[var(--text-structure)] text-[var(--bg-card)] hover:bg-[var(--accent-primary)] text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule Routine Checkup</span>
          </button>
        </div>

        {/* Pathway 3: New Symptom / Family Member */}
        <div className="rounded-2xl p-6 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-soft)] flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface)] text-[var(--text-structure)] flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-[var(--text-structure)]">
              3. New Medical Issue
            </h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Consulting for a new unrelated symptom, seasonal illness, or bringing another family member? Book a standard consultation at the regular ₹400 rate.
            </p>
          </div>

          <button
            onClick={() => openAppointmentModal('New Consultation', 'new')}
            className="press-tactile py-2.5 px-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] text-xs font-bold text-[var(--text-structure)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span>Book New Consultation (₹400)</span>
          </button>
        </div>
      </div>

      {/* 3. Prescription Replacement & Lost Prescriptions */}
      <div className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-start gap-3 text-xs text-[var(--text-muted)]">
        <AlertCircle className="w-5 h-5 text-[var(--accent-primary)] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[var(--text-structure)]">Lost Your Physical Prescription?</strong>{' '}
          Our clinic maintains digital outpatient consultation logs. Simply message our desk on WhatsApp with your full name and approximate visit date, and we will retrieve your digital prescription copy.
        </div>
      </div>
    </div>
  );
};
