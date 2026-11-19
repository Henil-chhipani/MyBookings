/**
 * Date and time formatting helpers respecting IANA timezones.
 */

export function formatBookingTime(
  startsAt: string | Date,
  timezone: string
): string {
  const date = typeof startsAt === 'string' ? new Date(startsAt) : startsAt;
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

export function formatBookingDate(
  startsAt: string | Date,
  timezone: string
): string {
  const date = typeof startsAt === 'string' ? new Date(startsAt) : startsAt;
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}
