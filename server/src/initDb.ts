import sqlite3 from 'sqlite3';
import { promisify } from 'util';

async function initializeDb() {
  const db = new sqlite3.Database('./expanses.db');
  const exec = promisify(db.exec).bind(db);

  await exec('PRAGMA foreign_keys = ON;');
  await exec(`CREATE TABLE IF NOT EXISTS trip (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    year INTEGER NOT NULL,
    location TEXT,
    image TEXT
  );`);
  await exec(`CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    image TEXT
  );`);
  await exec(`CREATE TABLE IF NOT EXISTS bill (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    total REAL NOT NULL,
    image TEXT,
    payerId INTEGER NOT NULL,
    tripId INTEGER NOT NULL,
    FOREIGN KEY (payerId) REFERENCES User(Id),
    FOREIGN KEY (tripId) REFERENCES Trip(Id)
  );`);
  await exec(`CREATE TABLE IF NOT EXISTS user_trip (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    tripId INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES user(id),
    FOREIGN KEY (tripId) REFERENCES trip(id)
  );`);
  await exec(`CREATE TABLE IF NOT EXISTS user_bill (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    userId INTEGER NOT NULL,
    billId INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES user(id),
    FOREIGN KEY (billId) REFERENCES bill(id)
  );`);

  console.log('Database initialized.');
  db.close();
}

initializeDb().catch(console.error);