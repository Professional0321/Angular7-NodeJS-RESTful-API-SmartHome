const express = require("express");
const router = express.Router();
const dataController = require('../controllers/dataController');
const catchAsync = require('../middlewares/errors').catchAsync;
const jwtAuth = require('../middlewares/auth');

router.get('/', catchAsync(dataController.controller.findAll));
router.post('/', jwtAuth.jwtAuth,catchAsync(dataController.controller.create));
router.delete('/',jwtAuth.jwtAuth, catchAsync(dataController.controller.removeAll));

//yyyy-mm-dd
router.get('/:currentDay', catchAsync(dataController.controller.findByDay));
router.delete('/:currentDay', jwtAuth.jwtAuth, catchAsync(dataController.controller.removeByDay));

module.exports = router;