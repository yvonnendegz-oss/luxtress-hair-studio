/**
 * Single source of truth configuration for Luxtress Hair Studio.
 * All contact info, hours, links, hero copy, and services data are managed here.
 */

export type Audience = 'Women' | 'Men' | 'Kids';

export interface ServiceImage {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  alt: string;
  objectPosition?: string;
  isCircular?: boolean;
}

export interface ServiceItem {
  id: string;
  name: string;
  audiences: Audience[];
  images?: ServiceImage[];
}

export interface ImageSlotConfig {
  id: string;
  title: string;
  subtitle?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/4' | '4/5';
  imageUrl?: string;
  alt: string;
  objectPosition?: string;
}

export const SALON_CONFIG = {
  brand: {
    name: 'Luxtress Hair Studio',
    shortName: 'LUXTRESS',
    studioLabel: 'HAIR STUDIO',
    tagline: 'Elegance Meets Confidence',
    subtext: 'Hair, braids, nails and beauty for women, men and kids.',
    categoryLabel: 'WOMEN · MEN · KIDS',
    location: 'Kenya',
  },
  contact: {
    whatsappBaseUrl: 'https://wa.me/254759832002',
    whatsappLink:
      'https://wa.me/254759832002?text=Hi%20Luxtress%2C%20I%27d%20like%20to%20book%20an%20appointment',
    phoneDisplay: '0759 832 002',
    phoneTel: 'tel:+254759832002',
    instagramHandle: '@lux_tresshairstudio',
    instagramUrl: 'https://instagram.com/lux_tresshairstudio',
    tiktokUrl: 'TIKTOK_URL_HERE',
    facebookUrl: 'FACEBOOK_URL_HERE',
    directionsUrl: 'https://maps.app.goo.gl/ynNzrR1oEggzngWN9',
    address: 'Acre Tano, inside Rubis Petrol Station',
    hours: 'Open daily, 8:00 AM - 8:00 PM',
    hoursBadge: 'Open daily · 8 AM - 8 PM',
  },
  navLinks: [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'gallery', label: 'Gallery', href: '#gallery' },
    { id: 'kids', label: 'Kids', href: '#kids' },
    { id: 'visit', label: 'Visit', href: '#visit' },
  ],
  // Helper to construct service-specific WhatsApp booking links
  getServiceBookingLink: (serviceName: string) => {
    const encodedText = encodeURIComponent(`Hi Luxtress, I'd like to book ${serviceName}`);
    return `https://wa.me/254759832002?text=${encodedText}`;
  },
  // Marquee highlights between Hero and Services (all 14 services in sequence)
  marqueeItems: [
    'Haircuts',
    'Hairdressing',
    'Braiding',
    'Weaving',
    'Dreadlocks Installation',
    'Sisterlocks Retouch',
    'Hair Treatment',
    'Hair Dye',
    'Manicure',
    'Pedicure',
    'Make-up',
    'Face Scrub',
    'Piercings',
    "Kids' Hair",
  ],
  // Central registry for image placeholders and photography
  imageSlots: {
    heroPrimary: {
      id: 'hero-primary',
      title: 'Luxtress Storefront',
      subtitle: 'Elegance Meets Confidence',
      aspectRatio: '4/5',
      shape: 'arch',
      imageUrl: '/assets/aistudio/image_894e42d6.png',
      alt: 'Luxtress Hair Studio illuminated storefront sign at night',
      objectPosition: 'object-[center_46%]',
    } as ImageSlotConfig & { shape?: 'arch' | 'oval' | 'rounded-rectangle' },
    heroSecondary: {
      id: 'hero-secondary',
      title: 'Knotless Braids with Curly Ends',
      subtitle: 'Elegance Meets Confidence',
      aspectRatio: '4/5',
      shape: 'arch',
      imageUrl: '/images/work/boho-braids.jpg', // boho-braids.jpg
      alt: 'Knotless braids with curly ends',
      objectPosition: 'object-[center_28%]',
    } as ImageSlotConfig & { shape?: 'arch' | 'oval' | 'rounded-rectangle' },
    storefrontSign: {
      id: 'storefront-sign',
      title: 'Luxtress Storefront Sign',
      subtitle: 'Acre Tano, inside Rubis Petrol Station',
      aspectRatio: '4/3',
      shape: 'rounded-rectangle',
      imageUrl: '/assets/aistudio/image_894e42d6.png',
      alt: 'Luxtress Hair Studio illuminated night storefront sign',
      objectPosition: 'object-[center_46%]',
    } as ImageSlotConfig & { shape?: 'arch' | 'oval' | 'rounded-rectangle' },
  },
  // Exclusive list of 14 Luxtress services in exact sequence
  services: [
    {
      id: 'haircuts',
      name: 'Haircuts',
      audiences: ['Women', 'Men', 'Kids'],
    },
    {
      id: 'hairdressing',
      name: 'Hairdressing',
      audiences: ['Women', 'Kids'],
    },
    {
      id: 'braiding',
      name: 'Braiding',
      audiences: ['Women', 'Kids'],
    },
    {
      id: 'weaving',
      name: 'Weaving',
      audiences: ['Women'],
    },
    {
      id: 'dreadlocks-installation',
      name: 'Dreadlocks Installation',
      audiences: ['Women', 'Men'],
    },
    {
      id: 'sisterlocks-retouch',
      name: 'Sisterlocks Retouch',
      audiences: ['Women', 'Men'],
    },
    {
      id: 'hair-treatment',
      name: 'Hair Treatment',
      audiences: ['Women', 'Men'],
    },
    {
      id: 'hair-dye',
      name: 'Hair Dye',
      audiences: ['Women', 'Men', 'Kids'],
    },
    {
      id: 'manicure',
      name: 'Manicure',
      audiences: ['Women'],
    },
    {
      id: 'pedicure',
      name: 'Pedicure',
      audiences: ['Women'],
    },
    {
      id: 'make-up',
      name: 'Make-up',
      audiences: ['Women'],
    },
    {
      id: 'face-scrub',
      name: 'Face Scrub',
      audiences: ['Women', 'Men'],
    },
    {
      id: 'piercings',
      name: 'Piercings',
      audiences: ['Women', 'Men'],
    },
    {
      id: 'kids-hair',
      name: 'Kids\' Hair',
      audiences: ['Kids'],
    },
  ] as ServiceItem[],
};
