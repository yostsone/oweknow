import { Request, Response } from 'express';
import { Trip } from '@shared/index';
import { getAllTrips, getTripById } from '../models/tripModel';

export const getTrips = async (req: Request, res: Response) => {
  try {
    const trips: Trip[] = await getAllTrips();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getTrip = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id) {
      res.status(400).json({ error: 'Trip ID is required' });
      return;
    }
    const trip: Trip = await getTripById(id);
    res.json(trip);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};