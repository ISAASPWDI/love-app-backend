import { Router } from 'express';
import {
  createTimelineEvent,
  getAllTimelineEvents,
  getTimelineEventById,
  updateTimelineEvent,
  deleteTimelineEvent,
} from '../controllers/timeline.controller';

const router = Router();

router.post('/', createTimelineEvent);
router.get('/', getAllTimelineEvents);
router.get('/:id', getTimelineEventById);
router.put('/:id', updateTimelineEvent);
router.delete('/:id', deleteTimelineEvent);

export default router;
