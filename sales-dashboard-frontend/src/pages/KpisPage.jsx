import { useKpis} from '../hooks/useKpis'
import KpisTable from '../components/KpisTable'
import KpiBarChart from '../components/KpiBarChart'
function KpisPage(){
const { kpis, loading, error } = useKpis()

  if (loading) return <p className="p-8">Chargement...</p>
  if (error) return <p className="p-8">Erreur : {error}</p>

  const revenueFormatted = Number(kpis.totalRevenue).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €'
  const quantityFormatted = Number(kpis.totalQuantity).toLocaleString('fr-FR')
  const growthFormatted = kpis.growthRate === null ? 'Pas de données comparables' : `${kpis.growthRate > 0 ? '+' : ''}${kpis.growthRate} %`

   return (
    <div className="min-h-screen p-8 bg-[var(--page)]">
      <h1 className="mb-6">Vue globale</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <KpisTable  titre="Chiffre d'affaires" valeur={revenueFormatted} />
        <KpisTable  titre="Quantité vendue" valeur={quantityFormatted} />
        <KpisTable  titre="Meilleur produit" valeur={kpis.bestProduct} />
        <KpisTable  titre="Meilleure région" valeur={kpis.bestRegion} />
        <KpisTable  titre="Croissance" valeur={growthFormatted} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <KpiBarChart titre="Revenu par catégorie" data={kpis.revenueByCategory} />
        <KpiBarChart titre="Revenu par région" data={kpis.revenueByRegion} />
      </div>
    </div>
  )
}
export default KpisPage