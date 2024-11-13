<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white rounded-lg shadow-md p-8 w-full max-w-sm">
      <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
            class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div class="mb-4">
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
            class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition"
        >
          Login
        </button>

        <!-- Show error messages -->
        <p v-if="errorMessage" class="text-red-500 mt-2 text-center">{{ errorMessage }}</p>
      </form>

      <p class="mt-4 text-center">
        Don't have an account? <router-link to="/register" class="text-blue-500">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/authStore';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async handleLogin() {
      const authStore = useAuthStore();
      
      // Trim password to avoid spaces causing issues
      const email = this.email.trim();
      const password = this.password.trim();

      try {
        // Attempt login with the store
        await authStore.login(email, password);
        // Redirect to home page after successful login
        this.$router.push({ name: 'home' });
      } catch (error) {
        // Display error message returned from the store
        this.errorMessage = error.message;
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}
</style>
