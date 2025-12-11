import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchAllTripBills } from '../../services/billService';
import { BILLS_KEY } from '../../constants';
import type { BillWithSplit } from '../../types/tripTypes';

export function useBills(tripId: number) {
  //get all bills for trip
  const billsQuery = useSuspenseQuery({
    queryKey: BILLS_KEY,
    queryFn: ({ signal }) => fetchAllTripBills(tripId, signal),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    retry: 2,
  });

  return billsQuery as {
    data: BillWithSplit[];
  };
}
