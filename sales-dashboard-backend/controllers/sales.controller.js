const salesService = require('../services/sales.service');
const CATEGORIES_VALIDES = ['Furniture', 'OfficeSupplies', 'Technology'];


async function getSales(req, res) {
  try {
    const sales = await salesService.getSales(req.query);//salesServive c'est elle parceque , on a stocke le require dans salesService 
    res.json(sales);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function getSaleById(req, res) {
  try {
    const sale = await salesService.getSaleById(req.params.id);
    if (!sale) {
      return res.status(404).json({ error: 'Vente introuvable' });
    }
    res.json(sale);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}
async function getSalesByCategory(req, res) {
  const { category } = req.params;

  if (category && !CATEGORIES_VALIDES.includes(category)) {
    return res.status(400).json({ error: 'Catégorie invalide' });
  }

  try {
    const sales = await salesService.getSalesByCategory(category);
    res.json(sales);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}
async function getSalesByRegion(req,res){
const { region } = req.params;
try{
  const sales = await salesService.getSalesByRegion(region);
  res.json(sales);
}catch(err){
  console.error(err);
  res.status(500).json({error:'Erreur serveur'});
}
}

module.exports = { getSales, getSaleById, getSalesByCategory ,getSalesByRegion };