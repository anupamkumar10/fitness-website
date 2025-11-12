import express from 'express';
import {
  getProgress,
  createProgress,
  updateProgress,
  deleteProgress,
  getProgressStats
} from '../controllers/progressController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getProgress);
router.get('/stats', protect, getProgressStats);
router.post('/', protect, createProgress);
router.put('/:id', protect, updateProgress);
router.delete('/:id', protect, deleteProgress);

export default router;

