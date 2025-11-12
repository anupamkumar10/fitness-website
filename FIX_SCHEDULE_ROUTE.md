# Fix: Schedule Route 404 Error

## Problem
Getting 404 error when accessing `/api/schedule` endpoint.

## Solution

### Step 1: Restart Backend Server

The route is already registered in the code, but you need to restart the backend server:

```bash
cd backend
npm start
```

Or if using dev mode:
```bash
npm run dev
```

### Step 2: Verify Route is Working

After restarting, check the console output. You should see:
- "Routes registered: /api/schedule"
- Server running message

### Step 3: Test the Route

You can test if the route is working by:
1. Make sure you're logged in
2. The route requires authentication, so make sure you have a valid token
3. Check browser console for any CORS or authentication errors

### Step 4: Check Backend Logs

When you click on Workouts or Diets page, check the backend console for:
- Any error messages
- Request logs showing the `/api/schedule` endpoint being hit

## Common Issues

1. **Server not restarted**: The route was added but server wasn't restarted
2. **Authentication token missing**: Make sure you're logged in
3. **MongoDB not connected**: Check if MongoDB is running
4. **Profile incomplete**: User needs height and weight in profile

## Quick Fix

1. Stop the backend server (Ctrl+C)
2. Restart it: `npm start`
3. Refresh the frontend page
4. Try accessing Workouts/Diets pages again

