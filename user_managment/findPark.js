const Park = require('./../models/park')
const noAuthResponse = require('./../authentification/noAuth')

const findPark = async (req, res) => {
    if (req.session.userId) {

        const availablePark = await Park.findAll({
            where: { available: true, floor: req.query.floor },
            attributes: ['floor', 'place_number']
        }).catch(() => {
            res.sendStatus(500)
        })
    
        const response = availablePark.reduce((acc, park) => {
            acc.push(park.dataValues)
            return acc
        }, [])
    
        res.send({ status: 'success', parks: response})
    } else {
        return noAuthResponse(res)
    }
}

module.exports = findPark