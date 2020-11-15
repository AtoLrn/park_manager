const Park = require('./../models/park')
const User = require('./../models/user')
const { Op } = require('sequelize')
const notAdmin = require('./noAdmin')

const parkStats = async (req, res) => {
    if (req.session.admin) {
        if (req.query.find === 'free') {
            return freePark(res)
        } else if (req.query.find === 'taken') {
            return takenPark(res)
        } else if (req.query.find === 'count') {
            return statsPark(res)  
        } else {
            res.status(400)
            res.send({ result: 'error', error: 'You must define "find"'})
        }
    }
    else {
        return notAdmin(res)
    }
}

const statsPark = async (res) => {
    const number = await Park.count()

    const numberOfFree = await Park.count({
        where: {
            used_by: null
        }
    })

    const numberOfTaken = await Park.count({
        where: {
            available: false
        }
    })

    const numberOfReserved = await Park.count({
        where: {
            available: true,
            [Op.not]: {
                used_by: null
            }
        }
    })

    res.status(200)
    res.send({ result: 'success', infos: {
        freePark: numberOfFree,
        reservedPark: numberOfReserved,
        takenPark: numberOfTaken
    }, stats: {
        occupancy: numberOfTaken / number,
        reserved: numberOfReserved / number,
        free: numberOfFree / number
    }})

}


const takenPark = async (res) => {       
    const { count, rows } = await Park.findAndCountAll({
        where: {
            [Op.not]: {
                used_by: null
            }      
        },
        include: {
            model: User, as: 'User'
        }
    })

    res.status(200)
    res.send({ result: 'success', infos: { freePark: count, parks: rows.reduce((acc, park) => {
        acc.push({ place_number: park.dataValues.place_number, floor: park.dataValues.floor, takenSince:  park.dataValues.updated,
            user: { 
            name: park.dataValues.User.dataValues.name, 
            mail: park.dataValues.User.dataValues.email
        } })
        return acc
    }, [])}})
}

const freePark = async (res) => {
    const { count, rows } = await Park.findAndCountAll({
        where: {
            used_by: null
        }
    })

    res.status(200)
    res.send({ result: 'success', infos: { freePark: count, parks: rows.reduce((acc, park) => {
        acc.push({ place_number: park.dataValues.place_number, floor: park.dataValues.floor, freeSince:  park.dataValues.updated})
        return acc
    }, [])}})
}

module.exports = parkStats