import { useState, useEffect } from 'react'
import { fetchAlerts } from '../services/alertsService'

export function useAlerts() {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)// true = état réel au 1er rendu (rien n'est encore arrivé),permet d'afficher "Chargement..." plutôt que "Aucune donnée" à tort
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAlerts()
      .then((data) => {
        setAlerts(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return { alerts, loading, error }
}
