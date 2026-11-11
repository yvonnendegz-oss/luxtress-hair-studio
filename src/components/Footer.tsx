/**
 * Rebuilt Footer Component for Luxtress Hair Studio.
 * - Deep plum-900 background, generous padding (96px top on desktop).
 * - 4-column layout on desktop, stacked on mobile:
 *   Col 1: Logo & Tagline "Elegance Meets Confidence"
 *   Col 2 "Visit us": "Acre Tano, inside Rubis Petrol Station" + "Get directions" link
 *   Col 3 "Hours": "Open daily, 8:00 AM - 8:00 PM"
 *   Col 4 "Follow us": 3 thin-outline social icons (Instagram, TikTok, Facebook) + "Book on WhatsApp" button
 * - Bottom bar: thin lavender divider + "© 2026 Luxtress Hair Studio. All rights reserved."
 * - Subtle staggered fade-up reveal on columns.
 */

import React from 'react';
import { MapPin, Clock, ArrowUp } from 'lucide-react';
import { SALON_CONFIG } from '../config/salon';
import { Logo } from './Logo';
import {
  InstagramOutlineIcon,
  TikTokOutlineIcon,
  FacebookOutlineIcon,
} from './SocialIcons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const socialLinks = [
    {
      name: 'Instagram',
      url: SALON_CONFIG.contact.instagramUrl,
      icon: InstagramOutlineIcon,
      ariaLabel: 'Follow Luxtress Hair Studio on Instagram',
    },
    {
      name: 'TikTok',
      url: SALON_CONFIG.contact.tiktokUrl,
      icon: TikTokOutlineIcon,
      ariaLabel: 'Follow Luxtress Hair Studio on TikTok',
    },
    {
      name: 'Facebook',
      url: SALON_CONFIG.contact.facebookUrl,
      icon: FacebookOutlineIcon,
      ariaLabel: 'Follow Luxtress Hair Studio on Facebook',
    },
  ];

  return (
    <footer className="bg-[#2B0F3F] text-white border-t border-[#D9C6F2]/20 pt-24 pb-32 sm:pb-32 relative overflow-hidden">
      {/* Subtle ambient lavender glow in footer */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#6A35A8]/20 blur-[100px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4-Column Grid on Desktop, Stacked on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14 pb-16">
          {/* Column 1: Logo & Tagline */}
          <div className="space-y-4">
            <Logo size="md" />
            <p className="font-heading font-semibold text-lg sm:text-xl text-[#D9C6F2] italic tracking-wide">
              &ldquo;{SALON_CONFIG.brand.tagline}&rdquo;
            </p>
            <p className="font-body text-sm text-[#D9C6F2]/80 leading-relaxed max-w-xs">
              {SALON_CONFIG.brand.subtext}
            </p>
          </div>

          {/* Column 2: Visit Us & Phone */}
          <div className="space-y-3.5">
            <h3 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-[#D9C6F2]">
              Visit Us
            </h3>
            <div className="space-y-3 font-body text-sm text-white/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D9C6F2] shrink-0 mt-1" />
                <p className="leading-relaxed">{SALON_CONFIG.contact.address}</p>
              </div>

              <div className="pt-1">
                <a
                  href={SALON_CONFIG.contact.phoneTel}
                  className="text-[#D9C6F2] hover:text-white transition-colors underline underline-offset-4 decoration-[#D9C6F2]/40 hover:decoration-white font-medium inline-block"
                >
                  {SALON_CONFIG.contact.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Hours */}
          <div className="space-y-3.5">
            <h3 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-[#D9C6F2]">
              Hours
            </h3>
            <div className="space-y-2 font-body text-sm text-white/90">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#D9C6F2] shrink-0" />
                <span>{SALON_CONFIG.contact.hours}</span>
              </div>
              <p className="text-xs text-[#D9C6F2]/70 pt-1 leading-relaxed">
                Walk-ins always welcome.
              </p>
            </div>
          </div>

          {/* Column 4: Follow Us */}
          <div className="space-y-4">
            <h3 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-[#D9C6F2]">
              Follow Us
            </h3>

            {/* Social Icons (Instagram, TikTok, Facebook) with 1.5px outline & 44px tap target */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="w-11 h-11 rounded-full glass-button flex items-center justify-center text-[#D9C6F2] hover:text-white hover:bg-white/15 transition-all focus:outline-none focus:ring-2 focus:ring-[#D9C6F2]"
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Thin Lavender Divider and Copyright */}
        <div className="pt-8 border-t border-[#D9C6F2]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D9C6F2]/75 font-body sm:pr-20">
          <p>© 2026 Luxtress Hair Studio. All rights reserved.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs text-[#D9C6F2] hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-white/5 active:scale-95 cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
