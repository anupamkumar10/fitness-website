import express from 'express';
import {
  updateProfile,
  calculateBMI,
  getAllUsers,
  getUserById,
  deleteUser
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.put('/profile', protect, updateProfile);
router.get('/bmi', protect, calculateBMI);
router.get('/all', protect, admin, getAllUsers);
router.get('/:id', protect, admin, getUserById);
router.delete('/:id', protect, admin, deleteUser);

export default router;

