const express = require('express');
const router = express.Router();
const forecastsController = require('../controllers/forecasts.controller');
router.get('/',authenticate,forecastsController.getForecasts);
module.exports = router;