const express = require('express');
const router = express.Router();
const InviteController = require('../controllers/invitations.controller')
const authenticate = require('../middleware/authenticate.middleware')
const requireRole = require('../middleware/requireRole.middleware')

/**
 * @swagger
 * /api/invitations/invite:
 *   post:
 *     summary: Invite un utilisateur a rejoindre l'entreprise (reserve aux ADMIN)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, role]
 *             properties:
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [ADMIN, MANAGER, USER]
 *     responses:
 *       200:
 *         description: Invitation creee et email envoye
 *       403:
 *         description: Acces refuse (reserve aux ADMIN)
 *       409:
 *         description: Un compte existe deja avec cet email
 */
router.post('/invite',authenticate,requireRole('ADMIN'),InviteController.inviteUser);

/**
 * @swagger
 * /api/invitations/accept:
 *   post:
 *     summary: Accepte une invitation et cree le compte utilisateur correspondant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token, password, firstName, lastName]
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Compte cree
 *       404:
 *         description: Invitation introuvable
 *       409:
 *         description: Invitation expiree ou deja acceptee
 */
router.post('/accept',InviteController.acceptInvitation);

module.exports = router