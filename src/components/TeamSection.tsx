/**
 * Meet the Team Section ("Meet the Team") for Luxtress Hair Studio.
 * - Hidden completely until TEAM has at least 2 entries (no empty gap when hidden).
 * - Anchor: #team with scroll-margin-top = 88px (header height + 16px).
 * - Heading matches "Our Work" (Playfair Display 600).
 * - Portrait cards at 3:4 aspect ratio, sharp corners, hairline lavender border.
 * - Name in Playfair below, role in small lavender caps.
 * - 2 columns on mobile, 3 or 4 columns on desktop.
 * - Missing photo displays a soft plum tile with member's initials.
 * - Staggered scroll-in glide animation respecting prefers-reduced-motion.
 */

import React, { useState, useEffect, useRef } from 'react';
import { TEAM } from '../data/team';

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export const TeamSection: React.FC = () => {
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isVisibleSection = TEAM.length >= 2;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  useEffect(() => {
    if (!isVisibleSection) return;

    if (prefersReducedMotion) {
      setVisibleIndices(new Set(TEAM.map((_, idx) => idx)));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idxAttr = entry.target.getAttribute('data-team-idx');
            if (idxAttr !== null) {
              const idx = Number(idxAttr);
              setVisibleIndices((prev) => new Set([...prev, idx]));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    cardRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [prefersReducedMotion, isVisibleSection]);

  if (!isVisibleSection) {
    return null;
  }

  const desktopColsClass = TEAM.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';

  return (
    <section
      id="team"
      style={{ scrollMarginTop: '88px' }}
      className="scroll-mt-[88px] py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FBF8FE] text-[#2B0F3F] border-b border-[#D9C6F2]/30"
      aria-label="Meet the Team"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header matching "Our Work" */}
        <div className="mb-8 sm:mb-10">
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#2B0F3F] tracking-tight leading-tight">
            Meet the Team
          </h2>
        </div>

        {/* 2 columns on mobile, 3 or 4 on desktop */}
        <div className={`grid grid-cols-2 ${desktopColsClass} gap-4 sm:gap-6`}>
          {TEAM.map((member, idx) => {
            const isVisible = visibleIndices.has(idx) || prefersReducedMotion;
            const staggerMs = (idx % 4) * 100;

            return (
              <div
                key={`${member.name}-${idx}`}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                data-team-idx={idx}
                style={{ transitionDelay: `${staggerMs}ms` }}
                className={`border border-[#D9C6F2] rounded-none bg-white overflow-hidden transition-all duration-600 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {/* 3:4 Portrait Container */}
                <div className="w-full aspect-[3/4] overflow-hidden bg-[#2B0F3F]">
                  {member.photo && member.photo.trim() !== '' ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    /* Soft plum tile with initials */
                    <div className="w-full h-full bg-gradient-to-br from-[#3D1859] to-[#2B0F3F] flex items-center justify-center">
                      <span className="font-heading font-semibold text-3xl sm:text-4xl text-[#D9C6F2] tracking-wider select-none">
                        {getInitials(member.name)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Name & Role */}
                <div className="p-3.5 sm:p-4 space-y-1">
                  <h3 className="font-heading font-semibold text-base sm:text-lg text-[#2B0F3F] leading-snug">
                    {member.name}
                  </h3>
                  <p className="font-body text-[11px] sm:text-xs uppercase tracking-[0.18em] text-[#6A35A8] font-medium">
                    {member.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
