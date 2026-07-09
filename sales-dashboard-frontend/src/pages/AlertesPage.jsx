import { useAlerts } from '../hooks/useAlerts'
import AlertsTable from '../components/AlertsTable'

function AlertesPage() {
  const { alerts, loading, error } = useAlerts()

  if (loading) return <p className="p-8">Chargement...</p>
  if (error) return <p className="p-8">Erreur : {error}</p>

  return (
    <div className="min-h-screen p-8 bg-[var(--page)]">
      <h1 className="mb-6">Alertes</h1>
      <AlertsTable alerts={alerts} />
    </div>
  )
}

export default AlertesPage
