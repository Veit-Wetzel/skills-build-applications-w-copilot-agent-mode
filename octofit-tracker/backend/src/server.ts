import express from 'express';
import { connectDatabase } from './config/database.js';
import User from './models/User.js';
import Team from './models/Team.js';
import Activity from './models/Activity.js';
import Leaderboard from './models/Leaderboard.js';
import Workout from './models/Workout.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

function collectionHandler(
  path: string,
  query: () => Promise<unknown[]>,
) {
  return async (_request: express.Request, response: express.Response): Promise<void> => {
    try {
      response.json(await query());
    } catch (error) {
      console.error(`Error loading ${path}:`, error);
      response.status(500).json({ error: 'Unable to load data' });
    }
  };
}

app.get('/api/users/', collectionHandler('/api/users/', () => User.find().lean()));
app.get('/api/teams/', collectionHandler('/api/teams/', () => Team.find().populate('members', 'name email').lean()));
app.get('/api/activities/', collectionHandler('/api/activities/', () => Activity.find().populate('user', 'name email').sort({ completedAt: -1 }).lean()));
app.get('/api/leaderboard/', collectionHandler('/api/leaderboard/', () => Leaderboard.find().populate('user', 'name email').sort({ rank: 1 }).lean()));
app.get('/api/workouts/', collectionHandler('/api/workouts/', () => Workout.find().lean()));

connectDatabase()
  .then(() => {
    app.listen(port, '0.0.0.0', () => {
      console.log(`OctoFit API listening on port ${port}`);
      console.log(`OctoFit API URL: ${apiBaseUrl}`);
    });
  })
  .catch((error: unknown) => {
    console.error('Unable to start the API:', error);
    process.exitCode = 1;
  });
