export type ClassValue = string | number | false | null | undefined

/**
 * Minimal class-name joiner. Deliberately dependency-free — the project has no
 * `clsx` / `tailwind-merge` dependency and does not need conditional class
 * resolution beyond simple concatenation.
 */
export function cn(...values: ClassValue[]): string {
  let out = ''

  for (const value of values) {
    if (!value && value !== 0) continue
    out = out ? `${out} ${value}` : String(value)
  }

  return out
}
