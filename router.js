const Authentication = require('./controllers/authentication')
const passportService = require('./services/passport')
const passport = require('passport')

// helper / auth middleware

// In the case of an API server that typically require credentials to supplied with each request (basic strategy),
// session support can be safely disabled
const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

module.exports = app => {
    app.get('/', requireAuth, (req, res) => res.send({ authorization: 'done'}))

    app.post('/signin', requireSignin, Authentication.signin)
    /*
    Equivalent to:

    app.post('/signin',  passport.authenticate('jwt', { session: false }), (req, res) => {
        res.send({ token: tokenForUser(req.user)})
    })
    // -- tokenForUser iis implemented in controller/authentication.js
    */
    app.post('/signup', Authentication.signup)
}