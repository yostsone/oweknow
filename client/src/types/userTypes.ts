import type { User } from '@shared/index';

export type SaveUserInput = {
  tripId: string;
  name: string;
  assigned: boolean;
  userId?: number | null;
};

export type SaveUserResponse = { id: number };

export type UseUserEditorOptions = {
  tripId: string;
  user: User | null;
};