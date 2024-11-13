<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-3xl font-bold mb-6">Assessment Items</h1>
    <button
      @click="createNewItem"
      class="mb-4 bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition"
    >
      Create New Item
    </button>
    <ul class="grid grid-cols-1 gap-6 w-full max-w-3xl">
      <li v-for="item in items" :key="item.id" class="bg-white rounded-lg shadow-md p-4">
        <div class="flex justify-between items-center">
          <strong class="text-lg">{{ item.text }}</strong>
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


<script>
import { useAssessmentItemsStore } from '../stores/assessmentItems';

export default {
  data() {
    return {
      items: [],
    };
  },
  async created() {
    const store = useAssessmentItemsStore();
    await store.fetchItems();
    this.items = store.items;
  },
  methods: {
    goToEditPage(id) {
      this.$router.push(`/edit/${id}`);
    },
    createNewItem() {
      this.$router.push('/create');
    },
  },
};
</script>

<style scoped>
/* Add your styling here */
</style>
