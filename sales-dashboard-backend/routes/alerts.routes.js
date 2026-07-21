const express = require('express');
const router = express.Router();
const alertsController=require('../controllers/alerts.controller')
const authenticate = require('../middleware/authenticate.middleware')
/**
 * @swagger
 * /api/alerts:
 *   get:
 *     summary: Liste les alertes (écarts significatifs entre ventes réelles et prévues)
 *     responses:
 *       200:
 *         description: Succès
 *       401:
 *         description: Non authentifié
 */
router.get('/',authenticate, alertsController.getAlerts);
module.exports = router;