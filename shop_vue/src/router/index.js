import store from '@/store';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/:category_slug/:product_sku',
    name: 'product',
    component: () => import('../views/ProductView.vue'),
  },
  {
    path: '/:category_slug',
    name: 'category',
    component: () => import('../views/CategoryView.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchView.vue'),
  },
  {
    path: '/sing-up',
    name: 'singUp',
    component: () => import('../views/SingUpView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/my-accaunt',
    name: 'myAccaunt',
    component: () => import('../views/MyAccauntView.vue'),
    meta: { requireLogin: true },
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/CartView.vue'),
  },
  {
    path: '/cart/checkout',
    name: 'checkout',
    component: () => import('../views/CheckoutView.vue'),
    meta: { requireLogin: true },
  },
  {
    path: '/cart/success',
    name: 'success',
    component: () => import('../views/SuccessView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requireLogin) &&
    !store.state.isAuthenticated
  ) {
    next({ name: 'login', query: { to: to.path } });
  } else {
    next();
  }
});

export default router;
