const express = require("express");
const router = express.Router();
const dataController = require('../controllers/dataController');
const alarmController = require('../controllers/alarmController');
const catchAsync = require('../middlewares/errors').catchAsync;

router.get('/data', catchAsync(dataController.controller.findAll));
router.post('/data', catchAsync(dataController.controller.create));
router.delete('/data', catchAsync(dataController.controller.removeAll));

//yyyy-mm-dd
router.get('/data/:currentDay', catchAsync(dataController.controller.findByDay));
router.delete('/data/:currentDay', catchAsync(dataController.controller.removeByDay));

router.get('/alarm', catchAsync(alarmController.controller.getStatus));
router.get('/alarm/short', catchAsync(alarmController.controller.getShortStatus));
// if no alarm create one
router.post('/alarm/create', catchAsync(alarmController.controller.createAlarm));

router.post('/alarm/enable', catchAsync(alarmController.controller.enableAlarm));
router.post('/alarm/disable', catchAsync(alarmController.controller.disableAlarm));

module.exports = router;