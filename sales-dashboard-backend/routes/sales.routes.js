const express = require('express');
const router = express.Router();
const salesController = require('../controllers/sales.controller');
const validate = require('../middleware/validate.middleware')
const { SalesPayloadSchema } = require('../shemas/sales.shema');
const authenticate = require('../middleware/authenticate.middleware')
const upload = require('../middleware/upload.middleware')
const requireRole = require('../middleware/requireRole.middleware')
/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Liste les ventes (filtrables par produit, région, catégorie, période)
 *     parameters:
 *       - in: query
 *         name: product
 *         schema: { type: string }
 *       - in: query
 *         name: region
 *         schema: { type: string }
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *       - in: query
 *         name: startDate
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: endDate
 *         schema: { type: string, format: date }
 *     responses:
 *       200:
 *         description: Succès
 *       401:
 *         description: Non authentifié
 */
router.get('/',authenticate, salesController.getSales);

/**
 * @swagger
 * /api/sales/{id}:
 *   get:
 *     summary: Récupère une vente par son id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Succès
 *       404:
 *         description: Vente introuvable
 */
router.get('/:id', authenticate, salesController.getSaleById);

/**
 * @swagger
 * /api/sales/category/{category}:
 *   get:
 *     summary: Liste les ventes d'une catégorie
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Succès
 *       400:
 *         description: Catégorie invalide
 */
router.get('/category/:category', authenticate, salesController.getSalesByCategory);

/**
 * @swagger
 * /api/sales/region/{region}:
 *   get:
 *     summary: Liste les ventes d'une région
 *     parameters:
 *       - in: path
 *         name: region
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Succès
 */
router.get('/region/:region', authenticate, salesController.getSalesByRegion);

/**
 * @swagger
 * /api/sales:
 *   post:
 *     summary: Ajoute une vente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [product, category, region, quantity, amount, sale_date]
 *             properties:
 *               product: { type: string }
 *               category: { type: string, enum: [Furniture, OfficeSupplies, Technology] }
 *               region: { type: string }
 *               quantity: { type: integer }
 *               amount: { type: number }
 *               sale_date: { type: string, format: date }
 *               stock_quantity: { type: integer, nullable: true }
 *     responses:
 *       200:
 *         description: Vente créée
 *       400:
 *         description: Échec de la validation des données
 *       401:
 *         description: Non authentifié
 */
router.post('/',authenticate,requireRole(),validate(SalesPayloadSchema),salesController.ajoutSale);

router.post('/import',authenticate,requireRole(),upload.single('file'),salesController.importSale);


module.exports = router;