import { useMemo } from 'react';
import type { QueryKey } from '@tanstack/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchAllTripUsers } from '../../services/userService';
import type { User } from '@app-types/userTypes';

export function useUsers(tripId: number) {
  const usersKey: QueryKey = useMemo(() => ['users', tripId], [tripId]);
  //get all trips
  const tripUsersQuery = useSuspenseQuery({
    queryKey: usersKey,
    queryFn: ({ signal }) => fetchAllTripUsers(tripId, signal),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    retry: 2,
  });

  const data: User[] = tripUsersQuery.data as User[];

  return {
    data
  };
}