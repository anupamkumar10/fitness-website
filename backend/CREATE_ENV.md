# How to Create .env File

## Quick Fix

The error occurs because the `.env` file is missing. Here's how to fix it:

### Option 1: Automatic Setup (Recommended)

Run this command in the `backend` directory:

```bash
cd backend
npm run setup
```

This will automatically create the `.env` file for you.

### Option 2: Manual Creation

1. Navigate to the `backend` directory
2. Create a new file named `.env` (with the dot at the beginning)
3. Copy and paste this content:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fitness-management
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-token-key-change-this-in-production
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d
NODE_ENV=development
```

### Option 3: Using MongoDB Atlas (Cloud)

If you're using MongoDB Atlas instead of local MongoDB:

1. Get your connection string from MongoDB Atlas dashboard
2. Replace `MONGODB_URI` with your Atlas connection string:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fitness-management
```

## After Creating .env

1. Make sure MongoDB is running (if using local MongoDB)
2. Run `npm start` again

The server should now start without errors!

