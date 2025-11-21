import { useMutation, useQueryClient, type DefaultError } from '@tanstack/react-query';
import { saveTrip, deleteTrip } from '../../services/tripService';
import { TRIPS_KEY } from '../../constants';
import { useNotify } from '../../services/notificationService';
import type { SaveTripInput } from '../../types/tripTypes';


export function useTripMutation() {
  const queryClient = useQueryClient();
  const notify = useNotify();

  const saveMutation = useMutation<number, DefaultError, SaveTripInput>({
    mutationFn: saveTrip,
    onSuccess: (_id, variables) => {
      queryClient.invalidateQueries({ queryKey: TRIPS_KEY });
      notify.success('Trip saved successfully');
    },
    onError: (err) => {
      const msg = (err as any)?.message || 'Error saving trip';
      notify.error(msg);
    },
  });

  // delete trip
  const deleteTripMutation = useMutation<void, DefaultError, number>({
    mutationFn: deleteTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRIPS_KEY });
      notify.success('Trip deleted successfully');
    },
    onError: (_err, _id, context: any) => {
      const msg = (_err as any)?.message || 'Error deleting trip';
      notify.error(msg);
    }
  });

  return {
    remove: deleteTripMutation.mutate,
    save: saveMutation.mutate,
    isSaving: saveMutation.isPending,
    isRemoving: deleteTripMutation.isPending
  }
}
