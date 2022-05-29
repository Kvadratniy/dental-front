import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { authMiddleware } from '@/router/auth.middleware';
import container from '@/di';
import { CONFIG_SERVICE_ID, ConfigService } from '@/config';

import MainLayout from '@/layouts/mainLayout.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/auth',
    name: 'auth',
    meta: { title: '' },
    component: () => import('@/features/auth/Auth.vue'),
  },

  {
    path: '/',
    component: MainLayout,
    meta: {
      hasAuth: true,
    },
    children: [
      { path: '/', redirect: { name: 'account' } },
      {
        path: '/users',
        name: 'users',
        component: () => import('@/features/users/usersPage.vue'),
      },
      {
        path: '/user',
        name: 'create-user',
        component: () => import('@/features/users/registrationPage.vue'),
      },

      {
        path: '/user/:id',
        name: 'user-subs',
        props: true,
        component: () => import('@/features/users/subscribesPage.vue'),
      },
      // ПРОДАЖИ
      {
        path: '/sales',
        name: 'sales',
        component: () => import('@/features/sales/salesPage.vue'),
      },

      // {
      //   path: '/sale',
      //   name: 'sale',
      //   props: true,
      //   component: () => import('@/features/sales/createSale.vue'),
      // },


      {
        path: '/discounts',
        name: 'discounts',
        component: () => import('@/features/discounts/discountPage.vue'),
      },
      {
        path: '/discount',
        name: 'create-discount',
        component: () => import('@/features/discounts/createDiscount.vue'),
        children: [
          {
            name: 'user-profile',
            path: ':id',
            component: () => import('@/features/users/registrationPage.vue'),
          }
        ]
      },

      {
        path: '/account',
        name: 'account',
        component: () => import('@/features/users/accountPage.vue'),
      },

      {
        path: '/services',
        name: 'services',
        props: true,
        component: () => import('@/features/services/servicesPage.vue'),
      },

      {
        path: '/service',
        name: 'create-service',
        component: () => import('@/features/services/createService.vue'),
      },
    ]
  },
];

const configService = container.get<ConfigService>(CONFIG_SERVICE_ID);

const router = new VueRouter({
  mode: 'history',
  base: configService.baseUrl,
  routes,
});

router.beforeEach(authMiddleware);

export default router;
