import { useMemo, useState } from 'react'

function aggregateByDate(forecasts) {
  const byDate = new Map()
  for (const f of forecasts) {
    const date = f.forecast_date.slice(0, 10)
    const entry = byDate.get(date) || { date, predicted: 0, lower: 0, upper: 0 }
    entry.predicted += Number(f.predicted_amount)
    entry.lower += Number(f.lower_bound)
    entry.upper += Number(f.upper_bound)
    byDate.set(date, entry)
  }
  return [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date))
}

const formatAmount = (v) => Math.round(v).toLocaleString('fr-FR')
const formatDate = (isoDate) => new Date(isoDate).toLocaleDateString('fr-FR')

function ForecastChart({ forecasts }) {
  const data = useMemo(() => aggregateByDate(forecasts), [forecasts])
  const [hoverIndex, setHoverIndex] = useState(null)

  if (data.length < 2) return null

  const width = 800
  const height = 280
  const padding = { top: 16, right: 16, bottom: 8, left: 64 }
  const innerWidth = width - padding.left - padding.right
  const innerHeight = height - padding.top - padding.bottom

  const maxY = Math.max(...data.map((d) => d.upper))
  const x = (i) => padding.left + (i / (data.length - 1)) * innerWidth
  const y = (v) => padding.top + innerHeight - (v / maxY) * innerHeight

  const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(d.predicted)}`).join(' ')
  const bandPath =
    data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(d.upper)}`).join(' ') +
    ' ' +
    data.map((d, i) => `L ${x(data.length - 1 - i)} ${y(data[data.length - 1 - i].lower)}`).join(' ') +
    ' Z'

  const yTicks = [0, maxY / 2, maxY]

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const relX = ((e.clientX - rect.left) / rect.width) * width
    const i = Math.round(((relX - padding.left) / innerWidth) * (data.length - 1))
    setHoverIndex(Math.min(Math.max(i, 0), data.length - 1))
  }

  const hovered = hoverIndex !== null ? data[hoverIndex] : null

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 mb-6">
      <h2>Tendance des ventes prévues</h2>
      <p className="text-sm mb-4">
        Montant total prévu par jour (toutes catégories et régions confondues), avec l'intervalle de confiance du modèle
      </p>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverIndex(null)}
      >
        {yTicks.map((tick, i) => (
          <g key={i}>
            <line
              x1={padding.left}
              x2={width - padding.right}
              y1={y(tick)}
              y2={y(tick)}
              stroke="var(--gridline)"
              strokeWidth="1"
            />
            <text x={padding.left - 8} y={y(tick)} textAnchor="end" dominantBaseline="middle" fontSize="11" fill="var(--text-muted)">
              {formatAmount(tick)}
            </text>
          </g>
        ))}

        <path d={bandPath} fill="var(--accent)" fillOpacity="0.1" stroke="none" />
        <path d={linePath} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

        {hovered && (
          <g>
            <line x1={x(hoverIndex)} x2={x(hoverIndex)} y1={padding.top} y2={height - padding.bottom} stroke="var(--border)" strokeWidth="1" />
            <circle cx={x(hoverIndex)} cy={y(hovered.predicted)} r="4" fill="var(--accent)" stroke="var(--surface)" strokeWidth="2" />
          </g>
        )}
      </svg>

      <p className="text-sm mt-2" style={{ visibility: hovered ? 'visible' : 'hidden' }}>
        {hovered ? `${formatDate(hovered.date)} — prévision : ${formatAmount(hovered.predicted)} € (entre ${formatAmount(hovered.lower)} et ${formatAmount(hovered.upper)})` : ' '}
      </p>
    </div>
  )
}

export default ForecastChart
