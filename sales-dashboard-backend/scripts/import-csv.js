require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const prisma = require('../prisma/client');

async function importCsv() {
  const filePath = path.join(__dirname, '../data/sales_dataset_superstore.csv');//construit donc le chemin absolu vers mon CSV
  const fileContent = fs.readFileSync(filePath, 'utf-8');//Lit tout le contenu du fichier d'un coup

  const records = parse(fileContent, {//Transforme le texte CSV brut en tableau d'objets JS
    columns: true,
    skip_empty_lines: true,
  });

  const sales = records.map((row) => ({//Transforme chaque ligne brute du CSV en objet prêt pour Prisma 
    sale_date: new Date(row.sale_date),
    product: row.product,
    category: row.category === 'Office Supplies' ? 'OfficeSupplies' : row.category,
    region: row.region,
    quantity: Number(row.quantity),
    amount: Number(row.amount),
    stock_quantity: row.stock_quantity ? Number(row.stock_quantity) : null,
  }));

  const result = await prisma.sales.createMany({ data: sales });//Insère toutes les lignes en une seule requête
  console.log(`${result.count} ventes importées.`);
}

importCsv()
  .catch((err) => console.error('Erreur import CSV :', err))
  .finally(() => prisma.$disconnect());
