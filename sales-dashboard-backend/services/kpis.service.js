const prisma = require('../prisma/client');
async function getKpis() {
  const [totalRevenue, totalQuantity, bestProductGroup, bestRegionGroup, revenueByCategoryGroup, revenueByRegionGroup] = await Promise.all([
    prisma.sales.aggregate({ _sum: { amount: true } }),
    prisma.sales.aggregate({ _sum: { quantity: true } }),
    prisma.sales.groupBy({//combien d'argent chaque produit a-t-il généré
      by: ['product'],
      _sum: { amount: true },
      orderBy: { _sum: { amount: 'desc' } },
      take: 1,
    }),
    prisma.sales.groupBy({//combien d'argent chaque région a-t-elle généré
      by: ['region'],
      _sum: { amount: true },
      orderBy: { _sum: { amount: 'desc' } },
      take: 1,
    }),
    prisma.sales.groupBy({//revenu par catégorie, pour le graphique en barres
      by: ['category'],
      _sum: { amount: true },
      orderBy: { _sum: { amount: 'desc' } },
    }),
    prisma.sales.groupBy({//revenu par région, pour le graphique en barres
      by: ['region'],
      _sum: { amount: true },
      orderBy: { _sum: { amount: 'desc' } },
    }),
  ]);

  // Détermine l'année la plus récente présente dans les données,
  // pour comparer "année actuelle" vs "année précédente"
  const latest = await prisma.sales.aggregate({ _max: { sale_date: true } });
  const latestYear = latest._max.sale_date.getFullYear();
  const previousYear = latestYear - 1;

  const [currentYearRevenue, previousYearRevenue] = await Promise.all([
    prisma.sales.aggregate({//Combien d'argent a été généré pendant l'année la plus récente (latestYear, ex: 2014) ?
      _sum: { amount: true },
      where: {
        sale_date: {
          gte: new Date(`${latestYear}-01-01`),
          lte: new Date(`${latestYear}-12-31`),
        },
      },
    }),
    prisma.sales.aggregate({//Combien d'argent a été généré pendant l'année précédente (previousYear, ex: 2013) ?
      _sum: { amount: true },
      where: {
        sale_date: {
          gte: new Date(`${previousYear}-01-01`),
          lte: new Date(`${previousYear}-12-31`),
        },
      },
    }),
  ]);

  const currentTotal = currentYearRevenue._sum.amount || 0;
  const previousTotal = previousYearRevenue._sum.amount || 0;
  const growthRate = previousTotal > 0
    ? Number((((currentTotal - previousTotal) / previousTotal) * 100).toFixed(2))
    : null;

  return {
    totalRevenue: totalRevenue._sum.amount || 0,
    totalQuantity: totalQuantity._sum.quantity || 0,
    bestProduct: bestProductGroup[0]?.product || null,
    bestRegion: bestRegionGroup[0]?.region || null,
    growthRate,
    revenueByCategory: revenueByCategoryGroup.map((g) => ({ label: g.category, value: g._sum.amount || 0 })),
    revenueByRegion: revenueByRegionGroup.map((g) => ({ label: g.region, value: g._sum.amount || 0 })),
  };
}

module.exports = {  getKpis };  