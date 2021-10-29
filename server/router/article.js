const Router = require('koa-router')
const { add, list, del, details, update } = require('../controllers/article')
const { articleUpdateValidate, articleAddValidate, articleListValidate } = require('../validate/article')
const { commomIdValidate } = require('../validate/common')

const router = new Router({
  prefix: '/article'
})

// 获取文章列表
router.get('/list', articleListValidate, async (ctx, next) => {
  const { pageSize = 10, pageNo = 1 } = ctx.query

  const data = await list({ pageSize, pageNo })

  ctx.body = data
})

// 添加文章
router.post('/add', articleAddValidate, async (ctx, next) => {
  const { title, tags, content } = ctx.request.body

  const data = await add({ title, tags, content })

  ctx.body = data
})

// 更新指定文章
router.post('/update', articleUpdateValidate, async (ctx, next) => {
  const { id, title, tags, content } = ctx.request.body

  const data = await update({ id, title, tags, content })

  ctx.body = data
})

// 删除文章
router.post('/del', commomIdValidate, async (ctx, next) => {
  const { id } = ctx.request.body

  const data = await del({ id })

  ctx.body = data
})

// 获取文章详情
router.get('/details', commomIdValidate, async (ctx, next) => {
  const { id } = ctx.query

  const data = await details({ id })

  ctx.body = data
})

module.exports = {
  articleRouter: router
}