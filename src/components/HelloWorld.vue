<template>
  <div>
    <h1>Hello, welcome to your dashboard!</h1>
    <p>You have successfully logged in.</p>
    
    <!-- Logout Button -->
    <button @click="logoutUser">Logout</button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'HelloWorld',
  setup() {
    const router = useRouter(); // Vue Router

    // Logout function
    const logoutUser = () => {
      // Remove user data from localStorage
      localStorage.removeItem('user');

      // Redirect to login page after logout
      router.push('/login');
    };

    return {
      logoutUser,
    };
  },
};
</script>

<style scoped>
button {
  background-color: #ff4757;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
}

button:hover {
  background-color: #e84118;
}
</style>
