/**
 * Footer Component for Luxtress Hair Studio.
 * - Deep plum-900 background, generous padding.
 * - Starts directly at "VISIT US" (no brand block, no duplicate Hours section).
 * - 2 Columns on desktop ("VISIT US" and "FOLLOW US"), stacked on mobile with normal spacing:
 *   Col 1: "VISIT US" (address, hours "Open daily · 8:00 AM – 8:00 PM", muted "Walk-ins are welcome.", phone)
 *   Col 2: "FOLLOW US" (Instagram, TikTok, Facebook thin-line icons)
 * - Bottom bar: thin lavender divider + copyright + "Back to top" button.
 */

import React from 'react';
import { MapPin, Clock, ArrowUp } from 'lucide-react';
import { SALON_CONFIG, SOCIAL_LINKS } from '../config/salon';
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
      url: SOCIAL_LINKS.instagram,
      icon: InstagramOutlineIcon,
      ariaLabel: 'Follow Luxtress Hair Studio on Instagram',
    },
    {
      name: 'TikTok',
      url: SOCIAL_LINKS.tiktok,
      icon: TikTokOutlineIcon,
      ariaLabel: 'Follow Luxtress Hair Studio on TikTok',
    },
    {
      name: 'Facebook',
      url: SOCIAL_LINKS.facebook,
      icon: FacebookOutlineIcon,
      ariaLabel: 'Follow Luxtress Hair Studio on Facebook',
    },
  ];

  return (
    <footer className="bg-[#2B0F3F] text-white border-t border-[#D9C6F2]/20 pt-16 sm:pt-20 pb-32 sm:pb-32 relative overflow-hidden">
      {/* Subtle ambient lavender glow in footer */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#6A35A8]/20 blur-[100px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2-Column Grid on Desktop ("VISIT US" and "FOLLOW US"), Stacked on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 pb-16">
          {/* Column 1: Visit Us */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#D9C6F2] tracking-tight leading-tight">
              Visit Us
            </h3>
            <div className="space-y-3 font-body text-sm text-white/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D9C6F2] shrink-0 mt-1" />
                <p className="leading-relaxed">{SALON_CONFIG.contact.address}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#D9C6F2] shrink-0" />
                  <span>Open daily · 8:00 AM – 8:00 PM</span>
                </div>
                <p className="text-xs text-[#D9C6F2]/70 leading-relaxed pl-[26px]">
                  Walk-ins are welcome.
                </p>
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

          {/* Column 2: Follow Us */}
          <div className="space-y-4">
            <h3 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-[#D9C6F2]">
              Follow Us
            </h3>

            {/* Social Icons (Instagram, TikTok, Facebook) with thin line style */}
            <div className="flex items-center gap-2.5">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-[#D9C6F2] hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#D9C6F2]"
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
