const Park = require('./../models/park')

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
            res.sendStatus(418)
        }
        

    } else {
        res.sendStatus(403)
    }
}

module.exports = quitPark