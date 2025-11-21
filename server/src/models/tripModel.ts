import db from '../db/sqlite';
import { Trip } from '@shared/index';
import { isValidId } from '../utils/dataValidation';

export const getAllTrips = (): Promise<Trip[]> => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM trip', [], (err, rows: Trip[]) => {
      if (err) return reject(err);
      resolve(rows.map(row => row as Trip));
    });
  });
};

export const getTripById = (id: number): Promise<Trip> => {
  if (!isValidId(id)) {
    return Promise.reject(new Error('Invalid ID'));
  }

  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM trip WHERE id = ?', [id], (err, row: Trip | undefined) => {
      if (err) return reject(err);
      if (!row) return reject(new Error('Trip not found'));
      resolve(row);
    });
  });
};

export const addTrip = (trip:Omit<Trip, 'id'> ): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.run(
        'INSERT INTO trip (name, year, location, image) VALUES (?, ?, ?, ?)',
        [trip.name, trip.year, trip.location || null, trip.image || null],
        function (err) {
          if (err) {
            return reject(err);
          }

          resolve(this.lastID); // 'this' refers to the statement context
        });
  });
};

export const deleteTrip = (tripId:number): Promise<number> => {
  if (!isValidId(tripId)) {
    return Promise.reject(new Error('Invalid ID'));
  }

  return new Promise((resolve, reject) => {
    db.run(
        'delete from trip where id = ?',
        [tripId],
        function (err) {
          if (err) {
            return reject(err);
          }

          resolve(this.changes); // 'this' refers to the statement context
        });
  });
}
export const updateTrip = (trip:Trip): Promise<number> => {
  return new Promise((resolve, reject) => {
    const { id, name, year, location} = trip;
    db.run(
        'UPDATE trip SET name = ?, year = ?, location = ? where id = ?',
        [name, year, location, id],
        function (err) {
          if (err) {
            return reject(err);
          }

          resolve(this.changes); // 'this' refers to the statement context
        });
  });
};
