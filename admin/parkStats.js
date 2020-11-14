const Park = require('./../models/park')
const User = require('./../models/User')
const { Op } = require('sequelize')

const parkStats = async (req, res) => {
    if (req.session.admin) {
        if (req.query.find === 'free') {
            const { count, rows } = await Park.findAndCountAll({
                where: {
                    used_by: null
                }
            })
    
            
            res.status(200)
            res.send({ result: 'success', infos: { freePark: count, parks: rows.reduce((acc, park) => {
                acc.push({ place_number: park.dataValues.place_number, floor: park.dataValues.floor })
                return acc
            }, [])}})

        } else if (req.query.find === 'taken') {
            
            const { count, rows } = await Park.findAndCountAll({
                where: {
                    [Op.not]: {
                        used_by: null
                    }      
                },
                include: {
                    model: User, as: 'User'
                }
            })

            res.status(200)
            res.send({ result: 'success', infos: { freePark: count, parks: rows.reduce((acc, park) => {
                acc.push({ place_number: park.dataValues.place_number, floor: park.dataValues.floor, user: { 
                    name: park.dataValues.User.dataValues.name, 
                    mail: park.dataValues.User.dataValues.email
                } })
                return acc
            }, [])}})
        }

        
    } else {
        res.sendStatus(403)
    }
}

module.exports = parkStats