import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout/Layout.vue';

Vue.use(Router);

/*
  redirect:                      if `redirect: noredirect`, it won't redirect if click on the breadcrumb
  meta: {
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    hidden: true                 if true, this route will not show in the sidebar (default is false)
  }
*/

export default new Router({
  // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
      meta: { hidden: true},
    },
    {
      path: '/404',
      name: '404',
      component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue') ,
      meta: { hidden: true },
    },
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      name: 'Dashboard1',
      meta: { hidden: true },
      children: [{
        path: 'dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
      }],
    },
    {
      path: '/log',
      component: Layout,
      redirect: '/log/index',
      name: 'Log',
      meta: { title: 'log', icon: 'form', category: 'home' },
      children: [{
        path: 'index',
        name: 'Log',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/loginlog/index.vue'),
      }],
    },
    {
      path: '/message',
      component: Layout,
      redirect: '/message/index',
      name: 'Log',
      meta: { title: 'message', icon: 'email', category: 'home' },
      children: [{
        path: 'index',
        name: 'message',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/message/index.vue'),
      }],
    },
    {
      path: '/example',
      component: Layout,
      redirect: '/example/table',
      name: 'Example',
      meta: { title: 'Example3', icon: 'example' , category: 'home'  },
      children: [
        {
          path: 'table',
          name: 'Table',
          component: () => import(/* webpackChunkName: "table" */ '@/views/table/index.vue'),
          meta: { title: 'Table', icon: 'table', isChildren: 'yes' },
        },
        {
          path: 'tree',
          name: 'Tree',
          component: () => import(/* webpackChunkName: "tree" */ '@/views/tree/index.vue'),
          meta: { title: 'Tree', icon: 'tree', isChildren: 'yes' },
        },
      ],
    },
    {
      path: '/robot',
      component: Layout,
      redirect: '/robot/index',
      name: 'Robot',
      meta: { title: 'Robot', icon: 'example' , category: 'robot' },
      children: [
        {
          path: 'index',
          name: 'Index',
          component: () => import(/* webpackChunkName: "table" */ '@/views/robot/index.vue'),
          meta: { title: 'Table', icon: 'table' , isChildren: 'yes' },
        },
        {
          path: 'table',
          name: 'robotTable',
          component: () => import(/* webpackChunkName: "tree" */ '@/views/robot/robotTable.vue'),
          meta: { title: 'robotTable', icon: 'table' , isChildren: 'yes' },
        },
      ],
    },
    {
      path: '/form',
      component: Layout,
      redirect: '/form/index',
      meta: { title: 'Form', icon: 'form', category: 'exchange' },
      children: [
        {
          path: 'index',
          name: 'Form',
          component: () => import(/* webpackChunkName: "form" */ '@/views/form/index.vue'),
          meta: { title: 'Form', icon: 'form' },
        },
      ],
    },
    {
      path: '/nested',
      component: Layout,
      redirect: '/nested/menu1',
      name: 'Nested',
      meta: { title: 'Nested', icon: 'nested' },
      children: [
        {
          path: 'menu1',
          component: () => import(/* webpackChunkName: "menu1" */ '@/views/nested/menu1/index.vue'),
          name: 'Menu1',
          meta: { title: 'Menu1' },
          children: [
            {
              path: 'menu1-1',
              component: () => import(/* webpackChunkName: "menu1-1" */ '@/views/nested/menu1/menu1-1/index.vue'),
              name: 'Menu1-1',
              meta: { title: 'Menu1-1' },
            },
            {
              path: 'menu1-2',
              component: () => import(/* webpackChunkName: "menu1-2" */ '@/views/nested/menu1/menu1-2/index.vue'),
              name: 'Menu1-2',
              meta: { title: 'Menu1-2' },
              children: [
                {
                  path: 'menu1-2-1',
                  component: () => import(/* webpackChunkName: "menu1-2-1" */ '@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
                  name: 'Menu1-2-1',
                  meta: { title: 'Menu1-2-1' },
                },
                {
                  path: 'menu1-2-2',
                  component: () => import(/* webpackChunkName: "menu1-2-2" */ '@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
                  name: 'Menu1-2-2',
                  meta: { title: 'Menu1-2-2' },
                },
              ],
            },
            {
              path: 'menu1-3',
              component: () => import(/* webpackChunkName: "menu1-3" */ '@/views/nested/menu1/menu1-3/index.vue'),
              name: 'Menu1-3',
              meta: { title: 'Menu1-3' },
            },
          ],
        },
        {
          path: 'menu2',
          component: () => import(/* webpackChunkName: "menu2" */ '@/views/nested/menu2/index.vue'),
          name: 'Menu2',
          meta: { title: 'Menu2' },
        },
      ],
    },
    {
      path: 'external-link',
      component: Layout,
      children: [
        {
          path: 'https://github.com/Armour/vue-typescript-admin-template',
          meta: { title: 'External Link', icon: 'link' },
        },
      ],
    },
    {
      path: '*',
      redirect: '/404',
      meta: { hidden: true },
    },
  ],
});
