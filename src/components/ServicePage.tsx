/**
 * Reusable Service Page Template for Luxtress Hair Studio.
 * Used for every service in SALON_CONFIG.services (including Kids' Hair).
 *
 * Layout top to bottom:
 * b) Short plum banner: "← Services" link in lavender, H1 service name, one-line lavender tagline,
 *    optional bannerPhoto with 60% plum overlay (or plum gradient when empty).
 * - Kids' Hair page: Girls / Boys two-option toggle under the banner.
 * c) Muted price note: "Final price depends on length and size. Message us for a quote."
 * d) Photo cards (only styles with a photo): 2 cols mobile / 3 cols desktop, sharp corners,
 *    hairline lavender border, 4:5 aspect ratio, object-fit cover, style name + optional "from KES X,XXX",
 *    opens shared PhotoLightbox on tap.
 * e) "More styles" list (only styles without a photo): Playfair heading + hairline-divider list
 *    (1.5rem side margins), style name left, optional price right. Hidden if empty.
 * f) Empty state if no styles at all: "Full style list coming soon. Message us on WhatsApp for the full menu."
 * g) Small purple "Book {Service name}" button at the bottom (no green).
 */

import React, { useState } from 'react';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import { SALON_CONFIG, ServiceItem } from '../config/salon';
import { STYLES, StyleEntry } from '../data/styles';
import { PhotoLightbox, LightboxPhoto } from './PhotoLightbox';

interface ServicePageProps {
  service: ServiceItem;
}

function formatKesPrice(price: number | null): string | null {
  if (price === null || price === undefined || Number.isNaN(price)) {
    return null;
  }
  return `from KES ${price.toLocaleString('en-US')}`;
}

export const ServicePage: React.FC<ServicePageProps> = ({ service }) => {
  const isKidsPage = service.slug === 'kids';
  const [kidsAudience, setKidsAudience] = useState<'kids-girls' | 'kids-boys'>(
    'kids-girls'
  );
  const [lightboxPhoto, setLightboxPhoto] = useState<LightboxPhoto | null>(null);

  // Filter styles for this service (and audience toggle if Kids' Hair)
  const serviceStyles: StyleEntry[] = STYLES.filter((style) => {
    if (style.service !== service.slug) return false;
    if (isKidsPage) {
      return style.audience === kidsAudience;
    }
    return true;
  });

  const photoStyles = serviceStyles.filter(
    (style) => Boolean(style.photo && style.photo.trim() !== '')
  );
  const textOnlyStyles = serviceStyles.filter(
    (style) => !style.photo || style.photo.trim() === ''
  );

  const hasAnyStyles = serviceStyles.length > 0;

  return (
    <article
      className="bg-[#FBF8FE] text-[#2B0F3F] flex-1"
      aria-label={`${service.name} details`}
    >
      {/* b) Short Plum Banner (not full screen) */}
      <div className="relative overflow-hidden bg-[#2B0F3F] text-white border-b border-[#D9C6F2]/20 py-10 sm:py-14 px-6 sm:px-8">
        {service.bannerPhoto ? (
          <div className="absolute inset-0 -z-0">
            <img
              src={service.bannerPhoto}
              alt={service.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#2B0F3F]/60" />
          </div>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-[#220933] via-[#2B0F3F] to-[#1C072B]" />
            <div
              className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[380px] h-[220px] rounded-full bg-[#6A35A8]/25 blur-[90px] pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 film-grain pointer-events-none opacity-30 mix-blend-overlay"
              aria-hidden="true"
            />
          </>
        )}

        <div className="max-w-5xl mx-auto relative z-10 space-y-3 sm:space-y-4">
          <a
            href="#services"
            className="inline-flex items-center gap-1.5 text-sm font-body text-[#D9C6F2] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9C6F2] rounded"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Services</span>
          </a>

          <h1 className="font-heading font-bold text-white text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
            {service.name}
          </h1>

          <p className="font-body text-sm sm:text-base text-[#D9C6F2]/90 max-w-2xl leading-relaxed">
            {service.tagline}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 py-10 sm:py-14 space-y-8 sm:space-y-10">
        {/* Kids' Hair Two-Option Toggle (Girls / Boys) */}
        {isKidsPage && (
          <div
            className="flex items-center gap-3"
            role="tablist"
            aria-label="Kids Hair Style Audience"
          >
            <button
              type="button"
              role="tab"
              aria-selected={kidsAudience === 'kids-girls'}
              onClick={() => setKidsAudience('kids-girls')}
              className={`px-6 py-2 rounded-full font-body text-sm font-medium transition-colors cursor-pointer min-h-[40px] ${
                kidsAudience === 'kids-girls'
                  ? 'bg-[#6A35A8] text-white border border-[#6A35A8] shadow-sm'
                  : 'bg-white text-[#2B0F3F] border border-[#D9C6F2] hover:border-[#6A35A8]'
              }`}
            >
              Girls
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={kidsAudience === 'kids-boys'}
              onClick={() => setKidsAudience('kids-boys')}
              className={`px-6 py-2 rounded-full font-body text-sm font-medium transition-colors cursor-pointer min-h-[40px] ${
                kidsAudience === 'kids-boys'
                  ? 'bg-[#6A35A8] text-white border border-[#6A35A8] shadow-sm'
                  : 'bg-white text-[#2B0F3F] border border-[#D9C6F2] hover:border-[#6A35A8]'
              }`}
            >
              Boys
            </button>
          </div>
        )}

        {/* c) One muted price disclaimer line */}
        <p className="font-body text-sm text-[#2B0F3F]/70">
          Final price depends on length and size. Message us for a quote.
        </p>

        {/* d) Photo Cards (only for styles that have a photo) */}
        {photoStyles.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {photoStyles.map((style) => {
              const priceLabel = formatKesPrice(style.price);
              const isCircularCrop = style.photo.includes('fade.jpg');

              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() =>
                    setLightboxPhoto({
                      src: style.photo,
                      alt: style.name,
                      label: service.name,
                      scaleOverride: isCircularCrop,
                    })
                  }
                  className="group text-left bg-white border border-[#D9C6F2] rounded-none overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6A35A8] cursor-pointer flex flex-col"
                >
                  {/* Fixed aspect-ratio 4:5 box with lazy loading so nothing jumps */}
                  <div className="relative w-full aspect-[4/5] bg-[#F3EEFA] overflow-hidden">
                    <img
                      src={style.photo}
                      alt={style.name}
                      loading="lazy"
                      decoding="async"
                      className={`w-full h-full object-cover object-center transition-transform duration-500 ease-out ${
                        isCircularCrop
                          ? 'scale-[1.4] group-hover:scale-[1.45]'
                          : 'scale-100 group-hover:scale-105'
                      }`}
                    />
                    <div className="hidden sm:flex absolute inset-0 bg-[#2B0F3F]/65 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
                      <div className="w-10 h-10 rounded-full border border-[#D9C6F2]/60 bg-[#2B0F3F]/60 flex items-center justify-center text-white shadow-md">
                        <Maximize2 className="w-4 h-4 text-[#D9C6F2]" />
                      </div>
                    </div>
                  </div>

                  {/* Style Name & Price */}
                  <div className="p-3 sm:p-4 space-y-1">
                    <h2 className="font-heading font-normal sm:font-medium text-[1rem] text-[#2B0F3F] leading-snug">
                      {style.name}
                    </h2>
                    {priceLabel && (
                      <p className="font-body text-xs sm:text-sm text-[#6A35A8]">
                        {priceLabel}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* e) "More styles" list (for styles without a photo yet) */}
        {textOnlyStyles.length > 0 && (
          <div className="max-w-[720px] pt-2">
            <h2 className="font-heading font-semibold text-[1.5rem] text-[#2B0F3F] tracking-tight leading-tight mb-[0.75rem]">
              More styles
            </h2>
            <ul className="space-y-[0.9rem]">
              {textOnlyStyles.map((style) => {
                const priceLabel = formatKesPrice(style.price);

                return (
                  <li
                    key={style.id}
                    className="flex items-center justify-between gap-4"
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <span
                        className="w-[6px] h-[6px] rounded-full bg-[#B392DE] shrink-0"
                        aria-hidden="true"
                      />
                      <span className="font-body font-normal text-[1rem] leading-snug text-[#2B0F3F]">
                        {style.name}
                      </span>
                    </span>
                    {priceLabel && (
                      <span className="font-body text-[0.95rem] text-[#6A35A8] shrink-0">
                        {priceLabel}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* f) Empty state when a service has no styles at all */}
        {!hasAnyStyles && (
          <p className="font-body text-sm sm:text-base text-[#2B0F3F]/70 py-2">
            Full style list coming soon. Message us on WhatsApp for the full menu.
          </p>
        )}

        {/* g) Bottom CTA button */}
        <div className="pt-2">
          <a
            href={SALON_CONFIG.getServiceBookingLink(service.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#6A35A8] hover:bg-[#2B0F3F] text-white font-body text-sm font-medium tracking-wide shadow-md transition-colors min-h-[44px]"
          >
            Book {service.name}
          </a>
        </div>
      </div>

      {/* Shared Lightbox Viewer */}
      <PhotoLightbox
        photo={lightboxPhoto}
        onClose={() => setLightboxPhoto(null)}
      />
    </article>
  );
};
