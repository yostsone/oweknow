import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import type { TripDB } from '@shared/index';
import { fetchTripById } from '../../services/tripService';

/**
 * Prefers a typed id (number). Validate/coerce upstream.
 * Throws if id is null/undefined to keep the hook simple when using suspense.
 */
export function useTripQuery() {
  const { id = '' } = useParams();

  if (id === '') {
    throw new Error('trip id is required for useTripQuery');
  }

  const query = useSuspenseQuery({
    queryKey: [`trip_${id}`],
    queryFn: ({ signal }) => fetchTripById(id, signal),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    retry: 2,
  });

  return query as {
    data: TripDB;
  };
}