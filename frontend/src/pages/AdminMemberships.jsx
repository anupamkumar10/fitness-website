import { useState, useEffect } from 'react';
import api from '../utils/api';
import { useForm } from 'react-hook-form';

const AdminMemberships = () => {
  const [memberships, setMemberships] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    try {
      const response = await api.get('/memberships');
      setMemberships(response.data);
    } catch (error) {
      console.error('Error fetching memberships:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const membershipData = {
        ...data,
        features: data.features.split('\n').filter(f => f.trim())
      };
      if (editingId) {
        await api.put(`/memberships/${editingId}`, membershipData);
      } else {
        await api.post('/memberships', membershipData);
      }
      setShowForm(false);
      setEditingId(null);
      reset();
      fetchMemberships();
    } catch (error) {
      alert('Error saving membership');
    }
  };

  const handleEdit = (membership) => {
    setEditingId(membership._id);
    setValue('name', membership.name);
    setValue('description', membership.description);
    setValue('price', membership.price);
    setValue('duration', membership.duration);
    setValue('features', Array.isArray(membership.features) ? membership.features.join('\n') : '');
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await api.delete(`/memberships/${id}`);
      fetchMemberships();
    } catch (error) {
      alert('Error deleting membership');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Memberships Management</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            reset();
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Create Membership
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit' : 'Create'} Membership</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input {...register('name', { required: true })} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea {...register('description', { required: true })} rows="3" className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Price</label>
                <input type="number" {...register('price', { required: true })} className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Duration (days)</label>
                <input type="number" {...register('duration', { required: true })} className="w-full px-4 py-2 border rounded-lg" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Features (one per line)</label>
              <textarea
                {...register('features', { required: true })}
                rows="5"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
              />
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                {editingId ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  reset();
                }}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {memberships.map((membership) => (
          <div key={membership._id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">{membership.name}</h3>
            <p className="text-gray-600 mb-4">{membership.description}</p>
            <p className="text-2xl font-bold text-blue-600 mb-4">${membership.price}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(membership)}
                className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(membership._id)}
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

export default AdminMemberships;

