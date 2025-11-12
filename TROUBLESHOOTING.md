# Troubleshooting Guide

## Signup/Login Issues

### Error: "Signup failed" or "Login failed"

#### 1. Check if Backend Server is Running
The most common issue is that the backend server is not running.

**Solution:**
```bash
cd backend
npm start
```

The backend should be running on `http://localhost:5000`

#### 2. Check MongoDB Connection
Make sure MongoDB is running and accessible.

**Solution:**
- If using local MongoDB: Start MongoDB service
- If using MongoDB Atlas: Check your connection string in `.env`
- Verify `MONGODB_URI` in `backend/.env` file

#### 3. Check Environment Variables
Ensure all required environment variables are set in `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fitness-management
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-token-key-change-this-in-production
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d
NODE_ENV=development
```

#### 4. Check Browser Console
Open browser DevTools (F12) and check the Console tab for detailed error messages.

#### 5. Check Network Tab
In browser DevTools, go to Network tab and check:
- If API requests are being made
- What status code is returned
- The error message in the response

#### 6. Common Error Messages

**"Network error. Please check if the backend server is running."**
- Backend server is not running
- Backend is running on a different port
- CORS issues

**"User already exists"**
- Email is already registered
- Try a different email or login instead

**"Invalid email or password"**
- Wrong credentials
- Use demo accounts: admin@fitness.com / admin123 or user@fitness.com / user123

**"Validation Error"**
- Missing required fields
- Invalid data format (e.g., age must be a number)

### Quick Fixes

1. **Restart Backend:**
   ```bash
   cd backend
   npm start
   ```

2. **Restart Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Clear Browser Cache:**
   - Clear localStorage
   - Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

4. **Check Ports:**
   - Backend: http://localhost:5000
   - Frontend: http://localhost:3000
   - Make sure ports are not in use by other applications

### Still Having Issues?

1. Check backend logs for detailed error messages
2. Verify MongoDB is running: `mongosh` or `mongo`
3. Check if `.env` file exists in backend directory
4. Ensure all npm packages are installed: `npm install` in both frontend and backend

