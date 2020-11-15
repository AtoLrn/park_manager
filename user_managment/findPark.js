const Park = require('./../models/park')
const noAuthResponse = require('./../authentification/noAuth')
const { Op } = require('sequelize')

const findPark = async (req, res) => {
    if (req.session.userId) {

        if (req.query.floor) {
            const availablePark = await Park.findAll({
                where: { 
                    available: true, 
                    floor: req.query.floor, 
                    [Op.or]: [
                        { used_by: null },
                        { used_by: req.session.userId }
                    ]},
                    attributes: ['floor', 'place_number']
            }).catch(() => {
                res.sendStatus(500)
            })
        
            const response = availablePark.reduce((acc, park) => {
                acc.push(park.dataValues)
                return acc
            }, [])
            res.status(200)
            return res.send({ result: 'success', parks: response})
        } else {
            res.status(400)
            return res.Send({ result: 'error', error: 'missing floor query'})
        }

    } else {
        return noAuthResponse(res)
    }
}

module.exports = findPark