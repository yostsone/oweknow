import db from '../db/sqlite';
import { User } from '@shared/index';
import { isValidId } from '../utils/dataValidation';

export const getAllTripUsers = (tripId:number): Promise<User[]> => {
  if (!isValidId(tripId)) {
    return Promise.reject(new Error('Invalid ID'));
  }

  return new Promise((resolve, reject) => {
    db.all(
        'SELECT users.id, users.name, users.image FROM users INNER JOIN user_trip ON users.id = user_trip.userId WHERE user_trip.tripId = ?',
        [tripId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows.map(row => row as User));
        }
    );
  });
};

export const addUser = (user:Omit<User, 'id'> ): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.run(
        'INSERT INTO users (name) VALUES (?)',
        [user.name],
        function (err) {
      if (err) return reject(err);

      resolve(this.lastID); // 'this' refers to the statement context
    });
  });
};

export const updateUser = (user:User): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.run(
        'UPDATE users SET name = ? where id = ?',
        [user.name, user.id],
        function (err) {
          if (err) return reject(err);

          resolve(this.changes); // 'this' refers to the statement context
        });
  });
};

export const deleteUser = (userId:number): Promise<number> => {
  if (!isValidId(userId)) {
    return Promise.reject(new Error('Invalid ID'));
  }

  return new Promise((resolve, reject) => {
    db.run(
        'delete from users where id = ?',
        [userId],
        function (err) {
          if (err) return reject(err);

          resolve(this.changes); // 'this' refers to the statement context
        });
  });
};