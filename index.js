// Entry point
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const router = require('./router')
const mongoose = require('mongoose')

// @see: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
// DB Setup
//Set up default mongoose connection
const mongoDBURL = 'mongodb://127.0.0.1/auth';
mongoose.connect(mongoDBURL);
//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// App Setup
// -- logger middleware
app.use(morgan('combined')) // available options are: tiny / short / dev / common / combined
// -- BodyParser middleware
app.use(bodyParser.json({ type: '*/*'}))
// route handler
router(app)

// Server setup
const port = process.env.PORT || 4321
const server = http.createServer(app)
server.listen(port) 

console.log('Launch server on port: ', port)

