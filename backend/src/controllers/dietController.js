import Diet from '../models/Diet.js';

export const getDiets = async (req, res) => {
  try {
    const diets = await Diet.find({}).sort({ createdAt: -1 });
    res.json(diets);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getDietById = async (req, res) => {
  try {
    const diet = await Diet.findById(req.params.id);

    if (diet) {
      res.json(diet);
    } else {
      res.status(404).json({ message: 'Diet plan not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createDiet = async (req, res) => {
  try {
    const diet = await Diet.create({
      ...req.body,
      createdBy: req.user._id
    });

    res.status(201).json(diet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateDiet = async (req, res) => {
  try {
    const diet = await Diet.findById(req.params.id);

    if (diet) {
      Object.assign(diet, req.body);
      const updatedDiet = await diet.save();
      res.json(updatedDiet);
    } else {
      res.status(404).json({ message: 'Diet plan not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteDiet = async (req, res) => {
  try {
    const diet = await Diet.findById(req.params.id);

    if (diet) {
      await Diet.deleteOne({ _id: diet._id });
      res.json({ message: 'Diet plan removed' });
    } else {
      res.status(404).json({ message: 'Diet plan not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

