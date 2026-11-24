/**
 * TEAM REGISTRY FOR LUXTRESS HAIR STUDIO
 * ======================================
 * Add team members to the `TEAM` array below.
 * The "Meet the Team" section (and its menu link) stays hidden until there are at least 2 entries.
 *
 * EXAMPLE ENTRY:
 * {
 *   name: 'Grace Wanjiku',
 *   role: 'Senior Braider',
 *   photo: '/images/team/grace.jpg', // Leave '' to show a soft plum tile with initials
 * }
 */

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
}

// Leave empty until team members are added (section & menu link display at 2+ entries)
export const TEAM: TeamMember[] = [];
