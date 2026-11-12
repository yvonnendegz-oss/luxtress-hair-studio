/**
 * Gallery Section for Luxtress Hair Studio.
 * - Single heading: "Our Work" (Playfair Display 600) with tight, consistent spacing.
 * - 12 cards in 4 rows (Ladies, Men, Kids, Nails & Beauty) without row labels.
 * - Desktop hover overlay: soft plum overlay with small enlarge icon (no category text).
 * - Aspect ratio 4:5, sharp square corners (rounded-none), thin lavender hairline border.
 * - Photos fill frame with object-fit: cover (no letterboxing).
 * - Placeholder card with soft plum-to-lavender tint, subtle icon, and "Photo coming soon".
 * - Video card support with play icon.
 * - Respects prefers-reduced-motion.
 * - Mobile horizontal swipe strip with scroll-snap.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, Camera, X, Maximize2 } from 'lucide-react';
import { notifyLightboxChange } from '../utils/lightboxEvents';

export type GalleryCategory = 'Ladies' | 'Men' | 'Kids' | 'Nails & Beauty';

export interface GalleryCardItem {
  id: string;
  category: GalleryCategory;
  src: string; // If empty, placeholder card is shown automatically
  alt: string;
  type: 'image' | 'video';
  scaleOverride?: boolean; // For fade.jpg to crop circular frame cleanly
}

/**
 * MASTER GALLERY CARDS (12 in total, 3 per row on desktop).
 * To add or replace photos: just paste the image path in 'src'.
 * Leaving 'src' empty automatically displays the elegant placeholder card.
 */
export const GALLERY_CARDS: GalleryCardItem[] = [
  // ROW 1: LADIES
  {
    id: 'ladies-1',
    category: 'Ladies',
    src: '/images/work/boho-braids.jpg',
    alt: 'Knotless braids with curly ends',
    type: 'image',
  },
  {
    id: 'ladies-2',
    category: 'Ladies',
    src: '/images/work/twists.jpg',
    alt: 'Twist hairstyle',
    type: 'image',
  },
  {
    id: 'ladies-3',
    category: 'Ladies',
    src: '',
    alt: 'Protective braids and styling',
    type: 'image',
  },

  // ROW 2: MEN
  {
    id: 'men-1',
    category: 'Men',
    src: '/images/work/fade.jpg',
    alt: 'Fade haircut with a razor design',
    type: 'image',
    scaleOverride: true,
  },
  {
    id: 'men-2',
    category: 'Men',
    src: '',
    alt: 'Precision fade and razor shape-up',
    type: 'image',
  },
  {
    id: 'men-3',
    category: 'Men',
    src: '',
    alt: 'Beard sculpting and haircut showcase',
    type: 'video',
  },

  // ROW 3: KIDS
  {
    id: 'kids-1',
    category: 'Kids',
    src: '',
    alt: 'Gentle detangling and braids for girls',
    type: 'image',
  },
  {
    id: 'kids-2',
    category: 'Kids',
    src: '',
    alt: 'Clean taper and fade for boys',
    type: 'image',
  },
  {
    id: 'kids-3',
    category: 'Kids',
    src: '',
    alt: 'Kids patient styling session',
    type: 'video',
  },

  // ROW 4: NAILS & BEAUTY
  {
    id: 'nails-1',
    category: 'Nails & Beauty',
    src: '/images/work/nails.jpg',
    alt: 'Nail art with marbled tips',
    type: 'image',
  },
  {
    id: 'nails-2',
    category: 'Nails & Beauty',
    src: '',
    alt: 'Deluxe manicure & gel polish set',
    type: 'image',
  },
  {
    id: 'nails-3',
    category: 'Nails & Beauty',
    src: '',
    alt: 'Glamour makeover and eye beautification',
    type: 'image',
  },
];

const ROWS: { category: GalleryCategory }[] = [
  { category: 'Ladies' },
  { category: 'Men' },
  { category: 'Kids' },
  { category: 'Nails & Beauty' },
];

export const GallerySection: React.FC = () => {
  const [lightboxCard, setLightboxCard] = useState<GalleryCardItem | null>(null);
  const [visibleCardIds, setVisibleCardIds] = useState<Set<string>>(new Set());
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  // IntersectionObserver for one-time glide in animations
  useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleCardIds(new Set(GALLERY_CARDS.map((c) => c.id)));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-card-id');
            if (id) {
              setVisibleCardIds((prev) => new Set([...prev, id]));
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

    Object.values(cardRefs.current).forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  // Lightbox handlers & synchronization
  const openLightbox = (card: GalleryCardItem) => {
    if (!card.src) return;
    setLightboxCard(card);
  };

  const closeLightbox = () => {
    setLightboxCard(null);
  };

  useEffect(() => {
    notifyLightboxChange(!!lightboxCard);
    if (!lightboxCard) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxCard]);

  return (
    <section
      id="gallery"
      className="scroll-mt-20 py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white text-[#2B0F3F] border-b border-[#D9C6F2]/30"
      aria-label="Luxtress Gallery"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header: Single Heading "Our Work" with tight spacing */}
        <div className="mb-8 sm:mb-10">
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#2B0F3F] tracking-tight leading-tight">
            Our Work
          </h2>
        </div>

        {/* 4 Rows (Ladies, Men, Kids, Nails & Beauty) without row labels */}
        <div className="space-y-4 sm:space-y-6">
          {ROWS.map((row) => {
            const cardsInRow = GALLERY_CARDS.filter((c) => c.category === row.category);

            return (
              <div key={row.category}>
                {/* Cards Container: Desktop 3-column grid, Mobile horizontal swipe strip with scroll-snap */}
                <div className="flex sm:grid sm:grid-cols-3 gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-3 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
                  {cardsInRow.map((card, colIdx) => {
                    const isVisible = visibleCardIds.has(card.id) || prefersReducedMotion;
                    const isMiddle = colIdx === 1;

                    // Glide direction: Left & right glide up from below; middle glides down from above
                    let initialTranslate = '';
                    if (!isVisible && !prefersReducedMotion) {
                      initialTranslate = isMiddle ? '-translate-y-8' : 'translate-y-8';
                    }

                    // 100ms stagger between cards in a row
                    const delayClass =
                      colIdx === 0
                        ? 'delay-0'
                        : colIdx === 1
                          ? 'delay-100'
                          : 'delay-200';

                    return (
                      <div
                        key={card.id}
                        ref={(el) => {
                          cardRefs.current[card.id] = el;
                        }}
                        data-card-id={card.id}
                        onClick={() => openLightbox(card)}
                        className={`w-[76vw] sm:w-auto shrink-0 snap-start relative aspect-[4/5] rounded-none border border-[#D9C6F2] overflow-hidden transition-all duration-600 ease-out ${delayClass} ${
                          isVisible
                            ? 'opacity-100 translate-y-0'
                            : `opacity-0 ${initialTranslate}`
                        } ${card.src ? 'cursor-pointer group' : 'cursor-default'}`}
                        role={card.src ? 'button' : undefined}
                        tabIndex={card.src ? 0 : undefined}
                        aria-label={card.src ? `View ${card.alt}` : `${card.category} photo coming soon`}
                        onKeyDown={(e) => {
                          if (card.src && (e.key === 'Enter' || e.key === ' ')) {
                            e.preventDefault();
                            openLightbox(card);
                          }
                        }}
                      >
                        {card.src ? (
                          /* Photo Card (object-fit: cover, no letterboxing) */
                          <div className="relative w-full h-full bg-black">
                            <img
                              src={card.src}
                              alt={card.alt}
                              loading="lazy"
                              decoding="async"
                              className={`w-full h-full object-cover object-center transition-transform duration-500 ease-out ${
                                card.scaleOverride
                                  ? 'scale-[1.4] group-hover:scale-[1.45]'
                                  : 'scale-100 group-hover:scale-105'
                              }`}
                            />

                            {/* Video Play Icon Badge if type is video */}
                            {card.type === 'video' && (
                              <div className="absolute top-3 right-3 w-9 h-9 rounded-none bg-[#2B0F3F]/80 border border-[#D9C6F2]/40 text-white flex items-center justify-center backdrop-blur-sm z-10 shadow-md">
                                <Play className="w-4 h-4 fill-white ml-0.5" />
                              </div>
                            )}

                            {/* Hover Overlay on Desktop: soft plum overlay with small enlarge icon */}
                            <div className="hidden sm:flex absolute inset-0 bg-[#2B0F3F]/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center p-4 z-10">
                              <div className="w-10 h-10 rounded-full border border-[#D9C6F2]/60 bg-[#2B0F3F]/60 flex items-center justify-center text-white shadow-md transform group-hover:scale-105 transition-transform duration-200">
                                <Maximize2 className="w-4 h-4 text-[#D9C6F2]" />
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* Placeholder Card: soft plum-to-lavender tint, subtle icon, and "Photo coming soon" */
                          <div className="w-full h-full bg-gradient-to-br from-[#2B0F3F]/5 via-[#6A35A8]/5 to-[#D9C6F2]/20 flex flex-col items-center justify-center p-6 text-center space-y-3">
                            <div className="w-12 h-12 rounded-none border border-[#D9C6F2] bg-white flex items-center justify-center text-[#6A35A8] shadow-xs">
                              {card.type === 'video' ? (
                                <Play className="w-5 h-5 fill-[#6A35A8]/20" />
                              ) : (
                                <Camera className="w-5 h-5" />
                              )}
                            </div>

                            <div className="space-y-1">
                              <p className="font-heading font-semibold text-base text-[#2B0F3F]">
                                Photo coming soon
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal with sharp corners */}
      {lightboxCard && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo preview: ${lightboxCard.alt}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#2B0F3F]/95 backdrop-blur-xl animate-fade-in select-none"
        >
          {/* Top Bar with Title and Close Button */}
          <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-8 sm:right-8 flex items-center justify-between z-20">
            <div className="text-left">
              <span className="font-body text-xs tracking-wider uppercase text-[#D9C6F2]">
                {lightboxCard.category}
              </span>
              <p className="font-heading text-white text-base sm:text-lg font-semibold line-clamp-1">
                {lightboxCard.alt}
              </p>
            </div>

            <button
              type="button"
              onClick={closeLightbox}
              className="w-10 h-10 rounded-none bg-[#2B0F3F] border border-[#D9C6F2] text-white flex items-center justify-center hover:bg-[#6A35A8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D9C6F2] cursor-pointer"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Central Image View with sharp corners, 4:5 aspect ratio */}
          <div className="relative max-w-md w-full aspect-[4/5] rounded-none border border-[#D9C6F2] bg-black overflow-hidden shadow-2xl flex items-center justify-center">
            <img
              src={lightboxCard.src}
              alt={lightboxCard.alt}
              className={`w-full h-full object-cover object-center ${
                lightboxCard.scaleOverride ? 'scale-[1.4]' : 'scale-100'
              }`}
            />
          </div>

          {/* Bottom Caption Bar */}
          <div className="absolute bottom-4 sm:bottom-6 inset-x-4 max-w-md mx-auto text-center z-20">
            <p className="font-body text-xs sm:text-sm text-[#D9C6F2] font-medium bg-[#2B0F3F]/90 px-4 py-2 border border-[#D9C6F2]/30 inline-block shadow-lg">
              {lightboxCard.alt}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
