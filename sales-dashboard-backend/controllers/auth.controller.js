const authService = require('../services/auth.service.js')

async function register(req,res){
const{firstName,lastName,email,password}=req.body
try{
 const inscription= await authService.register({firstName,lastName,email,password})
 res.status(201).json(inscription)
}catch(error){
    if(error.code === 'EMAIL_TAKEN'){
      return res.status(409).json({ error: error.message }); // 409 Conflict
    }
    return res.status(500).json({error:'Erreur serveur'})
}

}
async function login(req,res){
const{email, password}=req.body
try{
const { accessToken, refreshToken, user }  = await authService.login({email, password})
res.cookie('accessToken',accessToken,{
    httpOnly:true, secure:true,  sameSite: 'strict',maxAge: 15 * 60 * 1000
})
res.cookie('refreshToken',refreshToken,{
    httpOnly:true, secure:true,  sameSite: 'strict',maxAge: 7 * 24 * 60 * 60 * 1000
})
res.json({ message: 'Connecté', user })
}catch(error){
    if(error.code === 'USER_NOT_FOUND'){ 
      return res.status(401).json({ error: error.message });
    }
    else if(error.code ==='WRONG_PASSWORD'){
        return res.status(401).json({error: error.message})
    }
    return res.status(500).json({error:'Erreur serveur'})
}
}
async function getMe(req,res){
    try{
       const user=await authService.getMe(req.user.userId)// req.user = infos du JWT décodé, injectées par authMiddleware (ex: { id, role })
       res.status(200).json(user)
    }catch(error){
        if(error.code === 'USER_NOT_FOUND'){ 
            return res.status(401).json({ error: error.message });
        }
           return res.status(500).json({ error: 'Erreur serveur' })
    }     
}
async function logout(req, res) {
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    res.json({ message: 'Déconnecté' })
}
module.exports={register,login,getMe,logout}