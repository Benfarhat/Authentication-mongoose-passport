const passport = require('passport')
const User = require('../models/user')
const config = require('../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')

/*
Auth Flow

    * Signing Up
        --> Verify email is not in use create pwd with brypt
            --> Create and return Token

    * Signing In      
        --> Verify Email/Password With LOCAL STRATEGY (find user and compare password with bcrypt)
            --> Find and return Token

    * Auth's Request  
        --> Verify Token with JWT STRATEGY
            --> Allow Resource Access

*/

// -======================-
// -=== LOCAL STRATEGY ===- 
// -======================-

// Setup options for Local Strategy
const localOptions = {
    usernameField: 'email', // default to 'username'
    passwordField: 'password' // default to 'password'
}
// Create local strategy
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    // Verify this username and password, call done ith the user
    // if it's the correct username and password
    // otherwise, call done with false
    User.findOne({ email }, (err, user) => {
        if (err) { return done(err, false) }

        if(!user) {
            done(null, false)
        } else {
            // compare passwords - Is password equal to user.password
            done(null, false) 
        }
    })

})



// -====================-
// -=== JWT STRATEGY ===- 
// -====================-


// Setup options for JWT Strategy
const jwtOptions = {
    // If you want to test this with postman or RestClient
    // -- Just create a custom header (authorization) and set it with a valide tokan from db
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