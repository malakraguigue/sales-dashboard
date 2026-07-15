import api from './api'
async function fetchSales({ product, region, category, startDate, endDate } = {}, signal) {
    const response=await api.get('/sales',{
  params: { product, region, category, startDate, endDate },
  signal,
})
    return response.data
}
async function fetchSalesById(id, signal){
  const response=await api.get(`/sales/${id}`, { signal })
  return response.data
}
async function fetchSalesByCategory(category, signal) {
  const response = await api.get(`/sales/category/${category}`, { signal })
  return response.data
}
export {fetchSales,fetchSalesByCategory,fetchSalesById}
