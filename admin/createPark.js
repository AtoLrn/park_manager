const Park = require('./../models/park')
const { checkParams, missingParams } = require('../checkParams.js')
const notAdmin = require('./noAdmin')

const createPark = async (req, res) => {
    if (req.session.admin) {
        const missing = checkParams(['place_number', 'floor', 'available'],req.body)

        if ( missing.length > 0 ) {
            return missingParams(res, missing)
        }


        const { place_number, floor, available } = req.body

        const existing = await Park.findOne({
            where: {
                place_number,
                floor
            }
        })

        if (!existing) {
            Park.create({
                place_number,
                floor,
                available
            }).then(() => {
                res.sendStatus(200)
            }).catch((err) => {
                console.log(err)
                res.sendStatus(500)
            })
        } else {
            res.send({ result: 'error', error: 'Park already exist'})
        }



        
    } else {
        return notAdmin(res)
    }
}

module.exports = createPark