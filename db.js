/* eslint-disable no-undef */
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USERNAME,
    process.env.PASSWORD,
    
    {
      host: process.env.HOST,
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      define: {
        createdAt: 'added',
        updatedAt: 'updated',
      }
    },
  )
sequelize.authenticate()
sequelize.sync()

module.exports = sequelize