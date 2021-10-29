const { loginSchema } = require("../joi/login")
const response = require("../utils/response")

async function loginValidate(ctx, next) {
  try {
    const { username, password } = ctx.request.body

    const value = await loginSchema.validateAsync({ username, password })

    return next()
  } catch (error) {
    ctx.body = response.warning(500, {}, error)
  }
}

module.exports = {
  loginValidate
}
