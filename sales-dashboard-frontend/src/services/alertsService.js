import api from './api'

async function fetchAlerts() {
  const response = await api.get('/alerts')//envoie une requête GET vers http://localhost:5001/api/alerts.
  return response.data
}
export{fetchAlerts}