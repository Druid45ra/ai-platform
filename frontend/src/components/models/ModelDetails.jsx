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

// src/components/models/ModelDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { modelService } from '../../services/models';
import { Loading } from '../common/Loading';

const ModelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchModelDetails = async () => {
      try {
        const modelData = await modelService.getModelById(id);
        setModel(modelData);
        if (modelData.metrics) {
          setMetrics(modelData.metrics);
        }
      } catch (error) {
        console.error('Error fetching model details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchModelDetails();
  }, [id]);

  if (loading) return <Loading message="Loading model details..." />;
  if (!model) return <div>Model not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{model.name}</h1>
            <p className="text-gray-600">{model.description}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${
            model.status === 'trained' ? 'bg-green-100 text-green-800' :
            model.status === 'training' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {model.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Model Configuration</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(model.config, null, 2)}
              </pre>
            </div>
          </div>

          {metrics && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(metrics).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">{key}</p>
                    <p className="text-xl font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex space-x-4">
          <button
            onClick={() => navigate(`/models/${id}/train`)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Train Model
          </button>
          <button
            onClick={() => navigate(`/models/${id}/predict`)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Make Predictions
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelDetails;

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
