import mongoose from 'mongoose';

const weeklyScheduleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  weekStartDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  schedule: {
    monday: {
      workout: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
        default: null
      },
      diet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Diet',
        default: null
      }
    },
    tuesday: {
      workout: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
        default: null
      },
      diet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Diet',
        default: null
      }
    },
    wednesday: {
      workout: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
        default: null
      },
      diet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Diet',
        default: null
      }
    },
    thursday: {
      workout: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
        default: null
      },
      diet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Diet',
        default: null
      }
    },
    friday: {
      workout: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
        default: null
      },
      diet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Diet',
        default: null
      }
    },
    saturday: {
      workout: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
        default: null
      },
      diet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Diet',
        default: null
      }
    },
    sunday: {
      workout: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
        default: null
      },
      diet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Diet',
        default: null
      }
    }
  }
}, {
  timestamps: true
});

weeklyScheduleSchema.index({ user: 1, weekStartDate: 1 });

const WeeklySchedule = mongoose.model('WeeklySchedule', weeklyScheduleSchema);

export default WeeklySchedule;

