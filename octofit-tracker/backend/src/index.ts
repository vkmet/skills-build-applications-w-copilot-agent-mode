import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { getApiBaseUrl } from './config/baseUrl.js';
import db from './config/database.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import teamsRouter from './routes/teams.js';
import usersRouter from './routes/users.js';
import workoutsRouter from './routes/workouts.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;
const baseUrl = getApiBaseUrl();

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    ok: true,
    service: 'octofit-backend',
    port,
    baseUrl,
    database: db.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
});
