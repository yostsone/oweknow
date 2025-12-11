import { API_BASE } from '../constants';
import type { SaveBillInput, SaveBillResponse, BillWithSplit } from '../types/tripTypes';
import { parseJson } from '../utils/serviceUtils';

export async function fetchAllTripBills(tripId: number, signal: AbortSignal): Promise<BillWithSplit[]> {
  const res = await fetch(`${API_BASE}/trip/${tripId}/bills`, { method: 'GET', signal });

  if (!res.ok) {
    const errorResult = await res.json();
    throw new Error(errorResult.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function createBill(input:Omit<SaveBillInput, 'id'>): Promise<number> {
  const res = await fetch(`${API_BASE}/bill/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const errorResult = await res.json().catch(() => '');
    throw new Error(errorResult.error || `HTTP ${res.status}`);
  }

  const data = await parseJson<SaveBillResponse>(res);
  return data.id;
}

export async function updateBill(input: SaveBillInput): Promise<number> {
  const { id } = input;

  const res = await fetch(`${API_BASE}/bill/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const errorResult = await res.json().catch(() => '');
    throw new Error(errorResult.error || `HTTP ${res.status}`);
  }

  const data = await parseJson<SaveBillResponse>(res);
  return data.id;
}

export async function saveBill(input: SaveBillInput): Promise<number> {
  const { id = null, ...rest } = input;

  return id ? updateBill(input) : createBill(rest);
}

export async function deleteBill(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/bill/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!res.ok) {
    const errorResult = await res.json().catch(() => '');
    throw new Error(errorResult.error || `HTTP ${res.status}`);
  }
}