import type { User } from '@shared/index';

export type SaveUserInput = {
  tripId: number;
  name: string;
  assigned: boolean;
  userId?: number | null;
};

export type SaveUserResponse = { id: number };

export type UseUserEditorOptions = {
  tripId: number;
  user: User | null;
};