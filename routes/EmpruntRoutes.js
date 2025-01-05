// routes/empruntRoutes.js
const express = require('express');
const router = express.Router();
const EmpruntController = require('../controllers/EmpruntController');

router.post('/emprunts', EmpruntController.createEmprunt);
router.get('/emprunts/:id', EmpruntController.getMyEmprunts);
router.put('/emprunts/:id', EmpruntController.rendreMateriel);


module.exports = router;
