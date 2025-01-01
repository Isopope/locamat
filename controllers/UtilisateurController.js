const admin = require("../config/firebase");
const Utilisateur = require("../models/Utilisateur");

exports.createUser = async (request, response) => {
    const { emailUtilisateur, password, nomUtilisateur, prenomUtilisateur } = request.body;
    const matriculeUtilisateur= Math.floor(Math.random()*1000).toString()+ Date.now().toString().substring(10,13)+'t';
    try {
        const userFirebase = await admin.auth().createUser({
            emailUtilisateur,
            password,
            displayName: `${nomUtilisateur} ${prenomUtilisateur}`,
        });

        await Utilisateur.create({
            nomUtilisateur,
            prenomUtilisateur,
            uidUtilisateur: userFirebase.uid,
            emailUtilisateur: emailUtilisateur,
            matriculeUtilisateur: matriculeUtilisateur,
            roleUtilisateur: 'EMPRUNTEUR',
        });

        response.status(201).json({ message: "Utilisateur créé avec succès" });
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        response.status(500).json({
            message: "Erreur lors de la création de l'utilisateur",
            error: error.message,
        });
    }
};

exports.getAllUsers = async (request, response) => {
    try {
        const users = await Utilisateur.findAll();
        response.status(200).json({
            message: "Tous les utilisateurs ont été récupérés",
            usersList: users,
        });
    } catch (error) {
        console.error("Erreur de récupération des utilisateurs :", error);
        response.status(500).json({
            message: "Erreur de récupération des utilisateurs",
            error: error.message,
        });
    }
};

exports.getUserById = async (request, response) => {
    const id = request.params.id;
    try {
        const user = await Utilisateur.findByPk(id);
        if (user) {
            response.status(200).json({
                message: "Utilisateur récupéré avec succès",
                user,
            });
        } else {
            response.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        console.error("Erreur de récupération de l'utilisateur :", error);
        response.status(500).json({
            message: "Erreur de récupération de l'utilisateur",
            error: error.message,
        });
    }
};
//je suppose un passage de parametre via url
exports.getUserByUid = async (request, response) => {
    const uid = request.params.uid;
    try {
        const user = await Utilisateur.findOne({where:{uidUtilisateur:uid}});
        if (user) {
            response.status(200).json({
                message: "Utilisateur récupéré avec succès",
                user,
            });
        } else {
            response.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        console.error("Erreur de récupération de l'utilisateur :", error);
        response.status(500).json({
            message: "Erreur de récupération de l'utilisateur",
            error: error.message,
        });
    }
};

exports.updateUser = async (request, response) => {
    const id = request.params.id;
    const { nomUtilisateur, prenomUtilisateur, emailUtilisateur, roleUtilisateur } = request.body;

    try {
        const user = await Utilisateur.findByPk(id);
        if (user) {
            await user.update({
                nomUtilisateur,
                prenomUtilisateur,
                emailUtilisateur,
                roleUtilisateur,
            });

            response.status(200).json({ message: "Utilisateur modifié avec succès" });
        } else {
            response.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        console.error("Erreur de modification de l'utilisateur :", error);
        response.status(500).json({
            message: "Erreur de modification de l'utilisateur",
            error: error.message,
        });
    }
};

exports.deleteUser = async (request, response) => {
    try {
        const user = await Utilisateur.findByPk(request.params.id);
        if (user) {
            await Utilisateur.destroy({
                where: {
                    idUtilisateur: request.params.id,
                },
            });

            response.status(200).json({ message: "Utilisateur supprimé avec succès" });
            await admin.auth().deleteUsers(user.uidUtilisateur);//penser a supprimer aussi le user sur firebase
        } else {
            response.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        console.error("Erreur de suppression de l'utilisateur :", error);
        response.status(500).json({
            message: "Erreur de suppression de l'utilisateur",
            error: error.message,
        });
    }
};

exports.login=async(request,response)=>{
    const {frontToken}=request.body;
    try{
        const userToken= await admin.auth().verifyIdToken(frontToken);
        const uid=userToken.uid;
        const userDB= await Utilisateur.findOne({where:{uidUtilisateur:uid}});
        if(userDB){
            response.status(200).json({message:"Utilisateur connecté avec succès", authenticatedUser:userDB.get()});
        }else{
            response.status(404).json({message:"Utilisateur non trouvé"});
        }

    }catch(error){
        console.error("Erreur de connexion de l'utilisateur :", error);
        response.status(500).json({
            message: "Erreur de connexion de l'utilisateur",
            error: error.message,
        });
    }
    
}