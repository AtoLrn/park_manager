const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    'd7b13u21qp0tbi',
    'zzcizptxejyfhf',
    '0d9124ad562229f73bea923e3bc98aaa330faad2b2dcb06ab59033e4b0a6a2ed',
    {
      host: 'ec2-34-246-141-162.eu-west-1.compute.amazonaws.com',
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