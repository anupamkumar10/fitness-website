import { useState, useEffect } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import api from '../utils/api';
import { WeightChart, CaloriesChart } from '../components/ProgressChart';

const Progress = () => {
  const [progress, setProgress] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    caloriesBurned: '',
    caloriesConsumed: '',
    notes: ''
  });

  useEffect(() => {
    fetchProgress();
    fetchStats();
  }, []);

  const fetchProgress = async () => {
    try {
      const response = await api.get('/progress');
      setProgress(response.data);
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/progress/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/progress', formData);
      setShowForm(false);
      setFormData({
        date: new Date().toISOString().split('T')[0],
        weight: '',
        caloriesBurned: '',
        caloriesConsumed: '',
        notes: ''
      });
      fetchProgress();
      fetchStats();
    } catch (error) {
      alert('Error saving progress');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    
    try {
      await api.delete(`/progress/${id}`);
      fetchProgress();
      fetchStats();
    } catch (error) {
      alert('Error deleting entry');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex-1 p-8">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Progress Tracking</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            {showForm ? 'Cancel' : 'Add Entry'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-2xl font-bold mb-4">Add Progress Entry</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Calories Burned</label>
                <input
                  type="number"
                  value={formData.caloriesBurned}
                  onChange={(e) => setFormData({ ...formData, caloriesBurned: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Calories Consumed</label>
                <input
                  type="number"
                  value={formData.caloriesConsumed}
                  onChange={(e) => setFormData({ ...formData, caloriesConsumed: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  rows="3"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Save Entry
            </button>
          </form>
        )}

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-500 text-white p-4 rounded-lg">
              <p className="text-sm">Total Entries</p>
              <p className="text-2xl font-bold">{stats.totalEntries}</p>
            </div>
            <div className="bg-red-500 text-white p-4 rounded-lg">
              <p className="text-sm">Calories Burned</p>
              <p className="text-2xl font-bold">{stats.totalCaloriesBurned}</p>
            </div>
            <div className="bg-green-500 text-white p-4 rounded-lg">
              <p className="text-sm">Calories Consumed</p>
              <p className="text-2xl font-bold">{stats.totalCaloriesConsumed}</p>
            </div>
            <div className="bg-purple-500 text-white p-4 rounded-lg">
              <p className="text-sm">Workouts Completed</p>
              <p className="text-2xl font-bold">{stats.workoutsCompleted}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {stats?.weightHistory && stats.weightHistory.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow">
              <WeightChart data={stats.weightHistory} />
            </div>
          )}
          {stats?.caloriesHistory && stats.caloriesHistory.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow">
              <CaloriesChart data={stats.caloriesHistory} />
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Recent Entries</h2>
          <div className="space-y-4">
            {progress.map((entry) => (
              <div key={entry._id} className="border p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{new Date(entry.date).toLocaleDateString()}</p>
                    {entry.weight && <p>Weight: {entry.weight} kg</p>}
                    {entry.caloriesBurned > 0 && <p>Calories Burned: {entry.caloriesBurned}</p>}
                    {entry.caloriesConsumed > 0 && <p>Calories Consumed: {entry.caloriesConsumed}</p>}
                    {entry.notes && <p className="text-gray-600 mt-2">{entry.notes}</p>}
                  </div>
                  <button
                    onClick={() => handleDelete(entry._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;

