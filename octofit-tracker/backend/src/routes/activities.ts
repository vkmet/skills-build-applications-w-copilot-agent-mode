import { Router } from 'express';

import Activity from '../models/activity.js';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res) => {
  try {
    const items = await Activity.find().populate('user').sort({ performedAt: -1 }).lean();
    res.status(200).json({ resource: 'activities', count: items.length, items });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

export default activitiesRouter;
