import { defineStore } from 'pinia';
import PocketBase from 'pocketbase';

// Create a PocketBase client instance
const pb = new PocketBase('https://pisa-nismed.pockethost.io');

export const useAssessmentItemsStore = defineStore('assessmentItems', {
  state: () => ({
    items: [],
  }),

  actions: {
    async fetchItems() {
      try {
        const records = await pb.collection('assessment_items').getList(1, 50); // Get first 50 items
        this.items = records.items;
      } catch (error) {
        console.error('Error fetching assessment items:', error);
      }
    },

    async createItem(itemData) {
      try {
        const createdItem = await pb.collection('assessment_items').create(itemData);
        this.items.push(createdItem);
      } catch (error) {
        console.error('Error creating assessment item:', error);
      }
    },

    async updateItem(id, updatedData) {
      try {
        const updatedItem = await pb.collection('assessment_items').update(id, updatedData);
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
          this.items[index] = updatedItem;
        }
      } catch (error) {
        console.error('Error updating assessment item:', error);
      }
    },

    async deleteItem(id) {
      try {
        await pb.collection('assessment_items').delete(id);
        this.items = this.items.filter(item => item.id !== id);
      } catch (error) {
        console.error('Error deleting assessment item:', error);
      }
    },
  },
});
