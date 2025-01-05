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

  exports.rendreMateriel= async(request, response)=>{
    const {idEmprunt}=request.params;
    if(idEmprunt){
      try{
        const emprunt=await Emprunt.findByPk(idEmprunt);
        if(emprunt){
          emprunt.dateRenduEmpruntEffectif= new Date();
          await emprunt.save();
          const materiel= await Materiel.findOne({where:{idMateriel:emprunt.idMateriel}});
          if (materiel) {
            materiel.etatMateriel = 'DISPONIBLE';
            await materiel.save();
          } else {
            return response.status(404).json({ message: 'materiel non trouve' });
          }
          return response.status(200).json({message:'le materiel a bien ete rendu'});
        }else{
          return response.status(404).json({message:'emprunt non trouve'});
        }
      }catch(error){
        console.error('Erreur lors de la rendu du materiel :', error);
        return response.status(500).json({message:'Erreur lors du rendu du materiel', error:error.message});
      }
    }else {
      return response.status(400).json({ message: 'id emprunt manquant' });
  }

  }
