<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
    <router-link v-if="!isLoggedIn" to="/register">Register</router-link>
    <button v-if="isLoggedIn" @click="logout">Logout</button>
  </nav>
</template>

<script>
import { useAuthStore } from '../stores/authStore';

export default {
  computed: {
    isLoggedIn() {
      return useAuthStore().isLoggedIn;
    },
  },
  methods: {
    logout() {
      const authStore = useAuthStore();
      authStore.logout();
      this.$router.push({ name: 'login' });
    },
  },
};
</script>
