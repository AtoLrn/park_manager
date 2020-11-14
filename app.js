const express = require('express')
const app = express()
const session = require('express-session')

const Park = require("./models/park.js");

const Login = require('./authentification/login.js');
const Register = require('./authentification/register.js');
const findPark = require('./user_managment/findPark.js');

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: 'ùzidhjakudvtqyz',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: process.env.PORT ? true : false,
        maxAge: 60000
     }
  }))

app.use((error, req, _res, _next) => {
    console.log(error)
    req.sendStatus(500)
})

app.get('/', (_req, res) => {
  res.send('Welcome on the HomePage of the Park Manager')
})


app.get('/parks', findPark)


app.post('/login', Login)
app.post('/register', Register)

app.post('/quitPark', async (req, res) => {
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
})
app.get('/where', async (req, res) => {
    if (req.session.userId) {
        const place = await Park.findOne({
            where: {
                used_by: req.session.userId
            }
        })

        if (place) {
            res.status(200)
            res.send({ result: 'success', info: {
                parkNumber: place.dataValues.place_number,
                floor: place.dataValues.floor
            }})
        } else {
            res.status(200)
            res.send({ result: 'not find', error: 'No park find'})
        }
    }
    else {
        res.sendStatus(403)
    }
})

app.post('/takePark', async (req,res) => {
    if (req.session.userId) {
        const { floor, place_number } = req.body
        const place = await Park.findOne({
            where: {
                floor,
                place_number

            }
        })

        if (place) {
            if (place.dataValues.available) {

                place.update({
                    used_by: req.session.userId,
                    available: false
                })

                res.status(200)
                res.send({ result: 'success', info: {
                    parkNumber: place.dataValues.place_number,
                    floor: place.dataValues.floor
                }})
            } else {
                res.status(403)
                res.send({ result: 'error', error: 'park not available'})
            }

        } else {
            res.sendStatus(500)
        }
        

    }
    else {
        res.sendStatus(403)
    }
})

const port = process.env.PORT ? process.env.PORT : 3000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})