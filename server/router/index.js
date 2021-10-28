// const jwt = require('koa-jwt')
const Router = require('koa-router')
const { add, list, del } = require('../controllers/article')
const { login } = require("../controllers/login")

const router = new Router({
  prefix: '/api'
})

router.post('/login', async (ctx, next) => {
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


router.get('/article/list', async (ctx, next) => {
  const { pageSize = 10, pageNo = 1 } = ctx.query

  const data = await list({ pageSize, pageNo })

  ctx.body = data
})

router.post('/article/add', async (ctx, next) => {
  const { title, tags, content } = ctx.request.body

  const data = await add({ title, tags, content })

  ctx.body = data
})


router.post('/article/del', async (ctx, next) => {
  const { id } = ctx.request.body

  const data = await del({ id })

  ctx.body = data
})

module.exports = {
  router
}