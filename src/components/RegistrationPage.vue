<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <div>
        <input v-model="email" type="email" placeholder="Email" required />
      </div>
      <div>
        <input v-model="password" type="password" placeholder="Password" required />
      </div>
      <div>
        <input
          v-model="passwordConfirmation"
          type="password"
          placeholder="Confirm Password"
          required
        />
      </div>
      <button type="submit">Register</button>

      <!-- Show error messages -->
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>

    <p>Already have an account? <router-link to="/login">Login here</router-link></p>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/authStore';

export default {
  data() {
    return {
      email: '',
      password: '',
      passwordConfirmation: '',
      errorMessage: '',
    };
  },
  methods: {
    async handleRegister() {
      const authStore = useAuthStore();
      
      // Trim both passwords to avoid issues with spaces
      const password = this.password.trim();
      const passwordConfirmation = this.passwordConfirmation.trim();

      try {
        // Attempt registration with the store
        await authStore.register(this.email, password, passwordConfirmation);

        // Show an alert to check email for verification
        alert('Please check your email for verification before logging in.');

        // Redirect to login page after successful registration
        this.$router.push({ name: 'login' });
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
