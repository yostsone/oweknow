import db from '../db/sqlite';
import type { BillDB, TripDB, UserBillDB } from '@shared/index';
import { getUserBillsByIds } from './userBillModel';
import { isValidId } from '../utils/dataValidation';

export const getAllTripBills = (tripId: number): Promise<BillDB[]> => {
  if (!isValidId(tripId)) {
    return Promise.reject(new Error('Invalid ID'));
  }

  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM bill WHERE tripId= ?', [tripId], (err, rows: BillDB[]) => {
      if (err) return reject(err);
      resolve(rows.map(row => row as BillDB));
    });
  });
};

export const addBill = (bill:Omit<BillDB, 'id'> ): Promise<number> => {
  return new Promise((resolve, reject) => {
    const { title, payerId, total, tripId, image } = bill;
    db.run(
        'INSERT INTO bill (title, total, image, payerId, tripId) VALUES (?, ?, ?, ?, ?)',
        [title, total, image || null, payerId, tripId],
        function (err) {
          if (err) {
            return reject(err);
          }

          resolve(this.lastID); // 'this' refers to the statement context
        });
  });
};

export const updateBill = (bill:BillDB): Promise<number> => {
  const { id, title, payerId, total, tripId, image } = bill;

  if (!isValidId(id)) {
    return Promise.reject(new Error('Invalid ID'));
  }

  return new Promise((resolve, reject) => {
    db.run(
        'UPDATE bill SET title = ?, total = ?, payerId = ?,  tripId = ?, image = ? where id = ?',
        [title, total, payerId, tripId, image, id],
        function (err) {
          if (err) {
            return reject(err);
          }

          resolve(this.changes); // 'this' refers to the statement context
        });
  });
};

export const deleteBill = (billId: number): Promise<number> => {
  if (!isValidId(billId)) {
    return Promise.reject(new Error('Invalid ID'));
  }

  return new Promise((resolve, reject) => {
    db.run(
        'delete from bill where id = ?',
        [billId],
        function (err) {
          if (err) {
            return reject(err);
          }

          resolve(this.changes); // 'this' refers to the statement context
        });
  });
}

type BillWithSplits = BillDB & { splits: UserBillDB[] };
export const getTripBillsWithSplits = async (tripId: number): Promise<BillWithSplits[] | []> => {
  if (!isValidId(tripId)) {
    return Promise.reject(new Error('Invalid ID'));
  }

  const allTripBills = await getAllTripBills(tripId);
  if (allTripBills.length === 0) return [];

  const billIds = allTripBills.map(b => b.id);
  const splits = await getUserBillsByIds(billIds);


  const byBillId = new Map<number, UserBillDB[]>();

  for (const s of splits) {
    const list = byBillId.get(s.billId) ?? [];
    list.push(s);
    byBillId.set(s.billId, list);
  }

  return allTripBills.map(bill => ({
    ...bill, splits: byBillId.get(bill.id) || []
  }));
};