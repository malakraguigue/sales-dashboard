import { useState } from 'react'
import { useForecasts } from '../hooks/useForecasts'
import ForecastsTable from '../components/ForecastsTable'

const horizonClass = (active) =>
  `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
    active
      ? 'bg-[var(--accent)] text-white'
      : 'text-[var(--text-secondary)] bg-[var(--surface)] hover:bg-[var(--accent-bg)]'
  }`
function ForecastsPage() {
  const [horizon, setHorizon] = useState('30')
  const { forecasts, loading, error } = useForecasts({ horizon })

  if (loading) return <p className="p-8">Chargement...</p>
  if (error) return <p className="p-8">Erreur : {error}</p>

  return (
    <div className="min-h-screen p-8 bg-[var(--page)]">
      <h1 className="mb-6">Prévisions</h1>
      <div className="flex gap-2 mb-6">
        {['30', '60', '90'].map((h) => (
          <button key={h} className={horizonClass(horizon === h)} onClick={() => setHorizon(h)}>
            {h} jours
          </button>
        ))}
      </div>
      <ForecastsTable forecasts={forecasts} />
    </div>
  )
}

export default ForecastsPage