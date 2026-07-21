const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

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
module.exports = router;