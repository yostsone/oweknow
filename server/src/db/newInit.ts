import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// small helpers to promisify sqlite3 callbacks
function execAsync(db, sql) {
  return new Promise((resolve, reject) => db.exec(sql, (err) => (err ? reject(err) : resolve())));
}
function closeAsync(db) {
  return new Promise((resolve, reject) => db.close((err) => (err ? reject(err) : resolve())));
}

async function initializeDb() {
  const dbPath = join(__dirname, 'expanses.db');
  const db = new sqlite3.Database(dbPath);

  try {
    // Must enable foreign keys per connection
    await execAsync(db, 'PRAGMA foreign_keys = ON;');

    // Wrap schema creation in a transaction
    await execAsync(db, 'BEGIN;');

    // Use plural table names and consistent lowercase references
    await execAsync(db, `CREATE TABLE IF NOT EXISTS trip (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      year INTEGER NOT NULL,
      location TEXT,
      image TEXT
    );`);

    await execAsync(db, `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      image TEXT
    );`);

    await execAsync(db, `CREATE TABLE IF NOT EXISTS bill (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      total REAL NOT NULL,
      title TEXT NOT NULL,
      image TEXT,
      tripId INTEGER NOT NULL,
      FOREIGN KEY (tripId) REFERENCES trip(id) ON DELETE CASCADE
    );`);

    await execAsync(db, `CREATE TABLE IF NOT EXISTS user_trip (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      tripId INTEGER NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (tripId) REFERENCES trip(id) ON DELETE CASCADE
    );`);

    await execAsync(db, `CREATE TABLE IF NOT EXISTS user_bill (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      userId INTEGER NOT NULL,
      billId INTEGER NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (billId) REFERENCES bill(id) ON DELETE CASCADE
    );`);

    await execAsync(db, 'COMMIT;');

    console.log('Database initialized at', dbPath);
  } catch (err) {
    // make sure to roll back on error
    try { await execAsync(db, 'ROLLBACK;'); } catch (_) {}
    console.error('Failed to initialize DB:', err);
    throw err;
  } finally {
    await closeAsync(db);
  }
}

initializeDb().catch((err) => {
  console.error(err);
  process.exit(1);
});