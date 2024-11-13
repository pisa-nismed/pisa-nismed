<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white rounded-lg shadow-md p-8 w-full max-w-lg">
      <router-link to="/">
        <button class="bg-green-500 text-white rounded-md p-2 hover:bg-green-600 transition">
          Home
        </button>
      </router-link>
      <router-link to="/items">
        <button class="bg-green-500 text-white rounded-md p-2 hover:bg-green-600 transition">
          View All Assessment Items
        </button>
      </router-link>
      <h1 class="text-2xl font-bold mb-6 text-center">Edit Assessment Item</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="text" class="block text-sm font-medium mb-1">Question Text</label>
          <textarea
            v-model="form.text"
            id="text"
            required
            class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            rows="4"
          ></textarea>
        </div>

        <div class="mb-4">
          <label for="type" class="block text-sm font-medium mb-1">Question Type</label>
          <select
            v-model="form.type"
            id="type"
            required
            class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="mul_cho_one">Multiple Choice (One Answer)</option>
            <option value="mul_cho_many">Multiple Choice (Many Answers)</option>
            <option value="short_answer">Short Answer</option>
            <option value="specific_answer">Specific Number or Word</option>
          </select>
        </div>

        <div class="mb-4">
          <label for="choices" class="block text-sm font-medium mb-1">Choices (in JSON format)</label>
          <textarea
            v-model="form.choices"
            id="choices"
            required
            class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          ></textarea>
          <small class="text-gray-500">Example: [{"option_no": 1, "text": "Option 1", "is_correct": true}, {"option_no": 2, "text": "Option 2", "is_correct": false}]</small>
        </div>

        <div class="mb-4">
          <label for="answer" class="block text-sm font-medium mb-1">Correct Answer</label>
          <input
            v-model="form.answer"
            id="answer"
            type="text"
            required
            class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div class="mb-4">
          <label for="explanation" class="block text-sm font-medium mb-1">Explanation</label>
          <textarea
            v-model="form.explanation"
            id="explanation"
            required
            class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          ></textarea>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition"
        >
          Update
        </button>
        <button
          type="button"
          @click="deleteItem"
          class="mt-2 w-full bg-red-500 text-white rounded-md p-2 hover:bg-red-600 transition"
        >
          Delete Item
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useAssessmentItemsStore } from '../stores/assessmentItems';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const store = useAssessmentItemsStore();
    const route = useRoute();
    const router = useRouter();
    const form = ref({
      text: '',
      type: '',
      choices: '',
      answer: '',
      explanation: '',
    });

    const itemId = route.params.id;

    onMounted(async () => {
      await store.fetchItems();
      const item = store.items.find(item => item.id === itemId);

      if (item) {
        form.value = {
          text: item.text,
          type: item.type,
          choices: JSON.stringify(item.choices),
          answer: item.answer,
          explanation: item.explanation,
        };
      } else {
        router.push('/');
      }
    });

    const submitForm = async () => {
      const updatedData = {
        text: form.value.text,
        type: form.value.type,
        choices: JSON.parse(form.value.choices),
        answer: form.value.answer,
        explanation: form.value.explanation,
      };
      await store.updateItem(itemId, updatedData);
      router.push('/'); // Redirect to the list page after updating the item
    };

    const deleteItem = async () => {
      await store.deleteItem(itemId);
      router.push('/'); // Redirect to the list page after deleting the item
    };

    return { form, submitForm, deleteItem };
  },
};
</script>

<style scoped>
/* Add your styling here */
</style>
