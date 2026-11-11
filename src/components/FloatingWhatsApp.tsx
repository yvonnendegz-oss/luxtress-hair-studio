/**
 * Floating WhatsApp Button.
 * - Single floating icon, bottom-right, visible on all screen sizes (mobile & desktop).
 * - 56px circle, positioned 20px from edges + env(safe-area-inset-bottom).
 * - Dark frosted glass: rgba(43,15,63,0.55), backdrop-filter blur(12px),
 *   1.5px white border, white WhatsApp glyph. No green, no solid fill.
 * - Soft shadow so it stays visible on white and lavender sections.
 * - Hover/tap: slight lift, border transitions to lavender-200.
 * - Hidden while lightbox is open so it never covers lightbox controls.
 * - Opens https://wa.me/254759832002?text=Hi%20Luxtress%2C%20I%27d%20like%20to%20book%20an%20appointment
 * - aria-label="Chat with Luxtress on WhatsApp"
 */

import React, { useState, useEffect } from 'react';
import { SALON_CONFIG } from '../config/salon';
import { WhatsAppIcon } from './Navbar';
import { onLightboxChange } from '../utils/lightboxEvents';

export const FloatingWhatsApp: React.FC = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onLightboxChange((open) => {
      setIsLightboxOpen(open);
    });
    return unsubscribe;
  }, []);

  // Hide while lightbox is open so it never covers lightbox controls or photos
  if (isLightboxOpen) {
    return null;
  }

  return (
    <aside
      aria-label="Quick WhatsApp Contact"
      className="fixed z-40 select-none transition-all duration-300"
      style={{
        right: '20px',
        bottom: 'calc(20px + env(safe-area-inset-bottom, 0px))',
      }}
    >
      <a
        href={SALON_CONFIG.contact.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Luxtress on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full border-[1.5px] border-white hover:border-[#D9C6F2] shadow-[0_8px_24px_rgba(43,15,63,0.30)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9C6F2] focus-visible:ring-offset-2"
        style={{
          backgroundColor: 'rgba(43, 15, 63, 0.55)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {/* White WhatsApp Glyph */}
        <WhatsAppIcon className="w-6 h-6 fill-white transition-transform duration-300 group-hover:scale-105" />

        {/* Floating Tooltip (Desktop) */}
        <span
          role="tooltip"
          className="hidden sm:block absolute right-16 px-3.5 py-1.5 rounded-lg bg-[#2B0F3F]/90 text-white text-xs font-medium tracking-wide border border-[#D9C6F2]/30 shadow-xl opacity-0 translate-x-2 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap backdrop-blur-md"
        >
          Chat with Luxtress on WhatsApp
        </span>
      </a>
    </aside>
  );
};
