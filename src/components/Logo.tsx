/**
 * Replaceable Logo Component for Luxtress Hair Studio.
 * Features an inline SVG medallion with purple-to-plum gradient,
 * overlapping female and male profile line-art in lavender & white,
 * and high-contrast typography (Bodoni Moda + DM Sans).
 */

import React from 'react';
import { SALON_CONFIG } from '../config/salon';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showWordmark = true,
}) => {
  // Dimension scaling
  const sizeMap = {
    sm: { icon: 36, textTitle: 'text-base', textSub: 'text-[9px]' },
    md: { icon: 44, textTitle: 'text-lg sm:text-xl', textSub: 'text-[10px] sm:text-[11px]' },
    lg: { icon: 56, textTitle: 'text-2xl sm:text-3xl', textSub: 'text-xs' },
  };

  const { icon, textTitle, textSub } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Medallion Emblem SVG */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        aria-label="Luxtress Emblem"
        role="img"
      >
        <defs>
          {/* Brand Purple to Plum Gradient */}
          <linearGradient id="luxtressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6A35A8" />
            <stop offset="100%" stopColor="#2B0F3F" />
          </linearGradient>

          {/* Hair Sheen Accent */}
          <linearGradient id="lavenderWhiteSheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#D9C6F2" />
            <stop offset="100%" stopColor="#B392DE" />
          </linearGradient>

          {/* Subtle Outer Glow Filter */}
          <filter id="subtleGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#150521" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Circular Outer Base */}
        <circle
          cx="28"
          cy="28"
          r="26"
          fill="url(#luxtressGrad)"
          stroke="#D9C6F2"
          strokeWidth="1.25"
          strokeOpacity="0.45"
          filter="url(#subtleGlow)"
        />

        {/* Inner Decorative Halo Ring */}
        <circle
          cx="28"
          cy="28"
          r="23.5"
          fill="none"
          stroke="#D9C6F2"
          strokeWidth="0.75"
          strokeOpacity="0.2"
          strokeDasharray="2 2"
        />

        {/* 
          Overlapping Stylized Profiles:
          1. Man's profile (clean architectural jawline, sharp crop, white/lavender line)
          2. Woman's profile (voluminous flowing crown, arched neckline, refined profile)
        */}
        <g strokeLinecap="round" strokeLinejoin="round">
          {/* Man Profile Silhouette (Facing Right / Back offset) */}
          <path
            d="M 21 16 
               C 24 15, 29 16.5, 30 20
               C 30.5 21.8, 30 24, 28 25
               M 29.5 20.5
               C 31 21.5, 33 22, 33 24
               C 33 24.8, 32 25.4, 32 26
               L 33.2 28.5
               C 32.5 29.5, 31 29.5, 30.5 30.5
               L 31 32.5
               C 29.5 34, 27 34.5, 25 35
               L 26 39
               M 24 23
               C 23.5 25, 24.5 28, 25.5 29"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeOpacity="0.85"
            fill="none"
          />

          {/* Woman Profile Silhouette (Overlapping, Front flow, Lavender Line) */}
          <path
            d="M 14 36
               C 13 30, 14 23, 18 18
               C 21 14, 27 12, 33 14
               C 38 15.5, 41 20, 40 25
               C 39.5 27.5, 38 29, 36.5 30
               C 35 31, 35.8 33, 37 34.5
               C 38.5 36.5, 40 38, 41 41
               M 28 17
               C 32 19, 36 23, 35 28
               C 34.2 32, 30 35, 26 36.5
               L 24 42"
            stroke="url(#lavenderWhiteSheen)"
            strokeWidth="1.4"
            fill="none"
          />

          {/* Elegant Floating Crown Hair Wave (Symbolizing braiding & styling mastery) */}
          <path
            d="M 18 25
               C 22 22, 27 23, 31 21
               C 34 19.5, 37 17.5, 40 19"
            stroke="#D9C6F2"
            strokeWidth="1"
            strokeOpacity="0.7"
            fill="none"
          />
          <path
            d="M 19 29
               C 23 27, 28 27.5, 32 25.5"
            stroke="#D9C6F2"
            strokeWidth="0.8"
            strokeOpacity="0.5"
            fill="none"
          />

          {/* Small Star / Sparkle Accent in Lavender */}
          <circle cx="39" cy="16" r="1" fill="#FFFFFF" opacity="0.9" />
          <circle cx="42" cy="22" r="0.75" fill="#D9C6F2" opacity="0.8" />
        </g>
      </svg>

      {/* Wordmark */}
      {showWordmark && (
        <div className="flex flex-col justify-center leading-none">
          <span
            className={`font-heading font-bold text-white tracking-[0.06em] uppercase ${textTitle}`}
          >
            {SALON_CONFIG.brand.shortName}
          </span>
          <span
            className={`font-body font-medium text-[#D9C6F2] tracking-[0.26em] uppercase mt-1 ${textSub}`}
          >
            {SALON_CONFIG.brand.studioLabel}
          </span>
        </div>
      )}
    </div>
  );
};
