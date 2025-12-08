export interface Trip {
  id: number;
  name: string;
  year: number | null;
  location?: string;
  image?: string;
}

export interface User {
  id: number;
  name: string;
  assigned?: boolean;
  image?: string;
}

export interface Bill {
  id: number;
  total: number;
  title: string;
  image: string | null;
  payerId: number;
  tripId: number;
}