import { createRouter, createWebHistory } from 'vue-router';
import Register from '../components/Register.vue';
import Login from '../components/Login.vue';
import HelloWorld from '../components/HelloWorld.vue';

const routes = [
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  {
    path: '/hello-world',
    component: HelloWorld,
    meta: { requiresAuth: true }, // Protect this route
  },
  { path: '/', redirect: '/login' }, // Default redirect to login
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user')); // Retrieve user from localStorage

  if (to.meta.requiresAuth && !user) {
    next('/login'); // Redirect to login if not authenticated
  } else {
    next(); // Allow navigation
  }
});

export default router;
