import api from  './api'
async function fetchKpis(){
    const response=await api.get('/kpis')//voir api.js si je veux savoir pourquoi on travaille avec api 
    return response.data
}
export{fetchKpis}