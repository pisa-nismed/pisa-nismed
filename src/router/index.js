import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import LoginPage from '../components/LoginPage.vue';
import RegistrationPage from '../components/RegistrationPage.vue';
import HomePage from '../components/HomePage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/register',
    name: 'register',
    component: RegistrationPage,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route Guard to check if the user is authenticated
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  authStore.checkAuth();

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
