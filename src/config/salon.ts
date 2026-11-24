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
  slug: string;
  name: string;
  tagline: string;
  bannerPhoto?: string;
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

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/lux_tresshairstudio',
  tiktok: 'https://www.tiktok.com/@luxtress.hair.stu',
  facebook: 'https://www.facebook.com/share/p/1D5uqJM5o8/',
};

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
    instagramUrl: SOCIAL_LINKS.instagram,
    tiktokUrl: SOCIAL_LINKS.tiktok,
    facebookUrl: SOCIAL_LINKS.facebook,
    directionsUrl: 'https://maps.app.goo.gl/ynNzrR1oEggzngWN9',
    address: 'Acre Tano, inside Rubis Petrol Station',
    hours: 'Open daily, 8:00 AM - 8:00 PM',
    hoursBadge: 'Open daily · 8 AM - 8 PM',
  },
  navLinks: [
    { id: 'work', label: 'Our Work', href: '#work' },
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'team', label: 'Meet the Team', href: '#team' },
    { id: 'location', label: 'Location', href: '#location' },
  ],
  // Helper to construct service-specific WhatsApp booking links
  getServiceBookingLink: (serviceName: string) => {
    const encodedText = encodeURIComponent(
      `Hi Luxtress, I'd like to book ${serviceName}.`
    );
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
      imageUrl: '/images/work/boho-braids.jpg',
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
      slug: 'haircuts',
      name: 'Haircuts',
      tagline: 'Clean shaping, trims, and fades tailored to your hair.',
      bannerPhoto: '',
      audiences: ['Women', 'Men', 'Kids'],
    },
    {
      id: 'hairdressing',
      slug: 'hairdressing',
      name: 'Hairdressing',
      tagline: 'Polished blowouts, sets, and everyday styling.',
      bannerPhoto: '',
      audiences: ['Women', 'Kids'],
    },
    {
      id: 'braiding',
      slug: 'braiding',
      name: 'Braiding',
      tagline: 'Neat, protective braids crafted for comfort and longevity.',
      bannerPhoto: '',
      audiences: ['Women', 'Kids'],
    },
    {
      id: 'weaving',
      slug: 'weaving',
      name: 'Weaving',
      tagline: 'Natural-looking tracks and seamless install finishes.',
      bannerPhoto: '',
      audiences: ['Women'],
    },
    {
      id: 'dreadlocks-installation',
      slug: 'dreadlocks-installation',
      name: 'Dreadlocks Installation',
      tagline: 'Thoughtful parting and starter locs built to mature neatly.',
      bannerPhoto: '',
      audiences: ['Women', 'Men'],
    },
    {
      id: 'sisterlocks-retouch',
      slug: 'sisterlocks-retouch',
      name: 'Sisterlocks Retouch',
      tagline: 'Gentle root maintenance to keep your grid neat and balanced.',
      bannerPhoto: '',
      audiences: ['Women', 'Men'],
    },
    {
      id: 'hair-treatment',
      slug: 'hair-treatment',
      name: 'Hair Treatment',
      tagline: 'Nourishing steam and conditioning care for healthier hair.',
      bannerPhoto: '',
      audiences: ['Women', 'Men'],
    },
    {
      id: 'hair-dye',
      slug: 'hair-dye',
      name: 'Hair Dye',
      tagline: 'Even, considered colour work with conditioning protection.',
      bannerPhoto: '',
      audiences: ['Women', 'Men', 'Kids'],
    },
    {
      id: 'manicure',
      slug: 'manicure',
      name: 'Manicure',
      tagline: 'Clean cuticle care, shaping, and lasting polish finishes.',
      bannerPhoto: '',
      audiences: ['Women'],
    },
    {
      id: 'pedicure',
      slug: 'pedicure',
      name: 'Pedicure',
      tagline: 'Soothing foot care, exfoliation, and neat nail grooming.',
      bannerPhoto: '',
      audiences: ['Women'],
    },
    {
      id: 'make-up',
      slug: 'make-up',
      name: 'Make-up',
      tagline: 'Soft, balanced application tailored to your features.',
      bannerPhoto: '',
      audiences: ['Women'],
    },
    {
      id: 'face-scrub',
      slug: 'face-scrub',
      name: 'Face Scrub',
      tagline: 'Gentle exfoliation to leave skin clear, calm, and refreshed.',
      bannerPhoto: '',
      audiences: ['Women', 'Men'],
    },
    {
      id: 'piercings',
      slug: 'piercings',
      name: 'Piercings',
      tagline: 'Careful, hygienic placement with clear aftercare guidance.',
      bannerPhoto: '',
      audiences: ['Women', 'Men'],
    },
    {
      id: 'kids',
      slug: 'kids',
      name: "Kids' Hair",
      tagline: 'Patient, gentle hair care and neat styles for children.',
      bannerPhoto: '',
      audiences: ['Kids'],
    },
  ] as ServiceItem[],
};
