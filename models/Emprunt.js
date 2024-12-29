const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Utilisateur = require('./Utilisateur');
const Materiel = require('./Materiel');

const Emprunt = sequelize.define(
    'Emprunts',
    {
        idEmprunt: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        dateDemandeEmprunt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        dateDebutEmprunt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        dateFinEmprunt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        dateRenduEmpruntEffectif: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        IdMateriel: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Materiel,
                key: 'IdMateriel',
            },
        },
        idUtilisateur: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Utilisateur,
                key: 'idUtilisateur',
            },
        },
    },
    {
        timestamps: false, 
    }
);

Emprunt.belongsTo(Utilisateur, { foreignKey: 'idUtilisateur' });
Emprunt.belongsTo(Materiel, { foreignKey: 'IdMateriel' });

module.exports = Emprunt;
