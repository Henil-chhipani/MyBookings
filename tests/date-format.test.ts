import { formatBookingDate, formatBookingTime } from '../src/lib/date-format';

describe('formatBookingTime & formatBookingDate', () => {
  it('formats Studio visit (2026-06-01T15:00:00.000Z in America/New_York) to 11:00 AM', () => {
    const startsAt = '2026-06-01T15:00:00.000Z';
    const timezone = 'America/New_York';
    expect(formatBookingTime(startsAt, timezone)).toBe('11:00 AM');
    expect(formatBookingDate(startsAt, timezone)).toBe('June 1, 2026');
  });

  it('formats Site walkthrough (2026-06-01T18:00:00.000Z in America/Los_Angeles) to 11:00 AM', () => {
    const startsAt = '2026-06-01T18:00:00.000Z';
    const timezone = 'America/Los_Angeles';
    expect(formatBookingTime(startsAt, timezone)).toBe('11:00 AM');
    expect(formatBookingDate(startsAt, timezone)).toBe('June 1, 2026');
  });

  it('formats Plan review (2026-06-01T14:00:00.000Z in Europe/London) to 3:00 PM', () => {
    const startsAt = '2026-06-01T14:00:00.000Z';
    const timezone = 'Europe/London';
    expect(formatBookingTime(startsAt, timezone)).toBe('3:00 PM');
    expect(formatBookingDate(startsAt, timezone)).toBe('June 1, 2026');
  });
});
