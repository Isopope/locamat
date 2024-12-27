CREATE DATABASE locamat;
USE locamat;

CREATE TABLE `utilisateurs` (
   `idUtilisateur` INT(11) NOT NULL AUTO_INCREMENT,
   `uidUtilisateur` VARCHAR(255) NOT NULL,
   `nomUtilisateur` VARCHAR(30) NOT NULL CHECK (CHAR_LENGTH(`nomUtilisateur`) >= 1),
   `prenomUtilisateur` VARCHAR(30) NOT NULL CHECK (CHAR_LENGTH(`prenomUtilisateur`) >= 1),
   `emailUtilisateur` VARCHAR(50) NOT NULL UNIQUE,
   `matriculeUtilisateur` VARCHAR(7) NOT NULL UNIQUE CHECK (CHAR_LENGTH(`matriculeUtilisateur`) = 7),
   `roleUtilisateur` ENUM('ADMINISTRATEUR', 'EMPRUNTEUR') DEFAULT 'EMPRUNTEUR' NOT NULL,
   `createdAt` DATE,
   `updatedAt` DATE,

   PRIMARY KEY(`idUtilisateur`)
);

CREATE TABLE `materiels` (
   `IdMateriel` INT(11) NOT NULL AUTO_INCREMENT,
   `nomMateriel` VARCHAR(30) NOT NULL CHECK (CHAR_LENGTH(`nomMateriel`) >= 1),
   `versionMateriel` VARCHAR(15) NOT NULL CHECK (CHAR_LENGTH(`versionMateriel`) >= 3),
   `referenceMateriel` VARCHAR(5) NOT NULL UNIQUE CHECK (CHAR_LENGTH(`referenceMateriel`) = 5),
   `etatMateriel` ENUM('DISPONIBLE', 'EMPRUNTER') DEFAULT 'DISPONIBLE' NOT NULL,
   `photoMateriel` VARCHAR(255),
   `numeroTelephoneMateriel` INT(10),
   PRIMARY KEY(`IdMateriel`)
);

CREATE TABLE `emprunts` (
   `IdEmprunt` INT(11) NOT NULL AUTO_INCREMENT,
   `dateDemandeEmprunt` DATETIME, -- optionnel a voir avec la team,
   `dateDebutEmprunt` DATE NOT NULL,
   `dateFinEmprunt` DATE NOT NULL, -- RG: ON EMPRUNTE POUR AU MOINS UNE JOURNEE,
   `dateRenduEmpruntEffectif` DATE,
   `IdMateriel` INT NOT NULL,
   `idUtilisateur` INT NOT NULL,
   PRIMARY KEY(`IdEmprunt`),
   FOREIGN KEY(`IdMateriel`) REFERENCES `materiels`(`IdMateriel`),
   FOREIGN KEY(`idUtilisateur`) REFERENCES `utilisateurs`(`idUtilisateur`),
   CONSTRAINT `chk_dates_emprunt` CHECK (`dateDebutEmprunt` < `dateFinEmprunt`),
   CONSTRAINT `chk_date_retour` CHECK (`dateRenduEmpruntEffectif` >= `dateFinEmprunt`)
);