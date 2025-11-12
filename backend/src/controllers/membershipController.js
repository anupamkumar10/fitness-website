import Membership from '../models/Membership.js';
import User from '../models/User.js';

export const getMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find({ isActive: true }).sort({ price: 1 });
    res.json(memberships);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMembershipById = async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);

    if (membership) {
      res.json(membership);
    } else {
      res.status(404).json({ message: 'Membership not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createMembership = async (req, res) => {
  try {
    const membership = await Membership.create(req.body);
    res.status(201).json(membership);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateMembership = async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);

    if (membership) {
      Object.assign(membership, req.body);
      const updatedMembership = await membership.save();
      res.json(updatedMembership);
    } else {
      res.status(404).json({ message: 'Membership not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMembership = async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);

    if (membership) {
      await Membership.deleteOne({ _id: membership._id });
      res.json({ message: 'Membership removed' });
    } else {
      res.status(404).json({ message: 'Membership not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const purchaseMembership = async (req, res) => {
  try {
    const { membershipId } = req.body;
    
    const membership = await Membership.findById(membershipId);
    
    if (!membership) {
      return res.status(404).json({ message: 'Membership not found' });
    }

    const user = await User.findById(req.user._id);
    
    if (user) {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + membership.duration);
      
      user.membership = membershipId;
      user.membershipExpiry = expiryDate;
      
      await user.save();
      
      res.json({
        message: 'Membership purchased successfully',
        membership: membership,
        expiryDate: expiryDate
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

