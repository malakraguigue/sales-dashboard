const express = require('express');
const router = express.Router();
const kpisController = require('../controllers/kpis.controller');
const authenticate = require('../middleware/authenticate.middleware')
/**
 * @swagger
 * /api/kpis:
 *   get:
 *     summary: Récupère les indicateurs clés (KPIs)
 *     responses:
 *       200:
 *         description: Succès
 */
router.get('/',authenticate, kpisController.getKpis);
module.exports = router;
