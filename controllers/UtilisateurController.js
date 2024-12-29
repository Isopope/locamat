const admin = require("../config/firebase");
const Utilisateur = require("../models/Utilisateur");

exports.createUser = async (request, response) => {
    const { email, password, nomUtilisateur, prenomUtilisateur, matriculeUtilisateur } = request.body;

    try {
        const userFirebase = await admin.auth().createUser({
            email, password, displayName: nomUtilisateur + " " + prenomUtilisateur
        });
        await Utilisateur.create({
            nomUtilisateur,
            prenomUtilisateur,
            uidUtilisateur: userFirebase.uid,
            emailUtilisateur: email,
            matriculeUtilisateur,
            roleUtilisateur: 'EMPRUNTEUR'
        });
        response.status(201).json({ message: "Utilisateur créé avec succès" });
    } catch (error) {
        response.status(500).json({ message: "Erreur lors de la création de l'utilisateur", error: error.message });
    }


}


exports.getAllUsers = async (request, response) => {
    try {
        const users = await Utilisateur.findAll();
        response.status(200).json({
            message: "Tous les utilisateurs ont été récupérés",
            usersList: users
        });
    } catch (error) {
        console.error("Erreur de récupération des utilisateurs :", error);
        response.status(500).json({
            message: "Erreur de récupération des utilisateurs",
            error: error.message
        });
    }
};
