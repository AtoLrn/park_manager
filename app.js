const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const session = require('express-session')

const User = require("./models/users.js")
const Park = require("./models/park.js")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: 'ùzidhjakudvtqyz',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/parks', async (req, res) => {
    if (req.session.userId) {

        const availablePark = await Park.findAll({
            where: { available: true, floor: req.query.floor },
            attributes: ['id', 'place_number']
        }).catch((err) => {
            res.sendStatus(500)
        })
    
        const response = availablePark.reduce((acc, park) => {
            acc.push(park.dataValues)
            return acc
        }, [])
    
        res.send(JSON.stringify({ status: 'success', parks: response}))
    } else {
        res.sendStatus(403)
    }
})


app.get('/login', async (req, res) => {

    const { name, password } = req.body

    const profil = await User.findOne({
        where: { name }
    }).catch((err) => {
        res.sendStatus(500)
    })
    
    const valid = await bcrypt.compare(password, profil.dataValues.password).catch((err) => {
        res.sendStatus(500)
    })

    if (valid) {
        req.session.userId = profil.dataValues.id
        req.session.admin = true
        res.sendStatus(200)
    } else {
        req.session.admin = false
        req.session.userId = null
        res.sendStatus(403)
    }   

})

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body


    const existing = await User.findAll({
        where: {
            name
        }
    })

    if (!existing) {
        const hash = await bcrypt.hash(password, 10).catch((_err) => {
            res.sendStatus(500)
        })
            
        User.create({
            name,
            email,
            password: hash,
            admin: true
        })
    
        res.send({result: 'success'})
    } else {
        res.send({result: 'existing user'})
    }


})







const port = process.env.PORT ? process.env.PORT : 3000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})