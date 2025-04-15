import axios from 'axios';

// Base Axios instance (optional: add baseURL, headers, etc.)
const api = axios.create({
  baseURL: 'http://127.0.0.1',
});

// Fetch users with pagination
export const fetchUsers = async (page = 1, limit = 3) => {
  const { data } = await api.get(`/users`, {
    params: {
      _page: page,
      _limit: limit,
    },
  });
  return data;
};

// Example: Add user (POST)
export const addUser = async (userData) => {
  const { data } = await api.post('/users', userData);
  return data;
};
