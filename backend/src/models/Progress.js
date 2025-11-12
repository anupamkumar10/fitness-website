import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  weight: {
    type: Number,
    min: 0
  },
  workoutCompleted: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout',
    default: null
  },
  caloriesBurned: {
    type: Number,
    default: 0,
    min: 0
  },
  caloriesConsumed: {
    type: Number,
    default: 0,
    min: 0
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

progressSchema.index({ user: 1, date: 1 });

const Progress = mongoose.model('Progress', progressSchema);

export default Progress;

