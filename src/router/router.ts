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
    children: [
      { path: '/', redirect: { name: 'users' } },
      {
        path: '/users',
        name: 'users',
        component: () => import('@/features/users/usersPage.vue'),
      }
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
