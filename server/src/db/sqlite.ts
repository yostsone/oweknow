import sqlite3 from 'sqlite3';
const dbPath = __dirname + '/expanses.db';
const db = new sqlite3.Database(dbPath);
export default db;