const prisma = require('../prisma/client');
const xlsx = require('xlsx')
async function getSales({ product, region, category, startDate, endDate }) {
  const where = {};
  if (product) where.product = product;
  if (region) where.region = region;
  if (category) where.category = category;
  if (startDate || endDate) {
    where.sale_date = {};
    if (startDate) where.sale_date.gte = new Date(startDate);
    if (endDate) where.sale_date.lte = new Date(endDate);
  }
  return prisma.sales.findMany({ where, orderBy: { sale_date: 'desc' } });
}

async function getSaleById(id) {
  return prisma.sales.findUnique({ where: { id: Number(id) } });
}
async function getSalesByCategory(category) {
  return prisma.sales.findMany({ where: { category } });
}
async function getSalesByRegion(region){
  return prisma.sales.findMany({where:{region}});
}
async function ajoutSale(SalesArray){
  return prisma.sales.create({
    data:SalesArray
  });
}
async function importSale(file){
const classeur = xlsx.read(file.buffer, { type: 'buffer' })//décode ce contenu binaire et renvoie un classeur — un objet représentant tout le fichier Excel (toutes ses feuilles/onglets).
const nomFeuille = classeur.SheetNames[0]//un tableau contenant les noms des feuilles du fichier (ex: ["Feuille1", "Feuille2"]) ; [0] prend la première.
const feuille = classeur.Sheets[nomFeuille]// accède au contenu de cette feuille précise (un objet interne au format propre à xlsx, pas encore exploitable directement).
const lignes = xlsx.utils.sheet_to_json(feuille)//transforme cette feuille en un tableau d'objets JS classiques — une ligne Excel = un objet, les en-têtes de colonnes deviennent les clés (ex: {product: "...", region: "...", ...}).
}
module.exports = { getSales, getSaleById, getSalesByCategory,getSalesByRegion,ajoutSale,importSale };