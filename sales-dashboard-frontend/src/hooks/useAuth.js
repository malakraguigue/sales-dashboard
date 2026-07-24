import { useState, useEffect } from 'react'
import{ register,login ,fetchMe,logout } from '../services/authService'
export function useAuth(){
const[user,setUser]=useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
//maintenant qu'on a user, comment penses-tu qu'on doit le remplir automatiquement dès que l'app se charge
useEffect(()=>{
    fetchMe().then((data)=>{
        setUser(data)
        setLoading(false)
    }).catch((err) => {
        setError(err.message)
        setLoading(false)
    })
},[])
//.user parce que login/register renvoient un objet enveloppé — {message, user: {...}} pour login, {user: {...}} pour register
async function SignUp({ email, password, firstName, lastName,companyName }={}) {
    await register({ email, password, firstName, lastName,companyName })
    await LogIn({ email, password })
}
async function LogIn({email,password}={}){
    const connection=await login({email,password})
    setUser(connection.user)
}   
async function LogOut(){
    await logout()
    setUser(null)
}
return{user,loading,error, SignUp, LogIn, LogOut }
}