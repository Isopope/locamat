const Emprunt = require('../models/Emprunt');
const Utilisateur = require('../models/Utilisateur');
const Materiel = require('../models/Materiel');

exports.createEmprunt = async (request, response) => {
    const { idUtilisateur, IdMateriel, dateDebutEmprunt, dateFinEmprunt } = request.body;
  
    try {
      const utilisateur = await Utilisateur.findByPk(idUtilisateur);
      const materiel = await Materiel.findByPk(IdMateriel);
  
      if (!utilisateur) {
        return response.status(404).json({ message: 'Utilisateur non trouve' });
      }
  
      if (utilisateur.roleUtilisateur !== 'EMPRUNTEUR') {
        return response.status(403).json({ message: 'vous avez pas les permissions necessaire' });
      }
  
      if (!materiel) {
        return response.status(404).json({ message: 'Materiel non trouve' });
      }
  
      if (materiel.etatMateriel !== 'DISPONIBLE') {
        return response.status(400).json({ message: 'Materiel non disponible' });
      }
  
      const emprunt = await Emprunt.create({
        idUtilisateur,
        IdMateriel,
        dateDebutEmprunt,
        dateFinEmprunt,
        dateDemandeEmprunt: new Date()
      });
  
      // mettre à jour l'état du matériel
      materiel.etatMateriel = 'EMPRUNTER';
      await materiel.save();
  
      response.status(201).json({ message: 'Emprunt creer avec succes', emprunt });
    } catch (error) {
      console.error('Erreur lors de la création de l\'emprunt :', error);
      response.status(500).json({ message: 'Erreur lors de la creation de l\'emprunt', error: error.message });
    }
  };
