const Park = require('./../models/park')


const createPark = async (req, res) => {
    if (req.session.admin) {
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
        res.sendStatus(403)
    }
}

module.exports = createPark