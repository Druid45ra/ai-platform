import React from 'react';

const Statistics = ({ models }) => {
  const totalModels = models.length;
  const trainedModels = models.filter(model => model.status === 'trained').length;
  const trainingModels = models.filter(model => model.status === 'training').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-2xl font-bold">{totalModels}</h2>
        <p className="text-gray-600">Total Models</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-2xl font-bold">{trainedModels}</h2>
        <p className="text-gray-600">Trained Models</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-2xl font-bold">{trainingModels}</h2>
        <p className="text-gray-600">Models in Training</p>
      </div>
    </div>
  );
};

export default Statistics;
