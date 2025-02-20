// src/components/models/ModelList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { modelService } from '../../services/models';
import { Loading } from '../common/Loading';

const ModelList = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await modelService.getModels();
        setModels(data);
      } catch (error) {
        console.error('Error fetching models:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  if (loading) return <Loading message="Loading models..." />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Models</h1>
        <Link
          to="/models/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Create New Model
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map(model => (
          <div key={model.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">{model.name}</h3>
            <p className="text-gray-600 mb-4">{model.description}</p>
            <div className="flex justify-between items-center">
              <span className={`px-2 py-1 rounded-full text-sm ${
                model.status === 'trained' ? 'bg-green-100 text-green-800' :
                model.status === 'training' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {model.status}
              </span>
              <Link
                to={`/models/${model.id}`}
                className="text-indigo-600 hover:text-indigo-800"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelList;



