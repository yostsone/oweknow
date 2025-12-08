import { useMutation, useQueryClient, type DefaultError } from '@tanstack/react-query';
import { saveBill, deleteBill } from '../../services/billService';
import { useNotify } from '../../services/notificationService';
import type { SaveBillInput } from '../../types/tripTypes';
import { BILLS_KEY } from '../../constants';

export function useBillMutation() {
  const queryClient = useQueryClient();
  const notify = useNotify();

  const saveMutation = useMutation<number, DefaultError, SaveBillInput>({
    mutationFn: saveBill,
    onSuccess: (_id, variables) => {
      queryClient.invalidateQueries({ queryKey: BILLS_KEY });
      notify.success('Bill saved successfully');
    },
    onError: (err) => {
      const msg = (err as any)?.message || 'Error saving bill';
      notify.error(msg);
    },
  });

  const deleteBillMutation = useMutation<void, DefaultError, number>({
    mutationFn: deleteBill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BILLS_KEY });
      notify.success('Bill deleted successfully');
    },
    onError: (_err, _id, context: any) => {
      const msg = (_err as any)?.message || 'Error deleting bill';
      notify.error(msg);
    }
  });

  return {
    save: saveMutation.mutate,
    isSaving: saveMutation.isPending,
    deleteBill: deleteBillMutation.mutate,
  }
}
