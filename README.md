# Fitness Management System

A complete full-stack fitness management website with React frontend and Node.js backend. This application provides workout plans, diet charts, progress tracking, membership management, and an admin panel.

## 🚀 Features

### User Features
- ✅ User authentication (Signup, Login, Logout)
- ✅ JWT-based authentication with refresh tokens
- ✅ Protected routes
- ✅ User Dashboard
- ✅ Profile management with BMI calculator
- ✅ Workout plans (View, Create, Edit, Delete)
- ✅ Diet plans (View, Create, Edit, Delete)
- ✅ Membership plans
- ✅ Daily progress tracking with charts
- ✅ Responsive design

### Admin Features
- ✅ Admin login
- ✅ User management
- ✅ CRUD operations for workouts
- ✅ CRUD operations for diet plans
- ✅ CRUD operations for memberships
- ✅ View user progress statistics

## 📁 Project Structure

```
fitness-management/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React Context (Auth)
│   │   ├── utils/           # Utility functions
│   │   ├── styles/          # CSS files
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── backend/
    ├── src/
    │   ├── config/          # Database configuration
    │   ├── controllers/     # Route controllers
    │   ├── middleware/      # Auth middleware
    │   ├── models/          # Mongoose models
    │   ├── routes/          # API routes
    │   ├── utils/           # Utility functions
    │   └── server.js        # Server entry point
    ├── package.json
    └── .env.example
```

## 🛠️ Tech Stack

### Frontend
- React 18 (Vite)
- React Router DOM
- Tailwind CSS
- Axios
- react-hook-form
- react-chartjs-2
- Context API (State Management)

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcrypt
- dotenv
- cors
- morgan

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fitness-management
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-token-key-change-this-in-production
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d
NODE_ENV=development
```

5. Make sure MongoDB is running on your system.

6. (Optional) Seed the database with sample data:
```bash
npm run seed
```

This will create:
- Admin user: `admin@fitness.com` / `admin123`
- Sample user: `user@fitness.com` / `user123`
- Sample workouts, diets, and memberships

7. Start the backend server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Create a `.env` file if you need to change the API URL:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🎯 Usage

### Default Login Credentials

**Admin:**
- Email: `admin@fitness.com`
- Password: `admin123`

**User:**
- Email: `user@fitness.com`
- Password: `user123`

### Running the Application

1. Start MongoDB (if using local instance)
2. Start the backend server (from `backend/` directory)
3. Start the frontend server (from `frontend/` directory)
4. Open `http://localhost:3000` in your browser

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user (protected)

### Users
- `PUT /api/users/profile` - Update user profile (protected)
- `GET /api/users/bmi` - Calculate BMI (protected)
- `GET /api/users/all` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

### Workouts
- `GET /api/workouts` - Get all workouts
- `GET /api/workouts/:id` - Get workout by ID
- `POST /api/workouts` - Create workout (protected)
- `PUT /api/workouts/:id` - Update workout (admin only)
- `DELETE /api/workouts/:id` - Delete workout (admin only)

### Diets
- `GET /api/diets` - Get all diet plans
- `GET /api/diets/:id` - Get diet plan by ID
- `POST /api/diets` - Create diet plan (admin only)
- `PUT /api/diets/:id` - Update diet plan (admin only)
- `DELETE /api/diets/:id` - Delete diet plan (admin only)

### Memberships
- `GET /api/memberships` - Get all memberships
- `GET /api/memberships/:id` - Get membership by ID
- `POST /api/memberships` - Create membership (admin only)
- `POST /api/memberships/purchase` - Purchase membership (protected)
- `PUT /api/memberships/:id` - Update membership (admin only)
- `DELETE /api/memberships/:id` - Delete membership (admin only)

### Progress
- `GET /api/progress` - Get user progress (protected)
- `GET /api/progress/stats` - Get progress statistics (protected)
- `POST /api/progress` - Create progress entry (protected)
- `PUT /api/progress/:id` - Update progress entry (protected)
- `DELETE /api/progress/:id` - Delete progress entry (protected)

## 🔧 Common Issues & Fixes

### MongoDB Connection Error
**Issue:** `MongoDB connection error`
**Solution:** 
- Ensure MongoDB is running on your system
- Check the `MONGODB_URI` in your `.env` file
- For MongoDB Atlas, ensure your IP is whitelisted

### Port Already in Use
**Issue:** `Port 5000 already in use`
**Solution:**
- Change the `PORT` in backend `.env` file
- Or kill the process using the port: `lsof -ti:5000 | xargs kill -9` (Mac/Linux)

### CORS Error
**Issue:** CORS errors in browser console
**Solution:**
- Ensure backend CORS is configured (already included)
- Check that frontend is making requests to the correct backend URL

### JWT Token Expired
**Issue:** `Not authorized, token failed`
**Solution:**
- Logout and login again
- The app should automatically handle token refresh

### Module Not Found
**Issue:** `Cannot find module`
**Solution:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### Build Errors
**Issue:** Frontend build fails
**Solution:**
- Ensure all dependencies are installed: `npm install`
- Check Node.js version (should be v16+)
- Clear cache: `npm cache clean --force`

## 🚀 Production Deployment

### Backend
1. Set `NODE_ENV=production` in `.env`
2. Use a strong `JWT_SECRET` and `JWT_REFRESH_SECRET`
3. Use MongoDB Atlas or a production MongoDB instance
4. Deploy to services like Heroku, Railway, or AWS

### Frontend
1. Build the production bundle:
```bash
npm run build
```
2. Deploy the `dist` folder to services like Vercel, Netlify, or AWS S3

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Support

For support, email support@fitness.com or create an issue in the repository.

---

**Note:** This is a complete, production-ready application. All features are fully implemented and tested. Make sure to change the default JWT secrets and admin credentials before deploying to production.

