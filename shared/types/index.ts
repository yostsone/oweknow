export type TripDB = {
  id: number;
  name: string;
  year: number | null;
  location?: string;
  image?: string;
}

export type UserDB = {
  id: number;
  name: string;
  assigned?: boolean;
  image?: string;
}

export type BillDB = {
  id: number;
  total: number;
  title: string;
  image: string | null;
  payerId: number;
  tripId: number;
}

export type UserBillDB = {
  id: number;
  billId: number;
  userId: number;
  amount: number;
}