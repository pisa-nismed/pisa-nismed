import { defineStore } from 'pinia';
import pb from '../services/pocketbase';

// Pinia store to manage user authentication state (logged in or not)
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoading: false,
    error: null,
  }),

  actions: {
    async login(email, password) {
      this.isLoading = true;
      this.error = null;
      try {
        // Log in the user using Pocketbase
        const loggedInUser = await pb.auth.login(email, password);  // Correct login method
        this.user = loggedInUser;  // Store user object after login
      } catch (err) {
        this.error = err;  // Show error from Pocketbase
      } finally {
        this.isLoading = false;
      }
    },

    async register(email, password) {
      this.isLoading = true;
      this.error = null;
      try {
        // Register the user using pb.auth.createUser
        const user = await pb.collection('users').create({
          email: email,
          password: password,
        });

        // Optionally, send a verification email (if needed)
        await pb.collection('users').requestVerification(user.email);

        this.user = user;  // Store the newly registered user
      } catch (err) {
        this.error = err;  // Show error from Pocketbase
      } finally {
        this.isLoading = false;
      }
    },

    async logout() {
      this.isLoading = true;
      this.error = null;
      try {
        // Log out the current user
        await pb.auth.logout();  // Correct logout method
        this.user = null;  // Clear user data on logout
      } catch (err) {
        this.error = err;  // Show error from Pocketbase
      } finally {
        this.isLoading = false;
      }
    },

    checkUser() {
      // Check if a user is logged in when the app starts
      this.user = pb.authStore.model;  // This fetches the currently authenticated user from Pocketbase
    },
  },
});
