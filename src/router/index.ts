import Vue from 'vue';
import Router from 'vue-router';
// import Layout from '@/views/layout/Layout.vue';
const Layout = (resolve: any) => require(/* webpackChunkName: "login" */ ['@/views/layout/Layout.vue'], resolve);

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
      path: '/register',
      name: 'register',
      component: (resolve) => require(/* webpackChunkName: "register" */ ['@/views/login/register.vue'], resolve),
      meta: { hidden: true},
    },

    {
      path: '/404',
      name: '404',
      component: (resolve) => require( ['@/views/404.vue'], resolve) ,
      meta: { hidden: true },
    },
    {
      path: '/',
      name: 'home',
      component: () => import( /* webpackChunkName: "home" */'@/views/home/index.vue'),
      meta: { hidden: true },
    },
    {
      path: '/course',
      name: 'home',
      component: (resolve) => require(['@/views/front/article/index.vue'], resolve),
      meta: { hidden: true },
    },
    {
      path: '/course/detail',
      name: 'home',
      component: (resolve) => require(['@/views/front/article/detail.vue'], resolve),
      meta: { hidden: true },
    },

    // {
    //   path: '/store',
    //   redirect: '/store/index',
    //   name: '',
    //   component: () => import('@/views/home/index.vue'),
    //   meta: { hidden: true },
    // },
    {
      path: '/dashboard',
      component: Layout,
      redirect: '/dashboard/index',
      name: 'Dashboard',
      meta: { title: 'Dashboard', icon: 'form', category: 'console' },
      children: [{
        path: 'index',
        name: 'dashboard',
        component: (resolve) => require( ['@/views/dashboard/index.vue'], resolve),
      }],
    },
    {
      path: '/log',
      component: Layout,
      redirect: '/log/index',
      name: 'Log',
      meta: { title: 'log', icon: 'form', category: 'console' },
      children: [{
        path: 'index',
        name: 'Log',
        component: (resolve) => require(['@/views/loginlog/index.vue'], resolve),
      }],
    },
    {
      path: '/message',
      component: Layout,
      redirect: '/message/index',
      name: 'Log',
      meta: { title: 'message', icon: 'email', category: 'console' },
      children: [{
        path: 'index',
        name: 'message',
        component: (resolve) => require( ['@/views/message/index.vue'], resolve),
      }],
    },
    {
      path: '/console',
      component: Layout,
      redirect: '/console/index',
      name: 'Robot',
      meta: { title: 'Robot', icon: 'example' , category: 'console' },
      children: [
        {
          path: 'index',
          name: 'Index',
          component: (resolve) => require( ['@/views/robot/index.vue'], resolve),
          meta: { title: 'Label', icon: 'table' , isChildren: 'yes' },
        },
        {
          path: 'table',
          name: 'robotTable',
          component: (resolve) => require( ['@/views/robot/robotTable.vue'], resolve),
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
          component: (resolve) => require( ['@/views/form/index.vue'], resolve),
          meta: { title: 'Form', icon: 'form' },
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
      path: '/components',
      component: Layout,
      redirect: 'noredirect',
      name: 'ComponentDemo',
      meta: {
        title: 'Article',
        icon: 'example',
        category: 'console',
      },
      children: [
        {
          path: 'mcreate',
          component: (resolve) => require(['@/views/article/markdown.vue'], resolve),
          name: 'mcreate',
          meta: { title: 'markdown', icon: 'form' },
        },
        {
          path: 'medit/:id(\\d+)',
          component: (resolve) => require(['@/views/article/markdown.vue'], resolve),
          name: 'medit',
          meta: { title: 'markdown', icon: 'edit' , hidden: true },
        },
        {
          path: 'create',
          component: (resolve) => require(['@/views/article/create.vue'], resolve),
          name: 'ArticleCreate',
          meta: { title: 'create', icon: 'edit' },
        },

        {
          path: 'edit/:id(\\d+)',
          component: (resolve) => require(['@/views/article/edit.vue'], resolve),
          name: 'ArticleEdit',
          meta: { title: 'edit', icon: 'form', hidden: true },
        },
        {
          path: 'list',
          component: (resolve) => require(['@/views/article/list.vue'], resolve),
          name: 'ArticleList',
          meta: { title: 'list', icon: 'list' },
        },
        {
          path: 'avatar-upload',
          component: (resolve) => require(['@/views/components/avatarUpload.vue'], resolve),
          name: 'AvatarUploadDemo',
          meta: { title: 'avatarUpload', icon: 'form' },
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
