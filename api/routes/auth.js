const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController');
const catchAsync = require('../middlewares/errors').catchAsync;

const passport = require('passport');

router.post('/register', catchAsync(authController.controller.register));
router.post('/login', passport.authenticate('local', {session: false}), authController.controller.login);

module.exports = router;