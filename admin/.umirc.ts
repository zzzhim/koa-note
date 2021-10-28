import { defineConfig } from 'umi'

export default defineConfig({
  base: "/admin",
  mfsu: {
    production: {
      output: '.mfsu-production'
    }
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/login',
      component: '@/pages/login',
      title: "登录"
    },
    {
      exact: false, path: '/dashboard', component: '@/components/layout/index',
      routes: [
        {
          exact: true,
          path: '/dashboard',
          component: '@/pages/dashboard',
          title: "首页",
        }
      ]
    },
    {
      exact: false, path: '/article', component: '@/components/layout/index',
      routes: [
        {
          exact: true,
          path: '/article/list',
          component: '@/pages/article/list',
          title: "列表",
        },
        {
          exact: true,
          path: '/article/add',
          component: '@/pages/article/add',
          title: "新增",
        },
        {
          exact: true,
          path: '/article/edit',
          component: '@/pages/article/edit',
          title: "编辑",
        }
      ]
    },
  ],
  fastRefresh: {},
})
