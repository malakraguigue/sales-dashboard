import { useAlerts } from '../hooks/useAlerts'
import AlertsTable from '../components/AlertsTable'

function AlertesPage() {
  const { alerts, loading, error } = useAlerts()

  if (loading) return <p>Chargement...</p>
  if (error) return <p>Erreur : {error}</p>

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Alertes</h1>
      <AlertsTable alerts={alerts} />
    </div>
  )
}

export default AlertesPage
