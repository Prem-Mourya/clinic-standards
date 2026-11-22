import React, { useState } from 'react';
import { CLINIC_DATA, type ServiceItem } from '../data/clinicData';
import { useClinic } from '../context/ClinicContext';
import { FeeTransparencyCard } from '../components/FeeTransparencyCard';
import {
  Clock,
  AlertTriangle,
  Calendar
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { openAppointmentModal } = useClinic();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Fever & Acute Care',
    'Chronic Conditions',
    'Preventive Care',
    'Respiratory Care',
    'Family Care',
    'Clinical Procedures'
  ];

  const filteredServices = selectedCategory === 'All'
    ? CLINIC_DATA.services
    : CLINIC_DATA.services.filter((s: ServiceItem) => s.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header without banned eyebrow */}
      <div className="max-w-3xl space-y-4">
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[var(--text-structure)] tracking-tight">
          Evidence-based outpatient consultations.
        </h1>
        <p className="text-base text-[var(--text-soft)] leading-relaxed">
          Dr. Arjun Mehta provides comprehensive general medical consultations for everyday illnesses, chronic disease stabilization, and preventive healthcare. All consultations include physical examination, vitals, and clear patient guidance.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-[var(--border-subtle)]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`press-tactile px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[var(--accent-primary)] text-[var(--accent-foreground)] shadow-xs'
                : 'bg-[var(--bg-card)] text-[var(--text-structure)] border border-[var(--border-subtle)] hover:bg-[var(--bg-surface)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="rounded-2xl p-6 sm:p-8 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-soft)] flex flex-col justify-between card-hover"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent-primary)] bg-[var(--accent-subtle)] px-2.5 py-0.5 rounded-full">
                  {service.category}
                </span>
                <span className="text-xs text-[var(--text-muted)] font-medium flex items-center gap-1 tabular-nums">
                  <Clock className="w-3.5 h-3.5" />
                  {service.duration} consultation
                </span>
              </div>

              <h2 className="font-editorial text-2xl font-bold text-[var(--text-structure)]">
                {service.name}
              </h2>

              <p className="text-xs sm:text-sm text-[var(--text-soft)] leading-relaxed">
                {service.shortDesc}
              </p>

              <div className="p-3.5 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-xs">
                <div className="font-bold text-[var(--text-structure)] mb-0.5">Recommended for:</div>
                <div className="text-[11px] text-[var(--text-muted)]">{service.suitableFor}</div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <div className="text-xs">
                <span className="text-[var(--text-muted)]">Fee: </span>
                <strong className="text-[var(--text-structure)] tabular-nums">₹400</strong>
                <span className="text-emerald-700 text-[10px] block font-semibold dark:text-emerald-300">
                  Includes 7-day free follow-up
                </span>
              </div>

              <button
                onClick={() => openAppointmentModal(service.name)}
                className="press-tactile px-5 py-2 rounded-xl bg-[var(--text-structure)] text-[var(--bg-card)] hover:bg-[var(--accent-primary)] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book consultation</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Fee Transparency Section */}
      <section className="pt-6">
        <FeeTransparencyCard />
      </section>

      {/* What to Bring Checklist */}
      <section className="rounded-2xl p-8 sm:p-10 bg-[var(--bg-card)] border border-[var(--border-subtle)]">
        <div className="max-w-2xl mb-6">
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[var(--text-structure)]">
            What to Bring for Your Consultation
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Bringing your past medical history ensures accurate diagnostics and prevents unnecessary repeat testing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CLINIC_DATA.patientInstructions.whatToBring.map((item: string, idx: number) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] flex items-start gap-3"
            >
              <div className="w-7 h-7 rounded-lg bg-[var(--accent-subtle)] text-[var(--accent-primary)] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5 tabular-nums">
                {idx + 1}
              </div>
              <span className="text-xs sm:text-sm text-[var(--text-structure)] leading-relaxed">
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Scope Exclusions / Responsible Practice with High-Contrast Legible Typography */}
      <section className="rounded-2xl p-6 sm:p-8 bg-amber-500/15 dark:bg-amber-950/30 border border-amber-600/30 text-xs">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-amber-950 dark:text-amber-200">
              Responsible Medical Scope Notice
            </h3>
            <p className="leading-relaxed text-amber-950/90 dark:text-amber-100/90">
              Aarogya Family Clinic is an outpatient family medicine practice. We do not perform major surgical procedures, inpatient hospital admissions, advanced psychiatric treatments, or emergency trauma resuscitation.
            </p>
            <p className="leading-relaxed text-amber-950/90 dark:text-amber-100/90">
              If you or a loved one is experiencing symptoms of acute heart attack (crushing chest pain radiating to left arm), acute stroke (facial drooping, arm weakness, slurred speech), severe trauma, or uncontrollable bleeding, please proceed directly to a tertiary hospital casualty with intensive care capabilities.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
