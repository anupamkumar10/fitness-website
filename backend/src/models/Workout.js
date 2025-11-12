import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a workout title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  duration: {
    type: Number,
    required: [true, 'Please provide duration in minutes'],
    min: 1
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  bmiCategory: {
    type: String,
    enum: ['underweight', 'normal', 'overweight', 'obese', 'all'],
    default: 'all'
  },
  exercises: [{
    name: {
      type: String,
      required: true
    },
    sets: {
      type: Number,
      default: 1
    },
    reps: {
      type: String,
      default: '10-12'
    },
    rest: {
      type: Number,
      default: 60
    }
  }],
  calories: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    default: ''
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, {
  timestamps: true
});

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;

