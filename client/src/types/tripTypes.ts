import { Trip } from '@shared/index';

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