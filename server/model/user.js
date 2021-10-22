const { DataTypes } = require('sequelize')
const jwt = require('jsonwebtoken')
const { sequelize } = require('./sequelize')
const { SECRET_KEY } = require('../config')

const User = sequelize.define(
  'User',
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: { // 虚拟字段
      type: DataTypes.VIRTUAL,
      get() {
        const token = jwt.sign({
          id: this.getDataValue('id'),
          username: this.getDataValue('username'),
          // password: this.getDataValue('password'),
        }, SECRET_KEY, { expiresIn: '6h' })

        return token
      }
    }
  },
  {
    hooks: {
    }
  }
)

User.sync({
  // force: true,
  // alter: true,
})

module.exports = {
  UserModel: User
}

// await User.create({
//   name: "张三",
//   age: 18,
// })

// await User.create({
//   name: "李四",
//   age: 28,
// })

// await User.create({
//   name: "王二",
//   age: 22,
// })

// await User.create({
//   name: "小明",
//   age: 11,
// })

// await User.create({
//   name: "李四",
//   age: 20,
// })

// await User.create({
//   name: "小芳",
//   age: 11,
// })

// await User.create({
//   name: "小李",
//   age: 20,
// })

// User.findAll(
//   {
//     offset: 2 * 2,
//     limit: 2,
//     attributes: [ 'id', [ 'name', 'z_name' ], 'age'],
//     where: {
//       // id: {
//       //   [Op.or]: [ 1, 5 ]
//       // }
//     }
//   },
//   {
    
//   }
// ).then(res => {
//   res.forEach(item => console.log(item.dataValues))
// })

// User.count({
//   where: {
//     age: {
//       [Op.gt]: 18
//     }
//   }
// }).then(res => {
//   console.log(res)
// })

// User.max('age').then(res => {
//   console.log(res)
// })

// User.findAndCountAll({
//   attributes: [ ],
//   where: {
//     id: {
//       [Op.or]: [1, 3]
//     }
//   }
// }).then(({ rows }) => {
//   rows.forEach(item => console.log(item.idName))
// })


// User.findAll({
//   attributes: { include: [[ fn('COUNT', col('id')), 'name']] },
//   where: {
    
//   }
// }).then(res => {
//   res.forEach(item => console.log(item.dataValues))
// })
