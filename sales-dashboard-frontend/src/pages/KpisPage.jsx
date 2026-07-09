import { useKpis} from '../hooks/useKpis'
import KpisTable from '../components/KpisTable'
function KpisPage(){
const { kpis, loading, error } = useKpis()

  if (loading) return <p className="p-8">Chargement...</p>
  if (error) return <p className="p-8">Erreur : {error}</p>

   return (
    <div className="min-h-screen p-8 bg-[var(--page)]">
      <h1 className="mb-6">Vue globale</h1>
      <div className="flex gap-4 flex-wrap">
        <KpisTable  titre="Chiffre d'affaires" valeur={kpis.totalRevenue} />
        <KpisTable  titre="Quantité vendue" valeur={kpis.totalQuantity} />
        <KpisTable  titre="Meilleur produit" valeur={kpis.bestProduct} />
        <KpisTable  titre="Meilleure région" valeur={kpis.bestRegion} />
        <KpisTable  titre="Croissance" valeur={`${kpis.growthRate} %`} />
      </div>
    </div>
  )
}
export default KpisPage