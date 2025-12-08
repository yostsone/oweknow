import { Trip, Bill, User } from '@shared/index';

export type SaveTripInput = {
  id?: number | null;
  name: string;
  year: number | null;
  location: string;
  image?: string;
};
// export type SaveTripInput = Omit<Trip, 'id' | 'image'>;
export type SaveTripResponse = { id: number };

export type UseTripEditorOptions = {
  trip: Trip | null;
};

export type SaveBillInput = {
  id?: number | null;
  payerId: number;
  tripId: number;
  title: string;
  total: number | null;
  users?: UserBillShare[];
};

export type UserBillShare = {
  userId: number;
  amount: number;
}
export type UseBillEditorOptions = {
  bill: Bill | null;
  users: User[] | []
}
export type SaveBillResponse = { id: number };