const jwt = require('jsonwebtoken')
function authenticate(req, res, next) {
 const token = req.cookies.JWT_ACCESS_SECRET

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
module.exports = authenticate;