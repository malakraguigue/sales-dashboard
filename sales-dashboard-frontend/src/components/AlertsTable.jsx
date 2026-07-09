const severityColors = {
  low: 'var(--status-good)',
  medium: 'var(--status-warning)',
  high: 'var(--status-critical)',
}

function AlertsTable({ alerts }) {
  if (alerts.length === 0) {
    return <p>Aucune alerte pour le moment.</p>
  }

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-[var(--page)]">
            <th className="p-3 text-sm font-medium text-[var(--text-secondary)]">Date</th>
            <th className="p-3 text-sm font-medium text-[var(--text-secondary)]">Produit</th>
            <th className="p-3 text-sm font-medium text-[var(--text-secondary)]">Région</th>
            <th className="p-3 text-sm font-medium text-[var(--text-secondary)]">Réalisé</th>
            <th className="p-3 text-sm font-medium text-[var(--text-secondary)]">Prévu</th>
            <th className="p-3 text-sm font-medium text-[var(--text-secondary)]">Écart %</th>
            <th className="p-3 text-sm font-medium text-[var(--text-secondary)]">Sévérité</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alerte, i) => (
            <tr
              key={`${alerte.date}-${alerte.product}-${alerte.region}`}
              className={`border-t border-[var(--border)] hover:bg-[var(--accent-bg)] transition-colors ${
                i % 2 === 1 ? 'bg-[var(--page)]/40' : ''
              }`}
            >
              <td className="p-3 text-[var(--text)]">{alerte.date}</td>
              <td className="p-3 text-[var(--text)]">{alerte.product}</td>
              <td className="p-3 text-[var(--text)]">{alerte.region}</td>
              <td className="p-3 text-[var(--text)]">{alerte.actualAmount}</td>
              <td className="p-3 text-[var(--text)]">{alerte.predictedAmount}</td>
              <td className="p-3 text-[var(--text)]">{alerte.deviationPercent} %</td>
              <td className="p-3">
                <span
                  className="inline-flex items-center gap-1.5 text-sm font-medium"
                  style={{ color: severityColors[alerte.severity] || 'var(--text)' }}
                >
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ background: severityColors[alerte.severity] || 'var(--text-muted)' }}
                  />
                  {alerte.severity}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AlertsTable
