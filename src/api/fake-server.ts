export const FAKE_BOOKINGS_FIXTURE = [
  {
    id: 'studio',
    title: 'Studio visit',
    startsAt: '2026-06-01T15:00:00.000Z',
    timezone: 'America/New_York',
  },
  {
    id: 'site',
    title: 'Site walkthrough',
    startsAt: '2026-06-01T18:00:00.000Z',
    timezone: 'America/Los_Angeles',
  },
  {
    id: 'broken',
    title: 'Broken row',
  },
  {
    id: 'review',
    title: 'Plan review',
    startsAt: '2026-06-01T14:00:00.000Z',
    timezone: 'Europe/London',
  },
];

export async function fakeFetch(
  _input: RequestInfo | URL,
  _init?: RequestInit
): Promise<Response> {
  const mode = process.env.EXPO_PUBLIC_BOOKINGS;

  if (mode === 'empty') {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (mode === 'error') {
    return new Response(JSON.stringify({ error: 'unavailable' }), {
      status: 500,
      statusText: 'Internal Server Error',
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(FAKE_BOOKINGS_FIXTURE), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
