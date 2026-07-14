import { useState, useEffect } from 'react'
import { fetchSales, fetchSalesByCategory, fetchSalesById } from '../services/salesService'

export function useSales({ product, region, category, startDate, endDate } = {}){
const [sales,setSales]=useState([]);
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
useEffect(()=>{
   fetchSales({ product, region, category, startDate, endDate })
    .then((data)=>{
      setSales(data),
      setLoading(false)
    })
    .catch((err) => {
      setError(err.message)
      setLoading(false)
    })
},[product, region, category, startDate, endDate])//relance cette requête chaque fois que product, region, category, startDate OU endDate change de valeur

return { sales, loading, error }
}

export function useSalesByCategory(category){
const [sales,setSales]=useState([]);
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
useEffect(()=>{
   fetchSalesByCategory(category)
    .then((data)=>{
      setSales(data),
      setLoading(false)
    })
    .catch((err) => {
      setError(err.message)
      setLoading(false)
    })
},[category])
return { sales, loading, error }
}

export function useSalesById(id){
const [sales,setSales]=useState([]);
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
useEffect(()=>{
   fetchSalesById(id)
    .then((data)=>{
      setSales(data),
      setLoading(false)
    })
    .catch((err) => {
      setError(err.message)
      setLoading(false)
    })
},[id])
return { sales, loading, error }
}