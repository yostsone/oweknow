import sqlite3 from 'sqlite3';
const dbPath = __dirname + '/expanses.db';

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err: Error | null) => {
  if (err) {
    console.error('Failed to open DB:', err);
    throw err;
  }
});

// Ensure PRAGMA foreign_keys = ON is executed on this connection.
// Provide a `ready` promise so other modules can await it before performing deletes/other operations.
export const ready: Promise<void> = new Promise((resolve, reject) => {
  db.serialize(() => {
    db.run('PRAGMA foreign_keys = ON;', (err: Error | null) => {
      if (err) {
        console.error('Failed to enable foreign keys:', err);
        return reject(err);
      }
      console.log('Foreign keys enabled on DB connection');
      resolve();
    });
  });
});

export default db as sqlite3.Database;
// const db = new sqlite3.Database(dbPath);
// export default db;