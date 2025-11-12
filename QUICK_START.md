# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fitness-management
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-token-key-change-this-in-production
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d
NODE_ENV=development
```

Start MongoDB, then:
```bash
npm run seed  # Optional: Seed sample data
npm start     # Start backend server
```

### Step 2: Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Step 3: Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Default Login Credentials
- **Admin**: admin@fitness.com / admin123
- **User**: user@fitness.com / user123

## ✅ That's it! Your fitness management system is ready to use.

