const Joi = require('joi')

/**
 * 
 * @description 获取文章列表参数规则
 */
const ArticleListSchema = Joi.object({
  pageSize: Joi.number(),
  pageNo: Joi.number(),
})

/**
 * 
 * @description 添加文章参数规则
 */
const ArticleAddSchema = Joi.object({
  title: Joi
    .string()
    .required(),
  tags: Joi
    .string()
    .required(),
  content: Joi
    .string()
    .required()
})

/**
 * 
 * @description 文章更新参数规则
 */
const ArticleUpdateSchema = Joi.object({
  id: Joi
    .number()
    .required(),
    // .messages({
    //   'number.base': 'id格式不正确',
    //   'number.required': '{#limit}不能为空',
        // }),
  title: Joi
    .string()
    .required(),
    // .messages({
    //   'string.required': '标题不能为空',
    // }),
  tags: Joi
    .string()
    .required(),
    // .messages({
    //   'string.required': '标签不能为空',
    // }),
  content: Joi
    .string()
    .required()
    // .messages({
    //   'string.required': '文章内容不能为空',
    // }),
})

module.exports = {
  ArticleListSchema,
  ArticleAddSchema,
  ArticleUpdateSchema
}
