const Joi = require('joi')

const loginSchema = Joi.object({
  username: Joi
              .string()
              .required()
              .alphanum()
              .min(2)
              .max(13),
              // .prefs({
              //   messages: {
              //     'string.base': '账户格式不正确',
              //     'string.required': '账户不能为空',
              //     'string.min': '账户长度不能少于2',
              //     'string.max': '账户长度不能大于13',
              //     'string.alphanum': '账户格式不正确',
              //   },
              // }),
  password: Joi
              .string()
              .required()
              .alphanum(),
              // .pattern(new RegExp('^admin$'))
              // .messages({
              //   'string.base': '密码格式不正确',
              //   'string.alphanum': '密码格式不正确',
              //   'string.required': '密码不能为空',
              // }),
})

module.exports = {
  loginSchema,
}