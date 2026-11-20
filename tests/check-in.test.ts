import { canCheckIn } from '../src/lib/check-in';
// check in test
describe('canCheckIn', () => {
  const startsAt = new Date('2026-06-01T15:00:00.000Z');

  it('returns false 16 minutes before startsAt (2026-06-01T14:44:00.000Z)', () => {
    const now = new Date('2026-06-01T14:44:00.000Z');
    expect(canCheckIn(now, startsAt)).toBe(false);
  });

  it('returns true 15 minutes before startsAt (2026-06-01T14:45:00.000Z)', () => {
    const now = new Date('2026-06-01T14:45:00.000Z');
    expect(canCheckIn(now, startsAt)).toBe(true);
  });

  it('returns true at startsAt (2026-06-01T15:00:00.000Z)', () => {
    const now = new Date('2026-06-01T15:00:00.000Z');
    expect(canCheckIn(now, startsAt)).toBe(true);
  });

  it('returns true after startsAt (e.g. 5 minutes into the booking)', () => {
    const now = new Date('2026-06-01T15:05:00.000Z');
    expect(canCheckIn(now, startsAt)).toBe(true);
  });
});
