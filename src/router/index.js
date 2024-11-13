import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import LoginPage from '../views/LoginPage.vue';
import RegistrationPage from '../views/RegistrationPage.vue';
import HomePage from '../views/HomePage.vue';

import ListAssessmentItems from '../views/ListAssessmentItems.vue';
import CreateAssessmentItem from '../views/CreateAssessmentItem.vue';
import EditAssessmentItem from '../views/EditAssessmentItem.vue';


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
  
  {
    path: '/create',
    name: 'create-assessment',
    component: CreateAssessmentItem,
    meta: { requiresAuth: true },
  },
  {
    path: '/edit/:id',
    name: 'edit-assessment',
    component: EditAssessmentItem,
    meta: { requiresAuth: true },
  },
  {
    path: '/items',
    name: 'view-assessments',
    component: ListAssessmentItems,
    meta: { requiresAuth: true },
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
