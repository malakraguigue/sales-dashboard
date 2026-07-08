function AlertsTable({ alerts }) {
// Ce composant ne gère PAS loading/error : ce n'est pas son rôle.
// Il reçoit "alerts" en props UNE FOIS que la page/hook a déjà géré
// le chargement et les erreurs. Ici on vérifie juste : liste vide ou pas.
// (composants/ = affiche seulement, ne va jamais chercher les données lui-même)
  if (alerts.length === 0) {
    return <p>Aucune alerte pour le moment.</p>
  }

  return (
    <table className="w-full border-collapse text-left">
      <thead>
        <tr>
          <th className="border-b p-2">Date</th>
          <th className="border-b p-2">Produit</th>
          <th className="border-b p-2">Région</th>
          <th className="border-b p-2">Réalisé</th>
          <th className="border-b p-2">Prévu</th>
          <th className="border-b p-2">Écart %</th>
          <th className="border-b p-2">Sévérité</th>
        </tr>
      </thead>
      <tbody>
        {alerts.map((alerte) => (
          <tr key={`${alerte.date}-${alerte.product}-${alerte.region}`}>
            <td className="border-b p-2">{alerte.date}</td>
            <td className="border-b p-2">{alerte.product}</td>
            <td className="border-b p-2">{alerte.region}</td>
            <td className="border-b p-2">{alerte.actualAmount}</td>
            <td className="border-b p-2">{alerte.predictedAmount}</td>
            <td className="border-b p-2">{alerte.deviationPercent} %</td>
            <td className="border-b p-2">{alerte.severity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default AlertsTable
