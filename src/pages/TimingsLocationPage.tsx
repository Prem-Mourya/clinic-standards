import React, { useState } from 'react';
import { CLINIC_DATA } from '../data/clinicData';
import { useClinic } from '../context/ClinicContext';
import { OpdLiveBadge } from '../components/OpdLiveBadge';
import { SpotlightCard, ScrollReveal } from '../components/animations';
import {
  Phone,
  Navigation,
  Car,
  Bus,
  Accessibility,
  Calendar,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';

export const TimingsLocationPage: React.FC = () => {
  const { openAppointmentModal, showToast } = useClinic();
  const [copiedField, setCopiedField] = useState<'address' | 'phone' | null>(null);

  const copyToClipboard = (text: string, field: 'address' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    showToast(`Copied ${field === 'address' ? 'clinic address' : 'phone number'} to clipboard`);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header without banned eyebrow */}
      <div className="max-w-3xl space-y-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <OpdLiveBadge />
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            Ground Floor · Step-Free Entry
          </span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[var(--text-structure)] tracking-tight">
          Clinic timings, location & directions.
        </h1>
        <p className="text-base text-[var(--text-soft)] leading-relaxed">
          Conveniently located on Ring Road in Indore, with dedicated morning and evening outpatient consultation hours. Walk-ins are welcomed, and booked tokens receive priority queue placement.
        </p>
      </div>

      {/* 1. Timings & Schedule Breakdown with Modern Spotlight & Staggered Reveal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {CLINIC_DATA.opdSchedule.map((session, sIdx) => (
          <ScrollReveal key={session.id} delay={sIdx * 60} direction="up">
            <SpotlightCard className="p-6 sm:p-8 space-y-4 h-full">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-primary)] bg-[var(--accent-subtle)] px-2.5 py-0.5 rounded-full">
                    {session.days}
                  </span>
                  <span className="text-xs text-[var(--text-muted)] font-medium">
                    {session.type}
                  </span>
                </div>
                <h2 className="font-editorial text-2xl font-bold text-[var(--text-structure)]">
                  {session.title}
                </h2>
                <div className="text-2xl font-extrabold text-[var(--text-structure)] mt-2 tabular-nums">
                  {session.hours}
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-2 leading-relaxed">
                  {session.note}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)]">
                <button
                  onClick={() => openAppointmentModal(session.title)}
                  className="press-tactile w-full py-2.5 rounded-xl bg-[var(--bg-canvas)] hover:bg-[var(--accent-primary)] hover:text-white text-xs font-bold text-[var(--text-structure)] border border-[var(--border-subtle)] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Request {session.title} Slot</span>
                </button>
              </div>
            </SpotlightCard>
          </ScrollReveal>
        ))}
      </div>

      {/* 2. Location & Interactive Map Section with 1-Click Copy */}
      <div className="rounded-2xl p-6 sm:p-10 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-soft)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Address & Travel Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[var(--text-structure)]">
                How to Reach Us
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
            </div>

            {/* Travel & Accessibility Info */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] flex items-start gap-3 text-xs">
                <Car className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[var(--text-structure)]">Vehicle Parking</div>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                    Spacious parking space directly outside Shanti Vihar Complex for two-wheelers and four-wheelers.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] flex items-start gap-3 text-xs">
                <Bus className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[var(--text-structure)]">Public Transit</div>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                    City iBus and shared auto stops at Navlakha Square (approx. 300 meters from clinic).
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] flex items-start gap-3 text-xs">
                <Accessibility className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[var(--text-structure)]">Wheelchair Accessibility</div>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                    Step-free ground floor entrance with ramp access from parking directly into reception.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact & Map Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={CLINIC_DATA.contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="press-tactile py-3 px-5 rounded-xl bg-[var(--accent-primary)] text-[var(--accent-foreground)] text-xs font-bold hover:opacity-90 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Navigate via Google Maps</span>
              </a>

              <a
                href={CLINIC_DATA.contact.phoneTel}
                className="press-tactile py-3 px-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-structure)] text-xs font-bold hover:bg-[var(--bg-surface)] flex items-center justify-center gap-2 tabular-nums"
              >
                <Phone className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                <span>Call Desk: {CLINIC_DATA.contact.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="lg:col-span-7">
            <div className="w-full h-96 sm:h-[450px] rounded-xl overflow-hidden border border-[var(--border-subtle)] shadow-xs bg-stone-200">
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

      {/* 3. Walk-In Policy & Token Priority */}
      <section className="rounded-2xl p-6 sm:p-8 bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs text-[var(--text-structure)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[var(--accent-primary)] shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-sm text-[var(--text-structure)]">
              Walk-in & Token Policy
            </h3>
            <p className="text-[var(--text-muted)] mt-0.5 max-w-2xl leading-relaxed">
              Patients without prior appointment are welcomed at clinic reception. Tokens are allocated chronologically. To minimize waiting room stay, we recommend submitting a website enquiry or messaging our WhatsApp desk before leaving home.
            </p>
          </div>
        </div>

        <button
          onClick={() => openAppointmentModal()}
          className="press-tactile px-5 py-2.5 rounded-xl bg-[var(--text-structure)] text-[var(--bg-card)] font-bold text-xs hover:bg-[var(--accent-primary)] shrink-0 cursor-pointer"
        >
          Request Priority Token
        </button>
      </section>
    </div>
  );
};
