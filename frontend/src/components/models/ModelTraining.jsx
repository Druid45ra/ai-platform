// src/components/models/ModelTraining.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { modelService } from '../../services/models';

const ModelTraining = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trainingConfig, setTrainingConfig] = useState({
    epochs: 10,
    batchSize: 32,
    learningRate: 0.001,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    setTrainingConfig(prev => ({
      ...prev,
      [name]: name === 'epochs' || name === 'batchSize' ? parseInt(value) : parseFloat(value)
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('trainingData', selectedFile);
      formData.append('config', JSON.stringify(trainingConfig));

      await modelService.trainModel(id, formData);
      navigate(`/models/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6">Train Model</h1>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Training Data
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Epochs
              </label>
              <input
                type="number"
                name="epochs"
                value={trainingConfig.epochs}
                onChange={handleConfigChange}
                className="w-full border-gray-300 rounded-md shadow-sm"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Batch Size
              </label>
              <input
                type="number"
                name="batchSize"
                value={trainingConfig.batchSize}
                onChange={handleConfigChange}
                className="w-full border-gray-300 rounded-md shadow-sm"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Learning Rate
              </label>
              <input
                type="number"
                name="learningRate"
                value={trainingConfig.learningRate}
                onChange={handleConfigChange}
                className="w-full border-gray-300 rounded-md shadow-sm"
                step="0.0001"
                required
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate(`/models/${id}`)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? 'Training...' : 'Start Training'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModelTraining;
