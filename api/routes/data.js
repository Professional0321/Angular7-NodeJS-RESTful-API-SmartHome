const express = require("express");
const router = express.Router();
const dataController = require('../controllers/dataController');
const catchAsync = require('../middlewares/errors').catchAsync;

router.get('/', catchAsync(dataController.controller.findAll));
router.post('/', catchAsync(dataController.controller.create));
router.delete('/', catchAsync(dataController.controller.removeAll));

//yyyy-mm-dd
router.get('/:currentDay', catchAsync(dataController.controller.findByDay));
router.delete('/:currentDay', catchAsync(dataController.controller.removeByDay));


module.exports = router;