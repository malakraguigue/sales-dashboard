import { useState, useEffect } from 'react'
import { fetchSales, fetchSalesByCategory, fetchSalesById , createSales, importSales as importSalesFile} from '../services/salesService'
// Hook responsable uniquement du fetch des ventes (reçoit les filtres, ne les possède pas)
export function useSales({ product, region, category, startDate, endDate } = {}){
const [sales,setSales]=useState([]);
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
useEffect(()=>{
   const controller = new AbortController()
   fetchSales({ product, region, category, startDate, endDate }, controller.signal)
    .then((data)=>{
      setSales(data),
      setLoading(false)
    })
    .catch((err) => {
      if (err.code === 'ERR_CANCELED') return
      setError(err.message)
      setLoading(false)
    })
   return () => controller.abort()
},[product, region, category, startDate, endDate])//relance cette requête chaque fois que product, region, category, startDate OU endDate change de valeur
  async function addSale(sale){
  const created = await createSales(sale)
  setSales((prevSales) => [created, ...prevSales])
}
  async function importSales(file){
  const resume = await importSalesFile(file)
  const data = await fetchSales({ product, region, category, startDate, endDate })
  setSales(data)
  return resume
}
return { sales, loading, error ,addSale, importSales }
}

export function useSalesByCategory(category){
const [sales,setSales]=useState([]);
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
useEffect(()=>{
   const controller = new AbortController()
   fetchSalesByCategory(category, controller.signal)
    .then((data)=>{
      setSales(data),
      setLoading(false)
    })
    .catch((err) => {
      if (err.code === 'ERR_CANCELED') return
      setError(err.message)
      setLoading(false)
    })
   return () => controller.abort()
},[category])
return { sales, loading, error }
}

export function useSalesById(id){
const [sales,setSales]=useState([]);
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
useEffect(()=>{
   const controller = new AbortController()
   fetchSalesById(id, controller.signal)
    .then((data)=>{
      setSales(data),
      setLoading(false)
    })
    .catch((err) => {
      if (err.code === 'ERR_CANCELED') return
      setError(err.message)
      setLoading(false)
    })
   return () => controller.abort()
},[id])
return { sales, loading, error }
}
