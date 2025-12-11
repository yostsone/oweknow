import type { TripDB } from '@shared/index';
import { parseJson } from '../utils/serviceUtils';
import { API_BASE } from '../constants';
import { SaveTripInput, SaveTripResponse } from '../types/tripTypes';

export const fetchTripById = async (tripId: string, signal: AbortSignal) => {
  const res = await fetch(`${API_BASE}/trip/${tripId}`, {
    method: 'GET',
    signal,
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    const errorResult = await res.json().catch(() => '');
    throw new Error(errorResult.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function fetchAllTrips(signal: AbortSignal): Promise<TripDB[]> {
  const res = await fetch(`${API_BASE}/trips`, {  method: 'GET', signal });

  if (!res.ok) {
    const errorResult = await res.json().catch(() => '');
    throw new Error(errorResult.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function createTrip(input:Omit<SaveTripInput, 'id'>): Promise<number> {
  const res = await fetch(`${API_BASE}/trip/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const errorResult = await res.json().catch(() => '');
    throw new Error(errorResult.error || `HTTP ${res.status}`);
  }

  const data = await parseJson<SaveTripResponse>(res);
  return data.id;
}

export async function updateTrip(input: SaveTripInput): Promise<number> {
  const { id } = input;
  const res = await fetch(`${API_BASE}/trip/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const errorResult = await res.json().catch(() => '');
    throw new Error(errorResult.error || `HTTP ${res.status}`);
  }

  const data = await parseJson<SaveTripResponse>(res);
  return data.id;
}

export async function saveTrip(input: SaveTripInput): Promise<number> {
  const { id = null, ...rest } = input;

  return id ? updateTrip(input) : createTrip(rest);
}

export async function deleteTrip(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/trip/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    const errorResult = await res.json().catch(() => '');
    throw new Error(errorResult.error || `HTTP ${res.status}`);
  }
}
