/**
 * MASTER LIST OF STYLES FOR LUXTRESS HAIR STUDIO
 * ==============================================
 * Add or update all salon styles in the single `STYLES` array below.
 *
 * FIELDS FOR EACH ENTRY:
 * - id:       Unique identifier (e.g., 'knotless-braids')
 * - service:  Slug of the service page it belongs to:
 *             'haircuts' | 'hairdressing' | 'braiding' | 'weaving' |
 *             'dreadlocks-installation' | 'sisterlocks-retouch' | 'hair-treatment' |
 *             'hair-dye' | 'manicure' | 'pedicure' | 'make-up' |
 *             'face-scrub' | 'piercings' | 'kids'
 * - audience: 'women' | 'men' | 'kids-girls' | 'kids-boys'
 * - name:     Display name of the style
 * - price:    Starting price as a number (e.g., 2500 -> displays as "from KES 2,500"),
 *             or null if no price is listed yet
 * - photo:    Image path (e.g., '/images/work/boho-braids.jpg'),
 *             or '' (empty string) if there is no photo yet
 * - featured: true or false. Any entry with `featured: true` AND a non-empty `photo`
 *             is automatically shown in the "Our Work" gallery on the home page
 *             (up to 12 cards total).
 *
 * HOW TO ADD A PRICE:
 *   Change `price: null` to a plain number without commas, e.g. `price: 2500`.
 *
 * HOW TO ADD A PHOTO:
 *   1. Put the image file in `/public/images/work/` (e.g., `/public/images/work/stitch-braids.jpg`).
 *   2. Change `photo: ''` to `photo: '/images/work/stitch-braids.jpg'`.
 */

export type StyleAudience = 'women' | 'men' | 'kids-girls' | 'kids-boys';

export interface StyleEntry {
  id: string;
  service: string;
  audience: StyleAudience;
  name: string;
  price: number | null;
  photo: string;
  featured: boolean;
}

export const STYLES: StyleEntry[] = [
  // Braiding
  {
    id: 'french-curls',
    service: 'braiding',
    audience: 'women',
    name: 'French curls',
    price: null,
    photo: '',
    featured: false,
  },
  {
    id: 'boho-braids',
    service: 'braiding',
    audience: 'women',
    name: 'Boho braids',
    price: null,
    photo: '',
    featured: false,
  },
  {
    id: 'stitch-braids',
    service: 'braiding',
    audience: 'women',
    name: 'Stitch braids',
    price: null,
    photo: '',
    featured: false,
  },
  {
    id: 'twists',
    service: 'braiding',
    audience: 'women',
    name: 'Twists',
    price: null,
    photo: '',
    featured: false,
  },

  // Haircuts
  {
    id: 'fade',
    service: 'haircuts',
    audience: 'men',
    name: 'Fade',
    price: null,
    photo: '',
    featured: false,
  },
];
