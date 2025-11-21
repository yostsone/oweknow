// for future, to add ids to these keys are there are multiple trips and bills
export const TRIPS_KEY = ['trips'] as const;
export const BILLS_KEY = ['bills'] as const;
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:5000/api';