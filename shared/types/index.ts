export interface Trip {
  id: number;
  name: string;
  year: number;
  location: string | null;
  image: string | null;
}

export interface User {
  id: number;
  name: string;
  image: string | null;
}

export interface Bill {
  id: number;
  total: number;
  image: string | null;
}