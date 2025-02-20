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
