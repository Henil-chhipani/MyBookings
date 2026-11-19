import { fetchBookings } from '../src/api/bookings';
import { fakeFetch, FAKE_BOOKINGS_FIXTURE } from '../src/api/fake-server';

describe('fetchBookings API client', () => {
  it('filters out invalid rows and returns valid bookings when given the 4-row body', async () => {
    const fixture = [
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
      { id: 'broken', title: 'Broken row' },
      {
        id: 'review',
        title: 'Plan review',
        startsAt: '2026-06-01T14:00:00.000Z',
        timezone: 'Europe/London',
      },
    ];

    const stubFetch: typeof fetch = async () =>
      new Response(JSON.stringify(fixture), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });

    const result = await fetchBookings(stubFetch);

    // Assert it returns three bookings and none has id broken
    expect(result).toHaveLength(3);
    expect(result.some((b) => b.id === 'broken')).toBe(false);
    expect(result.map((b) => b.id)).toEqual(['studio', 'site', 'review']);
    expect(result[0]).toEqual({
      id: 'studio',
      title: 'Studio visit',
      startsAt: '2026-06-01T15:00:00.000Z',
      timezone: 'America/New_York',
    });
  });

  it('throws (rejects) when receiving an HTTP 500 answer', async () => {
    const stubFetch500: typeof fetch = async () =>
      new Response(JSON.stringify({ error: 'unavailable' }), {
        status: 500,
        statusText: 'Internal Server Error',
        headers: { 'Content-Type': 'application/json' },
      });

    await expect(fetchBookings(stubFetch500)).rejects.toThrow();
  });

  describe('fakeFetch integration with EXPO_PUBLIC_BOOKINGS', () => {
    const originalEnv = process.env.EXPO_PUBLIC_BOOKINGS;

    it('returns empty array when EXPO_PUBLIC_BOOKINGS=empty', async () => {
      process.env.EXPO_PUBLIC_BOOKINGS = 'empty';
      const response = await fakeFetch('/bookings');
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toEqual([]);
      process.env.EXPO_PUBLIC_BOOKINGS = originalEnv;
    });

    it('returns HTTP 500 when EXPO_PUBLIC_BOOKINGS=error', async () => {
      process.env.EXPO_PUBLIC_BOOKINGS = 'error';
      const response = await fakeFetch('/bookings');
      expect(response.status).toBe(500);
      const data = await response.json();
      expect(data).toEqual({ error: 'unavailable' });
      process.env.EXPO_PUBLIC_BOOKINGS = originalEnv;
    });

    it('returns full fixture when unset', async () => {
      delete process.env.EXPO_PUBLIC_BOOKINGS;
      const response = await fakeFetch('/bookings');
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toEqual(FAKE_BOOKINGS_FIXTURE);
      process.env.EXPO_PUBLIC_BOOKINGS = originalEnv;
    });
  });
});
