const forecastsService = require('../services/forecasts.service');
const HORIZONS_VALIDES = [30, 60, 90];
async function getForecasts(req,res){
     const { horizon } = req.query;

     if (horizon && !HORIZONS_VALIDES.includes(Number(horizon))) {
     return res.status(400).json({ error: 'Horizon invalide (valeurs autorisées : 30, 60, 90)' });
     }

    try{
         const forecasts= await forecastsService.getForecasts(req.query);
         res.json(forecasts);
    }catch(err){
         console.error(err);
         res.status(500).json({ error: 'Erreur serveur' });
    }
}
module.exports = { getForecasts};