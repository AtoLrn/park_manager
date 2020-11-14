const express = require('express')
const app = express()
const session = require('express-session')

const Login = require('./authentification/login.js')
const Register = require('./authentification/register.js')

const findPark = require('./user_managment/findPark.js')
const where = require('./user_managment/where.js')
const quitPark = require('./user_managment/quitPark.js')
const takePark = require('./user_managment/takePark.js')

const createPark = require('./admin/createPark')
const parkStats = require('./admin/parkStats')
const updateInfos = require('./user_managment/updateInfos.js')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: 'ùzidhjakudvtqyz',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        // eslint-disable-next-line no-undef
        secure: process.env.PORT ? true : false,
        maxAge: 60000
     }
  }))

// eslint-disable-next-line no-unused-vars
app.use((error, req, _res, _next) => {
    console.log(error)
    req.sendStatus(500)
})

app.get('/', (_req, res) => {
  res.send('Welcome on the HomePage of the Park Manager')
})

app.post('/login', Login)
app.post('/register', Register)
app.post('/user', updateInfos)

app.get('/parks', findPark)
app.get('/where', where)
app.post('/takePark', takePark)
app.post('/quitPark', quitPark)

app.post('/createPark', createPark)
app.get('/parkStats', parkStats)

// eslint-disable-next-line no-undef
const port = process.env.PORT ? process.env.PORT : 3000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})