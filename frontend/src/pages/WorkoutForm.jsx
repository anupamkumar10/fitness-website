import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import api from '../utils/api';
import { useForm } from 'react-hook-form';

const WorkoutForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [exercises, setExercises] = useState([]);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  useEffect(() => {
    if (isEdit) {
      fetchWorkout();
    }
  }, [id]);

  const fetchWorkout = async () => {
    try {
      const response = await api.get(`/workouts/${id}`);
      const workout = response.data;
      setValue('title', workout.title);
      setValue('description', workout.description);
      setValue('duration', workout.duration);
      setValue('difficulty', workout.difficulty);
      setValue('calories', workout.calories);
      setExercises(workout.exercises || []);
    } catch (error) {
      console.error('Error fetching workout:', error);
    }
  };

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: 1, reps: '10-12', rest: 60 }]);
  };

  const removeExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const updateExercise = (index, field, value) => {
    const updated = [...exercises];
    updated[index][field] = value;
    setExercises(updated);
  };

  const onSubmit = async (data) => {
    try {
      const workoutData = { ...data, exercises };
      if (isEdit) {
        await api.put(`/workouts/${id}`, workoutData);
      } else {
        await api.post('/workouts', workoutData);
      }
      navigate('/dashboard/workouts');
    } catch (error) {
      alert(error.response?.data?.message || 'Error saving workout');
    }
  };

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">{isEdit ? 'Edit' : 'Create'} Workout</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              {...register('title', { required: 'Title is required' })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows="3"
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
              <input
                type="number"
                {...register('duration', { required: 'Duration is required', min: 1 })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Difficulty</label>
              <select
                {...register('difficulty', { required: 'Difficulty is required' })}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="">Select</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Calories</label>
              <input
                type="number"
                {...register('calories', { min: 0 })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium">Exercises</label>
              <button
                type="button"
                onClick={addExercise}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Add Exercise
              </button>
            </div>
            <div className="space-y-4">
              {exercises.map((exercise, index) => (
                <div key={index} className="border p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <input
                      type="text"
                      placeholder="Exercise name"
                      value={exercise.name}
                      onChange={(e) => updateExercise(index, 'name', e.target.value)}
                      className="px-4 py-2 border rounded-lg"
                    />
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        placeholder="Sets"
                        value={exercise.sets}
                        onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value))}
                        className="px-4 py-2 border rounded-lg w-20"
                      />
                      <input
                        type="text"
                        placeholder="Reps"
                        value={exercise.reps}
                        onChange={(e) => updateExercise(index, 'reps', e.target.value)}
                        className="px-4 py-2 border rounded-lg flex-1"
                      />
                      <input
                        type="number"
                        placeholder="Rest (s)"
                        value={exercise.rest}
                        onChange={(e) => updateExercise(index, 'rest', parseInt(e.target.value))}
                        className="px-4 py-2 border rounded-lg w-24"
                      />
                      <button
                        type="button"
                        onClick={() => removeExercise(index)}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              {isEdit ? 'Update' : 'Create'} Workout
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard/workouts')}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkoutForm;

