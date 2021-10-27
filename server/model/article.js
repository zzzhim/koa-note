const { DataTypes } = require('sequelize')
const { sequelize } = require('./sequelize')

const Article = sequelize.define(
  'article',
  {
    'title': {
      type: DataTypes.STRING,
      allowNull: false,
    },
    'content': {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    'tags': {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
)

Article.sync({
  // force: true,
  // alter: true,
})

module.exports = {
  ArticleModel: Article
}

// User.hasOne(Article, {
//   foreignKey: 'id'
// })

// Article.belongsTo(User)