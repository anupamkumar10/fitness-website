import mongoose from 'mongoose';

const dietSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a diet plan title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  calories: {
    type: Number,
    required: [true, 'Please provide daily calories'],
    min: 0
  },
  bmiCategory: {
    type: String,
    enum: ['underweight', 'normal', 'overweight', 'obese', 'all'],
    default: 'all'
  },
  meals: [{
    mealType: {
      type: String,
      enum: ['breakfast', 'lunch', 'dinner', 'snack'],
      required: true
    },
    name: {
      type: String,
      required: true
    },
    ingredients: [{
      type: String
    }],
    calories: {
      type: Number,
      default: 0
    }
  }],
  duration: {
    type: Number,
    default: 7,
    min: 1
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

const Diet = mongoose.model('Diet', dietSchema);

export default Diet;

