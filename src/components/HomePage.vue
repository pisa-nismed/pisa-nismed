<template>
  <div>
    <h1>Welcome, {{ user.email }}</h1>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/authStore';

export default {
  computed: {
    user() {
      return useAuthStore().user;
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
