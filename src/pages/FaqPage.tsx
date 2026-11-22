import React, { useState } from 'react';
import { CLINIC_DATA, type FaqItem } from '../data/clinicData';
import { useClinic } from '../context/ClinicContext';
import {
  Search,
  ChevronDown,
  Phone,
  MessageSquare,
  Calendar
} from 'lucide-react';

export const FaqPage: React.FC = () => {
  const { openAppointmentModal } = useClinic();
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = CLINIC_DATA.faqs.filter((faq: FaqItem) => {
    const q = faq.question.toLowerCase();
    const a = faq.answer.toLowerCase();
    const c = faq.category.toLowerCase();
    const term = searchTerm.toLowerCase();
    return q.includes(term) || a.includes(term) || c.includes(term);
  });

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header without banned eyebrow */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[var(--text-structure)] tracking-tight">
          Frequently asked questions.
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-soft)] leading-relaxed">
          Clear answers about clinic timings, consultation fees, follow-up policies, appointment booking, and location.
        </p>

        {/* Live Search Bar */}
        <div className="pt-2 max-w-md mx-auto">
          <div className="relative">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search questions (e.g. fee, parking, timings, walk-in)..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs sm:text-sm text-[var(--text-structure)] focus:border-[var(--accent-primary)] focus:outline-hidden shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] overflow-hidden transition-colors shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="press-tactile w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-primary)]">
                      {faq.category}
                    </span>
                    <h2 className="font-bold text-sm sm:text-base text-[var(--text-structure)]">
                      {faq.question}
                    </h2>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[var(--text-muted)] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[var(--accent-primary)]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[var(--text-soft)] leading-relaxed border-t border-[var(--border-subtle)]/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 space-y-2">
            <p className="text-sm font-semibold text-[var(--text-structure)]">
              No matching questions found for "{searchTerm}"
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              Feel free to message our desk on WhatsApp or call us directly.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setSearchTerm('')}
                className="text-xs font-bold text-[var(--accent-primary)] hover:underline"
              >
                Clear search filter
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Contact Help Card */}
      <div className="rounded-2xl p-8 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-soft)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="font-editorial text-2xl font-bold text-[var(--text-structure)]">
            Have a specific clinical query?
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] tabular-nums">
            Our clinic desk is happy to assist you during OPD hours (Mon–Sat 10:00 AM – 1:30 PM & 5:30 PM – 9:00 PM).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => openAppointmentModal()}
            className="press-tactile px-5 py-2.5 rounded-xl bg-[var(--accent-primary)] text-[var(--accent-foreground)] text-xs font-bold hover:opacity-90 flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Request Visit Slot</span>
          </button>

          <a
            href={CLINIC_DATA.contact.phoneTel}
            className="press-tactile px-5 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-xs font-bold text-[var(--text-structure)] hover:bg-[var(--bg-surface)] flex items-center gap-1.5 tabular-nums"
          >
            <Phone className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span>Call {CLINIC_DATA.contact.phoneDisplay}</span>
          </a>

          <a
            href={`https://wa.me/${CLINIC_DATA.contact.whatsappRaw}`}
            target="_blank"
            rel="noopener noreferrer"
            className="press-tactile px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
