const {z}=require('zod')
const validate = (shema)=>(req,res,next)=>{
    try{
        const dataValide=shema.parse(req.body)//parse pour valider
        req.body=dataValide;
        return next();//le travail est fini , passer a letape suivante 
    }catch(error){
        if(error instanceof z.ZodError){
            return res.status(400).json({
                message: "Échec de la validation des données",
                errors: error.errors.map(
                    err=>({
                    champ: err.path.join('.'),
                    message:err.message
                }))
            });
        }
        return res.status(500).json({ message: "Erreur interne de validation" });
    }
};
module.exports = validate;