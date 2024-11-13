<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white rounded-lg shadow-md p-8 w-full max-w-lg">
      <h1 class="text-2xl font-bold mb-6 text-center">Create Assessment Item</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="text" class="block text-sm font-medium mb-1">Question Text</label>
          <input
            v-model="form.text"
            id="text"
            type="text"
            required
            class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
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
          <small class="text-gray-500">Example: [{"text": "Option 1", "is_correct": true}, {"text": "Option 2", "is_correct": false}]</small>
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
          Submit
        </button>
      </form>
    </div>
  </div>
</template>


<script>
import { useAssessmentItemsStore } from '../stores/assessmentItems';

export default {
  data() {
    return {
      form: {
        text: '',
        type: '',
        choices: '',
        answer: '',
        explanation: '',
      },
    };
  },
  methods: {
    async submitForm() {
      const store = useAssessmentItemsStore();
      const formData = {
        text: this.form.text,
        type: this.form.type,
        choices: JSON.parse(this.form.choices),
        answer: this.form.answer,
        explanation: this.form.explanation,
      };
      await store.createItem(formData);
      this.$router.push('/'); // Redirect to the list page after creating the item
    },
  },
};
</script>

<style scoped>
/* Add your styling here */
</style>
