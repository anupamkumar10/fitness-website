import { useState, useEffect } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import api from '../utils/api';

const Workouts = () => {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

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
      setError(error.response?.data?.message || 'Please update your profile with height and weight to view your weekly workout schedule.');
    } finally {
      setLoading(false);
    }
  };

  const handleWorkoutClick = (day, workout) => {
    if (workout) {
      setSelectedDay(day);
      setSelectedWorkout(workout);
    }
  };

  const days = [
    { key: 'monday', label: 'Monday', short: 'Mon', emoji: '💪' },
    { key: 'tuesday', label: 'Tuesday', short: 'Tue', emoji: '🔥' },
    { key: 'wednesday', label: 'Wednesday', short: 'Wed', emoji: '⚡' },
    { key: 'thursday', label: 'Thursday', short: 'Thu', emoji: '💯' },
    { key: 'friday', label: 'Friday', short: 'Fri', emoji: '🎯' },
    { key: 'saturday', label: 'Saturday', short: 'Sat', emoji: '🏋️' },
    { key: 'sunday', label: 'Sunday', short: 'Sun', emoji: '🧘' }
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar />
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your weekly workouts...</p>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Weekly Workout Schedule</h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Day</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Workout Plan</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Duration</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Difficulty</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Exercises</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Calories</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {days.map((day, index) => {
                  const daySchedule = schedule?.schedule?.[day.key];
                  const workout = daySchedule?.workout;

                  return (
                    <tr key={day.key} className={`hover:bg-blue-50 transition ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
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
                        {workout ? (
                          <div className="max-w-md">
                            <div className="font-bold text-lg text-gray-900 mb-1">{workout.title}</div>
                            <div className="text-sm text-gray-600 line-clamp-2">{workout.description}</div>
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <span className="text-gray-400 italic text-lg">Rest Day</span>
                            <div className="text-sm text-gray-400 mt-1">Take a break!</div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {workout ? (
                          <div className="flex flex-col items-center">
                            <div className="bg-blue-100 rounded-full p-3 mb-2">
                              <span className="text-2xl font-bold text-blue-600">{workout.duration}</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-700">minutes</span>
                            <span className="text-xs text-gray-500 mt-1">Total time</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {workout ? (
                          <div className="flex flex-col items-center">
                            <span className={`px-4 py-2 rounded-full text-sm font-bold mb-2 ${
                              workout.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                              workout.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {workout.difficulty.toUpperCase()}
                            </span>
                            <span className="text-xs text-gray-500">
                              {workout.difficulty === 'beginner' ? 'Easy' :
                               workout.difficulty === 'intermediate' ? 'Moderate' : 'Hard'}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {workout ? (
                          <div className="flex flex-col items-center">
                            <div className="bg-purple-100 rounded-full p-3 mb-2">
                              <span className="text-2xl font-bold text-purple-600">{workout.exercises?.length || 0}</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-700">exercises</span>
                            {workout.exercises && workout.exercises.length > 0 && (
                              <div className="text-xs text-gray-500 mt-1 max-w-[120px] text-center">
                                {workout.exercises.slice(0, 2).map((e, i) => (
                                  <div key={i} className="truncate">{e.name}</div>
                                ))}
                                {workout.exercises.length > 2 && (
                                  <div className="text-gray-400">+{workout.exercises.length - 2} more</div>
                                )}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {workout ? (
                          <div className="flex flex-col items-center">
                            <div className="bg-orange-100 rounded-full p-3 mb-2">
                              <span className="text-2xl font-bold text-orange-600">{workout.calories}</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-700">calories</span>
                            <span className="text-xs text-gray-500 mt-1">burned</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {workout ? (
                          <button
                            onClick={() => handleWorkoutClick(day.label, workout)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
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

        {/* Workout Details Modal */}
        {selectedWorkout && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold">{selectedWorkout.title} - {selectedDay}</h2>
                <button
                  onClick={() => {
                    setSelectedWorkout(null);
                    setSelectedDay(null);
                  }}
                  className="text-white hover:text-gray-200 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">{selectedWorkout.description}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 mb-1">Duration</div>
                    <div className="text-xl font-bold text-blue-600">{selectedWorkout.duration} min</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 mb-1">Difficulty</div>
                    <div className="text-xl font-bold text-green-600 capitalize">{selectedWorkout.difficulty}</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 mb-1">Calories</div>
                    <div className="text-xl font-bold text-orange-600">{selectedWorkout.calories} cal</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4">Exercises</h3>
                <div className="space-y-4">
                  {selectedWorkout.exercises?.map((exercise, index) => (
                    <div key={index} className="border p-4 rounded-lg hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-lg text-gray-900">{exercise.name}</h4>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Sets:</span>
                          <span className="ml-2 font-semibold">{exercise.sets}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Reps:</span>
                          <span className="ml-2 font-semibold">{exercise.reps}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Rest:</span>
                          <span className="ml-2 font-semibold">{exercise.rest}s</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workouts;
