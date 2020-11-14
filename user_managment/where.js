const Park = require('./../models/park')
const noAuthResponse = require('./../authentification/noAuth')

const where = async (req, res) => {
    if (req.session.userId) {
        const place = await Park.findOne({
            where: {
                used_by: req.session.userId
            }
        })

        if (place) {
            res.status(200)
            res.send({ result: 'success', info: {
                parkNumber: place.dataValues.place_number,
                floor: place.dataValues.floor
            }})
        } else {
            res.status(200)
            res.send({ result: 'not find', error: 'No park find'})
        }
    }
    else {
        noAuthResponse(res)
    }
}

module.exports = where
