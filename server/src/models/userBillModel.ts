import db from '../db/sqlite';
import type { UserBillDB } from '@shared/index';

/**
 * Get user bills by their IDs (used for bill splits)
 * @param billIds
 */
export const getUserBillsByIds = (billIds: number[]): Promise<UserBillDB[]> => {
  const billIdPlaceholder = billIds.map(() => '?').join(',');
  return new Promise((resolve, reject) => {
    db.all(
        `SELECT * FROM user_bill WHERE billId IN (${billIdPlaceholder})`,
        billIds,
        (err, rows: UserBillDB[]) => {
          if (err) return reject(err);
          resolve(rows);
        }
    );
  });
};