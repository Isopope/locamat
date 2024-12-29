const express = require("express");
const router = express.Router();
const authController = require("../controllers/UtilisateurController");

router.post("/register", authController.createUser);
router.get("/utilisateurs", authController.getAllUsers);
module.exports = router;
