<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="registerUserHandler">
      <input
        type="email"
        v-model="email"
        placeholder="Email"
        required
      />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <input
        type="password"
        v-model="passwordConfirm"
        placeholder="Confirm Password"
        required
      />
      <button type="submit" :disabled="isLoading">Register</button>
    </form>

    <!-- Display Error Message if Registration Fails -->
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <p>Already have an account? <router-link to="/login">Login here</router-link></p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { registerUser } from '../services/pocketbase'; // Assuming you have a function for registration

export default {
  name: 'Register',
  setup() {
    const email = ref('');
    const password = ref('');
    const passwordConfirm = ref('');
    const errorMessage = ref('');
    const isLoading = ref(false);
    const router = useRouter();

    // Registration handler
    const registerUserHandler = async () => {
      isLoading.value = true; // Start loading
      errorMessage.value = ''; // Clear any previous error message

      // Basic password confirmation check
      if (password.value !== passwordConfirm.value) {
        errorMessage.value = 'Passwords do not match.';
        isLoading.value = false;
        return;
      }

      try {
        const response = await registerUser(email.value, password.value); // Call the registration function
        console.log('Registration successful:', response);

        // Redirect to login page after successful registration
        router.push('/login');
      } catch (error) {
        console.error('Registration failed:', error);
        errorMessage.value = error.message || 'Registration failed. Please try again.'; // Show error message
      } finally {
        isLoading.value = false; // Stop loading
      }
    };

    return {
      email,
      password,
      passwordConfirm,
      errorMessage,
      isLoading,
      registerUserHandler,
    };
  },
};
</script>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}

button:disabled {
  opacity: 0.5;
}

router-link {
  color: #007bff;
  text-decoration: none;
}

router-link:hover {
  text-decoration: underline;
}
</style>
