import type { UserDB } from '@shared/index';

export type User = UserDB;

export type SaveUserInput = Omit<UserDB, 'id'> & {
  id?: number | null;
  tripId: number;
};

export type SaveUserResponse = { id: number };

export type UseUserFormOptions = {
  tripId: number;
  user: UserDB | null;
};