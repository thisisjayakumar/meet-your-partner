// services/authService.js
import api from '../config/axiosConfig';

// Direct API functions without React Query hooks
export const loginUser = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials);
  return data;
};

export const registerUser = async (userData) => {
  const { data } = await api.post('/auth/register', userData);
  return data;
};

// Custom hooks that can be used with or without React Query
export const useLogin = () => {
  return {
    mutateAsync: loginUser,
    isLoading: false // You'll need to manage loading state manually
  };
};

export const useRegister = () => {
  return {
    mutateAsync: registerUser,
    isLoading: false // You'll need to manage loading state manually
  };
};