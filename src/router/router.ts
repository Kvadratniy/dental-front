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
      { path: '/', redirect: { name: 'users' } },
      {
        path: '/users',
        name: 'users',
        component: () => import('@/features/users/usersPage.vue'),
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/features/users/userPage.vue'),
        children: [
          {
            path: ':id',
            component: () => import('@/features/users/userPage.vue'),
          }
        ]
      },
      {
        path: '/sales',
        name: 'sales',
        component: () => import('@/features/sales/salesPage.vue'),
      },
      {
        path: '/discounts',
        name: 'discounts',
        component: () => import('@/features/discounts/discountPage.vue'),
      },
    ]
  },
];

const configService = container.get<ConfigService>(CONFIG_SERVICE_ID);

const router = new VueRouter({
  base: configService.baseUrl,
  routes,
});

router.beforeEach(authMiddleware);

export default router;
