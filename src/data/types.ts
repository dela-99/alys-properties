/**
 * Shared domain types for Alys Properties.
 *
 * Data files (`src/data/*`) hold plain serialisable values only — no JSX, no
 * component imports — so that the presentation layer can be rebuilt without
 * touching the content, and the content can be replaced with verified
 * company data without touching the components.
 */

export type DestinationId = 'plaza' | 'gardens' | 'court'

export type AvailabilityStatus = 'available' | 'limited' | 'unavailable'

export type PriceUnit = 'month' | 'day' | 'session'

/** Keys for the icon registry in `src/components/ui/Icon.tsx`. */
export type IconKey =
  | 'building'
  | 'flower'
  | 'trophy'
  | 'store'
  | 'briefcase'
  | 'users'
  | 'ruler'
  | 'mapPin'
  | 'calendar'
  | 'clock'
  | 'shield'
  | 'leaf'
  | 'utensils'
  | 'wifi'
  | 'car'
  | 'plug'
  | 'lightbulb'
  | 'presentation'
  | 'armchair'
  | 'accessibility'
  | 'droplets'
  | 'shower'
  | 'warehouse'
  | 'trees'
  | 'fence'
  | 'grid'
  | 'sun'
  | 'music'
  | 'volume'

export interface Highlight {
  icon: IconKey
  label: string
  value: string
}

export interface Destination {
  id: DestinationId
  /** Display name, e.g. "The Plaza". */
  name: string
  /** Short form used in tight layouts. */
  shortName: string
  /** Category label, e.g. "Commercial & Retail". */
  eyebrow: string
  /** One-line positioning statement. */
  tagline: string
  /** Short description used on cards. */
  summary: string
  /** Long-form introduction used on the destination page. */
  description: string
  icon: IconKey
  /** Card thumbnail. */
  image: string
  /** Wide hero image for the destination page. */
  heroImage: string
  /** Additional images for the destination gallery. */
  gallery: string[]
  /** Space types or activity categories offered. */
  supports: string[]
  highlights: Highlight[]
}

export interface SpaceFeature {
  label: string
  value: string
}

export interface Space {
  id: string
  destinationId: DestinationId
  name: string
  /** Space type, e.g. "Retail unit", "Event lawn". */
  type: string
  summary: string
  description: string
  image: string
  gallery: string[]
  status: AvailabilityStatus
  /** Human-readable explanation of the status. */
  statusNote: string
  priceValue: number
  priceUnit: PriceUnit
  /** Optional qualifier, e.g. "from", "per session". */
  priceQualifier?: string
  size?: string
  capacity?: string
  amenities: IconKey[]
  features: SpaceFeature[]
  /**
   * `false` marks the record as illustrative prototype data. The UI surfaces a
   * "Sample data" marker so it is never presented as confirmed inventory.
   */
  verified: boolean
}

export interface EventItem {
  id: string
  destinationId: DestinationId
  title: string
  /** Event category, e.g. "Wedding", "Tournament". */
  category: string
  /** ISO date, `YYYY-MM-DD`. */
  date: string
  /** Human-readable start time, e.g. "4:00 PM". */
  time: string
  image: string
  summary: string
  location: string
  priceNote: string
  ctaLabel: string
  verified: boolean
}

export interface EnquiryDraft {
  name: string
  email: string
  phone: string
  destinationId: DestinationId | ''
  venueId: string
  date: string
  guests: string
  message: string
}
