const mongoose = require('mongoose')
const Schema = mongoose.Schema

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

// @see: http://mongoosejs.com/docs/models.html
// -- Create our model class
const ModelClass = mongoose.model('user', userSchema);

// -- Export our model
module.exports = ModelClass