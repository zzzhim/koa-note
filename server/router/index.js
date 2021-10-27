// const jwt = require('koa-jwt')
const Router = require('koa-router')
const { add } = require('../controllers/article')
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


router.post('/article/list',async (ctx, next) => {
  const { id, username } = ctx.state.user

  ctx.body = 111
})

router.post('/article/add',async (ctx, next) => {
  const { title, tags, content } = ctx.request.body

  const data = await add({ title, tags, content })

  ctx.body = data
})

module.exports = {
  router
}