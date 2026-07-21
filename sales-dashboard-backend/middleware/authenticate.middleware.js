const jwt = require('jsonwebtoken')
const authenticate=(shema)=>(req,res,next) => {
 const token = req.cookies.accessToken

  if (!token) {
    return res.status(401).json({ error: 'Non authentifié' })
  }
  try{
   const decoded=jwt.verify(token,process.env.accessToken)
   req.user=decoded // on attache les infos décodées (userId, role) à req.user
                 // pour les rendre disponibles dans les middlewares/controllers suivants
   next()
  }catch(error){
     return res.status(401).json({ error: 'Token invalide ou expiré' })
  }
}
module.exports = anthenticate;