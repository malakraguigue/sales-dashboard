import { useState, useEffect } from 'react'
import { fetchKpis } from '../services/kpisService'//communication avec le service se fait par ça
function useKpis(){
const [kpis,setKpis] = useState(null)
const [loading,setLoading]= useState(true)
const [error,setError]=useState(null)
useEffect(()=>{
    fetchKpis().then((data)=>{//hna fetchKpis hiya li 3ndha la donnée mn backend 
        setKpis(data)//hna kan7t donnee li jbt mn backend f blastha
        setLoading(false)//hna salina chargement 
    }).catch((err)=>{ 
        setError(err.message)
        setLoading(false)
})
},[])
return { kpis, loading, error }
}
export {useKpis}