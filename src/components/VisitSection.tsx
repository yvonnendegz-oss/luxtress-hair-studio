/**
 * Visit Section for Luxtress Hair Studio.
 * - Displays the real night photo of the lit storefront sign in a rounded-2xl frame beside the map.
 * - Subtle plum gradient overlay at the bottom edge of the photo for caption legibility.
 * - Glass caption chip reading "Look for the lit sign" and line under it: "Acre Tano, inside Rubis Petrol Station."
 * - Stylized interactive map preview card with direct "Get directions" link to Google Maps.
 * - Preserves anchored id="visit" for smooth navigation scrolling.
 */

import React from 'react';
import { MapPin, Navigation, Clock, Phone, ArrowUpRight, Sparkles } from 'lucide-react';
import { SALON_CONFIG } from '../config/salon';

export const VisitSection: React.FC = () => {
  return (
    <section
      id="visit"
      className="scroll-mt-24 bg-[#FBF8FE] text-[#2B0F3F] py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 border-b border-[#D9C6F2]/30"
      aria-label="Visit Luxtress Hair Studio"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-body tracking-[0.2em] uppercase font-semibold text-[#6A35A8] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#6A35A8]" />
            <span>VISIT</span>
          </div>

          <h2 className="font-heading font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#2B0F3F] tracking-tight leading-tight mb-3">
            Visit Luxtress Hair Studio
          </h2>

          <p className="font-body text-base sm:text-lg text-[#2B0F3F]/85 leading-relaxed">
            Open daily from 8:00 AM to 8:00 PM in Kenya. Walk-ins and appointments are always welcome.
          </p>
        </div>

        {/* 2-Column Layout: Storefront Night Photo (Left) + Interactive Map Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Column 1: Storefront Photo in rounded-2xl frame with glass caption chip */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden border border-[#D9C6F2] shadow-2xl bg-[#2B0F3F] group">
              {/* Authentic Unaltered Storefront Photo */}
              <img
                src="/assets/aistudio/image_894e42d6.png"
                alt="Luxtress Hair Studio illuminated storefront sign at night"
                loading="lazy"
                className="w-full h-full object-cover object-[center_46%] transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Subtle Plum Gradient Overlay at bottom edge for caption legibility */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#2B0F3F]/90 via-[#2B0F3F]/35 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Caption Line under photo */}
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-body text-sm sm:text-base text-white font-medium drop-shadow-md">
                  Acre Tano, inside Rubis Petrol Station.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Map & Directions Card beside the photo */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white border border-[#D9C6F2] shadow-xl space-y-6">
            <div className="space-y-4">
              {/* Landmark Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="font-body text-xs font-semibold tracking-wider uppercase text-[#6A35A8]">
                    Studio Location
                  </span>
                  <h3 className="font-heading font-semibold text-2xl text-[#2B0F3F]">
                    Acre Tano Studio
                  </h3>
                  <p className="font-body text-sm text-[#2B0F3F]/80 flex items-center gap-1.5 pt-1">
                    <MapPin className="w-4 h-4 text-[#6A35A8] shrink-0" />
                    <span>Acre Tano, inside Rubis Petrol Station, Kenya</span>
                  </p>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-[#FBF8FE] border border-[#D9C6F2] flex items-center justify-center text-[#6A35A8] shrink-0 shadow-inner">
                  <Navigation className="w-6 h-6" />
                </div>
              </div>

              {/* Stylized Map Viewport graphic preview */}
              <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden border border-[#D9C6F2] bg-[#F3EEFA] p-4 flex flex-col justify-between">
                {/* Stylized schematic grid / roads */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage:
                      'radial-gradient(#6A35A8 1px, transparent 1px), linear-gradient(to right, #6A35A8 1px, transparent 1px), linear-gradient(to bottom, #6A35A8 1px, transparent 1px)',
                    backgroundSize: '24px 24px, 48px 48px, 48px 48px',
                  }}
                  aria-hidden="true"
                />

                {/* Map Pin Anchor badge */}
                <div className="relative z-10 self-center my-auto flex flex-col items-center">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-10 h-10 rounded-full bg-[#6A35A8]/20 animate-ping" />
                    <div className="w-9 h-9 rounded-full bg-[#6A35A8] text-white flex items-center justify-center shadow-lg border-2 border-white">
                      <MapPin className="w-5 h-5" />
                    </div>
                  </div>
                  <span className="mt-2 px-3 py-1 rounded-full bg-[#2B0F3F] text-white text-xs font-medium tracking-wide shadow-md whitespace-nowrap">
                    Rubis Petrol Station · Luxtress
                  </span>
                </div>

                {/* Bottom hint overlay */}
                <div className="relative z-10 flex items-center justify-between text-[11px] text-[#2B0F3F]/70 font-body">
                  <span>GPS: Kenya</span>
                  <span>Easy parking & secure access</span>
                </div>
              </div>
            </div>

            {/* Visit Details & Direct Actions */}
            <div className="pt-2 border-t border-[#D9C6F2]/40 space-y-4">
              <div className="flex items-center justify-between text-xs sm:text-sm font-body text-[#2B0F3F]/85">
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-4 h-4 text-[#6A35A8]" />
                  <span>{SALON_CONFIG.contact.hours}</span>
                </span>
                <span className="text-[#6A35A8] font-semibold">Walk-ins Welcome</span>
              </div>

              {/* Phone text and Directions button */}
              <div className="space-y-4 pt-1">
                <div className="flex items-center gap-2 text-sm font-body">
                  <Phone className="w-4 h-4 text-[#6A35A8] shrink-0" />
                  <span className="text-[#2B0F3F]/75">Phone:</span>
                  <a
                    href={SALON_CONFIG.contact.phoneTel}
                    className="font-medium text-[#6A35A8] hover:text-[#2B0F3F] underline underline-offset-4 decoration-[#6A35A8]/40 hover:decoration-[#2B0F3F] transition-colors"
                  >
                    {SALON_CONFIG.contact.phoneDisplay}
                  </a>
                </div>

                <div>
                  <a
                    href={SALON_CONFIG.contact.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shine inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#2B0F3F] hover:bg-[#6A35A8] text-white text-sm font-medium tracking-wide shadow-md transition-colors min-h-[44px]"
                  >
                    <span>Open in Google Maps</span>
                    <ArrowUpRight className="w-4 h-4 text-[#D9C6F2]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
