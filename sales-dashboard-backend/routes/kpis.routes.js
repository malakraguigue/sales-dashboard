const express = require('express');
const router = express.Router();
const kpisController = require('../controllers/kpis.controller');

router.get('/', kpisController.getKpis);
module.exports = router;
