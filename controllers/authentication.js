const User = require('../models/user')

exports.signup = (req, res, next) => {
    console.log(req.body)
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
            res.json({ success: true })
        })
    })
    


}