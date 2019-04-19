
const frontRouter = {
  path: '/front',
  name: 'frontArticle',
  meta: {hidden: true},
  children: [
    {
      path: 'detail',
      component: () => import('@/views/front/article/detail.vue'),
      name: 'frontArticleDetail',
    },
    {
      path: 'index',
      component: () => import('@/views/front/article/index.vue'),
      name: 'frontArticleIndex',
    },
  ],
};
export default frontRouter;
