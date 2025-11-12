import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');

  const menuItems = [
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'workouts', label: 'Workouts', icon: '💪' },
    { id: 'diets', label: 'Diets', icon: '🥗' },
    { id: 'memberships', label: 'Memberships', icon: '⭐' },
    { id: 'stats', label: 'Statistics', icon: '📊' }
  ];

  return (
    <ProtectedRoute adminOnly={true}>
      <div className="min-h-screen bg-gray-100">
        <div className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
        <div className="container mx-auto p-8">
          <div className="bg-white rounded-lg shadow">
            <div className="flex border-b">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    navigate(`/admin/${item.id}`);
                  }}
                  className={`px-6 py-4 font-semibold ${
                    activeTab === item.id
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Admin;

