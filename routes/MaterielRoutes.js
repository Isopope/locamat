const express = require("express");
const router = express.Router();
const MaterielController = require('../controllers/MaterielController');


router.post('/materiels', MaterielController.createMateriel)
router.get('/materiels/:id', MaterielController.getMaterielById)
router.put('/materiels/:id', MaterielController.updateMateriel)
router.delete('/materiels/:id', MaterielController.deleteMateriel)
module.exports = router;