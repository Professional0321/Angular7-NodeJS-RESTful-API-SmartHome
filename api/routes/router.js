const express = require("express");
const router = express.Router();
const dataController = require('../controllers/dataController');
const catchAsync = require('../middlewares/errors').catchAsync;

router.get('/data', catchAsync(dataController.controller.findAll));
router.post('/data', catchAsync(dataController.controller.create));
router.delete('/data', catchAsync(dataController.controller.removeAll));

module.exports = router;