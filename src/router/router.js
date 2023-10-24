import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '@/views/frontend/HomeView.vue';
import ErrorView from '@/views/ErrorView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products-view',
      component: () => import('@/views/frontend/ProductsView.vue'),
      children: [
        {
          path: 'products-content/:search',
          component: () => import('@/views/frontend/ProductsContent.vue')
        },
        {
          path: 'products-item/:productId',
          component: () => import('@/views/frontend/ProductsItem.vue')
        }
      ]
    },
    {
      path: '/cart-view',
      component: () => import('@/views/frontend/CartView.vue'),
      children: [
        {
          path: 'cart-list',
          component: () => import('@/views/frontend/CartList.vue')
        },
        {
          path: 'cart-done',
          component: () => import('@/views/frontend/CartDone.vue')
        },
        {
          path: 'checkout/:orderId',
          component: () => import('@/views/frontend/UserCheckout.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/frontend/LoginView.vue')
    },
    {
      path: '/dashboard',
      component: () => import('@/views/backend/Dashboard.vue'),
      children: [
        {
          path: 'products',
          component: () => import('@/views/backend/Products.vue')
        },
        {
          path: 'orders',
          component: () => import('@/views/backend/Orders.vue')
        },
        {
          path: 'coupons',
          component: () => import('@/views/backend/Coupons.vue')
        },
        {
          path: 'storys',
          component: () => import('@/views/backend/Storys.vue')
        },
        {
          path: 'members',
          component: () => import('@/views/backend/Members.vue')
        }
      ]
    },
    {
      path: '/story',
      component: () => import('@/views/frontend/StoryView.vue'),
      children: [
        {
          path: 'list',
          component: () => import('@/views/frontend/StoryList.vue')
        },
        {
          path: 'item/:storyId',
          component: () => import('@/views/frontend/StoryItem.vue')
        }
      ]
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorView
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/error'
    },
  ],
  linkActiveClass: 'active'
});


export default router;
