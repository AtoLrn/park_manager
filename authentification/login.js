const User = require('./../models/user.js')
const bcrypt = require('bcrypt')
const { checkParams, missingParams } = require('../checkParams.js')

const Login = async (req, res) => {

    const missing = checkParams(['name', 'password'], req.body)
    if (missing.length > 0) {
        return missingParams(res, missing)
    }

    const { name, password } = req.body

    const profil = await User.findOne({
        where: { name }
    }).catch(() => {
        res.sendStatus(500)
    })

    if (profil) {
        const valid = await bcrypt.compare(password, profil.dataValues.password).catch(() => {
            res.sendStatus(500)
        })

        if (valid) {
            req.session.userId = profil.dataValues.id
            req.session.admin = profil.dataValues.admin
            res.status(200)
            res.send({ result: 'success'})
        } else {
            req.session.admin = false
            req.session.userId = null
            res.sendStatus(403)
        }  
    } else {
        res.status(200)
        res.send({ result: 'error', error: 'incorrect Ids'})
    }
    


 

}

module.exports = Login