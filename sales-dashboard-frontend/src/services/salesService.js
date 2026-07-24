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
async function createSales(sale){
   const response = await api.post('/sales',sale)
   return response.data
}
async function importSales(file){
   const formData = new FormData()
   formData.append('file', file)
   const response = await api.post('/sales/import', formData)
   return response.data
}
export {fetchSales,fetchSalesByCategory,fetchSalesById,createSales,importSales}
