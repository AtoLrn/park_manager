const { DataTypes, Model } = require('sequelize')
const db = require('../db')
const User = require('./user')

class Park extends Model {}

Park.init(
    {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        floor: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        place_number: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        available: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        used_by: {
          type: DataTypes.INTEGER,
        }
      },
      {
        sequelize: db,
        modelName: 'Park',
        tableName: 'parks',
      },
)

Park.belongsTo(User, {
  foreignKey: 'used_by'
})

module.exports = Park