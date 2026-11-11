/**
 * Hero Section for Luxtress Hair Studio.
 * - Layered composition: deep plum-900, slow-moving blurred glow orbs, film-grain texture.
 * - Confident clamp() Playfair Display H1, tighter line-height, generous body line-height.
 * - Desktop: Two overlapping arch-shaped image placeholders in glass frames, offset like a collage,
 *   with a floating glass card reading "Women · Men · Kids".
 * - Mobile: One stacked arch placeholder below the text.
 * - Buttons with soft inner highlight, shine sweep on hover, and gentle lift.
 */

import React from 'react';
import { Clock, Sparkles } from 'lucide-react';
import { SALON_CONFIG } from '../config/salon';
import { ImagePlaceholder } from './ImagePlaceholder';

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden py-16 sm:py-24 lg:py-32 bg-[#2B0F3F]"
      aria-label="Luxtress Hair Studio Hero"
    >
      {/* Layer 1: Slow-Moving Blurred Lavender and Purple Glow Orbs */}
      <div
        className="absolute top-1/6 right-1/12 w-[480px] h-[480px] rounded-full bg-[#6A35A8]/35 blur-[130px] animate-glow-1 pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/12 left-1/12 w-[440px] h-[440px] rounded-full bg-[#D9C6F2]/20 blur-[110px] animate-glow-2 pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-2/3 right-1/3 w-[360px] h-[360px] rounded-full bg-[#461C66]/40 blur-[100px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Layer 2: Subtle Film-Grain Overlay */}
      <div
        className="absolute inset-0 film-grain pointer-events-none opacity-40 mix-blend-overlay -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Headline & Subtext */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 sm:space-y-8">
            {/* Hours Chip */}
            <div className="flex items-center">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-pill text-xs font-medium text-white shadow-sm">
                <Clock className="w-3.5 h-3.5 text-[#D9C6F2]" />
                <span>{SALON_CONFIG.contact.hoursBadge}</span>
              </span>
            </div>

            {/* Main Headline with clamp() */}
            <h1 className="font-heading font-bold text-white tracking-tight leading-[1.05] text-[clamp(2.5rem,5.5vw,4.75rem)] text-balance">
              {SALON_CONFIG.brand.tagline}.
            </h1>

            {/* Subtext */}
            <p className="font-body text-lg sm:text-xl lg:text-2xl text-[#D9C6F2]/90 max-w-xl leading-relaxed">
              {SALON_CONFIG.brand.subtext}
            </p>

            {/* Editorial Trust Markers */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-[#D9C6F2]/75 font-body">
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D9C6F2]" />
                <span>Women, Men & Kids</span>
              </span>
              <span aria-hidden="true" className="opacity-40">·</span>
              <span>Walk-ins & Appointments</span>
              <span aria-hidden="true" className="opacity-40">·</span>
              <span>Acre Tano, Kenya</span>
            </div>
          </div>

          {/* Right Column: Layered Collage with Arch Frames */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            {/* Desktop Overlapping Collage View */}
            <div className="hidden lg:block relative w-full max-w-[420px] h-[520px]">
              {/* Back Arch Frame (Offset Left, boho-braids.jpg) */}
              <div className="absolute top-4 left-0 w-64 aspect-[4/5] p-2.5 rounded-t-[999px] rounded-b-3xl glass-panel shadow-xl transform -rotate-3 transition-transform duration-500 hover:-rotate-1">
                <ImagePlaceholder
                  slotKey="heroSecondary"
                  shape="arch"
                  priority={true}
                  className="w-full h-full"
                />
              </div>

              {/* Front Arch Frame (Offset Right, Storefront Night Sign Photo) with Soft Lavender Glow */}
              <div className="absolute bottom-2 right-0 w-72 aspect-[4/5] p-2.5 rounded-t-[999px] rounded-b-3xl glass-panel shadow-2xl transform rotate-2 transition-transform duration-500 hover:rotate-0 z-10 group">
                {/* Soft Lavender Glow Behind the Frame */}
                <div
                  className="absolute -inset-3 rounded-t-[999px] rounded-b-3xl bg-[#D9C6F2]/35 blur-2xl pointer-events-none -z-10 group-hover:bg-[#D9C6F2]/45 transition-colors"
                  aria-hidden="true"
                />

                <ImagePlaceholder
                  slotKey="heroPrimary"
                  shape="arch"
                  priority={true}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Mobile Stacked Arch View with Lavender Glow */}
            <div className="lg:hidden relative w-full max-w-xs mx-auto">
              {/* Soft Lavender Glow Behind the Frame on Mobile */}
              <div
                className="absolute -inset-3 rounded-t-[999px] rounded-b-3xl bg-[#D9C6F2]/30 blur-2xl pointer-events-none -z-10"
                aria-hidden="true"
              />

              <div className="p-2.5 rounded-t-[999px] rounded-b-3xl glass-panel shadow-2xl">
                <ImagePlaceholder
                  slotKey="heroPrimary"
                  shape="arch"
                  priority={true}
                  className="w-full aspect-[4/5]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
