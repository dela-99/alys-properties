const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export function formatPrice(value: number): string {
  return currency.format(value)
}

/** "3,200 / month" style labels used across venue cards. */
export function formatPriceLabel(value: number, unit: string): string {
  return `${formatPrice(value)} / ${unit}`
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

const longDateFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const monthDayFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
})

export function parseDate(iso: string): Date {
  // `T00:00:00` keeps the date stable regardless of the viewer's timezone.
  return new Date(`${iso}T00:00:00`)
}

export function formatDate(iso: string): string {
  return dateFormatter.format(parseDate(iso))
}

export function formatLongDate(iso: string): string {
  return longDateFormatter.format(parseDate(iso))
}

export function formatMonthDay(iso: string): string {
  return monthDayFormatter.format(parseDate(iso))
}

export function isFutureDate(iso: string, now: Date = new Date()): boolean {
  return parseDate(iso).getTime() >= now.getTime()
}

/** "Sat, 14 Nov 2026" + "4:00 PM" -> "14 Nov 2026 · 4:00 PM" */
export function formatDateTime(iso: string, time?: string): string {
  const date = formatMonthDay(iso)
  return time ? `${date} · ${time}` : date
}
