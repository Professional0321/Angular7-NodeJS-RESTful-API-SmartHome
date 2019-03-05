const passport = require('passport');

module.exports.jwtAuth = (req, res, next) => {
    return passport.authenticate('jwt', { session: false })(req, res, next);
}