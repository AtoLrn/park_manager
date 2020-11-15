const Park = require('./../models/park')
const noAuthResponse = require('./../authentification/noAuth')
const { checkParams, missingParams } = require('../checkParams.js')
const { Op } = require('sequelize')


const takePark = async (req,res) => {
    if (req.session.userId) {
        const missing = checkParams(['floor', 'place_number'], req.body)

        if (missing.length > 0) {
            return missingParams(res, missing)
        }

        const { floor, place_number } = req.body
        const place = await Park.findOne({
            where: {
                floor,
                place_number,
                [Op.or]: [
                    { used_by: null },
                    { used_by: req.session.userId }
                ]
                
            }
        })

        if (place) {
            if (place.dataValues.available) {
                place.update({
                    used_by: req.session.userId,
                    available: false
                })
                res.status(200)
                return res.send({ result: 'success', info: {
                    parkNumber: place.dataValues.place_number,
                    floor: place.dataValues.floor
                }})
            } else {
                res.status(403)
                return res.send({ result: 'error', error: 'park already used'})
            }
        } else {
            res.status(403)
            return res.send({ result: 'error', error: 'park not find'})
        }
    }
    else {
        return noAuthResponse(res)
    }
}

module.exports = takePark