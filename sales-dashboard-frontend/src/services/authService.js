import api from  './api'
async function register({ email, password, firstName, lastName }={}){
const response=await api.post('/auth/register',{email, password, firstName, lastName})
return response.data
}
async function login({email,password}={}){
const response=await api.post('/auth/login',{email,password})
return response.data
}
export {register,login}