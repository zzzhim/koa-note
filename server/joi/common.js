const Joi = require('joi')

/**
 * 
 * @description 获取文章列表参数规则
 */
const CommonIdSchema = Joi.object({
  id: Joi.number().required(),
})

module.exports = {
  CommonIdSchema,
}
