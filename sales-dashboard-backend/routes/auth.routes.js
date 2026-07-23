const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authenticate = require('../middleware/authenticate.middleware')

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Crée un nouveau compte utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName, lastName, email, password]
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Compte créé
 *       409:
 *         description: Un compte existe déjà avec cet email
 */
router.post("/register",authController.register)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connecte un utilisateur et pose les cookies de session (accessToken/refreshToken)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connecté
 *       401:
 *         description: Email ou mot de passe incorrect
 */
router.post("/login",authController.login)
/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: récuperer mes données 
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur connecté
 *       401:
 *         description: utilisateur non connecté
 */
router.get("/me",authenticate,authController.getMe)//cette route servira le frontend afin qu'il sache qui est connecté apres un refresh

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Deconnecte l'utilisateur (efface les cookies de session)
 *     responses:
 *       200:
 *         description: Déconnecté
 */
router.post("/logout",authenticate,authController.logout)
module.exports = router;