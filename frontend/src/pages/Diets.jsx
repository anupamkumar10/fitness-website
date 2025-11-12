import { useState, useEffect } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import api from '../utils/api';

const Diets = () => {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDiet, setSelectedDiet] = useState(null);

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      setError('');
      const response = await api.get('/schedule');
      setSchedule(response.data.schedule);
    } catch (error) {
      console.error('Error fetching schedule:', error);
      setError(error.response?.data?.message || 'Please update your profile with height and weight to view your weekly diet plan.');
    } finally {
      setLoading(false);
    }
  };

  const handleDietClick = (day, diet) => {
    if (diet) {
      setSelectedDay(day);
      setSelectedDiet(diet);
    }
  };

  const days = [
    { key: 'monday', label: 'Monday', short: 'Mon', emoji: '🌅' },
    { key: 'tuesday', label: 'Tuesday', short: 'Tue', emoji: '☀️' },
    { key: 'wednesday', label: 'Wednesday', short: 'Wed', emoji: '🌤️' },
    { key: 'thursday', label: 'Thursday', short: 'Thu', emoji: '🌞' },
    { key: 'friday', label: 'Friday', short: 'Fri', emoji: '☀️' },
    { key: 'saturday', label: 'Saturday', short: 'Sat', emoji: '🌅' },
    { key: 'sunday', label: 'Sunday', short: 'Sun', emoji: '🌤️' }
  ];

  const getMealByType = (meals, type) => {
    return meals?.find(meal => meal.mealType === type) || null;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar />
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your weekly diet plan...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar />
        <div className="flex-1 p-8">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm text-red-700 mb-4">{error}</p>
                <button
                  onClick={() => window.location.href = '/dashboard/profile'}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Weekly Diet Plan</h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Day</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Breakfast</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Lunch</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Dinner</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Snacks</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Total Calories</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {days.map((day, index) => {
                  const daySchedule = schedule?.schedule?.[day.key];
                  const diet = daySchedule?.diet;
                  const breakfast = getMealByType(diet?.meals, 'breakfast');
                  const lunch = getMealByType(diet?.meals, 'lunch');
                  const dinner = getMealByType(diet?.meals, 'dinner');
                  const snacks = diet?.meals?.filter(meal => meal.mealType === 'snack') || [];

                  return (
                    <tr key={day.key} className={`hover:bg-green-50 transition ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">{day.emoji}</span>
                          <div>
                            <div className="font-semibold text-gray-900">{day.label}</div>
                            <div className="text-sm text-gray-500">{day.short}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {breakfast ? (
                          <div className="max-w-xs bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                            <div className="font-bold text-gray-900 mb-1 flex items-center">
                              <span className="mr-2">🍳</span>
                              {breakfast.name}
                            </div>
                            <div className="text-xs text-gray-600 mb-2">
                              <span className="font-semibold">Ingredients:</span> {breakfast.ingredients?.slice(0, 3).join(', ')}
                              {breakfast.ingredients?.length > 3 && '...'}
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                                {breakfast.calories} cal
                              </span>
                              <span className="text-xs text-gray-500">Morning</span>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <span className="text-gray-400 italic">-</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {lunch ? (
                          <div className="max-w-xs bg-orange-50 p-3 rounded-lg border border-orange-200">
                            <div className="font-bold text-gray-900 mb-1 flex items-center">
                              <span className="mr-2">🍽️</span>
                              {lunch.name}
                            </div>
                            <div className="text-xs text-gray-600 mb-2">
                              <span className="font-semibold">Ingredients:</span> {lunch.ingredients?.slice(0, 3).join(', ')}
                              {lunch.ingredients?.length > 3 && '...'}
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                                {lunch.calories} cal
                              </span>
                              <span className="text-xs text-gray-500">Midday</span>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <span className="text-gray-400 italic">-</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {dinner ? (
                          <div className="max-w-xs bg-purple-50 p-3 rounded-lg border border-purple-200">
                            <div className="font-bold text-gray-900 mb-1 flex items-center">
                              <span className="mr-2">🍲</span>
                              {dinner.name}
                            </div>
                            <div className="text-xs text-gray-600 mb-2">
                              <span className="font-semibold">Ingredients:</span> {dinner.ingredients?.slice(0, 3).join(', ')}
                              {dinner.ingredients?.length > 3 && '...'}
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                                {dinner.calories} cal
                              </span>
                              <span className="text-xs text-gray-500">Evening</span>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <span className="text-gray-400 italic">-</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {snacks.length > 0 ? (
                          <div className="max-w-xs space-y-2">
                            {snacks.map((snack, idx) => (
                              <div key={idx} className="bg-blue-50 p-2 rounded-lg border border-blue-200">
                                <div className="font-semibold text-sm text-gray-900 flex items-center mb-1">
                                  <span className="mr-1">🍎</span>
                                  {snack.name}
                                </div>
                                <div className="text-xs text-gray-600 mb-1">
                                  {snack.ingredients?.slice(0, 2).join(', ')}
                                  {snack.ingredients?.length > 2 && '...'}
                                </div>
                                <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded">
                                  {snack.calories} cal
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <span className="text-gray-400 italic">-</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {diet ? (
                          <div className="flex flex-col items-center">
                            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-full p-4 mb-2 shadow-lg">
                              <span className="text-3xl font-bold text-white">{diet.calories}</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-700">calories</span>
                            <span className="text-xs text-gray-500 mt-1">Daily total</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {diet ? (
                          <button
                            onClick={() => handleDietClick(day.label, diet)}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                          >
                            View Details
                          </button>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Diet Details Modal */}
        {selectedDiet && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold">{selectedDiet.title} - {selectedDay}</h2>
                <button
                  onClick={() => {
                    setSelectedDiet(null);
                    setSelectedDay(null);
                  }}
                  className="text-white hover:text-gray-200 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">{selectedDiet.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 mb-1">Daily Calories</div>
                    <div className="text-xl font-bold text-green-600">{selectedDiet.calories} cal</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 mb-1">Total Meals</div>
                    <div className="text-xl font-bold text-blue-600">{selectedDiet.meals?.length || 0} meals</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4">Meal Plan</h3>
                <div className="space-y-4">
                  {['breakfast', 'lunch', 'dinner', 'snack'].map((mealType) => {
                    const meal = getMealByType(selectedDiet.meals, mealType);
                    if (!meal) return null;

                    return (
                      <div key={mealType} className="border p-4 rounded-lg hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-lg text-gray-900 capitalize">{mealType}</h4>
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                            {meal.calories} cal
                          </span>
                        </div>
                        <div className="mb-2">
                          <span className="text-gray-700 font-medium">{meal.name}</span>
                        </div>
                        {meal.ingredients && meal.ingredients.length > 0 && (
                          <div>
                            <div className="text-sm text-gray-600 mb-1">Ingredients:</div>
                            <div className="flex flex-wrap gap-2">
                              {meal.ingredients.map((ingredient, index) => (
                                <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                  {ingredient}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Diets;
