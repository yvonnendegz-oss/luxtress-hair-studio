/**
 * Services Section for Luxtress Hair Studio.
 * - Centred container (max-w-[720px], 1.5rem side margins on mobile).
 * - Heading "Our Services" in Playfair Display.
 * - Single-column numbered list of all 14 services.
 * - Each row is a link to that service's page (#slug):
 *   - Number: small italic serif in a fixed 2.5rem column.
 *   - Service name: Playfair Display ~1.2rem, weight 400-500, dark plum.
 *   - Arrow icon (→) inside a 36px hairline lavender circle, nudging 4px right on hover/press.
 *   - Divider: 1px hairline in soft lavender under each row.
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SALON_CONFIG } from '../config/salon';

export const ServicesSection: React.FC = () => {
  const services = SALON_CONFIG.services;

  return (
    <section
      id="services"
      style={{ scrollMarginTop: '88px' }}
      className="scroll-mt-[88px] bg-[#FBF8FE] text-[#2B0F3F] py-14 sm:py-20 lg:py-24 border-b border-[#D9C6F2]/30"
      aria-label="Luxtress Hair Studio Services"
    >
      {/* Centred Container with 1.5rem margin on mobile, max-width 720px on desktop */}
      <div className="max-w-[720px] mx-auto px-6 sm:px-8">
        {/* Section Header: Our Services */}
        <div className="mb-8 sm:mb-10 text-left">
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#2B0F3F] tracking-tight leading-tight">
            Our Services
          </h2>
        </div>

        {/* Hair Creations Style Numbered Services Link List */}
        <div className="border-t border-[#D9C6F2]">
          {services.map((service, index) => {
            const formattedNumber = String(index + 1).padStart(2, '0');

            return (
              <div
                key={service.id}
                className="border-b border-[#D9C6F2] transition-colors duration-200"
              >
                <a
                  href={`#${service.slug}`}
                  className="w-full group text-left flex items-center justify-between min-h-[56px] sm:min-h-[60px] py-[1.1rem] transition-colors duration-200 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6A35A8]"
                >
                  <div className="flex items-center min-w-0 pr-4">
                    {/* Fixed-width column (~2.5rem): small italic serif */}
                    <span className="w-[2.5rem] shrink-0 text-left font-heading italic text-[0.9rem] text-[#6A35A8] select-none">
                      {formattedNumber}
                    </span>

                    {/* Service Name: Playfair Display ~1.2rem, weight 400 to 500 */}
                    <span className="font-heading font-normal sm:font-medium text-[1.15rem] sm:text-[1.2rem] tracking-tight leading-tight text-[#2B0F3F] group-hover:text-[#6A35A8] transition-colors duration-200 truncate">
                      {service.name}
                    </span>
                  </div>

                  {/* Arrow icon (→) inside 36px hairline lavender circle, nudging 4px right on hover/press */}
                  <div
                    className="w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0 border border-[#D9C6F2] text-[#2B0F3F] group-hover:border-[#6A35A8] group-hover:text-[#6A35A8] group-active:border-[#6A35A8] group-active:text-[#6A35A8] transition-colors duration-200"
                    aria-hidden="true"
                  >
                    <ArrowRight className="w-4 h-4 stroke-[1.75] transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-1" />
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
