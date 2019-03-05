const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.controller = {
    async login(req, res, next) {
        // generate jwt
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: 1800 });
        // return jwt
        return res.send({ token });
    },
    async register(req, res, next) {
        const { first_name, last_name, email, password } = req.body;
        const user = new User({ first_name, last_name, email });
        await User.register(user, password);

        res.status(201).send({User: user});
    }
}