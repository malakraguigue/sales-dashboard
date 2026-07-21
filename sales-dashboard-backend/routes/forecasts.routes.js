const express = require('express');
const router = express.Router();
const forecastsController = require('../controllers/forecasts.controller');
const authenticate = require('../middleware/authenticate.middleware')
/**
 * @swagger
 * /api/forecasts:
 *   get:
 *     summary: Liste les prévisions de ventes (Prophet), filtrables par horizon
 *     parameters:
 *       - in: query
 *         name: product
 *         schema: { type: string }
 *       - in: query
 *         name: region
 *         schema: { type: string }
 *       - in: query
 *         name: horizon
 *         schema: { type: integer, enum: [30, 60, 90] }
 *     responses:
 *       200:
 *         description: Succès
 *       401:
 *         description: Non authentifié
 */
router.get('/',authenticate,forecastsController.getForecasts);
module.exports = router;