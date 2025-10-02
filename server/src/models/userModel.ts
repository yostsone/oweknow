import db from '../db/sqlite';
import { User } from '@shared/index';

export const getAllTripUsers = (tripId:string): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    db.all(
        'SELECT user.id, user.name, user.image FROM user INNER JOIN user_trip ON user.id = user_trip.userId WHERE user_trip.tripId = ?',
        [tripId],
        (err, rows) => {
          if (err) {
            console.error(err);
            // handle error
            return;
          }
          resolve(rows.map(row => row as User));
        }
    );
  });
};
