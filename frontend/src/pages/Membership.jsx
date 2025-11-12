import { useState, useEffect } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Membership = () => {
  const { user, updateUser } = useAuth();
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    try {
      setError('');
      const response = await api.get('/memberships');
      setMemberships(response.data || []);
    } catch (error) {
      console.error('Error fetching memberships:', error);
      setError(error.response?.data?.message || 'Failed to load membership plans. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (membershipId) => {
    if (!window.confirm('Are you sure you want to purchase this membership?')) return;
    
    try {
      const response = await api.post('/memberships/purchase', { membershipId });
      updateUser({ ...user, membership: response.data.membership._id });
      setMessage('Membership purchased successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      alert(error.response?.data?.message || 'Error purchasing membership');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar />
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading membership plans...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Membership Plans</h1>
        
        {message && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">{message}</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {user?.membership && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700 font-semibold">You have an active membership!</p>
              </div>
            </div>
          </div>
        )}

        {memberships.length === 0 && !error ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Membership Plans Available</h3>
            <p className="text-gray-600 mb-6">
              Membership plans will appear here once they are added by the admin.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memberships.map((membership) => (
              <div
                key={membership._id}
                className={`bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  user?.membership === membership._id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{membership.name}</h3>
                  {user?.membership === membership._id && (
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-4 text-sm">{membership.description}</p>
                <div className="text-3xl font-bold text-blue-600 mb-4">
                  ${membership.price}
                  <span className="text-sm text-gray-600 font-normal">/{membership.duration} days</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {membership.features && membership.features.length > 0 ? (
                    membership.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500 text-sm">No features listed</li>
                  )}
                </ul>
                <button
                  onClick={() => handlePurchase(membership._id)}
                  disabled={user?.membership === membership._id}
                  className={`w-full py-3 rounded-lg font-semibold transition ${
                    user?.membership === membership._id
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                  }`}
                >
                  {user?.membership === membership._id ? 'Current Plan' : 'Purchase Now'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Membership;
