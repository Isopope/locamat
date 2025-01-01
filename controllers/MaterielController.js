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

exports.getMaterielById=async(request,response)=>{
    const id=request.params.id;
    if(id){
        try{
            const materiel=await Materiel.findByPk(id);
            if(materiel){
                response.status(200).json({message:"Materiel recupere avec succes", materiel:materiel});
            }else{
                response.status(404).json({message:"Materiel non trouve"});
            }
        }catch(error){
            console.error({message:"un probleme est survenue", error:error.message});
            response.status(500).json({message:"Erreur lors de la recuperation du materiel", error:error.message});
        }
    }
}

exports.updateMateriel=async(request,response)=>{
    const id=request.params.id;
    const {nomMateriel,versionMateriel,referenceMateriel,etatMateriel, photoMateriel,numeroTelephoneMateriel}=request.body;
    if(id){
        try{
            const materiel=await Materiel.findByPk(id);
            if(materiel){
                await Materiel.update({
                    nomMateriel,
                    versionMateriel,
                    referenceMateriel,
                    etatMateriel,
                    photoMateriel,
                    numeroTelephoneMateriel
                },{where:{idMateriel:id}});
                response.status(200).json({message:"Materiel mis a jour avec succes"});
            }else{
                response.status(404).json({message:"Materiel non trouve"});
            }
        }catch(error){
            console.error({message:"un probleme est survenue", error:error.message});
            response.status(500).json({message:"Erreur lors de la mise a jour du materiel", error:error.message});
        }
    }
}

exports.deleteMateriel=async(request,response)=>{
    const id=request.params.id;
    if(id){
        try{
            const materiel=await Materiel.findByPk(id);
            if(materiel){
                await Materiel.destroy({where:{idMateriel:id}});
                response.status(200).json({message:"Materiel supprime avec succes"});
            }else{
                response.status(404).json({message:"Materiel non trouve"});
            }
        }catch(error){
            console.error({message:"un probleme est survenue", error:error.message});
            response.status(500).json({message:"Erreur lors de la suppression du materiel", error:error.message});
        }
    }
}