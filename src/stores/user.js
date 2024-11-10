// src/stores/user.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,  // User details
    token: localStorage.getItem('auth_token') || null,  // Token saved in localStorage
  }),
  actions: {
    // Log the user in
    login(userData, token) {
      this.user = userData;
      this.token = token;
      localStorage.setItem('auth_token', token);  // Save token to localStorage
    },
    // Log the user out
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('auth_token');  // Remove token from localStorage
    },
  },
});
