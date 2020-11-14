const User = require('./../models/user.js')
const { Op } = require('sequelize')
const bcrypt = require('bcrypt')

const Register = async (req, res) => {
    const { name, email, password, admin } = req.body


    const existing = await User.findOne({
        where: {
            [Op.or]: {
                name,
                email
            }        
        }
    })

    if (!existing) {
        const hash = await bcrypt.hash(password, 10).catch(() => {res.sendStatus(500)})
            
        User.create({
            name,
            email,
            password: hash,
            admin
        })
        res.status(200)
        res.send({result: 'success'})
    } else {
        const errors = []

        if (existing.dataValues.name === name) {
            errors.push('Name already used')
        }
    
        if (existing.dataValues.email === email) {
            errors.push('Email already used')
        }

        res.status(200)
        res.send({result: 'error', error: errors })
    }


}

module.exports = Register