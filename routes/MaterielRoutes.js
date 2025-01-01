const express = require("express");
const router = express.Router();
const MaterielController = require('../controllers/MaterielController');


router.post('/materiels', MaterielController.createMateriel)
module.exports = router;