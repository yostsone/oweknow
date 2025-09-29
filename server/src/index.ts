import express, { Request, Response } from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';

const app = express();
const PORT = 5000;

const db = new sqlite3.Database('./expanses.db');
//TODO allowedOrigins for production
app.use(cors());
app.use(express.json());
//
// Example endpoint
app.get('/api/trips', (req, res) => {
  db.all('SELECT * FROM trip', [], (err, rows) => {
    if (err) {
      res.status(500).json({error: err.message});
      return;
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});