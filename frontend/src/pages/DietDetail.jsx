import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import api from '../utils/api';

const DietDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [diet, setDiet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDiet();
  }, [id]);

  const fetchDiet = async () => {
    try {
      const response = await api.get(`/diets/${id}`);
      setDiet(response.data);
    } catch (error) {
      console.error('Error fetching diet:', error);
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

  if (!diet) {
    return (
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex-1 p-8">Diet plan not found</div>
      </div>
    );
  }

  const mealsByType = diet.meals?.reduce((acc, meal) => {
    if (!acc[meal.mealType]) acc[meal.mealType] = [];
    acc[meal.mealType].push(meal);
    return acc;
  }, {}) || {};

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 p-8">
        <button
          onClick={() => navigate('/dashboard/diets')}
          className="mb-4 text-blue-600 hover:underline"
        >
          ← Back to Diet Plans
        </button>
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-4">{diet.title}</h1>
          <p className="text-gray-600 mb-6">{diet.description}</p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Daily Calories</p>
              <p className="text-lg font-semibold">{diet.calories}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="text-lg font-semibold">{diet.duration} days</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Meals</p>
              <p className="text-lg font-semibold">{diet.meals?.length || 0}</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4">Meal Plan</h2>
          <div className="space-y-6">
            {Object.entries(mealsByType).map(([type, meals]) => (
              <div key={type}>
                <h3 className="text-xl font-semibold mb-2 capitalize">{type}</h3>
                {meals.map((meal, index) => (
                  <div key={index} className="border p-4 rounded-lg mb-2">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{meal.name}</h4>
                      <span className="text-sm text-gray-600">{meal.calories} cal</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      <strong>Ingredients:</strong> {meal.ingredients?.join(', ') || 'N/A'}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietDetail;

