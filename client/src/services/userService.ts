import type { SaveUserInput, SaveUserResponse } from '../types/userTypes';
import type { User } from '@shared/index';
import { parseJson } from '../utils/serviceUtils';
import { API_BASE } from '../constants';

export async function fetchAllTripUsers(tripId: number, signal: AbortSignal): Promise<User[]> {
  const res = await fetch(`${API_BASE}/trip/${tripId}/users`, {
    signal,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    const errorResult = await res.json().catch(() => '');
    throw new Error(errorResult.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function createUser(input: Omit<SaveUserInput, 'userId'>): Promise<number> {
  const res = await fetch(`${API_BASE}/user/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const data = await parseJson<SaveUserResponse>(res);
  return data.id;
}

export async function updateUser(userId: number, input: Omit<SaveUserInput, 'userId'>): Promise<number> {
  const res = await fetch(`${API_BASE}/user/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const data = await parseJson<SaveUserResponse>(res);

  return data.id;
}

export async function saveUser(input: SaveUserInput): Promise<number> {
  const { userId, ...rest } = input;
  return userId ? updateUser(userId, rest) : createUser(rest);
}

export async function deleteUser(userId: number): Promise<void> {
  const res = await fetch(`${API_BASE}/user/${userId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    const errorResult = await res.json().catch(() => '');
    throw new Error(errorResult.error || 'Failed to delete user');
  }
}