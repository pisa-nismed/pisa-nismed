<template>
  <div>
    <h1>Logout</h1>
    <button @click="logoutUser">Logout</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { logoutUser } from '../services/pocketbase';

export default {
  name: 'Logout',
  setup() {
    const logoutUserHandler = async () => {
      try {
        await logoutUser();
        localStorage.removeItem('user');  // Remove user data from localStorage
        console.log('Logout successful!');
        alert('Logout successful!');
        // Optionally redirect to login page after logout
        // this.$router.push('/login');
      } catch (error) {
        console.error('Error during logout', error);
        alert('Error during logout. Please try again.');
      }
    };

    return {
      logoutUserHandler,
    };
  },
};
</script>
