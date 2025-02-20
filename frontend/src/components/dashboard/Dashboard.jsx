import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getModels } from '../../services/api';
import ModelCard from './ModelCard';
import Statistics from './Statistics';
import Loading from '../common/Loading';

const Dashboard = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await getModels();
        setModels(data);
      } catch (error) {
        console.error('Error fetching models:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  if (loading) return <Loading message="Loading dashboard..." />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link
          to="/models/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Create New Model
        </Link>
      </div>

      <Statistics models={models} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {models.map(model => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
