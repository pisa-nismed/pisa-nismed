import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';  // Import Pinia
import router from './router'; // Vue Router instance
import './style.css';

// Create a new Vue app
const app = createApp(App);

// Create Pinia instance and use it in the app
const pinia = createPinia();
app.use(pinia);

// Use Vue Router
app.use(router);

// Mount the app to the DOM
app.mount('#app');
