import api from '../config/axiosConfig';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials) => {
      const { data } = await api.post('/auth/login', credentials);
      return data;
    },
  });
};

export const useRegister = () => {
    return useMutation({
      mutationFn: async (userData) => {
        const { data } = await api.post('/auth/register', userData);
        return data;
      },
    });
  };