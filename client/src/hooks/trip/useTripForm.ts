import { useState, useEffect, useCallback } from 'react';
import type { SaveTripInput, UseTripEditorOptions} from '../../types/tripTypes';

type FormShape = Omit<SaveTripInput, 'id'>;
type EditableKey = keyof FormShape;

export function useTripForm({ trip }: UseTripEditorOptions) {
  const [form, setForm] = useState<FormShape>({
    name: trip?.name ?? '',
    year: trip?.year ?? null,
    location: trip?.location ?? '',
  });

  // Keep form in sync if the provided trip changes
  useEffect(() => {
    setForm({
      name: trip?.name ?? '',
      year: trip?.year ?? null,
      location: trip?.location ?? '',
    });
  }, [trip?.id, trip?.name, trip?.year, trip?.location]);

  const setField = useCallback(<K extends EditableKey>(key: K, value: FormShape[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => {
    setForm({
      name: '',
      year: null,
      location: '',
    });
  }, []);

  return {
    form,
    setForm,
    setField,
    reset
  };
}