import { Booking } from './types';

function isValidTimezone(tz: unknown): tz is string {
  if (typeof tz !== 'string' || tz.trim() === '') {
    return false;
  }
  try {
    Intl.DateTimeFormat(undefined, { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

function isValidBooking(item: unknown): item is Booking {
  if (!item || typeof item !== 'object') {
    return false;
  }
  const candidate = item as Record<string, unknown>;

  if (typeof candidate.id !== 'string' || candidate.id.trim() === '') {
    return false;
  }
  if (typeof candidate.title !== 'string' || candidate.title.trim() === '') {
    return false;
  }
  if (
    typeof candidate.startsAt !== 'string' ||
    candidate.startsAt.trim() === '' ||
    isNaN(Date.parse(candidate.startsAt))
  ) {
    return false;
  }
  if (!isValidTimezone(candidate.timezone)) {
    return false;
  }

  return true;
}

export async function fetchBookings(
  fetchFn: typeof fetch = fetch
): Promise<Booking[]> {
  const base = process.env.EXPO_PUBLIC_API_URL?.trim();
  const url = base
    ? `${base.replace(/\/+$/, '')}/bookings`
    : '/bookings';

  const response = await fetchFn(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch bookings: HTTP ${response.status}`);
  }

  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error('Invalid response: expected an array of bookings');
  }

  return data.filter(isValidBooking);
}
