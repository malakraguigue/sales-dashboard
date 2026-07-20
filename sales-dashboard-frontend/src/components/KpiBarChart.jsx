const formatAmount = (v) => Math.round(v).toLocaleString('fr-FR') + ' €'

function KpiBarChart({ titre, data }) {
  const maxValue = Math.max(...data.map((d) => Number(d.value)))

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
      <h2 className="mb-4">{titre}</h2>
      <div className="flex flex-col gap-3">
        {data.map((d) => (
          <div key={d.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-[var(--text-secondary)]">{d.label}</span>
              <span className="text-[var(--text)] font-medium">{formatAmount(d.value)}</span>
            </div>
            <div className="h-3 rounded-full bg-[var(--page)] overflow-hidden">
              <div
                className="h-full rounded-full bg-[var(--accent)]"
                style={{ width: `${(Number(d.value) / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default KpiBarChart
