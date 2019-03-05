const express = require("express");
const router = express.Router();
const alarmController = require('../controllers/alarmController');
const catchAsync = require('../middlewares/errors').catchAsync;


router.get('/', catchAsync(alarmController.controller.getStatus));
router.get('/short', catchAsync(alarmController.controller.getShortStatus));
// if no alarm create one
router.post('/create', catchAsync(alarmController.controller.createAlarm));

router.post('/enable', catchAsync(alarmController.controller.enableAlarm));
router.post('/disable', catchAsync(alarmController.controller.disableAlarm));

module.exports = router;