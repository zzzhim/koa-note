const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('sql_data', 'root', 'huowenkeji', {
  host: 'localhost',
  dialect: 'mysql', /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
  define: {
    charset: "utf8",
  },
  dialectOptions: {
    charset: "utf8",
  }
})

try {
  (async () => {
    await sequelize.authenticate()
  })()
} catch (error) {
  
}

module.exports = {
  sequelize
}
