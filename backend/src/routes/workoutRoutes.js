import express from 'express';
import {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout
} from '../controllers/workoutController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getWorkouts);
router.get('/:id', getWorkoutById);
// Removed admin restrictions - all users can view workouts
// Admin-only routes for create/update/delete can be added separately if needed

export default router;

