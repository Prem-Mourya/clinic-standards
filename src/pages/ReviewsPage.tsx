import React, { useState } from 'react';
import { TESTIMONIALS, TESTIMONIALS_DISCLAIMER, type TestimonialItem } from '../data/testimonialsData';
import { useClinic } from '../context/ClinicContext';
import {
  Calendar,
  ShieldCheck,
  Star,
  CheckCircle2
} from 'lucide-react';

export const ReviewsPage: React.FC = () => {
  const { openAppointmentModal } = useClinic();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const categories = ['All', 'Chronic Care', 'Fever & Infection', 'Family Care', 'Senior Citizen'];

  const filtered = selectedFilter === 'All'
    ? TESTIMONIALS
    : TESTIMONIALS.filter((t: TestimonialItem) => t.category === selectedFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header without banned eyebrow */}
      <div className="max-w-3xl space-y-4">
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[var(--text-structure)] tracking-tight">
          Real feedback from our patients.
        </h1>
        <p className="text-base text-[var(--text-soft)] leading-relaxed">
          Honest experiences from individuals and families who consulted Dr. Arjun Mehta for everyday acute illnesses and long-term metabolic conditions.
        </p>
      </div>

      {/* Verified Consent Policy Notice */}
      <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-start gap-3 text-xs text-[var(--text-muted)]">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-[var(--text-structure)]">Patient Consent & Clinical Transparency:</strong>{' '}
          All testimonials displayed here are published with authorized patient consent. In accordance with medical ethics, testimonials represent personal patient experiences and do not guarantee identical clinical outcomes for other patients.
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-[var(--border-subtle)]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`press-tactile px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              selectedFilter === cat
                ? 'bg-[var(--accent-primary)] text-white shadow-xs'
                : 'bg-[var(--bg-card)] text-[var(--text-structure)] border border-[var(--border-subtle)] hover:bg-[var(--bg-surface)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl p-6 sm:p-8 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-soft)] flex flex-col justify-between card-hover"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                {/* Real SVG Stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <span className="text-[11px] text-[var(--text-muted)]">{item.date}</span>
              </div>

              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[var(--accent-primary)] bg-[var(--accent-subtle)] px-2.5 py-0.5 rounded-full">
                {item.category}
              </span>

              <p className="text-xs sm:text-sm text-[var(--text-structure)] leading-relaxed italic">
                "{item.comment}"
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-[var(--border-subtle)]">
              <div className="font-bold text-xs text-[var(--text-structure)]">
                {item.patientName}, <span className="tabular-nums">{item.age} yrs</span>
              </div>
              <div className="text-[11px] text-[var(--text-muted)]">
                Condition: <strong className="text-[var(--text-structure)]">{item.condition}</strong>
              </div>
              <div className="text-[10px] text-[var(--text-muted)]">
                Location: {item.location}
              </div>
              <div className="text-[10px] text-emerald-700 dark:text-emerald-400 mt-1.5 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                Verified Authorized Review
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-center text-[var(--text-muted)] italic max-w-2xl mx-auto">
        * {TESTIMONIALS_DISCLAIMER}
      </p>

      {/* Bottom CTA */}
      <div className="rounded-2xl p-8 sm:p-10 bg-[var(--bg-card)] border border-[var(--border-subtle)] text-center space-y-4">
        <h3 className="font-editorial text-2xl font-bold text-[var(--text-structure)]">
          Need a personalized medical opinion?
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl mx-auto">
          Book an unhurried 15-minute outpatient consultation with Dr. Arjun Mehta at Aarogya Family Clinic.
        </p>
        <button
          onClick={() => openAppointmentModal()}
          className="press-tactile px-6 py-3 rounded-xl bg-[var(--accent-primary)] text-white text-xs font-bold hover:bg-[var(--accent-hover)] cursor-pointer inline-flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          <span>Request Consultation Slot</span>
        </button>
      </div>
    </div>
  );
};
