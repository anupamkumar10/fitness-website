import express from 'express';
import {
  getMemberships,
  getMembershipById,
  createMembership,
  updateMembership,
  deleteMembership,
  purchaseMembership
} from '../controllers/membershipController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getMemberships);
router.get('/:id', getMembershipById);
router.post('/purchase', protect, purchaseMembership);
router.post('/', protect, admin, createMembership);
router.put('/:id', protect, admin, updateMembership);
router.delete('/:id', protect, admin, deleteMembership);

export default router;

