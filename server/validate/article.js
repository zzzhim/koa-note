const { ArticleUpdateSchema, ArticleAddSchema, ArticleListSchema } = require("../joi/article")
const response = require("../utils/response")

/**
 * 
 * @description 校验获取文章列表参数
 * @method GET
 */
async function articleListValidate(ctx, next) {
  try {
    const { pageSize, pageNo } = ctx.query

    const value = await ArticleListSchema.validateAsync({ pageSize, pageNo })

    return next()
  } catch (error) {
    ctx.body = response.warning(500, {}, error)
  }
}

/**
 * 
 * @description 校验更新文章参数
 * @method POST
 */
async function articleUpdateValidate(ctx, next) {
  try {
    const { id, title, tags, content } = ctx.request.body

    const value = await ArticleUpdateSchema.validateAsync({ id, title, tags, content })

    return next()
  } catch (error) {
    ctx.body = response.warning(500, {}, error)
  }
}

/**
 * 
 * @description 校验添加文章参数
 * @method POST
 */
async function articleAddValidate(ctx, next) {
  try {
    const { title, tags, content } = ctx.request.body

    const value = await ArticleAddSchema.validateAsync({ title, tags, content })

    return next()
  } catch (error) {
    ctx.body = response.warning(500, {}, error)
  }
}

module.exports = {
  articleListValidate,
  articleAddValidate,
  articleUpdateValidate
}
