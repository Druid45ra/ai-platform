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

