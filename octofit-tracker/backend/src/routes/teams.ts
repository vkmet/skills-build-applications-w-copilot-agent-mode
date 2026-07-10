import { Router } from 'express';

import Team from '../models/team.js';

const teamsRouter = Router();

teamsRouter.get('/', async (_req, res) => {
  try {
    const items = await Team.find().populate('members').lean();
    res.status(200).json({ resource: 'teams', count: items.length, items });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teams', error });
  }
});

export default teamsRouter;
