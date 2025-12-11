import { useMemo } from 'react';
import type { DefaultError, QueryKey } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { SaveUserInput } from '../../types/userTypes';
import { deleteUser, saveUser } from '../../services/userService';
import { useNotify } from '../../services/notificationService';

export function useUsersMutation(tripId: number) {
  const queryClient = useQueryClient();
  const notify = useNotify();
  const usersKey: QueryKey = useMemo(() => ['users', tripId], [tripId]);

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

  return {
    save,
    remove,
    isSaving: saveMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}