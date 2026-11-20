import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { CLINIC_DATA } from '../data/clinicData';
import { useClinic } from '../context/ClinicContext';
import { OpdLiveBadge } from './OpdLiveBadge';
import { ThemeSwitcher } from './ThemeSwitcher';
import { AppointmentModal } from './AppointmentModal';
import {
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Menu,
  X,
  ShieldCheck,
  Calendar,
  AlertTriangle,
  ChevronRight,
  Stethoscope,
  Info
} from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { openAppointmentModal, toastMessage, dismissToast } = useClinic();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services & Fees', path: '/services' },
    { name: 'About Doctor', path: '/about' },
    { name: 'Timings & Location', path: '/timings' },
    { name: 'Patient Reviews', path: '/reviews' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Existing Patients', path: '/existing-patients' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-structure)]">
      {/* 1. Top Bar: Emergency Disclaimer & Direct Phone */}
      <div className="bg-[var(--text-structure)] text-[var(--bg-canvas)] text-xs py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-ping" />
            <span className="opacity-90">
              Direct Desk:{' '}
              <a
                href={CLINIC_DATA.contact.phoneTel}
                className="font-bold text-white hover:underline ml-1"
              >
                {CLINIC_DATA.contact.phoneDisplay}
              </a>
            </span>
            <span className="opacity-40 hidden sm:inline">|</span>
            <span className="opacity-80 hidden sm:inline">{CLINIC_DATA.contact.landmark}</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] opacity-80">
            <span className="hidden md:inline">Outpatient Clinic Hours: Mon–Sat 10:00 AM – 1:30 PM & 5:30 PM – 9:00 PM</span>
            <a
              href={`https://wa.me/${CLINIC_DATA.contact.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 font-bold hover:underline inline-flex items-center gap-1"
            >
              <MessageSquare className="w-3 h-3" />
              WhatsApp Clinic
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-[var(--bg-canvas)]/90 backdrop-blur-md border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Identity */}
            <Link to="/" className="flex items-center gap-3 press-tactile">
              <div className="w-11 h-11 rounded-2xl bg-[var(--text-structure)] text-[var(--bg-card)] flex items-center justify-center shadow-xs">
                <Stethoscope className="w-6 h-6 text-[var(--accent-primary)]" />
              </div>
              <div>
                <div className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-structure)] leading-none">
                  {CLINIC_DATA.name}
                </div>
                <div className="text-[11px] sm:text-xs text-[var(--text-muted)] font-medium mt-1 flex items-center gap-1.5">
                  <span>{CLINIC_DATA.doctor.fullName}</span>
                  <span className="opacity-40">·</span>
                  <span className="text-[var(--accent-primary)] font-semibold">{CLINIC_DATA.doctor.credentials}</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={`press-tactile px-3.5 py-2 rounded-full text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-[var(--accent-subtle)] text-[var(--accent-primary)] font-bold'
                        : 'text-[var(--text-structure)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-structure)]'
                    }`}
                  >
                    {link.name}
                  </NavLink>
                );
              })}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden lg:block">
                <OpdLiveBadge showDetails={false} />
              </div>

              <ThemeSwitcher />

              <button
                onClick={() => openAppointmentModal()}
                className="press-tactile hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-[var(--text-structure)] text-[var(--bg-card)] hover:bg-[var(--accent-primary)] cursor-pointer shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Visit</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="press-tactile xl:hidden p-2.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-structure)] hover:bg-[var(--bg-surface)] cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[var(--bg-card)] border-b border-[var(--border-subtle)] px-4 pt-3 pb-6 space-y-3 animate-modal-enter">
            <div className="pb-3 border-b border-[var(--border-subtle)] flex items-center justify-between">
              <OpdLiveBadge />
              <div className="text-xs font-bold text-[var(--accent-primary)]">
                Fee: {CLINIC_DATA.consultationFeeApprox}
              </div>
            </div>

            <nav className="space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`press-tactile flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold ${
                      isActive
                        ? 'bg-[var(--accent-subtle)] text-[var(--accent-primary)]'
                        : 'text-[var(--text-structure)] hover:bg-[var(--bg-surface)]'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </Link>
                );
              })}
            </nav>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAppointmentModal();
                }}
                className="press-tactile w-full py-3 rounded-2xl bg-[var(--accent-primary)] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Request Consultation Slot
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 max-w-sm rounded-2xl bg-[var(--text-structure)] text-[var(--bg-canvas)] p-3.5 shadow-2xl border border-[var(--border-subtle)] flex items-center justify-between gap-3 animate-modal-enter">
          <div className="flex items-center gap-2 text-xs font-medium">
            <Info className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={dismissToast}
            className="p-1 rounded-full hover:bg-white/10 opacity-70 hover:opacity-100"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Page Content */}
      <main className="flex-1">{children}</main>

      {/* 3. Sticky Bottom Mobile Quick Action Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-card)]/95 backdrop-blur-md border-t border-[var(--border-subtle)] p-2.5 flex items-center gap-2 shadow-2xl">
        <a
          href={CLINIC_DATA.contact.phoneTel}
          className="press-tactile flex-1 py-2.5 px-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-structure)] text-xs font-bold flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
          Call Clinic
        </a>

        <a
          href={`https://wa.me/${CLINIC_DATA.contact.whatsappRaw}`}
          target="_blank"
          rel="noopener noreferrer"
          className="press-tactile flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          WhatsApp
        </a>

        <button
          onClick={() => openAppointmentModal()}
          className="press-tactile flex-1 py-2.5 px-3 rounded-xl bg-[var(--text-structure)] text-[var(--bg-card)] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
          Book Slot
        </button>
      </div>

      {/* 4. Comprehensive Authority Footer */}
      <footer className="bg-[var(--bg-card)] border-t border-[var(--border-subtle)] mt-20 pb-16 sm:pb-8">
        {/* Emergency Triage Notice */}
        <div className="bg-amber-500/10 border-b border-amber-500/20 py-3 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex items-start sm:items-center gap-2.5 text-xs text-amber-900 dark:text-amber-200">
            <AlertTriangle className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <strong>Emergency Medical Notice:</strong> {CLINIC_DATA.contact.emergencyNotice}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Col 1: Clinic & Doctor Credibility */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[var(--text-structure)] text-[var(--bg-card)] flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-[var(--accent-primary)]" />
                </div>
                <div>
                  <h3 className="font-editorial text-lg font-bold text-[var(--text-structure)]">
                    {CLINIC_DATA.name}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">{CLINIC_DATA.badge}</p>
                </div>
              </div>

              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Consultant outpatient practice led by <strong>{CLINIC_DATA.doctor.fullName}</strong> ({CLINIC_DATA.doctor.credentials}). Dedicated to unhurried, evidence-based medical consultations for individuals and families in {CLINIC_DATA.contact.city}.
              </p>

              <div className="p-3 rounded-2xl bg-[var(--bg-surface)] text-[11px] space-y-1 border border-[var(--border-subtle)]">
                <div className="font-bold text-[var(--text-structure)] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Credentials
                </div>
                <div className="text-[var(--text-muted)]">
                  Reg No. {CLINIC_DATA.doctor.registrationNumber} · {CLINIC_DATA.doctor.experienceYears}+ Yrs Clinical Experience
                </div>
              </div>
            </div>

            {/* Col 2: Consultation Timings */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--text-structure)] mb-4 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[var(--accent-primary)]" />
                OPD Consultation Hours
              </h4>
              <div className="space-y-2.5 text-xs">
                {CLINIC_DATA.opdSchedule.map((s) => (
                  <div key={s.id} className="p-2.5 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)]">
                    <div className="font-bold text-[var(--text-structure)]">{s.title}</div>
                    <div className="text-[var(--accent-primary)] font-semibold mt-0.5">{s.hours}</div>
                    <div className="text-[10px] text-[var(--text-muted)] mt-0.5">{s.days} · {s.note}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Col 3: Address & Directions */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--text-structure)] mb-4 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[var(--accent-primary)]" />
                Clinic Location
              </h4>
              <div className="text-xs space-y-2 text-[var(--text-muted)]">
                <p className="text-[var(--text-structure)] font-medium">
                  {CLINIC_DATA.contact.addressLines[0]}
                </p>
                <p>{CLINIC_DATA.contact.addressLines[1]}</p>
                <p>
                  {CLINIC_DATA.contact.city}, {CLINIC_DATA.contact.state} – {CLINIC_DATA.contact.pincode}
                </p>

                <div className="pt-2">
                  <a
                    href={CLINIC_DATA.contact.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="press-tactile inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-structure)] hover:border-[var(--accent-primary)]"
                  >
                    <span>Get Directions on Google Maps</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Col 4: Quick Navigation & Transparency */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--text-structure)] mb-4">
                Clinic Information
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/services" className="text-[var(--text-muted)] hover:text-[var(--accent-primary)]">
                    Outpatient Services & ₹400 Fee Policy
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-[var(--text-muted)] hover:text-[var(--accent-primary)]">
                    Doctor Medical Qualifications & Bio
                  </Link>
                </li>
                <li>
                  <Link to="/existing-patients" className="text-[var(--text-muted)] hover:text-[var(--accent-primary)]">
                    7-Day Complimentary Follow-up Guide
                  </Link>
                </li>
                <li>
                  <Link to="/reviews" className="text-[var(--text-muted)] hover:text-[var(--accent-primary)]">
                    Verified Patient Feedback & Consent
                  </Link>
                </li>
                <li>
                  <Link to="/faqs" className="text-[var(--text-muted)] hover:text-[var(--accent-primary)]">
                    Frequently Asked Questions
                  </Link>
                </li>
              </ul>

              <div className="mt-6 pt-4 border-t border-[var(--border-subtle)]">
                <p className="text-[11px] text-[var(--text-muted)] font-mono">
                  SiteForge Master Template A (clinic-standard)
                </p>
                <p className="text-[10px] text-[var(--text-muted)] mt-0.5">
                  Fictional demo data for general physician practices.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Accreditation */}
          <div className="pt-8 mt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text-muted)] text-center sm:text-left">
            <div>
              © {new Date().getFullYear()} {CLINIC_DATA.name}. All Rights Reserved. General Physician Clinic Website.
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span>Privacy & Medical Records Policy</span>
              <span>·</span>
              <span>Patient Consultation Terms</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Appointment Enquiry Modal */}
      <AppointmentModal />
    </div>
  );
};
