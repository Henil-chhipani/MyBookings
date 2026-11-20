import { useCallback, useEffect, useState } from 'react';
import { fetchBookings } from '@/api/bookings';
import { fakeFetch } from '@/api/fake-server';
import { Booking } from '@/api/types';

export function useBooking(id?: string) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const fetchFn = process.env.EXPO_PUBLIC_API_URL ? fetch : fakeFetch;
      const bookings = await fetchBookings(fetchFn);
      const found = bookings.find((b) => b.id === id);
      if (found) {
        setBooking(found);
      } else {
        setError('Booking not found');
      }
    } catch {
      setError('Could not load booking');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    let isMounted = true;
    if (!id) return;

    const fetchFn = process.env.EXPO_PUBLIC_API_URL ? fetch : fakeFetch;
    fetchBookings(fetchFn)
      .then((bookings) => {
        if (isMounted) {
          const found = bookings.find((b) => b.id === id);
          if (found) {
            setBooking(found);
          } else {
            setError('Booking not found');
          }
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Could not load booking');
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { booking, isLoading, error, reload: load };
}
