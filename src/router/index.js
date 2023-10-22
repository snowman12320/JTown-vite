import { createRouter, createWebHashHistory } from 'vue-router'
// import { loginStore } from '@/stores/loginStore' // Import your Pinia store

import HomeView from '@/views/frontend/HomeView.vue'
import ErrorView from '@/views/ErrorView.vue'

const router = createRouter({
  //*https://courses.hexschool.com/courses/vue-20211/lectures/43730454
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
          path: 'products-content/:search', //* 好像要改api，才能解決找不到此路徑的警告>因為有router-link路徑沒寫/:...
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
    }
  ],
  linkActiveClass: 'active'
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.path.startsWith('/dashboard'))) {
//     const loginStore = loginStore() // Initialize your Pinia store
//     // Call the checkLoginStatus function from your Pinia store
//     loginStore
//       .checkLoginStatus()
//       .then((isLogin) => {
//         if (isLogin) {
//           // If logged in, allow navigation to the requested route
//           next()
//         } else {
//           // If not logged in, redirect to the login page or another route
//           next('/login')
//         }
//       })
//       .catch((error) => {
//         console.error('Error checking login status:', error)
//         next('/error') // Handle errors by redirecting to an error route
//       })
//   }
// })

export default router
