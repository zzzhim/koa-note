import { defineConfig } from 'umi'

export default defineConfig({
  mfsu: {
    production: {
      output: '.mfsu-production'
    }
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/login', component: '@/pages/login' },
  ],
  fastRefresh: {},
})
