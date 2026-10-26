import type { Destination, DestinationId } from './types'

export const destinations: Destination[] = [
  {
    id: 'plaza',
    name: 'The Plaza',
    shortName: 'Plaza',
    eyebrow: 'Commercial & Retail',
    tagline: 'Retail units, offices and business space on a landscaped commercial address.',
    summary:
      'Shops, offices and commercial units arranged around a walkable, landscaped square.',
    description:
      'The Plaza is Alys Properties’ commercial address — a collection of retail units, offices and hospitality spaces arranged around a pedestrian courtyard. Ground-floor units suit independent retail and food concepts, while the upper floors are laid out for studios, clinics and small professional offices. Every unit benefits from the same landscaping, parking and managed access.',
    icon: 'building',
    image: '/img/plaza-hero.webp',
    heroImage: '/img/plaza-hero.webp',
    gallery: ['/img/plaza-hero.webp', '/img/plaza-hero.webp', '/img/plaza-hero.webp', '/img/plaza-hero.webp'],
    supports: ['Retail units', 'Offices', 'Food & beverage', 'Showrooms', 'Studios & clinics'],
    highlights: [
      { icon: 'store', label: 'Retail', value: 'Ground-floor units' },
      { icon: 'briefcase', label: 'Office', value: 'First & second floor' },
      { icon: 'car', label: 'Parking', value: 'On-site bays' },
      { icon: 'utensils', label: 'Hospitality', value: 'Food & beverage' },
    ],
  },
  {
    id: 'gardens',
    name: 'The Gardens',
    shortName: 'Gardens',
    eyebrow: 'Events & Celebrations',
    tagline: 'An outdoor venue for weddings, private celebrations and photoshoots.',
    summary:
      'Landscaped lawns, a stone terrace and a garden pavilion for weddings, celebrations and photoshoots.',
    description:
      'The Gardens is an outdoor venue built around landscaped lawns, mature planting and a stone terrace that stays usable as the light fades. The Main Event Garden takes larger ceremonies and receptions, the Garden Pavilion covers smaller occasions in bad weather, and the Stone Terrace works for drinks, dining and evening gatherings. Lighting is installed across the grounds so events can run late.',
    icon: 'flower',
    image: '/img/gardens-hero.webp',
    heroImage: '/img/gardens-hero.webp',
    gallery: ['/img/gardens-hero.webp', '/img/gardens-hero.webp', '/img/gardens-hero.webp', '/img/gardens-hero.webp'],
    supports: [
      'Weddings',
      'Private celebrations',
      'Corporate events',
      'Photoshoots',
      'Milestone occasions',
    ],
    highlights: [
      { icon: 'users', label: 'Largest lawn', value: 'Up to 220 seated' },
      { icon: 'lightbulb', label: 'Evening lighting', value: 'Garden & terrace' },
      { icon: 'utensils', label: 'Catering', value: 'Approved partners welcome' },
      { icon: 'trees', label: 'Setting', value: 'Landscaped grounds' },
    ],
  },
  {
    id: 'court',
    name: 'The Recreational Court',
    shortName: 'Court',
    eyebrow: 'Sport & Recreation',
    tagline: 'Bookable courts, activity areas and community tournaments.',
    summary:
      'All-weather courts, an outdoor fitness deck and a clubhouse terrace for sport and gathering.',
    description:
      'The Recreational Court covers organised sport and casual use in the same place. Outdoor Court A is a full-size all-weather surface, Multi-Use Court B converts between games with adjustable posts, and the Outdoor Fitness Deck supports training and group movement. A clubhouse with a covered terrace sits alongside for changing, meeting and post-match use.',
    icon: 'trophy',
    image: '/img/court-hero.webp',
    heroImage: '/img/court-hero.webp',
    gallery: ['/img/court-hero.webp', '/img/court-hero.webp', '/img/court-hero.webp', '/img/court-hero.webp'],
    supports: [
      'Football',
      'Basketball',
      'Netball',
      'Volleyball',
      'Fitness & training',
      'Community events',
    ],
    highlights: [
      { icon: 'grid', label: 'Court sizes', value: 'Full-size & multi-use' },
      { icon: 'clock', label: 'Booking', value: 'Two-hour sessions' },
      { icon: 'shower', label: 'Facilities', value: 'Changing & showers' },
      { icon: 'fence', label: 'Surface', value: 'All-weather courts' },
    ],
  },
]

export const destinationIds: DestinationId[] = ['plaza', 'gardens', 'court']

export function getDestination(id: string | undefined): Destination | undefined {
  return destinations.find((destination) => destination.id === id)
}
