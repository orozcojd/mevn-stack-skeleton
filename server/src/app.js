const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')
const helmet = require('helmet')

// create express server
const app = express()

app.use(bodyParser.json({ limit: '300kb', extended: true }))

app.use(helmet.hidePoweredBy())
app.disable('x-powered-by')

app.use(morgan('combined'))
app.use(cors({ credentials: true, origin: true }))
app.use(passport.initialize())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
require('./routes')(app)
module.exports = app
