import axios from 'axios';

const API_URL = 'https://pisa-nismed.pockethost.io'; // Replace with your PocketHost API URL

export const authService = {
  // Register a new user
  async register(email, password) {
    try {
      const response = await axios.post(`${API_URL}/api/collections/users/records`, {
        email,
        password,
      });
      return response.data; // Return the response data (user data)
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  // Login user with email and password
  async login(email, password) {
    try {
      const response = await axios.post(`${API_URL}/api/collections/users/auth-with-password`, {
        identity: email,
        password,
      });
      localStorage.setItem('auth_token', response.data.token); // Store token in localStorage
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  // Logout user
  async logout() {
    try {
      const token = localStorage.getItem('auth_token');
      if (token) {
        await axios.post(`${API_URL}/api/collections/users/auth-logout`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        localStorage.removeItem('auth_token');
      }
    } catch (error) {
      console.error('Logout error', error);
    }
  },

  // Get the current authenticated user
  async getCurrentUser() {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await axios.get(`${API_URL}/api/collections/users/auth-me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch current user');
    }
  },
};
