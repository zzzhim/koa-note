const { UserModel } = require("../model/user")
const response = require("../utils/response")

class Login {
  async login({ username, password }) {
    const data = await UserModel.findOne({
      attributes: [ 'username', 'password', 'id' ],
      where: {
        username,
        password,
      }
    })

    if(data && data.dataValues) {
      return response.success(
        200,
        {
          id: data.dataValues.id,
          username: data.dataValues.username,
          token: data.token,
        }
      )
    }

    return response.info(500, {}, '账户或密码错误')
  }
}

module.exports = new Login()