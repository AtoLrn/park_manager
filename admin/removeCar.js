const Park = require('./../models/park')
const { checkParams, missingParams } = require('../checkParams.js')
const notAdmin = require('./noAdmin')

const removeCar = async (req, res) => {
    if (req.session.admin) {
        const missing = checkParams(['floor', 'place_number'],req.body)
        if ( missing.length > 0 ) {
            return missingParams(res, missing)
        }

        const { floor, place_number } = req.body

        const park = await Park.findOne({
            where: {
                place_number,
                floor
            }
        })

        if (park) {
            park.update({
                used_by: null,
                available: true
            })

            res.status(200)
            return res.send({ result: 'success', success: 'Car removed from the parking'})
        } else {
            res.status(400)
            return res.send({ result: 'error', error: 'Park not find'})
        }

    } else {
        return notAdmin(res)
    }
}

module.exports = removeCar