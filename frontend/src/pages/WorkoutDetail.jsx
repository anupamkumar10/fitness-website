import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import api from '../utils/api';

const WorkoutDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkout();
  }, [id]);

  const fetchWorkout = async () => {
    try {
      const response = await api.get(`/workouts/${id}`);
      setWorkout(response.data);
    } catch (error) {
      console.error('Error fetching workout:', error);
    } finally {
      setLoading(false);
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

  if (!workout) {
    return (
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex-1 p-8">Workout not found</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 p-8">
        <button
          onClick={() => navigate('/dashboard/workouts')}
          className="mb-4 text-blue-600 hover:underline"
        >
          ← Back to Workouts
        </button>
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-4">{workout.title}</h1>
          <p className="text-gray-600 mb-6">{workout.description}</p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="text-lg font-semibold">{workout.duration} min</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Difficulty</p>
              <p className="text-lg font-semibold capitalize">{workout.difficulty}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Calories</p>
              <p className="text-lg font-semibold">{workout.calories}</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4">Exercises</h2>
          <div className="space-y-4">
            {workout.exercises.map((exercise, index) => (
              <div key={index} className="border p-4 rounded-lg">
                <h3 className="font-semibold text-lg">{exercise.name}</h3>
                <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
                  <p><strong>Sets:</strong> {exercise.sets}</p>
                  <p><strong>Reps:</strong> {exercise.reps}</p>
                  <p><strong>Rest:</strong> {exercise.rest}s</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetail;

