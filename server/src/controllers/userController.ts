// add proper typing here
// check await un res?
import { Request, Response } from 'express';
import { User } from '@shared/index';
import {getAllTripUsers, addUser, updateUser, deleteUser} from '../models/userModel';
import { addUserToTrip, removeUserFromTrip } from '../models/userTripModel';

export const getTripUsers = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!id) {
      res.status(400).json({ error: 'Trip ID is required' });
      return;
    }
    const userList: User[] = await getAllTripUsers(id);
    res.json(userList);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, assigned, tripId } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'User name is required' });
  }

  try {
    const userId = await addUser({ name });
    res.status(201).json({ id: userId, name });

    if (assigned) {
      await addUserToTrip(userId, tripId);
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to insert user.' });
  }
}

export const editUser = async (req: Request, res: Response) => {
  const { tripId, name, assigned } = req.body;
  const idParam = req.params.id ?? '';

  if (!/^\d+$/.test(idParam)) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  const userId = parseInt(idParam, 10);

  if (!userId || !name) {
    return res.status(400).json({ error: 'User ID and name are required' });
  }

  try {
    await updateUser({ id: userId, name });
    res.status(201).json({ id: userId });

    if (!assigned) {
      await removeUserFromTrip(userId, tripId);
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user.' });
  }
}

export const removeUser = async (req: Request, res: Response) => {
  const idParam = req.params.id ?? '';

  if (!/^\d+$/.test(idParam)) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  const id = parseInt(idParam, 10);

  try {
    await deleteUser(id);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user.' });
  }
}