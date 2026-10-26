/**
 * Site-wide configuration.
 *
 * CONTACT DETAILS ARE PLACEHOLDERS.
 * The brief explicitly forbids inventing real contact details, so every field
 * below is flagged `isPlaceholder: true` and rendered with a "to be confirmed"
 * treatment. Replace the `value` (and set `isPlaceholder: false`) once the real
 * details are supplied — the WhatsApp button and tel:/mailto: links appear
 * automatically once a real value is present.
 */

export interface ContactField {
  label: string
  value: string
  /** `tel:` / `mailto:` / `https://wa.me/…` link. Empty when not yet known. */
  href: string
  isPlaceholder: boolean
}

export const site = {
  name: 'Alys Properties',
  shortName: 'Alys',
  legalName: 'Alys Properties',
  headline: 'Find Your Perfect Space',
  intro:
    'Discover exceptional spaces for business, celebrations, and recreation across three distinct destinations.',
  /** Shown wherever prototype/sample content is displayed. */
  sampleDataNotice:
    'Prototype inventory — availability and pricing are illustrative until confirmed by Alys Properties.',

  contact: {
    phone: {
      label: 'Phone',
      value: '+00 000 000 000',
      href: '',
      isPlaceholder: true,
    },
    email: {
      label: 'Email',
      value: 'hello@alysproperties.example',
      href: '',
      isPlaceholder: true,
    },
    address: {
      label: 'Address',
      value: 'Street address to be confirmed',
      href: '',
      isPlaceholder: true,
    },
    whatsapp: {
      label: 'WhatsApp',
      value: '',
      href: '',
      isPlaceholder: true,
    },
  } satisfies Record<string, ContactField>,

  /**
   * Social profiles are only rendered when a real URL is supplied. With none
   * configured the footer shows a muted note instead of dead links.
   */
  social: [] as { label: string; href: string }[],
  socialNote: 'Social channels to be confirmed.',

  hours: [
    { days: 'Monday – Friday', time: '09:00 – 18:00' },
    { days: 'Saturday', time: '10:00 – 16:00' },
    { days: 'Sunday', time: 'By appointment' },
  ],
} as const

export type Site = typeof site
