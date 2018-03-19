const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

// @see: http://mongoosejs.com/docs/guide.html
// -- Define ou model
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String
})

// @see: http://mongoosejs.com/docs/middleware.html#order
// -- On Save Hook, encrypt password

// Beware!!!! for whatever reason, it doesn't work wwith es6 arrow syntax
userSchema.pre('save', function(next) {
    const user = this
    bcrypt.genSalt(10, (err, salt) => {
        if(err) {return next(err)}
        // Hash password using salt
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if(err) {return next(err)}

            user.password = hash
            next()      
        })
    })
  });

userSchema.methods.comparePassword = (candidatePassword, callback) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) { return callback(err) }

        callback(null, isMatch)
    })
}


// @see: http://mongoosejs.com/docs/models.html
// -- Create our model class
const ModelClass = mongoose.model('user', userSchema);

// -- Export our model
module.exports = ModelClass