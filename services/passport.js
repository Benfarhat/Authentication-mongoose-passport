const passport = require('passport')
const User = require('../models/user')
const config = require('../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
}

// Create JWT strategy
// -- Payload is the decoded JWT Token
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    // Check if the user ID in the payload exists in our DB
    // If it does, call 'done' with that other
    // otherwise, call 'done' without a user object
    User.findById(payload.sub, (err, user) => {
        if (err) { return done(err, false) }

        if(user) {
            done(null, user) // user found
        } else {
            done(null, false) // user not found 
        }
    })

})

// Tell passport to use this strategy
passport.use(jwtLogin)