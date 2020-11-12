const { DataTypes, Model } = require('sequelize')
const db = require('../db')

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
      },
      {
        sequelize: db,
        modelName: 'Park',
        tableName: 'parks',
      },
)

module.exports = Park