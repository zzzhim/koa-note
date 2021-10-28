const { DataTypes } = require('sequelize')
const { sequelize } = require('./sequelize')
const dayjs = require('dayjs')

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
    'createTime': {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      // set(value) {
      //   this.setDataValue('createTime', dayjs(value).format('YYYY-MM-DD HH:mm:ss'))
      // }
    },
    'updateTime': {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      // set(value) {
      //   this.setDataValue('updateTime', dayjs(value).format('YYYY-MM-DD HH:mm:ss'))
      // }
    },
    'isDelete': {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0',
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