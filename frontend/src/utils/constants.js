// API Endpoints
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';
export const LOGIN_ENDPOINT = `${API_BASE_URL}/auth/login`;
export const REGISTER_ENDPOINT = `${API_BASE_URL}/auth/register`;
export const MODELS_ENDPOINT = `${API_BASE_URL}/models`;

// Status Constants
export const STATUS_TRAINED = 'trained';
export const STATUS_TRAINING = 'training';
export const STATUS_PENDING = 'pending';

// Other Constants
export const TOKEN_KEY = 'token';
