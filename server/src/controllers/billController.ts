import { Request, Response } from 'express';
import { Bill } from '@shared/index';
import { getAllTripBills } from '../models/billModel';
import { prepareParsedId } from '../utils/dataValidation';

export const getTripBills = async (req: Request, res: Response) => {
  try {
    const { id = '' } = req.params;
    const parsedId = prepareParsedId(id);

    if (!parsedId) {
      throw new Error('Trip ID is required');
    }

    const billList: Bill[] = await getAllTripBills(parsedId);
    res.json(billList);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
