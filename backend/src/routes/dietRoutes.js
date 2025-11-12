import express from 'express';
import {
  getDiets,
  getDietById,
  createDiet,
  updateDiet,
  deleteDiet
} from '../controllers/dietController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getDiets);
router.get('/:id', getDietById);
// Removed admin restrictions - all users can view diets
// Admin-only routes for create/update/delete can be added separately if needed

export default router;

