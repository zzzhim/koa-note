const { DataTypes } = require('sequelize')
const { sequelize } = require('./sequelize')

// const { User } = require('./user')

const Article = sequelize.define(
  'article',
  {
    'content': {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }
)

Article.sync()

// User.hasOne(Article, {
//   foreignKey: 'id'
// })

// Article.belongsTo(User)