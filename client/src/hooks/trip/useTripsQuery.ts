import { useSuspenseQuery } from '@tanstack/react-query';
import type { Trip } from '@shared/index';
import { fetchAllTrips } from '../../services/tripService';
import { TRIPS_KEY } from '../../constants'

export function useTripsQuery() {
  const tripsQuery = useSuspenseQuery({
    queryKey: TRIPS_KEY,
    queryFn: ({ signal }) => fetchAllTrips(signal),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    retry: 2,
  });

  return tripsQuery as {
    data: Trip[];
  };
}