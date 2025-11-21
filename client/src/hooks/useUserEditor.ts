import { useState, useEffect, useCallback } from 'react';
import type { SaveUserInput, UseUserEditorOptions } from '../types/userTypes';
// this state is necessary to allow separate tripId from the rest of the user fields
type UserFormState = Omit<SaveUserInput, 'tripId'>;

export function useUserEditor({ tripId, user }: UseUserEditorOptions) {

  const [form, setForm] = useState<UserFormState>(
    () => ({
      name: user?.name ?? "",
      assigned: user?.assigned ?? true,
      userId: user?.id ?? null,
    })
  );

  // Reset the form when tripId or selected user identity changes.
  useEffect(() => {
    setForm(form);
  }, [form.userId, tripId]);

  // Typed field setter; don’t couple to DOM events.
  type EditableKey = 'name' | 'assigned';
  const setField = useCallback(
      <K extends EditableKey>(key: K, value: UserFormState[K]) => {
        setForm(prev => ({ ...prev, [key]: value }));
      },
      []
  );

  return {
    form,
    setField
  };
}