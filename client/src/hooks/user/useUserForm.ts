import { useState, useEffect } from 'react';
import type { SaveUserInput, UseUserFormOptions } from '../../types/userTypes';
// this state is necessary to allow separate tripId from the rest of the user fields
type UserFormState = Omit<SaveUserInput, 'tripId'>;

export function useUserForm({ tripId, user }: UseUserFormOptions) {

  const [form, setForm] = useState<UserFormState>({
    name: user?.name ?? "",
    assigned: user?.assigned ?? true,
    id: user?.id ?? null,
  })

  // Reset the form when tripId or selected user identity changes.
  useEffect(() => {
    setForm(form);
  }, [form, tripId]);


  const setField = (key:string, value:string|boolean) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  return {
    form,
    setField
  };
}