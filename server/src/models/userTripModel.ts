import db from '../db/sqlite';

export const addUserToTrip = (userId: number, tripId: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.run(
        'INSERT INTO user_trip (userId, tripId) VALUES (?, ?)',
        [userId, tripId],
        function (err) {
          if (err) return reject(err);
          resolve(this.lastID); // 'this' refers to the statement context
        });
  });
};

export const removeUserFromTrip = (userId: number, tripId: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.run(
        'DELETE from user_trip where userId = ? and tripId = ?',
        [userId, tripId],
        function (err) {
          if (err) return reject(err);
          resolve(this.lastID); // 'this' refers to the statement context
        });
  });
};
