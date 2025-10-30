import { Trip } from '@shared/index';
import { parseJson } from '../utils/serviceUtils';
import { API_BASE } from '../constants';
import { SaveTripInput, SaveTripResponse } from '../types/tripTypes';

export const fetchTripById = async (tripId: string) => {
  const res = await fetch(`${API_BASE}/trip/${tripId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function fetchAllTrips(signal?: AbortSignal): Promise<Trip[]> {
  const res = await fetch(`${API_BASE}/trips`, {
    signal,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function createTrip(input:Omit<SaveTripInput, 'id'>): Promise<number> {
  const res = await fetch(`${API_BASE}/trip/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
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
  const data = await parseJson<SaveTripResponse>(res);
  return data.id;
}

export async function saveTrip(input: SaveTripInput): Promise<number> {
  const { id, ...rest } = input;
  return id ? updateTrip(input) : createTrip(rest);
}

export async function deleteTrip(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/trip/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to delete trip');
  }
}
