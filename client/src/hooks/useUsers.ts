import { useMemo } from 'react';
import type { DefaultError, QueryKey } from '@tanstack/react-query';
import { useMutation, useQueryClient, useSuspenseQuery} from '@tanstack/react-query';
import type { SaveUserInput } from '../types/userTypes';
import { deleteUser, saveUser } from '../services/userService';
import { useNotify } from '../services/notificationService';
import { fetchAllTripUsers } from '../services/userService';
import type { UserDB } from '@shared/index';

export function useUsers(tripId: number) {
  const queryClient = useQueryClient();
  const notify = useNotify();
  const usersKey: QueryKey = useMemo(() => ['users', tripId], [tripId]);
  //get all trips
  const tripUsersQuery = useSuspenseQuery({
    queryKey: usersKey,
    queryFn: ({ signal }) => fetchAllTripUsers(tripId, signal),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    retry: 2,
  });

  const saveMutation = useMutation<number, DefaultError, SaveUserInput>({
    mutationFn: saveUser,
    onSuccess: (_id, variables) => {
      queryClient.invalidateQueries({ queryKey: usersKey });
      notify.success('User saved successfully' );
    },
    onError: (err) => {
      const msg = (err as any)?.message || 'Error saving user';
      notify.error(msg);
    }
  });

  const deleteMutation = useMutation<void, DefaultError,number>({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKey });
      notify.success('User deleted successfully');
    },
    onError: (err) => {
      const msg = (err as any)?.message || 'Error deleting user';
      notify.error(msg);
    },
  });

  const save = (input: SaveUserInput) => saveMutation.mutate(input);
  const remove = (id: number) => deleteMutation.mutate(id);

  const data: UserDB[] = tripUsersQuery.data as UserDB[];

  return {
    data,
    save,
    remove,
    isSaving: saveMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}