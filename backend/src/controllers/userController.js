import User from '../models/User.js';

export const updateProfile = async (req, res) => {
  try {
    const { name, age, height, weight, gender } = req.body;

    const user = await User.findById(req.user._id);

    if (user) {
      user.name = name || user.name;
      user.age = age || user.age;
      user.height = height || user.height;
      user.weight = weight || user.weight;
      user.gender = gender || user.gender;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        age: updatedUser.age,
        height: updatedUser.height,
        weight: updatedUser.weight,
        gender: updatedUser.gender,
        role: updatedUser.role
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const calculateBMI = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user || !user.height || !user.weight) {
      return res.status(400).json({ message: 'Height and weight required for BMI calculation' });
    }

    const bmiUtils = await import('../utils/bmiCalculator.js');
    const bmi = bmiUtils.calculateBMI(user.height, user.weight);
    const category = bmiUtils.getBMICategory(bmi);
    
    let categoryLabel = '';
    if (category === 'underweight') categoryLabel = 'Underweight';
    else if (category === 'normal') categoryLabel = 'Normal';
    else if (category === 'overweight') categoryLabel = 'Overweight';
    else categoryLabel = 'Obese';

    res.json({
      bmi,
      category: categoryLabel,
      bmiCategory: category,
      height: user.height,
      weight: user.weight
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').populate('membership');
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password').populate('membership');
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await User.deleteOne({ _id: user._id });
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

