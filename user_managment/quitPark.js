const Park = require('./../models/park')
const noAuthResponse = require('./../authentification/noAuth')

const quitPark = async (req, res) => {
    if (req.session.userId) {
        const place = await Park.findOne({
            where: {
                used_by: req.session.userId
            }
        })
    
        if (place) {
            place.update({
                available: true,
                used_by: null
            })
            res.status(200)
            res.send({ result: 'success', info: {
                parkNumber: place.dataValues.place_number,
                floor: place.dataValues.floor
            }})
        } else {
            res.status(404)
            res.send({ result: 'error', error: 'you are not find on any park'})
        }
        

    } else {
        noAuthResponse(res)
    }
}

module.exports = quitPark