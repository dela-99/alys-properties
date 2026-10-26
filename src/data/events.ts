import { isFutureDate } from '../lib/format'
import type { EventItem } from './types'

/**
 * Illustrative prototype schedule.
 *
 * As with the space inventory, every record is flagged `verified: false` and
 * the UI labels it as a sample listing. Dates are stored as plain ISO days so
 * "upcoming" vs "past" is always derived from the current date rather than
 * hand-maintained.
 */
export const events: EventItem[] = [
  {
    id: 'event-wedding',
    destinationId: 'gardens',
    title: 'Garden Wedding Celebration',
    category: 'Wedding',
    date: '2026-11-14',
    time: '2:00 PM',
    image: '/img/gardens-hero.webp',
    summary:
      'A full-day celebration on the Main Event Garden — ceremony on the lawn, drinks on the terrace and dinner under the trees.',
    location: 'The Gardens — Main Event Garden',
    priceNote: 'Sample listing — registration details to follow',
    ctaLabel: 'Enquire to attend',
    verified: false,
  },
  {
    id: 'event-showcase',
    destinationId: 'plaza',
    title: 'Autumn Retail Showcase',
    category: 'Showcase',
    date: '2026-11-21',
    time: '11:00 AM',
    image: '/img/plaza-hero.webp',
    summary:
      'A daytime showcase of the Plaza retail and office spaces, with guided tours of the available units.',
    location: 'The Plaza — Retail Gallery',
    priceNote: 'Open invitation — no ticket required',
    ctaLabel: 'Register interest',
    verified: false,
  },
  {
    id: 'event-tournament',
    destinationId: 'court',
    title: 'Autumn Community Tournament',
    category: 'Tournament',
    date: '2026-11-29',
    time: '9:00 AM',
    image: '/img/court-night.webp',
    summary:
      'A community football and netball tournament across both courts, with the clubhouse terrace open for teams and spectators.',
    location: 'The Recreational Court — Court A & B',
    priceNote: 'Free entry — team registration required',
    ctaLabel: 'Register a team',
    verified: false,
  },
  {
    id: 'event-dinner',
    destinationId: 'gardens',
    title: 'Garden Dinner & Long Table',
    category: 'Private dinner',
    date: '2026-12-05',
    time: '7:00 PM',
    image: '/img/gardens-pavilion.webp',
    summary:
      'A single long-table dinner on the Stone Terrace, lit by lanterns, with a seasonal menu served family style.',
    location: 'The Gardens — Stone Terrace',
    priceNote: 'Ticketed — limited seats available',
    ctaLabel: 'Request a seat',
    verified: false,
  },
  {
    id: 'event-workshop',
    destinationId: 'plaza',
    title: 'Weekend Makers Workshop',
    category: 'Workshop',
    date: '2026-12-12',
    time: '10:00 AM',
    image: '/img/plaza-interior.webp',
    summary:
      'A hands-on half-day workshop for small businesses, covering storefront presentation and unit fit-out.',
    location: 'The Plaza — Community Room',
    priceNote: 'Ticketed — materials included',
    ctaLabel: 'Book a place',
    verified: false,
  },
  {
    id: 'event-summer-social',
    destinationId: 'plaza',
    title: 'Summer Terrace Social',
    category: 'Social',
    date: '2026-09-12',
    time: '6:00 PM',
    image: '/img/plaza-interior.webp',
    summary:
      'A seasonal social evening in the plaza courtyard with shared tables, string lighting and local food traders.',
    location: 'The Plaza — Courtyard',
    priceNote: 'Sample listing — concluded',
    ctaLabel: 'View details',
    verified: false,
  },
]

export function getEvent(id: string | undefined): EventItem | undefined {
  return events.find((event) => event.id === id)
}

export function isUpcoming(event: EventItem): boolean {
  return isFutureDate(event.date)
}

export function upcomingEvents(): EventItem[] {
  return events.filter(isUpcoming).sort((a, b) => a.date.localeCompare(b.date))
}

export function pastEvents(): EventItem[] {
  return events.filter((event) => !isUpcoming(event)).sort((a, b) => b.date.localeCompare(a.date))
}
