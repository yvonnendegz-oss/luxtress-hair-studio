/**
 * Location Section for Luxtress Hair Studio.
 * - Intro header removed completely.
 * - Location Card:
 *   - id="location" with scroll-margin-top = header height + 16px (88px)
 *   - Heading "Location" + single address line: "Acre Tano, inside Rubis Petrol Station"
 *   - Real embedded Google Map (square corners, 1px lavender border)
 *   - Purple "Directions" button underneath with comfortable spacing
 * - Tight, consistent section spacing with no leftover empty space.
 */

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SALON_CONFIG } from '../config/salon';

export const VisitSection: React.FC = () => {
  return (
    <section
      id="visit"
      className="bg-[#FBF8FE] text-[#2B0F3F] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#D9C6F2]/30"
      aria-label="Luxtress Hair Studio Location"
    >
      <div className="max-w-4xl mx-auto">
        {/* Location Card with Map and Directions Button */}
        <div
          id="location"
          style={{ scrollMarginTop: 'calc(72px + 16px)' }}
          className="scroll-mt-[88px] p-6 sm:p-8 rounded-2xl bg-white border border-[#D9C6F2] shadow-xl space-y-6"
        >
          {/* Heading: "Location" + single address line under it */}
          <div className="space-y-1">
            <h3 className="font-heading font-semibold text-2xl text-[#2B0F3F]">
              Location
            </h3>
            <p className="font-body text-sm text-[#2B0F3F]/80">
              Acre Tano, inside Rubis Petrol Station
            </p>
          </div>

          {/* Real Embedded Google Map: square corners (border-radius 0), 1px lavender border */}
          <div className="w-full h-[280px] sm:h-[340px] overflow-hidden border border-[#D9C6F2] rounded-none bg-[#F3EEFA]">
            <iframe
              src="https://www.google.com/maps?q=-1.1760568,36.6417798&output=embed"
              loading="lazy"
              title="Luxtress Hair Studio location"
              className="w-full h-full border-0 rounded-none"
            />
          </div>

          {/* Purple "Directions" button underneath with comfortable spacing */}
          <div className="pt-2 sm:pt-3">
            <a
              href={SALON_CONFIG.contact.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#2B0F3F] hover:bg-[#6A35A8] text-white text-sm font-medium tracking-wide shadow-md transition-colors min-h-[44px]"
            >
              <span>Directions</span>
              <ArrowUpRight className="w-4 h-4 text-[#D9C6F2]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
