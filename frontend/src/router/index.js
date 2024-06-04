import { createRouter, createWebHistory } from 'vue-router';
import TenantTracker from '../components/TenantTracker.vue';

const routes = [
  {
    path: '/',
    name: 'TenantTracker',
    component: TenantTracker
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
