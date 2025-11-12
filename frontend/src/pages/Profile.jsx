import { useState, useEffect } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState('');
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('age', user.age);
      setValue('height', user.height);
      setValue('weight', user.weight);
      setValue('gender', user.gender);
    }
    fetchBMI();
  }, [user, setValue]);

  const fetchBMI = async () => {
    try {
      const response = await api.get('/users/bmi');
      setBmi(response.data);
    } catch (error) {
      console.error('Error fetching BMI:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await api.put('/users/profile', data);
      updateUser(response.data);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
      fetchBMI();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error updating profile');
    }
  };

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>
        {message && (
          <div className={`p-4 rounded mb-4 ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Age</label>
                <input
                  type="number"
                  {...register('age', { min: 1 })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Height (cm)</label>
                <input
                  type="number"
                  {...register('height', { min: 1 })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Weight (kg)</label>
                <input
                  type="number"
                  {...register('weight', { min: 1 })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Gender</label>
                <select
                  {...register('gender')}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Update Profile
              </button>
            </form>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">BMI Calculator</h2>
            {bmi ? (
              <div className="space-y-4">
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Your BMI</p>
                  <p className="text-4xl font-bold text-blue-600">{bmi.bmi}</p>
                  <p className="text-lg font-semibold mt-2">{bmi.category}</p>
                </div>
                <div className="space-y-2">
                  <p><strong>Height:</strong> {bmi.height} cm</p>
                  <p><strong>Weight:</strong> {bmi.weight} kg</p>
                </div>
                <button
                  onClick={fetchBMI}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                  Recalculate BMI
                </button>
              </div>
            ) : (
              <p className="text-gray-500">Please update your height and weight to calculate BMI</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

