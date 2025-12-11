import { Request, Response } from 'express';
import type { UserDB } from '@shared/index';
import { getAllTripUsers, addUser, updateUser, deleteUser } from '../models/userModel';
import { addUserToTrip, removeUserFromTrip } from '../models/userTripModel';
import { prepareParsedId } from '../utils/dataValidation';

export const getTripUsers = async (req: Request, res: Response) => {
  try {
    const { id  = '' } = req.params

    const parsedId = prepareParsedId(id);

    if (!parsedId) {
      throw new Error('Trip ID is required');
    }

    const userList: UserDB[] = await getAllTripUsers(parsedId);
    res.json(userList);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    if (!req.body) throw new Error('Internal Error');
    const { name, assigned, tripId } = req.body;

    if (!name) {
      throw new Error('User name is required');
    }

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
  try {
    const { id = '' } = req.params
    const parsedId = prepareParsedId(id);

    if (!req.body) throw new Error('Internal Error');
    const { tripId, name, assigned } = req.body;

    if (!parsedId || !name) {
      throw new Error('Required data is missing');
    }

    await updateUser({ id: parsedId, name });
    res.status(201).json({ id: parsedId });

    if (!assigned) {
      await removeUserFromTrip(parsedId, tripId);
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user.' });
  }
}

export const removeUser = async (req: Request, res: Response) => {
  const { id = '' } = req.params
  const parsedId = prepareParsedId(id);

  if (!parsedId) {
    throw new Error('User ID is required');
  }

  try {
    await deleteUser(parsedId);
    res.status(201).json({ parsedId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user.' });
  }
}