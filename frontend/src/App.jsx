import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Workouts from './pages/Workouts';
import WorkoutDetail from './pages/WorkoutDetail';
import WorkoutForm from './pages/WorkoutForm';
import Diets from './pages/Diets';
import DietDetail from './pages/DietDetail';
import DietForm from './pages/DietForm';
import Progress from './pages/Progress';
import Membership from './pages/Membership';
import Admin from './pages/Admin';
import AdminUsers from './pages/AdminUsers';
import AdminWorkouts from './pages/AdminWorkouts';
import AdminDiets from './pages/AdminDiets';
import AdminMemberships from './pages/AdminMemberships';
import AdminStats from './pages/AdminStats';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/workouts"
                element={
                  <ProtectedRoute>
                    <Workouts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/workouts/:id"
                element={
                  <ProtectedRoute>
                    <WorkoutDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/workouts/create"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <WorkoutForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/workouts/edit/:id"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <WorkoutForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/diets"
                element={
                  <ProtectedRoute>
                    <Diets />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/diets/:id"
                element={
                  <ProtectedRoute>
                    <DietDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/diets/create"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <DietForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/diets/edit/:id"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <DietForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/progress"
                element={
                  <ProtectedRoute>
                    <Progress />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/membership"
                element={
                  <ProtectedRoute>
                    <Membership />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminUsers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/workouts"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminWorkouts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/diets"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminDiets />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/memberships"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminMemberships />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/stats"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminStats />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

