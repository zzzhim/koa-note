const Koa = require("koa")
const jwt = require("koa-jwt")
const cors = require('@koa/cors')
const logger = require('koa-logger')
const koaBody = require('koa-body')
const { SECRET_KEY } = require("./config")
const { router } = require("./router")

const app = new Koa()

require("./model/sequelize")

app
  .use(logger())
  .use(cors())
  .use(jwt({
    secret: SECRET_KEY,
  }).unless({
    path: [
      /^\/public/,
      /^\/api\/login/,
    ],
  }))
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(4000, () => {
  console.log("server start http://localhost:4000")
})