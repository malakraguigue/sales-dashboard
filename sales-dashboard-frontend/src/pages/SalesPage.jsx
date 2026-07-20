import { useState } from 'react'
import { useSales } from '../hooks/useSales'
import SalesTable from '../components/SalesTable'
import FilterBar from '../components/FilterBar'
import SalesForm from '../components/SalesForm'
function SalesPage() {
    // State des filtres : géré ici car c'est la page qui affiche et modifie les inputs 
  const [product, setProduct] = useState('')
  const [region, setRegion] = useState('')
  const [category, setCategory] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const { sales, loading, error,addSale } = useSales({ product, region, category, startDate, endDate }) // useSales REÇOIT ces valeurs, il ne les possède pas

  if (loading) return <p className="p-8">Chargement...</p>
  if (error) return <p className="p-8">Erreur : {error}</p>
//Ce return est placé dans SalesPage (et pas ailleurs) parce que seule une page a le droit d'assembler plusieurs composants ensemble 
//et de leur transmettre des données provenant d'un hook 
//c'est exactement la responsabilité qu'on avait attribuée à pages/ dans notre architecture, 


  return (
    <div className="min-h-screen p-8 bg-[var(--page)]">
      <h1 className="mb-6">Historique des ventes</h1>
     <SalesForm addSale={addSale}/>
      {/* FilterBar REÇOIT aussi ces valeurs (et leurs setters), il ne les possède pas non plus */}
      <FilterBar
        product={product} setProduct={setProduct}
        region={region} setRegion={setRegion}
        category={category} setCategory={setCategory}
        startDate={startDate} setStartDate={setStartDate}
        endDate={endDate} setEndDate={setEndDate}
      />
      <SalesTable sales={sales} />

    </div>
  )
}

export default SalesPage
