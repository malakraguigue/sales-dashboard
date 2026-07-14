import api from './api'
async function fetchSales({ product, region, category, startDate, endDate } = {}) {
    const response=await api.get('/sales',{
  params: { product, region, category, startDate, endDate },
})
    return response.data
}
async function fetchSalesById(id){
  const response=await api.get(`/sales/${id}`)
  return response.data
}
async function fetchSalesByCategory(category) {
  const response = await api.get(`/sales/category/${category}`)
  return response.data
}
export {fetchSales,fetchSalesByCategory,fetchSalesById}
