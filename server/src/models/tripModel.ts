import db from '../db/sqlite';
import { Trip } from '@shared/index';

export const getAllTrips = (): Promise<Trip[]> => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM trip', [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows.map(row => row as Trip));
    });
  });
};

export const getTripById = (id: string): Promise<Trip> => {
  console.log('Fetching trip with id:', id);
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM trip WHERE id = ?', [id], (err, row: Trip | undefined) => {
      if (err) return reject(err);
      if (!row) return reject(new Error('Trip not found'));
      resolve(row);
    });
  });
};