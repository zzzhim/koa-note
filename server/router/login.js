const Router = require('koa-router')
const { login } = require("../controllers/login")
const { loginValidate } = require('../validate/login')

const router = new Router()

router.post('/login', loginValidate, async (ctx, next) => {
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
  loginRouter: router
}