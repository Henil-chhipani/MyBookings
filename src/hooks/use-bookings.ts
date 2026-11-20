import { useCallback, useEffect, useState } from 'react';
import { fetchBookings } from '@/api/bookings';
import { fakeFetch } from '@/api/fake-server';
import { Booking } from '@/api/types';

export function formatUpdatedTime(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(date);
}

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    const fetchFn = process.env.EXPO_PUBLIC_API_URL ? fetch : fakeFetch;

    fetchBookings(fetchFn)
      .then((data) => {
        if (isMounted) {
          setBookings(data);
          setLastUpdated(formatUpdatedTime(new Date()));
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Failed to load bookings:', err);
          setError('Could not load bookings');
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const loadData = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const fetchFn = process.env.EXPO_PUBLIC_API_URL ? fetch : fakeFetch;
      const data = await fetchBookings(fetchFn);
      setBookings(data);
      setLastUpdated(formatUpdatedTime(new Date()));
    } catch (err) {
      console.error('Failed to load bookings:', err);
      setError('Could not load bookings');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  const refresh = useCallback(() => {
    return loadData(true);
  }, [loadData]);

  const retry = useCallback(() => {
    return loadData(false);
  }, [loadData]);

  return {
    bookings,
    isLoading,
    isRefreshing,
    error,
    lastUpdated,
    refresh,
    retry,
  };
}
