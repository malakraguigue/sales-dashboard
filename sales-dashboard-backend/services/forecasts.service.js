const prisma = require('../prisma/client');

async function getForecasts({ product, region, horizon }) {
  const where = {};

  if (product) where.product = product;
  if (region) where.region = region;

  if (horizon) {
    const latest = await prisma.sales.aggregate({ _max: { sale_date: true } });//on trouve avec aggregate et max la date la plus recente 
    const debut = latest._max.sale_date;//on selectionne juste la date si on prend latest et on le pose directement dans debut ça va affecter l'objet et non pas la valeur 
    const fin = new Date(debut);//fin a la meme valeur que debut,new Date(debut) crée une copie indépendante, pas une référence
    fin.setDate(fin.getDate() + Number(horizon));//on modifie seulement la date de fin tq on ajoute l'horizon donnée par le client  [30, 60, 90]
    where.forecast_date = { gte: debut, lte: fin };//maintenant on accede a la date de prevision et on met les dates deja calculés on obligeant un intervalle 
  }                                    
  return prisma.sales_forecasts.findMany({ where });
}

module.exports = { getForecasts };