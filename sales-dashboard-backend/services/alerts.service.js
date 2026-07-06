const prisma = require('../prisma/client');

async function getAlerts() {
  const alerts = await prisma.sales_alerts.findMany();

  return alerts.map((alerte) => ({// lire une valeur sous un ancien nom, l'écrire sous un nouveau nom dans un objet différent — l'ancien nom/objet n'est jamais modifié ni supprimé.
    date: alerte.alert_date,
    product: alerte.product,
    region: alerte.region,
    actualAmount: alerte.actual_amount,
    predictedAmount: alerte.predicted_amount,
    deviationPercent: alerte.deviation_percent,
    severity: alerte.severity,
  }));
}

module.exports = { getAlerts };
