import axios from 'axios'
//au lieu d'écrire http://localhost:5001/api/... à chaque appel, j'écris juste /alerts, /kpis, etc., et axios ajoute automatiquement la base.
const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  withCredentials: true
})

export default api
