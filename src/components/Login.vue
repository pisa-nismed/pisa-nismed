<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="loginUserHandler">
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
      <button type="submit" :disabled="isLoading">Login</button>
    </form>

    <!-- Display Error Message if Login Fails -->
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginUser } from '../services/pocketbase'; // Assuming you have a login function

export default {
  name: 'Login',
  setup() {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const isLoading = ref(false);
    const router = useRouter();

    // Login handler
    const loginUserHandler = async () => {
      isLoading.value = true; // Start loading
      errorMessage.value = ''; // Clear any previous error message

      try {
        // Call the login function
        const response = await loginUser(email.value, password.value);

        // Check if the user is verified
        if (response.emailStatus !== 'verified') {
          errorMessage.value = 'Your account is not verified. Please check your email for the verification link.';
          isLoading.value = false;
          return;
        }

        console.log('Login successful:', response);

        // Redirect to the protected page (e.g., HelloWorld.vue)
        router.push('/hello-world');
      } catch (error) {
        console.error('Login failed:', error);
        errorMessage.value = error.message || 'Login failed. Please try again.'; // Show error message
      } finally {
        isLoading.value = false; // Stop loading
      }
    };

    return {
      email,
      password,
      errorMessage,
      isLoading,
      loginUserHandler,
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
