import api from  './api'
async function fetchForecasts({ product, region, horizon } = {}){
  const response = await api.get('/forecasts', {
  params: { product, region, horizon },
})
  return response.data
}
export{fetchForecasts}