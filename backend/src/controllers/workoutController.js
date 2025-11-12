import Workout from '../models/Workout.js';

export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (workout) {
      res.json(workout);
    } else {
      res.status(404).json({ message: 'Workout not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createWorkout = async (req, res) => {
  try {
    const workout = await Workout.create({
      ...req.body,
      createdBy: req.user._id
    });

    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (workout) {
      Object.assign(workout, req.body);
      const updatedWorkout = await workout.save();
      res.json(updatedWorkout);
    } else {
      res.status(404).json({ message: 'Workout not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (workout) {
      await Workout.deleteOne({ _id: workout._id });
      res.json({ message: 'Workout removed' });
    } else {
      res.status(404).json({ message: 'Workout not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

