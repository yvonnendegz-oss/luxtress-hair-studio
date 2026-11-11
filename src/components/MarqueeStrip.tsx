/**
 * Infinite Marquee Strip for Luxtress Hair Studio.
 * Placed between Hero and Services on plum-900 background.
 * Service names in Playfair Display italic, lavender-200, separated by diamond dividers.
 * Pauses on hover and respects prefers-reduced-motion.
 */

import React from 'react';
import { SALON_CONFIG } from '../config/salon';

export const MarqueeStrip: React.FC = () => {
  // Read items directly from the services data file (all 14 names, in exact order)
  const items = SALON_CONFIG.services.map((svc) => svc.name);

  // Repeat sequence so marquee seamlessly loops 50%
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      aria-label="Luxtress Signature Offerings Marquee"
      className="relative overflow-hidden bg-[#2B0F3F] border-y border-[#D9C6F2]/20 py-4 sm:py-5 select-none marquee-wrapper"
    >
      {/* Edge gradient fade masks for seamless horizontal flow */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#2B0F3F] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#2B0F3F] to-transparent z-10 pointer-events-none" />

      {/* Continuously Animated Tape */}
      <div className="animate-marquee items-center">
        {repeatedItems.map((item, idx) => (
          <div key={`marquee-${idx}`} className="flex items-center shrink-0">
            <span className="font-heading italic font-semibold text-lg sm:text-xl lg:text-2xl text-[#D9C6F2] tracking-wide transition-colors duration-200 hover:text-white">
              {item}
            </span>
            <span
              className="mx-6 sm:mx-8 text-[#9B63CE] opacity-80 select-none text-xs sm:text-sm"
              aria-hidden="true"
            >
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
