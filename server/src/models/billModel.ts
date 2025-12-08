import db from '../db/sqlite';
import {Bill, Trip} from '@shared/index';
import { isValidId } from '../utils/dataValidation';

export const getAllTripBills = (tripId: number): Promise<Bill[]> => {
  if (!isValidId(tripId)) {
    return Promise.reject(new Error('Invalid ID'));
  }

  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM bill WHERE tripId= ?', [tripId], (err, rows: Bill[]) => {
      if (err) return reject(err);
      resolve(rows.map(row => row as Bill));
    });
  });
};

export const addBill = (bill:Omit<Bill, 'id'> ): Promise<number> => {
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

export const updateBill = (bill:Bill): Promise<number> => {
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