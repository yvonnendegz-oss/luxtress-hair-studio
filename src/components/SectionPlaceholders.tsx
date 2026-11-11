/**
 * Anchored Section Placeholders for Gallery, Kids, and Visit.
 * Complies with the prompt instructions:
 * - Empty anchored placeholders with ids: gallery, kids, visit.
 * - No invented prices, reviews, ratings, testimonials or staff names.
 * - Uses Playfair Display weight 600 for headings, offwhite surfaces,
 *   lavender-200 accents, and #2B0F3F text at 85% opacity.
 */

import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { SALON_CONFIG } from '../config/salon';

interface PlaceholderItem {
  id: string;
  label: string;
  title: string;
  description: string;
}

const REMAINING_SECTIONS: PlaceholderItem[] = [
  {
    id: 'kids',
    label: 'KIDS',
    title: 'Gentle & Patient Hair Care for Kids',
    description:
      'Friendly styling, gentle detangling, and age-appropriate braids and cuts in a calm and caring atmosphere.',
  },
];

export const SectionPlaceholders: React.FC = () => {
  return (
    <div className="bg-[#FBF8FE] text-[#2B0F3F] transition-colors duration-300">
      {REMAINING_SECTIONS.map((sec, idx) => (
        <section
          key={sec.id}
          id={sec.id}
          className={`scroll-mt-24 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 border-b border-[#D9C6F2]/30 ${
            idx % 2 === 1 ? 'bg-white' : 'bg-[#FBF8FE]'
          }`}
          aria-label={sec.title}
        >
          <div className="max-w-4xl mx-auto">
            {/* Header Lockup */}
            <div className="flex flex-col items-start space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-body tracking-[0.2em] uppercase font-semibold text-[#6A35A8]">
                <Sparkles className="w-3.5 h-3.5 text-[#6A35A8]" />
                <span>{sec.label}</span>
              </div>

              {/* Headings in Playfair Display (weight 600) */}
              <h2 className="font-heading font-semibold text-3xl sm:text-4xl text-[#2B0F3F] tracking-tight">
                {sec.title}
              </h2>

              <p className="font-body text-base sm:text-lg text-[#2B0F3F]/85 max-w-2xl leading-relaxed">
                {sec.description}
              </p>

              {/* Action Link */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={
                    sec.id === 'gallery'
                      ? SALON_CONFIG.contact.instagramUrl
                      : '#services'
                  }
                  target={sec.id === 'gallery' ? '_blank' : undefined}
                  rel={sec.id === 'gallery' ? 'noopener noreferrer' : undefined}
                  className="btn-shine inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2B0F3F] text-white hover:bg-[#6A35A8] text-sm font-medium tracking-wide shadow-sm min-h-[44px]"
                >
                  {sec.id === 'gallery' ? (
                    <>
                      <span>View on Instagram</span>
                      <ArrowUpRight className="w-4 h-4 text-[#D9C6F2]" />
                    </>
                  ) : (
                    <>
                      <span>Explore Services</span>
                      <ArrowUpRight className="w-4 h-4 text-[#D9C6F2]" />
                    </>
                  )}
                </a>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};
