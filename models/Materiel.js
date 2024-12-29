const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Materiel = sequelize.define(
    'Materiels',
    {
        idMateriel: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        nomMateriel: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                len: [1, 30]
            }

        },
        versionMateriel: {
            type: DataTypes.STRING(15),
            allowNull: false,
            validate: {
                len: [3, 15]
            }
        },
        referenceMateriel: {
            type: DataTypes.STRING(5),
            allowNull: false,
            validate: {
                len: [5, 5]
            }
        },
        etatMateriel: {
            type: DataTypes.ENUM(["DISPONIBLE", "EMPRUNTER"]),
            defaultValue: "DISPONIBLE",
            allowNull: false,
        },
        photoMateriel: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        numeroTelephoneMateriel: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
        },
    }

);

Materiel.sync({ force: true });
console.log('The table for the Materiel model was just (re)created!');
module.exports = Materiel;