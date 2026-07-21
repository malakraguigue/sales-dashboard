const express = require('express');
const router = express.Router();
const salesController = require('../controllers/sales.controller');
const validate = require('../middleware/validate.middleware')
const { SalesPayloadSchema } = require('../shemas/sales.shema');
const authenticate = require('../middleware/authenticate.middleware')

router.get('/',authenticate, salesController.getSales);
router.get('/:id', salesController.getSaleById);
router.get('/category/:category', salesController.getSalesByCategory);
router.get('/region/:region',salesController.getSalesByRegion);
router.post('/',authenticate,validate(SalesPayloadSchema),salesController.ajoutSale);
module.exports = router;