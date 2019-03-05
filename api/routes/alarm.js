const express = require("express");
const router = express.Router();
const alarmController = require('../controllers/alarmController');
const catchAsync = require('../middlewares/errors').catchAsync;
const jwtAuth = require('../middlewares/auth');

router.get('/', catchAsync(alarmController.controller.getStatus));
router.get('/short', catchAsync(alarmController.controller.getShortStatus));
// if no alarm create one
router.post('/create', jwtAuth.jwtAuth, catchAsync(alarmController.controller.createAlarm));

router.post('/enable', jwtAuth.jwtAuth, catchAsync(alarmController.controller.enableAlarm));
router.post('/disable', jwtAuth.jwtAuth, catchAsync(alarmController.controller.disableAlarm));

module.exports = router;