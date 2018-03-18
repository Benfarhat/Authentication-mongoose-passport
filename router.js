const Authentitcation = require('./controllers/authentication')

module.exports = app => {
    app.post('/signup', Authentitcation.signup)
}