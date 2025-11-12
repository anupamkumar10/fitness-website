import { useState, useEffect } from 'react';
import api from '../utils/api';

const AdminStats = () => {
  const [stats, setStats] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      fetchStats();
    }
  }, [selectedUserId]);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users/all');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get(`/progress/stats?userId=${selectedUserId}`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">User Progress Statistics</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Select User</label>
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="w-full md:w-64 px-4 py-2 border rounded-lg"
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
      </div>
      {stats && (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
        </div>
      )}
    </div>
  );
};

export default AdminStats;

