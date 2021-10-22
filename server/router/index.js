// const jwt = require('koa-jwt')
const Router = require('koa-router')
const { login } = require("../controllers/login")

const router = new Router({
  prefix: '/api'
})

router.post('/login',async (ctx, next) => {
  const {
    username,
    password
  } = ctx.request.body

  const data = await login({
    username,
    password,
  })

  ctx.body = data
})

module.exports = {
  router
}