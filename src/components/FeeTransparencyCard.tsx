import React from 'react';
import { CLINIC_DATA } from '../data/clinicData';
import { useClinic } from '../context/ClinicContext';
import { CheckCircle2, ShieldCheck, CreditCard, RefreshCw } from 'lucide-react';

export const FeeTransparencyCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { openAppointmentModal } = useClinic();
  const fee = CLINIC_DATA.consultationFee;

  return (
    <div className={`rounded-3xl p-6 sm:p-8 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-elevated)] ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--accent-subtle)] text-[var(--accent-primary)] mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Transparent Pricing Commitment
          </span>
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[var(--text-structure)]">
            Standard Consultation Fee
          </h3>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Complete outpatient evaluation with Dr. Arjun Mehta
          </p>
        </div>

        <div className="sm:text-right">
          <div className="flex items-baseline gap-1 sm:justify-end">
            <span className="text-4xl sm:text-5xl font-extrabold text-[var(--accent-primary)] tracking-tight">
              {fee.symbol}{fee.amount}
            </span>
            <span className="text-sm text-[var(--text-muted)] font-medium">/ visit</span>
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-500/10 px-2.5 py-0.5 rounded-full mt-1.5 dark:text-emerald-300">
            <RefreshCw className="w-3 h-3" />
            <span>Follow-up: {fee.symbol}0 within {fee.followUpDays} days</span>
          </div>
        </div>
      </div>

      {/* Inclusions list */}
      <div className="py-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-structure)] mb-4">
          What is included in every consultation:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {fee.inclusions.map((item: string, idx: number) => (
            <div key={idx} className="flex items-start gap-2.5 text-sm text-[var(--text-structure)]">
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modes & Transparency note */}
      <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <CreditCard className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
          <span>
            Accepted at desk: <strong className="text-[var(--text-structure)]">{fee.paymentModes.join(', ')}</strong>
          </span>
        </div>

        <button
          onClick={() => openAppointmentModal('General Consultation')}
          className="press-tactile w-full md:w-auto px-6 py-2.5 rounded-full text-sm font-semibold bg-[var(--text-structure)] text-[var(--bg-card)] hover:bg-[var(--accent-primary)] cursor-pointer text-center"
        >
          Request Consultation Slot
        </button>
      </div>

      <div className="mt-4 pt-3 border-t border-[var(--border-subtle)]/50 text-[11px] text-[var(--text-muted)] italic">
        * {fee.disclaimer}
      </div>
    </div>
  );
};
