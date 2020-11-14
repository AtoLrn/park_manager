const User = require('./../models/User')
const Park = require('./../models/Park')
const noAuthResponse = require('./../authentification/noAuth')
const bcrypt = require('bcrypt')


const updateInfos = async (req, res) => {
    if (req.session.userId) {
        const { action } = req.query

        const user = await User.findOne({
            where: {
                id: req.session.userId
            }
        })

        if (action === 'delete') {
            const usedParks = await Park.findAll({
                where: {
                    used_by: user.dataValues.id
                }
            })

            for (const park of usedParks) {
                await park.update({
                    used_by: null,
                    available: true
                })
            }
            user.destroy()
        } else if (action === 'modify') {
            const { email, name, password } = req.body
            const hash = await bcrypt.hash(password, 10).catch(() => {res.sendStatus(500)})
            
            user.update({
                name,
                email,
                password: hash
            })
        }

        res.sendStatus(200)
        
    } else {
        noAuthResponse(res)
    }

}

module.exports = updateInfos