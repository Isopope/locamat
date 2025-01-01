const Materiel= require('../models/Materiel');

exports.createMateriel=async(request,response)=>{
    const {nomMateriel,versionMateriel,referenceMateriel,etatMateriel, photoMateriel,numeroTelephoneMateriel}=request.body
    try{
        await Materiel.create({
            nomMateriel,
            versionMateriel,
            referenceMateriel,
            etatMateriel,
            photoMateriel,
            numeroTelephoneMateriel
        });
        response.status(201).json({message:"Materiel creer avec succes", })
    }catch(error){
        console.error({message:"un probleme est survenue", error:error.message});
        response.status(500).json({message:"Erreur lors de la creation du materiel", error:error.message});
    }
}