import React, { useState, useEffect } from 'react';
import { useClinic } from '../context/ClinicContext';
import { CLINIC_DATA } from '../data/clinicData';
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Send,
  Copy,
  Check
} from 'lucide-react';

export const AppointmentModal: React.FC = () => {
  const {
    isAppointmentModalOpen,
    closeAppointmentModal,
    preselectedService,
    preselectedReason,
    showToast
  } = useClinic();

  const [activeTab, setActiveTab] = useState<'web' | 'whatsapp'>('web');
  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredSlot, setPreferredSlot] = useState<'Morning OPD (10:00 AM - 1:30 PM)' | 'Evening OPD (5:30 PM - 9:00 PM)'>('Morning OPD (10:00 AM - 1:30 PM)');
  const [visitType, setVisitType] = useState<'New Patient Consultation' | 'Follow-up Consultation (Within 7 Days)'>('New Patient Consultation');
  const [consultationReason, setConsultationReason] = useState(preselectedService || 'General Physician Consultation');
  const [shortNote, setShortNote] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [enquiryRef, setEnquiryRef] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // Sync preselected values when modal opens
  useEffect(() => {
    if (preselectedService) {
      setConsultationReason(preselectedService);
    }
    if (preselectedReason === 'followup') {
      setVisitType('Follow-up Consultation (Within 7 Days)');
    } else if (preselectedReason === 'new') {
      setVisitType('New Patient Consultation');
    }
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    setPreferredDate(today);
    setIsSubmitted(false);
    setErrors({});
    setIsCopied(false);
  }, [preselectedService, preselectedReason, isAppointmentModalOpen]);

  if (!isAppointmentModalOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!patientName.trim()) {
      errs.name = 'Patient name is required';
    }
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!preferredDate) {
      errs.date = 'Please select a preferred date';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleWebSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const ref = `ENQ-${Math.floor(1000 + Math.random() * 9000)}`;
    setEnquiryRef(ref);
    setIsSubmitted(true);
    showToast(`Appointment enquiry submitted (Ref: ${ref})`);
  };

  const copyTokenToClipboard = () => {
    navigator.clipboard.writeText(enquiryRef);
    setIsCopied(true);
    showToast(`Copied token ${enquiryRef} to clipboard`);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Build clean pre-filled WhatsApp link
  const generateWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hello ${CLINIC_DATA.name}, I would like to request an appointment with Dr. Arjun Mehta.\n\n` +
      `• Patient Name: ${patientName.trim() || '[Your Name]'}\n` +
      `• Mobile: ${phoneNumber.trim() || '[Your Phone]'}\n` +
      `• Preferred Date: ${preferredDate || 'Earliest Available'}\n` +
      `• Preferred Slot: ${preferredSlot}\n` +
      `• Visit Type: ${visitType}\n` +
      `• Reason: ${consultationReason}\n` +
      (shortNote.trim() ? `• Note: ${shortNote.trim()}\n` : '') +
      `\nPlease verify doctor availability and confirm my consultation token. Thank you.`
    );
    return `https://wa.me/${CLINIC_DATA.contact.whatsappRaw}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div
        className="relative w-full max-w-xl rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-elevated)] p-6 sm:p-8 animate-modal-enter my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close Button */}
        <button
          onClick={closeAppointmentModal}
          className="press-tactile absolute top-5 right-5 p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-structure)] hover:bg-[var(--bg-surface)] cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Header without banned eyebrow */}
            <div className="pr-8 mb-6">
              <h2 id="modal-title" className="font-editorial text-2xl sm:text-3xl font-bold text-[var(--text-structure)]">
                Request Clinic Consultation
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                with {CLINIC_DATA.doctor.fullName} ({CLINIC_DATA.doctor.credentials}) · Standard Fee ₹400
              </p>
            </div>

            {/* Method Tabs: Web Enquiry vs Direct WhatsApp */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-[var(--bg-surface)] rounded-xl mb-6">
              <button
                type="button"
                onClick={() => setActiveTab('web')}
                className={`press-tactile py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'web'
                    ? 'bg-[var(--bg-card)] text-[var(--text-structure)] shadow-xs'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-structure)]'
                }`}
              >
                1. Web Enquiry Form
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('whatsapp')}
                className={`press-tactile py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'whatsapp'
                    ? 'bg-[var(--bg-card)] text-emerald-600 shadow-xs'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-structure)]'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                2. Direct WhatsApp
              </button>
            </div>

            {activeTab === 'web' ? (
              <form onSubmit={handleWebSubmit} className="space-y-4">
                {/* Patient Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-structure)] mb-1.5">
                    Patient Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-sm text-[var(--text-structure)] focus:border-[var(--accent-primary)] focus:outline-hidden"
                    />
                  </div>
                  {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-structure)] mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g. 98260 12345"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-sm text-[var(--text-structure)] focus:border-[var(--accent-primary)] focus:outline-hidden tabular-nums"
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                </div>

                {/* Date & Slot in 2 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-structure)] mb-1.5">
                      Preferred Date *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-3" />
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-sm text-[var(--text-structure)] focus:border-[var(--accent-primary)] focus:outline-hidden tabular-nums"
                      />
                    </div>
                    {errors.date && <p className="text-xs text-red-600 mt-1">{errors.date}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-structure)] mb-1.5">
                      OPD Time Slot *
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-3 pointer-events-none" />
                      <select
                        value={preferredSlot}
                        onChange={(e) => setPreferredSlot(e.target.value as any)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-xs sm:text-sm text-[var(--text-structure)] focus:border-[var(--accent-primary)] focus:outline-hidden appearance-none cursor-pointer"
                      >
                        <option value="Morning OPD (10:00 AM - 1:30 PM)">Morning OPD (10:00 AM – 1:30 PM)</option>
                        <option value="Evening OPD (5:30 PM - 9:00 PM)">Evening OPD (5:30 PM – 9:00 PM)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Visit Type */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setVisitType('New Patient Consultation')}
                    className={`press-tactile p-2.5 rounded-xl text-left border text-xs cursor-pointer ${
                      visitType === 'New Patient Consultation'
                        ? 'border-[var(--accent-primary)] bg-[var(--accent-subtle)] text-[var(--text-structure)] font-bold'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-muted)]'
                    }`}
                  >
                    <div className="font-semibold">New Patient Visit</div>
                    <div className="text-[10px] opacity-75">First time consulting Dr. Mehta</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVisitType('Follow-up Consultation (Within 7 Days)')}
                    className={`press-tactile p-2.5 rounded-xl text-left border text-xs cursor-pointer ${
                      visitType === 'Follow-up Consultation (Within 7 Days)'
                        ? 'border-emerald-600 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-bold'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-muted)]'
                    }`}
                  >
                    <div className="font-semibold text-emerald-700 dark:text-emerald-400">7-Day Follow-Up</div>
                    <div className="text-[10px] opacity-75">Complimentary (₹0 fee)</div>
                  </button>
                </div>

                {/* Reason for visit */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-structure)] mb-1.5">
                    Service / Reason for Consultation
                  </label>
                  <select
                    value={consultationReason}
                    onChange={(e) => setConsultationReason(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-xs sm:text-sm text-[var(--text-structure)] focus:border-[var(--accent-primary)] focus:outline-hidden cursor-pointer"
                  >
                    {CLINIC_DATA.services.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} ({s.duration})
                      </option>
                    ))}
                    <option value="General Outpatient Consultation">General Outpatient Consultation</option>
                    <option value="Routine Blood Pressure & Sugar Review">Routine Blood Pressure & Sugar Review</option>
                  </select>
                </div>

                {/* Optional short note */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-structure)] mb-1.5">
                    Optional Message to Reception (Non-medical notes only)
                  </label>
                  <input
                    type="text"
                    value={shortNote}
                    onChange={(e) => setShortNote(e.target.value)}
                    placeholder="e.g. Need wheelchair assistance / Preferred around 11:30 AM"
                    className="w-full px-4 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-xs text-[var(--text-structure)] focus:border-[var(--accent-primary)] focus:outline-hidden"
                  />
                </div>

                {/* Mandatory Disclaimer */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-700 dark:text-amber-400 mt-0.5" />
                  <div>
                    <strong>Important Notice:</strong> Submitting this enquiry does not automatically confirm an appointment. Our clinic desk will verify Dr. Mehta's schedule and contact you via WhatsApp/call to allocate your consultation token.
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="press-tactile w-full py-3 px-6 rounded-xl bg-[var(--accent-primary)] text-white font-bold text-sm hover:bg-[var(--accent-hover)] shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Submit Appointment Enquiry
                </button>
              </form>
            ) : (
              /* WhatsApp Tab with Live Chat Bubble Preview (Enhanced Delight) */
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-900 dark:text-emerald-200">
                  <p className="font-bold text-xs mb-0.5 flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
                    <MessageSquare className="w-4 h-4" />
                    Direct WhatsApp Appointment Request
                  </p>
                  <p className="opacity-90 text-[11px]">
                    Connect directly with Aarogya Family Clinic reception on WhatsApp (+91 98260 12345). A pre-formatted message will open in your WhatsApp app.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-structure)] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Enter patient name"
                      className="w-full px-3.5 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-xs text-[var(--text-structure)] focus:border-[var(--accent-primary)] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-structure)] mb-1">
                      Preferred Time Slot
                    </label>
                    <select
                      value={preferredSlot}
                      onChange={(e) => setPreferredSlot(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-xs text-[var(--text-structure)] focus:border-[var(--accent-primary)] focus:outline-hidden cursor-pointer"
                    >
                      <option value="Morning OPD (10:00 AM - 1:30 PM)">Morning OPD (10:00 AM – 1:30 PM)</option>
                      <option value="Evening OPD (5:30 PM - 9:00 PM)">Evening OPD (5:30 PM – 9:00 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Authentic WhatsApp Bubble Preview */}
                <div className="rounded-xl p-3 bg-[#e5ddd5] dark:bg-[#121b22] border border-[var(--border-subtle)]">
                  <div className="text-[10px] uppercase font-bold text-stone-600 dark:text-stone-400 mb-1.5 tracking-wider">
                    Live WhatsApp Message Preview:
                  </div>
                  <div className="bg-white dark:bg-[#005c4b] p-3 rounded-lg shadow-xs text-xs text-stone-800 dark:text-white space-y-1 relative max-w-sm">
                    <p className="font-semibold">Hello {CLINIC_DATA.name}, I would like to request an appointment with Dr. Arjun Mehta.</p>
                    <p className="text-[11px] opacity-90 leading-tight">
                      • Patient: <strong className="underline">{patientName || '[Your Name]'}</strong><br />
                      • Preferred Slot: {preferredSlot}<br />
                      • Visit Type: {visitType}<br />
                      • Reason: {consultationReason}
                    </p>
                    <div className="text-[9px] text-right opacity-60 flex items-center justify-end gap-1 mt-1">
                      <span>Just now</span>
                      <span>✓✓</span>
                    </div>
                  </div>
                </div>

                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press-tactile w-full py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  Open WhatsApp & Send Message
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>

                <p className="text-[11px] text-center text-[var(--text-muted)]">
                  The clinic reception manually reviews availability and confirms your token slot.
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Success Screen with Copy Token Feedback */
          <div className="text-center py-4 space-y-5">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] mb-2">
                <span className="text-xs font-mono font-bold text-[var(--accent-primary)] tabular-nums">
                  Reference Token: {enquiryRef}
                </span>
                <button
                  onClick={copyTokenToClipboard}
                  className="press-tactile p-1 text-[var(--text-muted)] hover:text-[var(--text-structure)] cursor-pointer"
                  title="Copy token to clipboard"
                  aria-label="Copy reference token"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <h3 className="font-editorial text-2xl font-bold text-[var(--text-structure)]">
                Enquiry Dispatched Successfully
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1.5 max-w-md mx-auto">
                Thank you, <strong className="text-[var(--text-structure)]">{patientName}</strong>. Your enquiry for{' '}
                <strong className="text-[var(--text-structure)] tabular-nums">{preferredDate}</strong> ({preferredSlot}) has been logged with clinic reception.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-xs text-left text-[var(--text-structure)] space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-[var(--accent-primary)]">
                <ShieldCheck className="w-4 h-4" />
                Next Steps for Your Visit:
              </div>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-[var(--text-muted)]">
                <li>Clinic reception will verify doctor schedule and confirm via WhatsApp or phone call.</li>
                <li>Standard consultation fee: <strong className="text-[var(--text-structure)] tabular-nums">₹400</strong> (payable at clinic desk).</li>
                <li>Please bring your previous prescriptions and recent lab reports.</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center pt-2">
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="press-tactile w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Send via WhatsApp for Instant Queue
              </a>

              <button
                onClick={closeAppointmentModal}
                className="press-tactile w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs font-bold text-[var(--text-structure)] hover:bg-[var(--bg-surface)] cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
