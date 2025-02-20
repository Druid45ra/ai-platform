import React from 'react';
import { Link } from 'react-router-dom';

const ModelCard = ({ model }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
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
  );
};

export default ModelCard;