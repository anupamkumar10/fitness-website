import Progress from '../models/Progress.js';

export const getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user._id })
      .populate('workoutCompleted')
      .sort({ date: -1 });
    res.json(progress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createProgress = async (req, res) => {
  try {
    const progress = await Progress.create({
      ...req.body,
      user: req.user._id
    });

    const populatedProgress = await Progress.findById(progress._id)
      .populate('workoutCompleted');

    res.status(201).json(populatedProgress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProgress = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);

    if (progress && progress.user.toString() === req.user._id.toString()) {
      Object.assign(progress, req.body);
      const updatedProgress = await progress.save();
      
      const populatedProgress = await Progress.findById(updatedProgress._id)
        .populate('workoutCompleted');
      
      res.json(populatedProgress);
    } else {
      res.status(404).json({ message: 'Progress not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProgress = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);

    if (progress && progress.user.toString() === req.user._id.toString()) {
      await Progress.deleteOne({ _id: progress._id });
      res.json({ message: 'Progress removed' });
    } else {
      res.status(404).json({ message: 'Progress not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getProgressStats = async (req, res) => {
  try {
    const userId = req.user.role === 'admin' && req.query.userId 
      ? req.query.userId 
      : req.user._id;

    const progress = await Progress.find({ user: userId })
      .sort({ date: 1 });

    const stats = {
      totalEntries: progress.length,
      totalCaloriesBurned: progress.reduce((sum, p) => sum + (p.caloriesBurned || 0), 0),
      totalCaloriesConsumed: progress.reduce((sum, p) => sum + (p.caloriesConsumed || 0), 0),
      workoutsCompleted: progress.filter(p => p.workoutCompleted).length,
      weightHistory: progress
        .filter(p => p.weight)
        .map(p => ({ date: p.date, weight: p.weight })),
      caloriesHistory: progress.map(p => ({
        date: p.date,
        burned: p.caloriesBurned || 0,
        consumed: p.caloriesConsumed || 0
      }))
    };

    res.json(stats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

