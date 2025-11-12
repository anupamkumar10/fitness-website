import WeeklySchedule from '../models/WeeklySchedule.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';
import Diet from '../models/Diet.js';
import * as bmiUtils from '../utils/bmiCalculator.js';

export const getWeeklySchedule = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user || !user.height || !user.weight) {
      return res.status(400).json({ 
        message: 'Please update your profile with height and weight to get a personalized schedule' 
      });
    }

    const bmi = bmiUtils.calculateBMI(user.height, user.weight);
    const bmiCategory = bmiUtils.getBMICategory(bmi);

    // Check if schedule exists for current week
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday
    startOfWeek.setHours(0, 0, 0, 0);

    let schedule = await WeeklySchedule.findOne({ 
      user: req.user._id,
      weekStartDate: { $gte: startOfWeek }
    }).populate('schedule.monday.workout schedule.monday.diet')
      .populate('schedule.tuesday.workout schedule.tuesday.diet')
      .populate('schedule.wednesday.workout schedule.wednesday.diet')
      .populate('schedule.thursday.workout schedule.thursday.diet')
      .populate('schedule.friday.workout schedule.friday.diet')
      .populate('schedule.saturday.workout schedule.saturday.diet')
      .populate('schedule.sunday.workout schedule.sunday.diet');

    // If no schedule exists, generate one
    if (!schedule) {
      schedule = await generateWeeklySchedule(req.user._id, bmiCategory);
    }

    res.json({
      schedule,
      bmi,
      bmiCategory,
      user: {
        name: user.name,
        height: user.height,
        weight: user.weight
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const generateWeeklySchedule = async (userId, bmiCategory) => {
  // Get all workouts and diets (we'll assign specific ones to each day)
  let workouts = await Workout.find({
    $or: [
      { bmiCategory: bmiCategory },
      { bmiCategory: 'all' }
    ]
  });

  let diets = await Diet.find({
    $or: [
      { bmiCategory: bmiCategory },
      { bmiCategory: 'all' }
    ]
  });

  // Fallback to all if none match BMI
  if (workouts.length === 0) {
    workouts = await Workout.find({});
  }
  if (diets.length === 0) {
    diets = await Diet.find({});
  }

  // Match workouts and diets by day name in title
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const workoutTitles = ['Chest & Triceps', 'Back & Biceps', 'Legs & Glutes', 'Shoulders & Core', 'Full Body Strength', 'Cardio & Abs', 'Yoga & Stretching'];
  const dietTitles = ['Monday Meal Plan', 'Tuesday Meal Plan', 'Wednesday Meal Plan', 'Thursday Meal Plan', 'Friday Meal Plan', 'Saturday Meal Plan', 'Sunday Meal Plan'];

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const scheduleData = {};

  days.forEach((day, index) => {
    // Find workout by matching title pattern
    let workout = workouts.find(w => 
      w.title === workoutTitles[index] || 
      w.title.toLowerCase().includes(dayNames[index].toLowerCase())
    );
    
    // If not found, use index-based fallback
    if (!workout) {
      workout = workouts[index % workouts.length];
    }

    // Find diet by matching title pattern
    let diet = diets.find(d => 
      d.title === dietTitles[index] || 
      d.title.toLowerCase().includes(dayNames[index].toLowerCase())
    );
    
    // If not found, use index-based fallback
    if (!diet) {
      diet = diets[index % diets.length];
    }

    scheduleData[day] = {
      workout: workout?._id || null,
      diet: diet?._id || null
    };
  });

  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1);
  startOfWeek.setHours(0, 0, 0, 0);

  // Delete old schedules
  await WeeklySchedule.deleteMany({ user: userId });

  const schedule = await WeeklySchedule.create({
    user: userId,
    weekStartDate: startOfWeek,
    schedule: scheduleData
  });

  return await WeeklySchedule.findById(schedule._id)
    .populate('schedule.monday.workout schedule.monday.diet')
    .populate('schedule.tuesday.workout schedule.tuesday.diet')
    .populate('schedule.wednesday.workout schedule.wednesday.diet')
    .populate('schedule.thursday.workout schedule.thursday.diet')
    .populate('schedule.friday.workout schedule.friday.diet')
    .populate('schedule.saturday.workout schedule.saturday.diet')
    .populate('schedule.sunday.workout schedule.sunday.diet');
};

export const regenerateWeeklySchedule = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user || !user.height || !user.weight) {
      return res.status(400).json({ 
        message: 'Please update your profile with height and weight' 
      });
    }

    const bmi = bmiUtils.calculateBMI(user.height, user.weight);
    const bmiCategory = bmiUtils.getBMICategory(bmi);

    const schedule = await generateWeeklySchedule(req.user._id, bmiCategory);

    res.json({
      schedule,
      bmi,
      bmiCategory,
      message: 'Weekly schedule regenerated successfully'
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

