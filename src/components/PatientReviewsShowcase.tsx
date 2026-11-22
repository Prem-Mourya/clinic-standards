import React from 'react';
import { Link } from 'react-router-dom';
import { TESTIMONIALS, TESTIMONIALS_DISCLAIMER, type TestimonialItem } from '../data/testimonialsData';
import { useClinic } from '../context/ClinicContext';
import { OverlappingCardStack, ScrollReveal } from './animations';
import { Star, ArrowUpRight, Calendar } from 'lucide-react';

export const SmileBadgeIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg
    viewBox="0 0 100 100"
    className={`${className} drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] select-none`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* 3D bottom-right dark rim */}
    <ellipse cx="50" cy="58" rx="42" ry="38" fill="#111111" />
    <ellipse cx="50" cy="54" rx="42" ry="38" fill="#D97706" />
    {/* Main yellow coin body */}
    <ellipse cx="50" cy="48" rx="42" ry="38" fill="#FACC15" stroke="#111111" strokeWidth="4.5" />
    {/* Glossy top-left highlight */}
    <path
      d="M 22 42 C 24 30, 42 22, 60 22"
      stroke="#FEF08A"
      strokeWidth="3.5"
      strokeLinecap="round"
      opacity="0.8"
    />
    {/* Left Eye: looking up and to the right */}
    <ellipse cx="40" cy="40" rx="6.5" ry="9" fill="#111111" />
    <circle cx="42.5" cy="37" r="2.5" fill="#FFFFFF" />
    {/* Right Eye: looking up and to the right */}
    <ellipse cx="58" cy="38" rx="6.5" ry="9" fill="#111111" />
    <circle cx="60.5" cy="35" r="2.5" fill="#FFFFFF" />
    {/* Expressive Smile Curve */}
    <path
      d="M 36 55 Q 50 67 64 53"
      fill="none"
      stroke="#111111"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

export interface PatientReviewsShowcaseProps {
  testimonials?: TestimonialItem[];
  className?: string;
  ctaMode?: 'link' | 'modal';
  ctaText?: string;
  ctaHref?: string;
  showDisclaimer?: boolean;
  allowViewToggle?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  headingTag?: 'h1' | 'h2';
}

export const PatientReviewsShowcase: React.FC<PatientReviewsShowcaseProps> = ({
  testimonials = TESTIMONIALS,
  className = '',
  ctaMode = 'link',
  ctaText,
  ctaHref = '/reviews',
  showDisclaimer = true,
  allowViewToggle = true,
  autoPlay = true,
  autoPlayInterval = 4400,
  headingTag = 'h2'
}) => {
  const { openAppointmentModal } = useClinic();

  const HeadingComponent = headingTag;

  return (
    <section className={`w-full py-6 sm:py-10 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Follows Aarogya Clinic Editorial Typography System */}
        <div className="lg:col-span-5 space-y-6">
          <ScrollReveal direction="left">
            <div className="space-y-6">
              {/* Category Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent-subtle)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/20">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>Patient Trust & Experiences</span>
              </div>

              {/* Headline Block with Editorial Serif & 3D Smile Coin */}
              <div className="relative inline-block pr-12 sm:pr-14">
                <HeadingComponent className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-structure)] leading-[1.14] tracking-tight">
                  Feedback from <br />
                  <span className="curved-underline text-[var(--accent-primary)]">Our Patients</span>
                </HeadingComponent>

                {/* 3D Yellow Smile Coin / Sticker from Reference */}
                <div className="absolute -top-3 right-0 sm:-top-5 sm:-right-2 rotate-12 transition-transform duration-300 hover:rotate-6 hover:scale-105 pointer-events-none">
                  <SmileBadgeIcon className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16" />
                </div>
              </div>

              {/* Subtitle following our typography */}
              <p className="text-sm sm:text-base text-[var(--text-soft)] leading-relaxed max-w-md">
                Authentic recovery stories and outpatient care consultations shared with verified patient authorization. Clinical outcomes depend on individual adherence and health history.
              </p>

              {/* Pill CTA Button & Rating Details following our typography */}
              <div className="space-y-4 pt-1">
                <div>
                  {ctaMode === 'link' ? (
                    <Link
                      to={ctaHref}
                      className="press-tactile inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[var(--text-structure)] text-[var(--bg-card)] text-xs sm:text-sm font-bold hover:bg-[var(--accent-primary)] hover:text-white transition-all shadow-xs group"
                    >
                      <span>{ctaText || 'Read All Verified Reviews'}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openAppointmentModal()}
                      className="press-tactile inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[var(--accent-primary)] text-[var(--accent-foreground)] text-xs sm:text-sm font-bold hover:opacity-90 transition-all shadow-xs group cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{ctaText || 'Request Consultation Slot'}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-semibold">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-[var(--text-structure)]">4.9 / 5</span>
                  <span>· 150+ Patient Reviews</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Automated Smooth Overlapping Card Deck (1 Full Card + 1 Half Card) */}
        <div className="lg:col-span-7 overflow-hidden">
          <ScrollReveal direction="right">
            <OverlappingCardStack
              testimonials={testimonials}
              allowViewToggle={allowViewToggle}
              autoPlay={autoPlay}
              autoPlayInterval={autoPlayInterval}
            />
          </ScrollReveal>
        </div>
      </div>

      {showDisclaimer && (
        <p className="text-[11px] text-center text-[var(--text-muted)] mt-8 italic">
          * {TESTIMONIALS_DISCLAIMER}
        </p>
      )}
    </section>
  );
};
