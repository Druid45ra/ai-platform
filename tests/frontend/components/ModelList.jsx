import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ModelList from '../../../frontend/src/components/models/ModelList';
import { modelService } from '../../../frontend/src/services/models';

jest.mock('../../../frontend/src/services/models');

describe('ModelList Component', () => {
  const mockModels = [
    {
      id: 1,
      name: 'Test Model 1',
      description: 'Test Description 1',
      status: 'trained'
    },
    {
      id: 2,
      name: 'Test Model 2',
      description: 'Test Description 2',
      status: 'training'
    }
  ];

  beforeEach(() => {
    modelService.getModels.mockResolvedValue(mockModels);
  });

  it('renders list of models', async () => {
    render(
      <BrowserRouter>
        <ModelList />
      </BrowserRouter>
    );

    expect(screen.getByText('Loading models...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Test Model 1')).toBeInTheDocument();
      expect(screen.getByText('Test Model 2')).toBeInTheDocument();
    });
  });

  it('handles error state', async () => {
    modelService.getModels.mockRejectedValue(new Error('Failed to fetch'));

    render(
      <BrowserRouter>
        <ModelList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Error loading models')).toBeInTheDocument();
    });
  });
});
