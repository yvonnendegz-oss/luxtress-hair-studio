/**
 * Client Reviews Section ("What Clients Say") for Luxtress Hair Studio.
 * - Hidden completely until REVIEWS has at least 3 entries (no empty gap when hidden).
 * - Heading matches "Our Work" (Playfair Display 600).
 * - Cards: sharp corners, hairline lavender border, large lavender quote mark,
 *   quote in sans font, client first name and service in small lavender caps below.
 * - Mobile: horizontal swipe row with scroll-snap and next card peeking in.
 * - Desktop: 3 columns.
 * - Optional "Leave us a review" link shown only when GOOGLE_REVIEW_URL is non-empty.
 */

import React from 'react';
import { REVIEWS, GOOGLE_REVIEW_URL } from '../data/reviews';

export const ReviewsSection: React.FC = () => {
  if (REVIEWS.length < 3) {
    return null;
  }

  return (
    <section
      id="reviews"
      style={{ scrollMarginTop: '88px' }}
      className="scroll-mt-[88px] py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white text-[#2B0F3F] border-b border-[#D9C6F2]/30"
      aria-label="What Clients Say"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header matching "Our Work" */}
        <div className="mb-8 sm:mb-10">
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#2B0F3F] tracking-tight leading-tight">
            What Clients Say
          </h2>
        </div>

        {/* Mobile horizontal swipe row with peek-in / Desktop 3-column grid */}
        <div className="flex sm:grid sm:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-3 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {REVIEWS.map((review, index) => (
            <div
              key={`${review.name}-${index}`}
              className="w-[78vw] sm:w-auto shrink-0 snap-start bg-white border border-[#D9C6F2] rounded-none p-6 sm:p-8 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-2">
                {/* Large lavender quote mark */}
                <span
                  className="block font-heading text-5xl leading-none text-[#B392DE] select-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                {/* Quote in sans font */}
                <p className="font-body text-sm sm:text-base text-[#2B0F3F]/85 leading-relaxed">
                  {review.quote}
                </p>
              </div>

              {/* Client first name and service in small lavender caps */}
              <div className="pt-4 border-t border-[#D9C6F2]/40">
                <p className="font-body text-xs uppercase tracking-[0.18em] text-[#6A35A8] font-medium">
                  {review.name} · {review.service}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Optional Google Review Link */}
        {GOOGLE_REVIEW_URL && GOOGLE_REVIEW_URL.trim() !== '' && (
          <div className="mt-8">
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-body text-sm text-[#6A35A8] hover:text-[#2B0F3F] underline underline-offset-4 decoration-[#D9C6F2] hover:decoration-[#2B0F3F] transition-colors"
            >
              Leave us a review
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
