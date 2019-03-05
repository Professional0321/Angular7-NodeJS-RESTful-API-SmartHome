const passport = require('passport');
const User = require('../models/user');
const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;
const exJWT = passportJWT.ExtractJwt;


module.exports.config = () =>{
    const config = {
        jwtFromRequest: exJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    }
    passport.use(User.createStrategy());
    passport.use(new JWTStrategy(config, (payload, done)=>{
        return User.findOne({_id: payload.id})
        .then(user => {
            return done(null, user);
        })
        .catch(err =>{
            return done(err);
        });
    }));
} 