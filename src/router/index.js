import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/products-view',
      // name: 'ProductsView',
      component: () => import(/* webpackChunkName: 'about' */ '../views/ProductsView.vue'),
      children: [
        {
          path: 'products-content/:search', //* 好像要改api，才能解決找不到此路徑的警告>因為有router-link路徑沒寫/:...
          component: () => import('../views/ProductsContent.vue')
        },
        {
          path: 'products-item/:productId',
          component: () => import('../views/ProductsItem.vue')
        }
      ]
    },
    {
      path: '/cart-view',
      // name: 'cart-view',
      component: () => import(/* webpackChunkName: 'about' */ '../views/CartView.vue'),
      children: [
        {
          path: 'cart-list',
          component: () => import('../views/CartList.vue')
        },
        {
          path: 'cart-done',
          component: () => import('../views/CartDone.vue')
        },
        {
          path: 'checkout/:orderId',
          component: () => import('../views/UserCheckout.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/dashboard',
      component: () => import('../views/Dashboard.vue'),
      children: [
        {
          path: 'products',
          component: () => import('../views/Products.vue')
        },
        {
          path: 'orders',
          component: () => import('../views/Orders.vue')
        },
        {
          path: 'coupons',
          component: () => import('../views/Coupons.vue')
        },
        {
          path: 'storys',
          component: () => import('../views/Storys.vue')
        },
        {
          path: 'members',
          component: () => import('../views/members.vue')
        }
      ]
    },
    {
      path: '/story',
      component: () => import('../views/StoryView.vue'),
      children: [
        {
          path: 'list',
          component: () => import('../views/StoryList.vue')
        },
        {
          path: 'item/:storyId',
          component: () => import('../views/StoryItem.vue')
        }
      ]
    },
    {
      path: '/rank',
      component: () => import('../views/RankView.vue')
    }
  ]
})

// const router = createRouter({
//   history: createWebHashHistory(),
//   routes,
//   linkActiveClass: 'active'
// })

export default router
