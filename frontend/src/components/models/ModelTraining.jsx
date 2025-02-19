import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { modelService } from '../../services/models';

const ModelTraining = () => {
  const [trainingStatus, setTrainingStatus] = useState('idle');
  const [progress, setProgress] = useState(0);
  const [modelConfig, setModelConfig] = useState({
    baseModel: 'bert-base-uncased',
    numEpochs: 3,
    learningRate: 0.001,
    batchSize: 16
  });

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setTrainingStatus('preparing');
      try {
        // Create form data with file and config
        const formData = new FormData();
        formData.append('training_data', file);
        formData.append('config', JSON.stringify(modelConfig));

        // Start training
        setTrainingStatus('training');
        const response = await modelService.trainModel(formData);

        // Update progress periodically
        const statusCheckInterval = setInterval(async () => {
          const status = await modelService.getTrainingStatus(response.modelId);
          setProgress(status.progress);
          
          if (status.status === 'completed') {
            clearInterval(statusCheckInterval);
            setTrainingStatus('completed');
          } else if (status.status === 'failed') {
            clearInterval(statusCheckInterval);
            setTrainingStatus('failed');
          }
        }, 5000);

      } catch (error) {
        setTrainingStatus('failed');
        console.error('Training failed:', error);
      }
    }
  }, [modelConfig]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">Train New Model</h2>
      </CardHeader>
      <CardContent>
        {/* Model Configuration */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Model Configuration</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Base Model</label>
              <select
                className="w-full p-2 border rounded"
                value={modelConfig.baseModel}
                onChange={(e) => setModelConfig({
                  ...modelConfig,
                  baseModel: e.target.value
                })}
              >
                <option value="bert-base-uncased">BERT Base Uncased</option>
                <option value="roberta-base">RoBERTa Base</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Number of Epochs</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={modelConfig.numEpochs}
                onChange={(e) => setModelConfig({
                  ...modelConfig,
                  numEpochs: parseInt(e.target.value)
                })}
              />
            </div>
          </div>
        </div>

        {/* File Upload */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
        >
          <input {...getInputProps()} />
          <p className="text-gray-600">
            {isDragActive
              ? 'Drop the training data here...'
              : 'Drag and drop training data, or click to select files'}
          </p>
        </div>

        {/* Training Status */}
        {trainingStatus !== 'idle' && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Training Status</h3>
            <Progress value={progress} className="w-full" />
            
            {trainingStatus === 'failed' && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>
                  Training failed. Please check the logs and try again.
                </AlertDescription>
              </Alert>
            )}
            
            {trainingStatus === 'completed' && (
              <Alert className="mt-4">
                <AlertDescription>
                  Training completed successfully!
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ModelTraining;
Last edited 23 minutes ago
