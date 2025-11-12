import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import api from '../utils/api';
import { useForm } from 'react-hook-form';

const DietForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [meals, setMeals] = useState([]);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  useEffect(() => {
    if (isEdit) {
      fetchDiet();
    }
  }, [id]);

  const fetchDiet = async () => {
    try {
      const response = await api.get(`/diets/${id}`);
      const diet = response.data;
      setValue('title', diet.title);
      setValue('description', diet.description);
      setValue('calories', diet.calories);
      setValue('duration', diet.duration);
      setMeals(diet.meals || []);
    } catch (error) {
      console.error('Error fetching diet:', error);
    }
  };

  const addMeal = () => {
    setMeals([...meals, { mealType: 'breakfast', name: '', ingredients: [], calories: 0 }]);
  };

  const removeMeal = (index) => {
    setMeals(meals.filter((_, i) => i !== index));
  };

  const updateMeal = (index, field, value) => {
    const updated = [...meals];
    updated[index][field] = value;
    setMeals(updated);
  };

  const addIngredient = (mealIndex, ingredient) => {
    const updated = [...meals];
    if (!updated[mealIndex].ingredients) updated[mealIndex].ingredients = [];
    updated[mealIndex].ingredients.push(ingredient);
    setMeals(updated);
  };

  const removeIngredient = (mealIndex, ingredientIndex) => {
    const updated = [...meals];
    updated[mealIndex].ingredients.splice(ingredientIndex, 1);
    setMeals(updated);
  };

  const onSubmit = async (data) => {
    try {
      const dietData = { ...data, meals };
      if (isEdit) {
        await api.put(`/diets/${id}`, dietData);
      } else {
        await api.post('/diets', dietData);
      }
      navigate('/dashboard/diets');
    } catch (error) {
      alert(error.response?.data?.message || 'Error saving diet plan');
    }
  };

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">{isEdit ? 'Edit' : 'Create'} Diet Plan</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              {...register('title', { required: 'Title is required' })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows="3"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Daily Calories</label>
              <input
                type="number"
                {...register('calories', { required: 'Calories is required', min: 0 })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Duration (days)</label>
              <input
                type="number"
                {...register('duration', { min: 1 })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium">Meals</label>
              <button
                type="button"
                onClick={addMeal}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Add Meal
              </button>
            </div>
            <div className="space-y-4">
              {meals.map((meal, index) => (
                <div key={index} className="border p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <select
                      value={meal.mealType}
                      onChange={(e) => updateMeal(index, 'mealType', e.target.value)}
                      className="px-4 py-2 border rounded-lg"
                    >
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="snack">Snack</option>
                    </select>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Meal name"
                        value={meal.name}
                        onChange={(e) => updateMeal(index, 'name', e.target.value)}
                        className="px-4 py-2 border rounded-lg flex-1"
                      />
                      <input
                        type="number"
                        placeholder="Calories"
                        value={meal.calories}
                        onChange={(e) => updateMeal(index, 'calories', parseInt(e.target.value))}
                        className="px-4 py-2 border rounded-lg w-24"
                      />
                      <button
                        type="button"
                        onClick={() => removeMeal(index)}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        placeholder="Add ingredient"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (e.target.value.trim()) {
                              addIngredient(index, e.target.value.trim());
                              e.target.value = '';
                            }
                          }
                        }}
                        className="px-4 py-2 border rounded-lg flex-1"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {meal.ingredients?.map((ing, ingIndex) => (
                        <span
                          key={ingIndex}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                        >
                          {ing}
                          <button
                            type="button"
                            onClick={() => removeIngredient(index, ingIndex)}
                            className="ml-2 text-red-600"
                          >
                            ×
                          </button>
                        </span>
                      ))}
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
              {isEdit ? 'Update' : 'Create'} Diet Plan
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard/diets')}
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

export default DietForm;

