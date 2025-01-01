const express = require("express");
const router = express.Router();
const userController = require("../controllers/UtilisateurController");
router.get("/utilisateurs", userController.getAllUsers);
router.get("/utilisateurs/:id", userController.getUserById);
router.get("/utilisateurs/:uid", userController.getUserByUid);
router.put("/utilisateurs/:id", userController.updateUser);
router.delete("/utilisateurs/:id", userController.deleteUser);
module.exports = router;
