const Park = require('./../models/park')
const noAuthResponse = require('./../authentification/noAuth')

const reserve = async (req, res) => {
    if (req.session.userId) {
        const { floor, place_number } = req.body

        const place = await Park.findOne({
            where: {
                floor,
                place_number,
                used_by: null
            }
        })

        if (place) {   
            place.update({
                used_by: req.session.userId
            })
            res.status(200)
            res.send({ result: 'success', info: 'You have reserved the park'})

        } else {
            res.send({ result: 'error', error: 'Place don t exist or is already used'})
        }

    } else {
        noAuthResponse(res)
    }
}

module.exports = reserve