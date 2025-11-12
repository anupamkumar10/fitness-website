import express from 'express';
import {
  getWeeklySchedule,
  regenerateWeeklySchedule
} from '../controllers/scheduleController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getWeeklySchedule);
router.post('/regenerate', protect, regenerateWeeklySchedule);

export default router;

