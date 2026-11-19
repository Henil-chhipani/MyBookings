/**
 * Check-in availability logic.
 *
 * Returns true when `now` is 15 minutes or less before `startsAt` (or later),
 * and false before that.
 */
const FIFTEEN_MINUTES_MS = 15 * 60 * 1000;

export function canCheckIn(now: Date, startsAt: Date): boolean {
  const diffMs = startsAt.getTime() - now.getTime();
  return diffMs <= FIFTEEN_MINUTES_MS;
}
