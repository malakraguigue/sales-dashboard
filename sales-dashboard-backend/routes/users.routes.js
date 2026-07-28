const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users.controller')
const authenticate = require('../middleware/authenticate.middleware')
const requireRole = require('../middleware/requireRole.middleware')

/**
 * @swagger
 * /api/users/members:
 *   get:
 *     summary: Liste les membres (utilisateurs) de l'entreprise connectee
 *     responses:
 *       200:
 *         description: Succes
 *       401:
 *         description: Non authentifie
 */
router.get('/members', authenticate, UserController.getMembers)

/**
 * @swagger
 * /api/users/pending:
 *   get:
 *     summary: Liste toutes les invitations de l'entreprise (en attente ou acceptees)
 *     responses:
 *       200:
 *         description: Succes
 *       401:
 *         description: Non authentifie
 */
router.get('/pending', authenticate, UserController.getPendingInvitations)

/**
 * @swagger
 * /api/users/supprimer/{id}:
 *   delete:
 *     summary: Supprime un utilisateur de l'entreprise (reserve aux ADMIN)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Utilisateur supprime
 *       403:
 *         description: Acces refuse (reserve aux ADMIN)
 *       404:
 *         description: Utilisateur introuvable (inexistant ou d'une autre entreprise)
 */
router.delete('/supprimer/:id', authenticate, requireRole('ADMIN'), UserController.deleteUser)
module.exports = router