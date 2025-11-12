import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const AdminDiets = () => {
  const navigate = useNavigate();
  const [diets, setDiets] = useState([]);

  useEffect(() => {
    fetchDiets();
  }, []);

  const fetchDiets = async () => {
    try {
      const response = await api.get('/diets');
      setDiets(response.data);
    } catch (error) {
      console.error('Error fetching diets:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await api.delete(`/diets/${id}`);
      fetchDiets();
    } catch (error) {
      alert('Error deleting diet');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Diet Plans Management</h2>
        <button
          onClick={() => navigate('/dashboard/diets/create')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Create Diet Plan
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diets.map((diet) => (
          <div key={diet._id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">{diet.title}</h3>
            <p className="text-gray-600 mb-4">{diet.description}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => navigate(`/dashboard/diets/edit/${diet._id}`)}
                className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(diet._id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDiets;

