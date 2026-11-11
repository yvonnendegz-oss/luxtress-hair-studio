/**
 * Redesigned intentional ImagePlaceholder for Luxtress Hair Studio.
 * - Supports shape variants: 'arch', 'oval', 'rounded-rectangle'
 * - Deep plum-to-lavender gradient
 * - Faint, large monogram of the Luxtress emblem in the center
 * - Thin inner light border for dimensional depth
 * - Seamless drop-in image rendering if a real photograph is provided
 */

import React, { useState } from 'react';
import { SALON_CONFIG, ImageSlotConfig } from '../config/salon';

export type PlaceholderShape = 'arch' | 'oval' | 'rounded-rectangle';

interface ImagePlaceholderProps {
  slotKey?: keyof typeof SALON_CONFIG.imageSlots;
  slotConfig?: Partial<ImageSlotConfig> & { shape?: PlaceholderShape };
  shape?: PlaceholderShape;
  className?: string;
  priority?: boolean;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  slotKey,
  slotConfig,
  shape = 'rounded-rectangle',
  className = '',
  priority = false,
}) => {
  const [imageError, setImageError] = useState(false);

  // Retrieve base config if available
  const baseConfig: ImageSlotConfig = (slotKey && SALON_CONFIG.imageSlots[slotKey]) || {
    id: 'placeholder',
    title: 'Signature Styling & Artistry',
    subtitle: 'Women · Men · Kids',
    aspectRatio: '4/5',
    imageUrl: '',
    alt: 'Luxtress Hair Studio artistic visual slot',
  };

  const config = {
    ...baseConfig,
    ...slotConfig,
  };

  const finalShape: PlaceholderShape =
    (slotConfig?.shape as PlaceholderShape) || shape || 'rounded-rectangle';

  const hasRealImage = Boolean(config.imageUrl && !imageError);

  // Shape class mapping
  const shapeClasses =
    finalShape === 'arch'
      ? 'rounded-t-[999px] rounded-b-2xl'
      : finalShape === 'oval'
        ? 'rounded-[999px]'
        : 'rounded-2xl';

  // Aspect ratio class mapping
  const aspectClass =
    config.aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : config.aspectRatio === '4/3'
        ? 'aspect-[4/3]'
        : config.aspectRatio === '1/1'
          ? 'aspect-square'
          : config.aspectRatio === '3/4'
            ? 'aspect-[3/4]'
            : 'aspect-[4/5]';

  return (
    <div
      className={`relative overflow-hidden border border-[#D9C6F2]/30 shadow-2xl transition-all duration-500 group select-none ${shapeClasses} ${aspectClass} ${className}`}
      style={{
        background:
          'radial-gradient(circle at 75% 25%, rgba(217, 198, 242, 0.28) 0%, rgba(106, 53, 168, 0.45) 45%, rgba(43, 15, 63, 0.95) 85%), linear-gradient(145deg, #2B0F3F 0%, #3B1456 40%, #6A35A8 75%, #D9C6F2 100%)',
      }}
      role="img"
      aria-label={config.alt}
    >
      {/* Real Image Render (when provided) */}
      {hasRealImage ? (
        <div className="absolute inset-0 w-full h-full">
          <img
            src={config.imageUrl}
            alt={config.alt}
            referrerPolicy="no-referrer"
            loading={priority ? 'eager' : 'lazy'}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover ${config.objectPosition || 'object-[center_46%]'} transition-transform duration-700 ease-out group-hover:scale-105 ${shapeClasses}`}
          />
          {/* Subtle plum gradient overlay at bottom edge for depth and caption legibility */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-[#2B0F3F]/80 via-[#2B0F3F]/20 to-transparent pointer-events-none ${shapeClasses}`}
          />
        </div>
      ) : (
        /* Intentional High-Fashion Editorial Placeholder */
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-7 text-white">
          {/* Subtle Ambient Radial Lighting */}
          <div
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#D9C6F2]/20 blur-2xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[#6A35A8]/30 blur-2xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Faint, Large Monogram in the Center */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 160 160"
              className="w-3/5 h-3/5 max-w-[200px] text-[#D9C6F2] opacity-15 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-25"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Outer decorative halo */}
              <circle cx="80" cy="80" r="74" strokeDasharray="3 3" opacity="0.6" />
              <circle cx="80" cy="80" r="68" strokeWidth="0.8" />

              {/* Interlocking Monogram Silhouette Contours */}
              <path
                d="M 60 48 
                   C 68 45, 82 49, 85 59
                   C 86.5 64, 85 70, 79 73
                   M 83.5 60
                   C 88 63, 93 65, 93 71
                   C 93 73.5, 90 75, 90 77
                   L 93.5 84
                   C 91 87, 87 87, 85 90
                   L 87 96
                   C 82 100, 75 101, 70 102
                   L 73 114"
                opacity="0.85"
              />
              <path
                d="M 40 105
                   C 37 88, 40 68, 51 54
                   C 60 42, 77 37, 94 42
                   C 108 46, 117 59, 114 74
                   C 112 81, 108 85, 104 88
                   C 100 91, 102 97, 106 101
                   C 110 107, 114 111, 117 120
                   M 80 50
                   C 91 56, 103 68, 100 82
                   C 98 94, 86 102, 74 107
                   L 68 123"
                strokeWidth="1.6"
              />
              <path
                d="M 52 73
                   C 63 65, 77 67, 88 62
                   C 97 58, 105 52, 114 56"
                opacity="0.7"
              />
            </svg>
          </div>

          {/* Top Tag: Quiet studio watermark */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="font-heading italic text-xs tracking-widest text-[#D9C6F2]/80 font-semibold select-none">
              LUXTRESS
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#D9C6F2]/60" />
          </div>

          {/* Bottom Card Title and Subtitle */}
          <div className="relative z-10 p-3 sm:p-4 rounded-xl bg-[#2B0F3F]/65 backdrop-blur-md border border-[#D9C6F2]/20">
            <p className="font-heading font-semibold text-sm sm:text-base text-white tracking-tight line-clamp-1">
              {config.title}
            </p>
            {config.subtitle && (
              <p className="font-body text-[11px] text-[#D9C6F2] tracking-wider uppercase mt-0.5 line-clamp-1">
                {config.subtitle}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Thin Inner Light Border for Luxury Depth */}
      <div
        className={`absolute inset-0 ring-1 ring-inset ring-white/20 pointer-events-none ${shapeClasses}`}
      />
    </div>
  );
};
