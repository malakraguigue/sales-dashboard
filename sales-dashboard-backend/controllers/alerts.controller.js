const alertsService =require('../services/alerts.service');

async function getAlerts(req,res){
    try{
        const alerts= await alertsService.getAlerts(req.query)
        res.json(alerts)
    }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    }

}
module.exports = { getAlerts };