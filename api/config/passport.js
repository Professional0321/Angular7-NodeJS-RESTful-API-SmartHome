const passport = require('passport');
const User = require('../models/user');

module.exports.config = passport.use(User.createStrategy());