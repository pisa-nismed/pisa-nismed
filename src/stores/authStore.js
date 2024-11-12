import { defineStore } from 'pinia';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pisa-nismed.pockethost.io');

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoggedIn: false,
  }),
  actions: {
    async login(email, password) {
      try {
        const authData = await pb.collection('users').authWithPassword(email, password);
        this.user = authData.record;
        this.isLoggedIn = true;
      } catch (error) {
        let errorMessage = 'Login failed';

        // Handle PocketBase-specific errors
        if (error.response) {
          const response = error.response;

          if (response.data) {
            errorMessage = this.formatErrorMessages(response.data);
          } else {
            errorMessage = response.message || 'An unexpected error occurred';
          }
        }

        throw new Error(errorMessage);
      }
    },

    async register(email, password, passwordConfirmation) {
      // Check if passwords match before proceeding

      if (password !== passwordConfirmation) {
        throw new Error('Passwords do not match');
      }

      try {
        const user = await pb.collection('users').create({
          "email": email,
          "password": password,
          "passwordConfirm": passwordConfirmation,
        });

        // Send verification email after registration
        await pb.collection('users').requestVerification(email);
      } catch (error) {
        let errorMessage = 'Registration failed';

        // Handle PocketBase-specific errors
        if (error.response) {
          const response = error.response;

          if (response.data) {
            errorMessage = this.formatErrorMessages(response.data);
          } else {
            errorMessage = response.message || 'An unexpected error occurred';
          }
        }

        throw new Error(errorMessage);
      }
    },

    // Format error messages to be more user-friendly
    formatErrorMessages(data) {
      let formattedErrors = [];

      // Iterate over all fields in the data object and extract error messages
      for (let field in data) {
        if (data.hasOwnProperty(field) && data[field].message) {
          // Check for nested errors in fields like 'email', 'password', 'identity'
          const errorMessage = `${field.charAt(0).toUpperCase() + field.slice(1)}: ${data[field].message}`;
          formattedErrors.push(errorMessage);
        }
      }

      // If we have multiple errors, join them with a line break
      return formattedErrors.join('\n') || 'There was an error';
    },

    logout() {
      pb.authStore.clear(); // Clear the user session
      this.user = null;
      this.isLoggedIn = false;
    },

    checkAuth() {
      this.isLoggedIn = pb.authStore.isValid;
      if (this.isLoggedIn) {
        this.user = pb.authStore.model;
      }
    },
  },
});
