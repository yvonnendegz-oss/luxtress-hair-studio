/**
 * Minimal, Centred, Luxurious Hero Section for Luxtress Hair Studio.
 * - Sized with padding (min-height: 100svh removed):
 *   Top padding: header height + 2.5rem (mobile), header height + 4rem (desktop)
 *   Bottom padding: 4rem (mobile), 5rem (desktop)
 * - Horizontal content alignment: perfectly centred.
 * - Entrance Animation on initial load (~2s total):
 *   1) Words of "Luxtress Hair Studio" glide up 28px, blur 6px to 0, 800ms, cubic-bezier(0.22, 1, 0.36, 1),
 *      staggered 140ms apart, starting 150ms after load.
 *   2) Divider line grows outward from centre (scaleX 0 to 1, 500ms).
 *   3) Words of "Elegance Meets Confidence" glide up the same way, staggered 120ms apart.
 *   4) Two buttons fade up 24px, 500ms, 120ms apart.
 *   5) animation-fill-mode: both, no layout shift, respects prefers-reduced-motion.
 */

import React from 'react';
import { Phone } from 'lucide-react';
import { SALON_CONFIG } from '../config/salon';

// Background image constant: leave empty for plum gradient + glow; set URL for full-bleed background
const HERO_IMAGE = '';

// WhatsApp glyph SVG in deep plum
const WhatsAppGlyph: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.07 16.3C4.24 14.98 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.04 7.54C8.86 7.54 8.57 7.61 8.32 7.88C8.07 8.15 7.37 8.81 7.37 10.15C7.37 11.5 8.35 12.79 8.49 12.98C8.63 13.16 10.42 15.92 13.16 17.11C15.44 18.09 15.91 17.9 16.41 17.85C16.91 17.8 18.02 17.19 18.25 16.55C18.49 15.9 18.49 15.35 18.42 15.23C18.35 15.12 18.17 15.05 17.9 14.91C17.62 14.78 16.32 14.13 16.08 14.05C15.84 13.96 15.68 13.92 15.51 14.17C15.34 14.42 14.86 15 14.71 15.17C14.56 15.34 14.41 15.36 14.14 15.23C13.87 15.09 13.01 14.81 11.98 13.89C11.18 13.17 10.64 12.28 10.5 12.01C10.36 11.74 10.48 11.59 10.62 11.45C10.74 11.33 10.89 11.13 11.03 10.97C11.17 10.81 11.22 10.69 11.31 10.51C11.4 10.33 11.35 10.17 11.29 10.05C11.22 9.93 10.74 8.74 10.54 8.24C10.34 7.76 10.14 7.82 9.99 7.82C9.85 7.81 9.69 7.81 9.53 7.81C9.36 7.81 9.09 7.88 8.86 8.12" />
  </svg>
);

export const Hero: React.FC = () => {
  const headingWords = ['Luxtress', 'Hair', 'Studio'];
  const taglineWords = ['Elegance', 'Meets', 'Confidence'];

  return (
    <section
      id="home"
      className="relative -mt-[76px] sm:-mt-[84px] pt-[calc(76px+2.5rem)] sm:pt-[calc(84px+4rem)] pb-16 sm:pb-20 w-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#2B0F3F]"
      aria-label="Luxtress Hair Studio Hero"
    >
      {/* Background layer: Image (with 60% overlay) if HERO_IMAGE set, else deep plum gradient + soft lavender radial glow */}
      {HERO_IMAGE ? (
        <div className="absolute inset-0 -z-20">
          <img
            src={HERO_IMAGE}
            alt="Luxtress Hair Studio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#2B0F3F]/60" />
        </div>
      ) : (
        <>
          {/* Deep plum gradient base */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#220933] via-[#2B0F3F] to-[#1C072B] -z-20" />

          {/* Soft lavender radial glow behind the salon name */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] sm:w-[720px] h-[360px] sm:h-[480px] rounded-full bg-[#D9C6F2]/15 blur-[120px] pointer-events-none -z-10"
            aria-hidden="true"
          />
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[300px] rounded-full bg-[#6A35A8]/25 blur-[100px] pointer-events-none -z-10"
            aria-hidden="true"
          />
        </>
      )}

      {/* Subtle film grain overlay */}
      <div
        className="absolute inset-0 film-grain pointer-events-none opacity-30 mix-blend-overlay -z-10"
        aria-hidden="true"
      />

      {/* Centred Hero Content with Entrance Animations */}
      <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center justify-center">
        {/* H1: Luxtress Hair Studio (staggered word glide) */}
        <h1 className="font-heading font-bold text-white tracking-tight leading-[1.08] text-4xl sm:text-6xl md:text-7xl lg:text-8xl max-w-3xl sm:max-w-4xl text-balance">
          {headingWords.map((word, idx) => (
            <React.Fragment key={word}>
              <span
                className="inline-block hero-word-anim"
                style={{ animationDelay: `${150 + idx * 140}ms` }}
              >
                {word}
              </span>
              {idx < headingWords.length - 1 ? ' ' : ''}
            </React.Fragment>
          ))}
        </h1>

        {/* Thin lavender line above H2 as a small divider (grows outward from center) */}
        <div
          className="w-16 sm:w-20 h-[1.5px] bg-[#D9C6F2] mx-auto my-5 sm:my-6 origin-center hero-divider-anim"
          style={{ animationDelay: '620ms' }}
          aria-hidden="true"
        />

        {/* H2: Elegance Meets Confidence (staggered word glide) */}
        <h2 className="font-heading italic text-[#D9C6F2] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal tracking-wide">
          {taglineWords.map((word, idx) => (
            <React.Fragment key={word}>
              <span
                className="inline-block hero-word-anim"
                style={{ animationDelay: `${840 + idx * 120}ms` }}
              >
                {word}
              </span>
              {idx < taglineWords.length - 1 ? ' ' : ''}
            </React.Fragment>
          ))}
        </h2>

        {/* Two stacked buttons of equal width (mobile stacked, desktop side-by-side), 4px rounded */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mt-8 sm:mt-10 w-full max-w-xs sm:max-w-md mx-auto">
          {/* BOOK NOW: filled lavender, small caps, wide letter-spacing, WhatsApp glyph */}
          <a
            href={SALON_CONFIG.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-button-anim w-full sm:w-1/2 rounded-[4px] bg-[#D9C6F2] text-[#2B0F3F] hover:bg-white transition-all duration-200 py-3.5 px-6 font-body text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase inline-flex items-center justify-center gap-2.5 shadow-md active:scale-[0.98]"
            style={{ animationDelay: '1320ms' }}
          >
            <WhatsAppGlyph className="w-4 h-4 text-[#2B0F3F] shrink-0" />
            <span>BOOK NOW</span>
          </a>

          {/* CALL NOW: lavender outline, small caps, wide letter-spacing, phone icon */}
          <a
            href={SALON_CONFIG.contact.phoneTel}
            className="hero-button-anim w-full sm:w-1/2 rounded-[4px] border border-[#D9C6F2] text-[#D9C6F2] hover:bg-[#D9C6F2]/10 hover:text-white transition-all duration-200 py-3.5 px-6 font-body text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase inline-flex items-center justify-center gap-2.5 active:scale-[0.98]"
            style={{ animationDelay: '1440ms' }}
          >
            <Phone className="w-4 h-4 text-[#D9C6F2] shrink-0" />
            <span>CALL NOW</span>
          </a>
        </div>
      </div>
    </section>
  );
};
