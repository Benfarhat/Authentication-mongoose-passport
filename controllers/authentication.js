const jwt = require('jwt-simple')
const User = require('../models/user')
const config = require('../config')

function tokenForUser(user){
    // @see: https://tools.ietf.org/html/rfc7519
    const timestamp = new Date().getTime()
    // -- Payload / "Charge utile":
    // ---- sub for subject (mean who is this talking about)
    //          We use "id" instead of "email", because "email" can be changed at anytime.
    // ---- iat is another convention of jwt which mean "issued at" time
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signin = (req, res, next) => {
    // User has already their email and password auth'd
    // We just need to give them a token
    res.send({ token: tokenForUser(req.user)})
}

exports.signup = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password


    if (!email || !password) {
        // 422 Unprocessable Entity
        return res.status(422).send({ error: 'You must provide email and password' })
    }
    
    // Check if a user with a given email exists?
    User.findOne({email}, (err, existingUser) => {
        if (err) { return next(err) }
        
        // If a user with email does exist, return an error (remember it's signup logic and not signin)
        if (existingUser){
            // 422 Unprocessable Entity
            return res.status(422).send({ error: 'Email already exist' })
        }

        // if a user with email does NOT exist, create a save user record
        const user = new User({email, password})

        user.save(err => {
            if(err) { return next(err) }
            // Respond to request indicagting the user was created
            // res.json(user)
            res.json({ token: tokenForUser(user) })
        })
    })
    


}