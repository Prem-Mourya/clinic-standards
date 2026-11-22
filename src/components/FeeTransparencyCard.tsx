import React, { useState } from 'react';
import { CLINIC_DATA } from '../data/clinicData';
import { useClinic } from '../context/ClinicContext';
import { CheckCircle2, CreditCard, RefreshCw, Calendar } from 'lucide-react';

export const FeeTransparencyCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { openAppointmentModal } = useClinic();
  const fee = CLINIC_DATA.consultationFee;
  const [activePlan, setActivePlan] = useState<'standard' | 'followup'>('standard');

  const isFollowup = activePlan === 'followup';

  const inclusions = isFollowup
    ? [
        "In-depth review of diagnostic blood tests, imaging or lab reports",
        "Clinical assessment of fever response and recovery progression",
        "Dosage titration and medication tolerance review",
        "Updated digital prescription with next course instructions"
      ]
    : fee.inclusions;

  return (
    <div className={`rounded-2xl p-6 sm:p-8 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-soft)] ${className}`}>
      {/* Interactive Toggle for Patient Confidence */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-6 border-b border-[var(--border-subtle)]">
        <div>
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[var(--text-structure)]">
            Transparent Consultation Fees
          </h3>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Standard outpatient medical fee with clear 7-day follow-up policy
          </p>
        </div>

        <div className="inline-flex p-1 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)]">
          <button
            type="button"
            onClick={() => setActivePlan('standard')}
            className={`press-tactile px-3.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
              !isFollowup
                ? 'bg-[var(--bg-card)] text-[var(--text-structure)] shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--text-structure)]'
            }`}
          >
            Standard Visit
          </button>
          <button
            type="button"
            onClick={() => setActivePlan('followup')}
            className={`press-tactile px-3.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
              isFollowup
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-emerald-700 dark:text-emerald-400 hover:text-emerald-800'
            }`}
          >
            7-Day Follow-Up (₹0)
          </button>
        </div>
      </div>

      {/* Price Display */}
      <div className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] transition-[opacity,transform] duration-200 ease-out">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span
              key={isFollowup ? '0' : '400'}
              className="text-4xl sm:text-5xl font-extrabold tracking-tight tabular-nums transition-colors duration-200"
              style={{ color: isFollowup ? '#16a34a' : 'var(--accent-primary)' }}
            >
              {fee.symbol}{isFollowup ? '0' : fee.amount}
            </span>
            <span className="text-sm text-[var(--text-muted)] font-medium">
              {isFollowup ? 'complimentary review' : '/ outpatient consultation'}
            </span>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            {isFollowup
              ? 'Available for the same illness episode within 7 days of initial consultation.'
              : 'Dedicated 15-minute examination and diagnosis by Dr. Arjun Mehta.'}
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-500/10 px-3 py-1.5 rounded-full dark:text-emerald-300 shrink-0">
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="tabular-nums">Follow-up: {fee.symbol}0 within {fee.followUpDays} days</span>
        </div>
      </div>

      {/* Inclusions list */}
      <div className="py-6 transition-[opacity,transform] duration-200 ease-out">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-structure)] mb-4">
          {isFollowup ? 'Included in your free 7-day follow-up:' : 'Included in every standard consultation:'}
        </h4>
        <div key={activePlan} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 animate-modal-enter">
          {inclusions.map((item: string, idx: number) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-structure)]">
              <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isFollowup ? 'text-emerald-600' : 'text-[var(--accent-primary)]'}`} />
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
            Accepted at clinic desk: <strong className="text-[var(--text-structure)]">{fee.paymentModes.join(', ')}</strong>
          </span>
        </div>

        <button
          onClick={() => openAppointmentModal(isFollowup ? '7-Day Follow-up Review' : 'General Consultation', isFollowup ? 'followup' : 'new')}
          className="press-tactile w-full md:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-[var(--text-structure)] text-[var(--bg-card)] hover:bg-[var(--accent-primary)] cursor-pointer text-center flex items-center justify-center gap-2"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Request {isFollowup ? 'Free Follow-Up Slot' : 'Consultation Slot'}</span>
        </button>
      </div>

      <div className="mt-4 pt-3 border-t border-[var(--border-subtle)]/50 text-[11px] text-[var(--text-muted)] italic">
        * {fee.disclaimer}
      </div>
    </div>
  );
};
