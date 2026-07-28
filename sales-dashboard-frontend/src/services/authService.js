import api from  './api'
async function register({ email, password, firstName, lastName ,companyName}={}){
const response=await api.post('/auth/register',{email, password, firstName, lastName,companyName})
return response.data
}
async function login({email,password}={}){
const response=await api.post('/auth/login',{email,password})
return response.data
}
async function fetchMe(){
const response=await api.get('/auth/me')
return response.data
}
async function logout(){
const response=await api.post('/auth/logout')
return response.data
}
async function acceptInvitation({ token, password, firstName, lastName }){
const response=await api.post('/invitations/accept',{token,password,firstName,lastName})
return response.data
}
export {register,login,fetchMe,logout,acceptInvitation}