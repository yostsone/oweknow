import { useSuspenseQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient, type DefaultError } from '@tanstack/react-query';
import {fetchAllTrips, saveTrip, deleteTrip } from '../services/tripService';
import { TRIPS_KEY } from '../constants';
import { useNotify } from '../services/notificationService';
import type { SaveTripInput } from '../types/tripTypes';


export function useTrip() {
  const queryClient = useQueryClient();
  const notify = useNotify();

  //get all trips
  const tripsQuery = useSuspenseQuery({
    queryKey: TRIPS_KEY,
    queryFn: ({ signal }) => fetchAllTrips(signal),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    retry: 2,
  });


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
    ...tripsQuery,
    remove: deleteTripMutation.mutate,
    save: saveMutation.mutate,
    isSaving: saveMutation.isPending,
    isRemoving: deleteTripMutation.isPending
  }
}
