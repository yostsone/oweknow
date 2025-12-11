import { Request, Response } from 'express';
import type { BillDB, UserBillDB } from '@shared/index';
import { deleteBill, getAllTripBills, addBill, updateBill, getTripBillsWithSplits } from '../models/billModel';
import { prepareParsedId } from '../utils/dataValidation';
type BillWithSplits = BillDB & { splits: UserBillDB[] };
export const getTripBills = async (req: Request, res: Response) => {
  try {
    const { id = '' } = req.params;
    const parsedId = prepareParsedId(id);
    if (!parsedId) {
      throw new Error('Trip ID is required');
    }

    const billList: BillWithSplits[] =  await getTripBillsWithSplits(parsedId);
    res.json(billList);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const createBill = async (req: Request, res: Response) => {
  try {
    if (!req.body) throw new Error('Internal Error');
    const { title, total, tripId, payerId, image = null } = req.body;

    if (!title || !total || !tripId || !payerId) {
      throw new Error('Required info is missing!');
    }

    const billId = await addBill({ title, total, tripId, payerId, image });
    res.status(201).json({ id: billId });

  } catch (err) {
    res.status(500).json({ error: 'Failed to insert bill.' });
  }
}

export const editBill = async (req: Request, res: Response) => {
  try {
    if (!req.body) throw new Error('Internal Error');
    const { id, title, total, tripId, payerId, image = null } = req.body;

    if (!id || !title || !total || !tripId || !payerId) {
      throw new Error('Required info is missing!');
    }

    const billId = await updateBill({ id, title, total, tripId, payerId, image });
    res.status(201).json({ id: billId });

  } catch (err) {
    res.status(500).json({ error: 'Failed to update bill.' });
  }
}

export const removeBill = async (req: Request, res: Response) => {
  try {
    const { id = '' } = req.params
    const parsedId = prepareParsedId(id);

    if (!parsedId) {
      throw new Error('Bill ID is required');
    }
    await deleteBill(parsedId);
    res.status(201).json({ parsedId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete bill.' });
  }
}
