const InviteService = require('../services/invitations.service')
async function inviteUser(req,res){
    const {email,role}=req.body
    const companyId=req.user.companyId
    try{
    const invitation=await InviteService.inviteUser({email,role},companyId)
    res.json(invitation)
    }
    catch(error){
    if(error.code === 'EMAIL_TAKEN'){
      return res.status(409).json({ error: error.message }); // 409 Conflict
    }
    return res.status(500).json({error:'Erreur serveur'})
}

}
module.exports={inviteUser}