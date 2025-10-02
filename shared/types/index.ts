export interface Trip {
  id: number;
  name: string;
  year: number;
  location?: string;
  image?: string;
}

export interface User {
  id: number;
  name: string;
  image?: string;
}

export interface Bill {
  id: number;
  total: number;
  image: string | null;
}