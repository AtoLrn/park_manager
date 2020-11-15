const User = require('./../models/user')
const Park = require('./../models/park')
const noAuthResponse = require('./../authentification/noAuth')
const bcrypt = require('bcrypt')
const { checkParams, missingParams } = require('../checkParams.js')


const updateInfos = async (req, res) => {
    if (req.session.userId) {
        const { action } = req.query

        const user = await User.findOne({
            where: {
                id: req.session.userId
            }
        })

        if (action === 'delete') {
            return deleteUser(res, user)
        } else if (action === 'modify') {
            return modifyUser(res, user, req.body)
        } else if (action === 'read') {
            return readUser(res, user)
        }
        res.status(400)
        res.send({ result: 'missing query', error: 'Please specify ?action / "read", "delete", "modify"'})

        
    } else {
        noAuthResponse(res)
    }

}

const deleteUser = async (res, user) => {
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

    res.status(200)
    res.send({ result: 'success'})
}

const modifyUser = async (res, user, params) => {
    const missing = checkParams(['email', 'name', 'new_password'],params)
    if ( missing.length > 0 ) {
        return missingParams(res, missing)
    }

    const { email, name, new_password } = params
    const hash = await bcrypt.hash(new_password, 10).catch(() => {res.sendStatus(500)})
    
    user.update({
        name,
        email,
        password: hash
    })

    res.status(200)
    res.send({ result: 'success', infos: {
        name,
        email
    }})
}

const readUser = (res, user) => {
    res.status(200)
    res.send({ result: 'success', infos: {
        name: user.dataValues.name,
        email: user.dataValues.email,
        admin: user.dataValues.admin
    }})
}

module.exports = updateInfos