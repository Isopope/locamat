const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Utilisateur= sequelize.define(
    'Utilisateurs',
    {
        idUtilisateur:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull: false,
        },
        uidUtilisateur:{
            type:DataTypes.STRING(255),
            
        },
        nomUtilisateur:{
            type: DataTypes.STRING(30),
            allowNull:false,
            validate: {
                len: [1, 30]
              }
        },
        prenomUtilisateur:{
            type: DataTypes.STRING(30),
            allowNull:false,
            validate: {
                len: [1, 30]
              }
        },
        emailUtilisateur:{
            type: DataTypes.STRING(50),
            allowNull:false,
            unique:true,
            validate: {
                isEmail: true
              }
        },
        matriculeUtilisateur:{
            type: DataTypes.STRING(7),
            allowNull:false,
            unique:true,
            validate: {
                len: [7, 7]
              }
        },
        roleUtilisateur:{
            type: DataTypes.ENUM(["EMPRUNTEUR","ADMINISTRATEUR"]),
            defaultValue:"EMPRUNTEUR",
            allowNull:false,
        },
    }
    
);

Utilisateur.sync({ force: true });
console.log('The table for the User model was just (re)created!');
module.exports = Utilisateur;