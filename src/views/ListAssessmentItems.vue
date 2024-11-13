<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">

    <h1 class="text-3xl font-bold mb-6">Assessment Items</h1>

    <!-- Button container to align buttons in a row -->
    <div class="flex space-x-4 mb-4">
      <router-link to="/">
        <button class="bg-green-500 text-white rounded-md p-2 hover:bg-green-600 transition">
          Home
        </button>
      </router-link>
      <button
        @click="createNewItem"
        class="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition"
      >
        Create New Item
      </button>
    </div>

    <!-- Grid to display assessment items -->
    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
      <li
        v-for="item in items"
        :key="item.id"
        class="bg-white rounded-lg shadow-md p-4 transition transform hover:scale-105 flex flex-col"
      >
        <QuizItem :item="item" />
        <!-- Edit Button -->
        <div class="flex justify-between items-center mt-4">
          <button
            @click="goToEditPage(item.id)"
            class="bg-yellow-500 text-white rounded-md p-2 hover:bg-yellow-600 transition"
          >
            Edit
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Ensure each card has a consistent height */
li {
  min-height: 200px; /* Adjust as needed for your content */
  display: flex;
  flex-direction: column; /* Keep card contents stacked */
}
</style>


<script>
import { useAssessmentItemsStore } from '../stores/assessmentItems';
import QuizItem from '../components/QuizItem.vue';

export default {
  components: {
    QuizItem, // Import the QuizItem component to display each item
  },
  data() {
    return {
      items: [], // Store for the assessment items
    };
  },
  async created() {
    const store = useAssessmentItemsStore();
    await store.fetchItems();
    this.items = store.items; // Fetch and store the items
  },
  methods: {
    goToEditPage(id) {
      this.$router.push(`/edit/${id}`); // Redirect to the edit page
    },
    createNewItem() {
      this.$router.push('/create'); // Redirect to the create page
    },
  },
};
</script>
