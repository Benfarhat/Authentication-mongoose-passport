// Entry point
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()

// App Setup
// -- logger middleware
app.use(morgan('combined')) // available options are: tiny / short / dev / common / combined
// -- BodyParser middleware
app.use(bodyParser.json({ type: '*/*'}))

// Server setup
const port = process.env.PORT || 4321
const server = http.createServer(app)
server.listen(port) 

console.log('Launch server on port: ', port)

