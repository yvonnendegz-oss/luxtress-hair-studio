/**
 * CLIENT REVIEWS REGISTRY FOR LUXTRESS HAIR STUDIO
 * =================================================
 * Add verified client reviews to the `REVIEWS` array below.
 * The "What Clients Say" section stays hidden until there are at least 3 entries.
 *
 * EXAMPLE ENTRY:
 * {
 *   quote: 'My knotless braids were neat, comfortable, and lasted for weeks.',
 *   name: 'Amina',
 *   service: 'Braiding',
 * }
 */

export interface ReviewEntry {
  quote: string;
  name: string;
  service: string;
}

// Leave empty until verified client reviews are added (section displays at 3+ entries)
export const REVIEWS: ReviewEntry[] = [];

// Paste your Google Review URL here to show a "Leave us a review" link under the section
export const GOOGLE_REVIEW_URL: string = '';
