const express = require('express');
const router = express.Router();
const InviteController = require('../controllers/invitations.controller')
const authenticate = require('../middleware/authenticate.middleware')
const requireRole = require('../middleware/requireRole.middleware')

router.post('/invite',authenticate,requireRole('ADMIN'),InviteController.inviteUser);
module.exports = router