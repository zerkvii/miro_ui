import { DEFAULT_LAYOUT } from '@/router/constants';
import { AppRouteRecordRaw } from '../types';

const FORM: AppRouteRecordRaw = {
  path: '/file',
  name: 'file',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.file',
    icon: 'icon-formula',
    requiresAuth: true,
    order: 1,
  },
  children: [
    {
      path: 'music',
      name: 'Music',
      component: () => import('@/views/file/music/index.vue'),
      meta: {
        locale: 'menu.file.music',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'pic',
      name: 'Pic',
      component: () => import('@/views/file/pic/index.vue'),
      meta: {
        locale: 'menu.file.pic',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default FORM;
