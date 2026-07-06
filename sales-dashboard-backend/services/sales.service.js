const prisma = require('../prisma/client');

async function getSales({ product, region, startDate, endDate }) {
  const where = {};
  if (product) where.product = product;
  if (region) where.region = region;
  if (startDate || endDate) {
    where.sale_date = {};
    if (startDate) where.sale_date.gte = new Date(startDate);
    if (endDate) where.sale_date.lte = new Date(endDate);
  }
  return prisma.sales.findMany({ where });
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
module.exports = { getSales, getSaleById, getSalesByCategory,getSalesByRegion };