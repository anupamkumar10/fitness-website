import { useEffect, useState } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    workouts: 0,
    diets: 0,
    progressEntries: 0,
    bmi: null
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [workoutsRes, dietsRes, progressRes, bmiRes] = await Promise.all([
          api.get('/workouts'),
          api.get('/diets'),
          api.get('/progress'),
          api.get('/users/bmi').catch(() => null)
        ]);

        setStats({
          workouts: workoutsRes.data.length,
          diets: dietsRes.data.length,
          progressEntries: progressRes.data.length,
          bmi: bmiRes?.data || null
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-500 text-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Available Workouts</h3>
            <p className="text-3xl font-bold">{stats.workouts}</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Diet Plans</h3>
            <p className="text-3xl font-bold">{stats.diets}</p>
          </div>
          <div className="bg-purple-500 text-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Progress Entries</h3>
            <p className="text-3xl font-bold">{stats.progressEntries}</p>
          </div>
          <div className="bg-orange-500 text-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">BMI</h3>
            <p className="text-3xl font-bold">
              {stats.bmi ? `${stats.bmi.bmi} (${stats.bmi.category})` : 'N/A'}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Welcome back, {user?.name}!</h2>
          <p className="text-gray-600">
            Track your fitness journey, explore workout plans, and monitor your progress.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

