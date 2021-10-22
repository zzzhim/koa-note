const { UserModel } = require("../model/user")

class Login {
  async login({ username, password }) {
    const res = await UserModel.findOne({
      attributes: [ 'username', 'password', 'id' ],
      where: {
        username,
        password,
      }
    })

    if(res && res.dataValues) {
      return {
        code: 200,
        message: "查询成功",
        data: {
          id: res.dataValues.id,
          username: res.dataValues.username,
          token: res.token,
        }
      }
    }

    return {
      code: 500,
      message: "用户不存在",
      data: {}
    }
  }
}

module.exports = new Login()