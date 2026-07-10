import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import db from './config/database.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    ok: true,
    service: 'octofit-backend',
    port,
    database: db.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
});
