import { Request, Response } from 'express';
import { User } from '@shared/index';
import { getAllTripUsers } from '../models/userModel';

export const getTripUsers = async (req: Request, res: Response) => {
  try {
    const { tripId } = req.params
    if (!tripId) {
      res.status(400).json({ error: 'Trip IDddd is required' });
      return;
    }
    const userList: User[] = await getAllTripUsers(tripId);
    res.json(userList);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};