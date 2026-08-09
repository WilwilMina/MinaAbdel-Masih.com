/* Source of truth for the About section — consumed by AboutSection.jsx.

   `tint` on stats and interests is the per-item accent colour, passed into CSS
   as a custom property so each card/pill can differ without its own class.

   Every fact here is already public elsewhere on the site or on the resume:
   the honours come from the old META array, and the two roles come from
   bio.js `notes`. Nothing is invented — see the content rules in CLAUDE.md. */

export const lead =
  "I'm a Computer Science student at NC State focused on AI, full-stack development, and backend systems. I enjoy building practical software that solves real problems and turns ideas into useful products."

export const stats = [
  {
    icon: 'fa-solid fa-graduation-cap',
    value: '4.0',
    label: 'GPA',
    tint: '45, 226, 182', // --accent, as RGB triplet for rgba() tinting
  },
  {
    icon: 'fa-solid fa-trophy',
    value: '#1',
    label: 'CS Rank',
    tint: '124, 111, 247', // --accent-2
  },
  {
    icon: 'fa-solid fa-briefcase',
    value: '2 Roles',
    label: 'Work Experience',
    detail: 'Walgreens · Zaki Technology',
    tint: '45, 226, 182',
    wide: true, // needs room for both employer names
  },
]

export const honors = [
  {
    icon: 'fa-solid fa-star',
    text: 'GPA 4.0 / #1 CS Rank (among 306 students, 2,205 Engineering)',
  },
  {
    icon: 'fa-solid fa-circle-check',
    text: "Dean's List (Every Semester — Fall 2024 to Spring 2026)",
  },
  {
    icon: 'fa-solid fa-award',
    text: 'Henry B. Rowe Jr. Scholar, Robert F. & Romaine S. Angel Scholar, NCRMA Scholar',
  },
  {
    icon: 'fa-solid fa-users-rectangle',
    text: 'HackPack · AI Club · App Dev Club · Oriental Orthodox Club · Coptic & Arab Student Associations · Society of Sales Engineers',
  },
]

export const interests = [
  { icon: 'fa-solid fa-futbol',    label: 'Soccer',      tint: '45, 226, 182'  },
  { icon: 'fa-solid fa-music',     label: 'Music',       tint: '124, 111, 247' },
  { icon: 'fa-solid fa-dumbbell',  label: 'Working Out', tint: '232, 96, 168'  },
  { icon: 'fa-solid fa-user-group', label: 'Community',  tint: '86, 160, 245'  },
]

/* Rows for the card floating over the photo. `dot` renders a pulsing status
   indicator instead of an icon. */
export const photoFacts = [
  {
    icon: 'fa-solid fa-location-dot',
    title: 'Raleigh, NC',
  },
  {
    icon: 'fa-solid fa-laptop-code',
    title: 'CS @ NC State',
    detail: 'Math Minor, AI Concentration, B.S. CS Expected May 2028',
  },
  {
    dot: true,
    title: 'Open to Opportunities',
    detail: 'Summer 2027 Internships',
  },
]
