<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white rounded-lg shadow-md p-8 w-full max-w-lg">
      <title>NISMED PISA-like Assessment Items</title>
      <h1 class="text-2xl font-bold mb-4 text-center">Welcome, {{ user.email }}</h1>
      <button
        @click="logout"
        class="w-full bg-red-500 text-white rounded-md p-2 hover:bg-red-600 transition mb-6"
      >
        Logout
      </button>

      <div class="flex justify-center space-x-4">
        <router-link to="/create">
          <button class="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition">
            Create New Assessment Item
          </button>
        </router-link>
        <router-link to="/items">
          <button class="bg-green-500 text-white rounded-md p-2 hover:bg-green-600 transition">
            View All Assessment Items
          </button>
        </router-link>
      </div>
    </div>
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
