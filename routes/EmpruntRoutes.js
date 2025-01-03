// routes/empruntRoutes.js
const express = require('express');
const router = express.Router();
const EmpruntController = require('../controllers/EmpruntController');

router.post('/emprunts', EmpruntController.createEmprunt);


module.exports = router;
