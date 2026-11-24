/**
 * Gallery Section ("Our Work") for Luxtress Hair Studio.
 * - Section anchor: #work.
 * - Single heading: "Our Work" (Playfair Display 600) with tight, consistent spacing.
 * - Keeps all existing photos intact, and appends any STYLES entries with `featured: true`
 *   and a non-empty `photo`, sorted in order: women, men, kids, then nails & beauty.
 * - Maximum of 12 cards shown.
 * - Constant SHOW_PLACEHOLDER_CARDS = false: when false, cards without a photo are omitted
 *   and remaining cards flow in order into the grid with scroll-in animation.
 * - Shared PhotoLightbox viewer on tap.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, Camera, Maximize2 } from 'lucide-react';
import { STYLES, StyleEntry } from '../data/styles';
import { PhotoLightbox, LightboxPhoto } from './PhotoLightbox';

// Toggle whether placeholder cards without photos are shown in the gallery
const SHOW_PLACEHOLDER_CARDS = false;

export type GalleryCategory = 'Ladies' | 'Men' | 'Kids' | 'Nails & Beauty';

export interface GalleryCardItem {
  id: string;
  category: GalleryCategory;
  src: string;
  alt: string;
  type: 'image' | 'video';
  scaleOverride?: boolean;
}

const NAILS_AND_BEAUTY_SERVICES = new Set([
  'manicure',
  'pedicure',
  'make-up',
  'face-scrub',
  'piercings',
]);

function getGalleryCategoryForStyle(style: StyleEntry): {
  category: GalleryCategory;
  rank: number;
} {
  if (NAILS_AND_BEAUTY_SERVICES.has(style.service)) {
    return { category: 'Nails & Beauty', rank: 3 };
  }
  if (
    style.audience === 'kids-girls' ||
    style.audience === 'kids-boys' ||
    style.service === 'kids'
  ) {
    return { category: 'Kids', rank: 2 };
  }
  if (style.audience === 'men') {
    return { category: 'Men', rank: 1 };
  }
  return { category: 'Ladies', rank: 0 };
}

/**
 * EXISTING GALLERY CARDS
 */
export const GALLERY_CARDS: GalleryCardItem[] = [
  // LADIES
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

  // MEN
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

  // KIDS
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

  // NAILS & BEAUTY
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

export const GallerySection: React.FC = () => {
  const [lightboxPhoto, setLightboxPhoto] = useState<LightboxPhoto | null>(null);
  const [visibleCardIds, setVisibleCardIds] = useState<Set<string>>(new Set());
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Build featured style cards from STYLES sorted in order: women, men, kids, nails & beauty
  const featuredStyleCards: GalleryCardItem[] = STYLES.filter(
    (style) => style.featured && Boolean(style.photo && style.photo.trim() !== '')
  )
    .map((style, index) => {
      const { category, rank } = getGalleryCategoryForStyle(style);
      return {
        rank,
        index,
        card: {
          id: `style-${style.id}`,
          category,
          src: style.photo,
          alt: style.name,
          type: 'image' as const,
          scaleOverride: style.photo.includes('fade.jpg'),
        },
      };
    })
    .sort((a, b) => (a.rank !== b.rank ? a.rank - b.rank : a.index - b.index))
    .map((item) => item.card);

  const existingPhotoCards = GALLERY_CARDS.filter((card) => Boolean(card.src));
  const combinedRealCards = [...existingPhotoCards, ...featuredStyleCards];

  const displayedCards = (
    SHOW_PLACEHOLDER_CARDS
      ? featuredStyleCards.length === 0
        ? GALLERY_CARDS
        : [
            ...combinedRealCards,
            ...GALLERY_CARDS.filter((card) => !card.src),
          ]
      : combinedRealCards
  ).slice(0, 12);

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
      setVisibleCardIds(new Set(displayedCards.map((c) => c.id)));
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
  }, [prefersReducedMotion, displayedCards.length]);

  const openLightbox = (card: GalleryCardItem) => {
    if (!card.src) return;
    setLightboxPhoto({
      src: card.src,
      alt: card.alt,
      label: card.category,
      scaleOverride: card.scaleOverride,
    });
  };

  return (
    <section
      id="work"
      style={{ scrollMarginTop: '88px' }}
      className="scroll-mt-[88px] py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white text-[#2B0F3F] border-b border-[#D9C6F2]/30"
      aria-label="Luxtress Gallery"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header: Single Heading "Our Work" with tight spacing */}
        <div className="mb-8 sm:mb-10">
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#2B0F3F] tracking-tight leading-tight">
            Our Work
          </h2>
        </div>

        {/* Flowing Gallery Grid (3 columns on desktop, horizontal scroll-snap on mobile) */}
        <div className="flex sm:grid sm:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-3 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {displayedCards.map((card, idx) => {
            const colIdx = idx % 3;
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
                  /* Placeholder Card */
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

      {/* Shared Lightbox Viewer */}
      <PhotoLightbox
        photo={lightboxPhoto}
        onClose={() => setLightboxPhoto(null)}
      />
    </section>
  );
};
