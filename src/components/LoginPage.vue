<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <input v-model="email" type="email" placeholder="Email" required />
      </div>
      <div>
        <input v-model="password" type="password" placeholder="Password" required />
      </div>
      <button type="submit">Login</button>

      <!-- Show error messages -->
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>

    <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
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
