import { useState, useEffect, useCallback } from 'react';
import type { SaveBillInput, UseBillEditorOptions } from '../../types/tripTypes';

type FormShape = Omit<SaveBillInput, 'id'>;
type EditableKey = keyof FormShape;

export function useBillForm({ bill, users }: UseBillEditorOptions) {
  const [form, setForm] = useState<FormShape>({
    title: bill?.title ?? '',
    total: bill?.total ?? null,
    payerId: bill?.payerId ?? 0,
    tripId: bill?.tripId ?? 0,
    // users: users?.length ? users.map(u => ({ userId: u.id, amount: 0 })) : [],
  });

  // Keep form in sync if the provided trip changes
  useEffect(() => {
    setForm({
      title: bill?.title ?? '',
      total: bill?.total ?? null,
      payerId: bill?.payerId ?? 0,
      tripId: bill?.tripId ?? 0,
    });
  }, [bill?.payerId, bill?.title, bill?.total, bill?.tripId]);

  const setField = useCallback(<K extends EditableKey>(key: K, value: FormShape[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  }, []);

  return {
    form,
    setForm,
    setField
  };
}