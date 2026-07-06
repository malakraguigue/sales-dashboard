const kpisService =require('../services/kpis.service');

async function getKpis(req,res){
    try{
        const kpis=await kpisService.getKpis(req.query);
        res.json(kpis);
        }catch(err){
            console.error(err);
            res.status(500).json({ error: 'Erreur serveur' });
        }
}
    module.exports = { getKpis };