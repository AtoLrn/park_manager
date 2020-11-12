const { DataTypes, Model } = require('sequelize')
const db = require('../db')

class User extends Model {}

User.init(
    {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        admin: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        }
      },
      {
        sequelize: db,
        modelName: 'User',
        tableName: 'users',
      },
)

module.exports = User