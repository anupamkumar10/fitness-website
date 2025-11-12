import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './utils/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';
import dietRoutes from './routes/dietRoutes.js';
import membershipRoutes from './routes/membershipRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';

// Load environment variables
dotenv.config();

// Check for required environment variables
if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
  console.warn('⚠️  WARNING: JWT_SECRET or JWT_REFRESH_SECRET not found in .env file');
  console.warn('⚠️  Please create a .env file in the backend directory.');
  console.warn('⚠️  Using default values (NOT SECURE FOR PRODUCTION)');
  
  // Set default values for development
  if (!process.env.JWT_SECRET) {
    process.env.JWT_SECRET = 'default-jwt-secret-change-in-production';
  }
  if (!process.env.JWT_REFRESH_SECRET) {
    process.env.JWT_REFRESH_SECRET = 'default-refresh-secret-change-in-production';
  }
}

connectDB();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Fitness Management API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/diets', dietRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/schedule', scheduleRoutes);

// Debug route
console.log('Routes registered: /api/schedule');

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

