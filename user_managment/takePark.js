const Park = require('./../models/park')


const takePark = async (req,res) => {
    if (req.session.userId) {
        const { floor, place_number } = req.body
        const place = await Park.findOne({
            where: {
                floor,
                place_number

            }
        })

        if (place) {
            if (place.dataValues.available) {
                place.update({
                    used_by: req.session.userId,
                    available: false
                })
                res.status(200)
                res.send({ result: 'success', info: {
                    parkNumber: place.dataValues.place_number,
                    floor: place.dataValues.floor
                }})
            } else {
                res.status(403)
                res.send({ result: 'error', error: 'park not available'})
            }
        } else {
            res.sendStatus(500)
        }
    }
    else {
        res.sendStatus(403)
    }
}

module.exports = takePark