import React, { useEffect, useState } from 'react';
import { modelService } from '../../services/models';
import ModelCard from './ModelCard';
import Statistics from './Statistics';

const Dashboard = () => {
  const [models, setModels] = useState([]);
  const [stats, setStats] = useState({
    totalModels: 0,
    activeTraining: 0,
    completedTraining: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const modelData = await modelService.getModels();
      setModels(modelData);
      
      setStats({
        totalModels: modelData.length,
        activeTraining: modelData.filter(m => m.status === 'training').length,
        completedTraining: modelData.filter(m => m.status === 'completed').length
      });
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <Statistics stats={stats} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {models.map(model => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

// src/components/dashboard/ModelCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ModelCard = ({ model }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'training': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">{model.name}</h3>
        <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(model.status)}`}>
          {model.status}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{model.description}</p>
      <div className="mb-4">
        <span className="text-sm text-gray-500">Type: {model.type}</span>
        <span className="text-sm text-gray-500 ml-4">Created: {new Date(model.createdAt).toLocaleDateString()}</span>
      </div>
      <Link 
        to={`/models/${model.id}`}
        className="text-indigo-600 hover:text-indigo-800 font-medium"
      >
        View Details →
      </Link>
    </div>
  );
};

export default ModelCard;

// src/components/dashboard/Statistics.jsx
import React from 'react';

const Statistics = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-600">Total Models</h3>
        <p className="text-3xl font-bold mt-2">{stats.totalModels}</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-600">Active Training</h3>
        <p className="text-3xl font-bold mt-2 text-yellow-600">{stats.activeTraining}</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-600">Completed Training</h3>
        <p className="text-3xl font-bold mt-2 text-green-600">{stats.completedTraining}</p>
      </div>
    </div>
  );
};

export default Statistics;
