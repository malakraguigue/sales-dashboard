import { useState, useEffect } from 'react'
import { fetchForecasts } from '../services/forecastsService'
export function useForecasts({ product, region, horizon } = {}){

const [forecasts,setForecasts] = useState(null)
const [loading,setLoading]= useState(true)
const [error,setError]=useState(null)
useEffect(()=>{
    fetchForecasts({ product, region, horizon }).then((data)=>{
        setForecasts(data)
        setLoading(false)
    }).catch((err)=>{
        setError(err.message)
        setLoading(false)
    })
},[product, region, horizon])
return { forecasts, loading, error }
}
export {useForecasts}