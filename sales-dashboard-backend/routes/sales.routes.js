const express = require('express');
const router = express.Router();
const salesController = require('../controllers/sales.controller');

router.get('/', salesController.getSales);
router.get('/:id', salesController.getSaleById);
router.get('/category/:category', salesController.getSalesByCategory);
router.get('/region/:region',salesController.getSalesByRegion);

module.exports = router;