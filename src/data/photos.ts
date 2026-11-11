/**
 * Luxtress Hair Studio - Photo Registry
 *
 * HOW TO ADD A NEW PHOTO:
 * 1. Place your image file in `/public/images/work/` (e.g., `/public/images/work/my-style.jpg`).
 * 2. Add an entry to the `PHOTOS` array below:
 *
 * // EXAMPLE ENTRY:
 * // {
 * //   id: 'passion-twists',
 * //   src: '/images/work/passion-twists.jpg',
 * //   alt: 'Long bohemian passion twists with curly accents',
 * //   services: ['braiding'],
 * //   category: 'braids',
 * //   featured: true,
 * // },
 *
 * Categories allowed: 'braids' | 'styling' | 'men' | 'kids' | 'nails' | 'salon'
 */

export type PhotoCategory =
  | 'braids'
  | 'styling'
  | 'men'
  | 'kids'
  | 'nails'
  | 'salon';

export interface SalonPhoto {
  id: string;
  src: string;
  alt: string;
  services: string[]; // e.g. ['braiding'], ['mens-cuts'], ['haircuts-styling']
  category: PhotoCategory;
  featured?: boolean;
  isCircular?: boolean; // For circular cropped images (e.g., men's fade)
  objectPosition?: string; // Optional custom framing (e.g. 'object-[center_25%]')
}

export const PHOTOS: SalonPhoto[] = [
  {
    id: 'fade',
    src: '/images/work/fade.jpg',
    alt: 'Fade haircut with a razor design',
    services: ['haircuts'],
    category: 'men',
    featured: true,
    isCircular: true,
    objectPosition: 'object-center',
  },
  {
    id: 'twists',
    src: '/images/work/twists.jpg',
    alt: 'Twist hairstyle',
    services: ['braiding'],
    category: 'braids',
    featured: true,
    objectPosition: 'object-[center_20%]',
  },
  {
    id: 'boho-braids',
    src: '/images/work/boho-braids.jpg',
    alt: 'Knotless braids with curly ends',
    services: ['braiding'],
    category: 'braids',
    featured: true,
    objectPosition: 'object-[center_25%]',
  },
  {
    id: 'nails',
    src: '/images/work/nails.jpg',
    alt: 'Nail art with marbled tips',
    services: ['manicure'],
    category: 'nails',
    featured: true,
    objectPosition: 'object-[center_35%]',
  },
];

/**
 * Retrieve all photos associated with a given service ID.
 */
export function getPhotosByServiceId(serviceId: string): SalonPhoto[] {
  return PHOTOS.filter((photo) => photo.services.includes(serviceId));
}

/**
 * Retrieve photos for a category, or all photos if category is 'All'.
 */
export function getPhotosByCategory(category: PhotoCategory | 'All'): SalonPhoto[] {
  if (category === 'All') {
    return PHOTOS;
  }
  return PHOTOS.filter((photo) => photo.category === category);
}

/**
 * Returns list of distinct categories that currently have at least one photo.
 */
export function getAvailableCategories(): PhotoCategory[] {
  const categorySet = new Set<PhotoCategory>();
  for (const photo of PHOTOS) {
    categorySet.add(photo.category);
  }
  return Array.from(categorySet);
}

/**
 * Format category keys for human-friendly filter pill display.
 */
export const CATEGORY_LABELS: Record<PhotoCategory | 'All', string> = {
  All: 'All',
  braids: 'Braids',
  styling: 'Styling',
  men: 'Men',
  kids: 'Kids',
  nails: 'Nails',
  salon: 'Studio',
};
