import { useState } from 'react'
import './App.css'
import SalesPage from './pages/SalesPage'
import AlertesPage from './pages/AlertesPage'
import KpisPage from './pages/KpisPage'
import ForecastsPage from './pages/ForecastsPage'
import AuthPage from './pages/AuthPage'
import { useAuth } from './hooks/useAuth'
import { Routes, Route }from 'react-router-dom'
const tabClass = (active) =>
  `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
    active
      ? 'bg-[var(--accent)] text-white'
      : 'text-[var(--text-secondary)] hover:bg-[var(--surface)]'
  }`

function Dashboard() {
  const [page, setPage] = useState('sales')
  const { user, loading, SignUp, LogIn, LogOut } = useAuth()
if (loading) return <p>Chargement...</p>
if (!user) return <AuthPage SignUp={SignUp} LogIn={LogIn} />
  return (
    <div>
      <nav className="flex gap-2 p-4 border-b border-[var(--border)] bg-[var(--surface)]">
        <button className={tabClass(page === 'sales')} onClick={() => setPage('sales')}>
          Historique des ventes
        </button>
          {/* tabClass(condition) : style actif si page === 'alertes', sinon inactif
          onClick : () => ... retarde l'exécution jusqu'au clic (sinon ça s'exécuterait tout de suite)*/}
        <button className={tabClass(page === 'alertes')} onClick={() => setPage('alertes')}>
          Alertes
        </button>
         <button className={tabClass(page === 'kpis')} onClick={() => setPage('kpis')}>
          Vue globale
        </button>
         <button className={tabClass(page === 'forecasts')} onClick={() => setPage('forecasts')}>
          Prévisions
        </button>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-sm text-[var(--text-secondary)]">{user.firstName}</span>
          <button onClick={LogOut} className="text-sm text-[var(--accent)] underline">
            Se déconnecter
          </button>
        </div>
      </nav>
      {page === 'sales' && <SalesPage />}     {/* Affiche SalesPage uniquement si l'onglet actif est 'sales' */}
      {page === 'alertes' && <AlertesPage />}
      {page === 'kpis' && <KpisPage />}
      {page === 'forecasts' && <ForecastsPage />}
    </div>
  )
}
function App() {
  return (
    <Routes>{/* le conteneur — il regarde l'URL actuelle et choisit une seule des <Route> à l'intérieur pour l'afficher. */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/accepter-invitation" element={<p>Accepter l'invitation</p>} />
    </Routes>
  )
}
export default App
