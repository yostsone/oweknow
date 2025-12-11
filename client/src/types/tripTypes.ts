import type { TripDB, BillDB, UserDB, UserBillDB } from '@shared/index';

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
  trip: TripDB | null;
};

export type SaveBillInput = {
  id?: number | null;
  payerId: number;
  tripId: number;
  title: string;
  total: number | null;
  users?: UserBillShare[];
  splits: BillSplit;
};

export type UserBillShare = {
  userId: number;
  amount: number;
}
export type UseBillEditorOptions = {
  bill: BillWithSplit| null;
  users: UserDB[] | []
}
export type SaveBillResponse = { id: number };

export type SplitMode = 'even' | 'custom';
export type BillSplit = { mode: SplitMode; splits: UserBillDB[] | [] };

export type BillWithSplit = BillDB & { splits: BillSplit };