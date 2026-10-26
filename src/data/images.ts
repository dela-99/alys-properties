/**
 * Single source of truth for every image in the site.
 *
 * When real Alys Properties photography becomes available, replace the values
 * here — no component needs to change. Filenames map 1:1 onto `public/img`.
 */
export const images = {
  'plaza-hero': '/img/plaza-hero.webp',
  'plaza-interior': '/img/plaza-interior.webp',
  'plaza-retail': '/img/plaza-hero.webp',
  'plaza-office': '/img/plaza-hero.webp',
  'plaza-courtyard': '/img/plaza-hero.webp',
  'plaza-lounge': '/img/plaza-hero.webp',
  'plaza-corner-unit': '/img/plaza-hero.webp',

  'gardens-hero': '/img/gardens-hero.webp',
  'gardens-pavilion': '/img/gardens-pavilion.webp',
  'gardens-wedding': '/img/gardens-hero.webp',
  'gardens-reception': '/img/gardens-hero.webp',
  'gardens-lawn': '/img/gardens-hero.webp',

  'court-hero': '/img/court-hero.webp',
  'court-night': '/img/court-night.webp',
  'court-multi': '/img/court-hero.webp',
  'court-fitness': '/img/court-hero.webp',
  'court-event': '/img/court-hero.webp',
  'court-clubhouse': '/img/court-hero.webp',

  'event-showcase': '/img/plaza-hero.webp',
  'event-garden-dinner': '/img/gardens-hero.webp',
  'event-workshop': '/img/plaza-hero.webp',
  'event-summer-social': '/img/plaza-hero.webp',

  about: '/img/gardens-hero.webp',
  'home-hero': '/img/plaza-hero.webp',
} as const

export type ImageKey = keyof typeof images
