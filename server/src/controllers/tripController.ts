import { Request, Response } from 'express';
import { Trip } from '@shared/index';
import { addTrip, deleteTrip, getAllTrips, getTripById, updateTrip } from '../models/tripModel';

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

export const editTrip = async (req: Request, res: Response) => {
  const { id, name, year, location = null, image = null } = req.body;

  try {
    await updateTrip({ id, name, year, location, image });
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update trip.' });
  }
}

export const removeTrip = async (req: Request, res: Response) => {
  const idParam = req.params.id ?? '';

  if (!/^\d+$/.test(idParam)) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  const id = parseInt(idParam, 10);

  try {
    await deleteTrip(id);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete trip.' });
  }
}

export const createTrip = async (req: Request, res: Response) => {
  const { name, year, location = null, image = null } = req.body;

  if (!name || !year) {
    return res.status(400).json({ error: 'Required info is missing!' });
  }

  try {
    const tripId = await addTrip({ name, year, location, image });
    res.status(201).json({ id: tripId });

  } catch (err) {
    res.status(500).json({ error: 'Failed to insert user.' });
  }
}