const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController');

const passport = require('passport');
router.post('/register', authController.controller.register);
router.post('/login', passport.authenticate('local', {session: false}), authController.controller.login);


module.exports = router;