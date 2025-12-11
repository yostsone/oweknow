import { Request, Response } from 'express';
import type { TripDB } from '@shared/index';
import { addTrip, deleteTrip, getAllTrips, getTripById, updateTrip } from '../models/tripModel';
import { prepareParsedId } from '../utils/dataValidation';

export const getTrips = async (req: Request, res: Response) => {
  try {
    const trips: TripDB[] = await getAllTrips();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getTrip = async (req: Request, res: Response) => {
  try {
    const { id = ''} = req.params
    const parsedId = prepareParsedId(id);

    if (!parsedId) {
      throw new Error('Trip ID is required');
    }
    const trip: TripDB = await getTripById(parsedId);
    res.json(trip);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const editTrip = async (req: Request, res: Response) => {
  try {
    if (!req.body) throw new Error('Internal Error');
    const { id, name, year, location = null, image = null } = req.body;

    if (!id || !name || !year) {
      throw new Error('Required info is missing!');
    }

    await updateTrip({ id, name, year, location, image });
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update trip.' });
  }
}

export const removeTrip = async (req: Request, res: Response) => {
  try {
    const { id = '' } = req.params
    const parsedId = prepareParsedId(id);

    if (!parsedId) {
      throw new Error('Trip ID is required');
    }
    await deleteTrip(parsedId);
    res.status(201).json({ parsedId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete trip.' });
  }
}

export const createTrip = async (req: Request, res: Response) => {
  try {
    if (!req.body) throw new Error('Internal Error');
    const { name, year, location = null, image = null } = req.body;

    if (!name || !year) {
      throw new Error('Required info is missing!');
    }

    const tripId = await addTrip({ name, year, location, image });
    res.status(201).json({ id: tripId });

  } catch (err) {
    res.status(500).json({ error: 'Failed to insert trip.' });
  }
}