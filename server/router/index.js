const Router = require('koa-router')
const { articleRouter } = require('./article')
const { loginRouter } = require('./login')

const router = new Router({
  prefix: '/api'
})

router
  .use(loginRouter.routes(), loginRouter.allowedMethods())
  .use(articleRouter.routes(), articleRouter.allowedMethods())

module.exports = {
  router
}