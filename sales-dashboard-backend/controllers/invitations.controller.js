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
async function acceptInvitation(req,res){
    const {token,password,firstName,lastName}=req.body
    try{
    const acceptation=await InviteService.acceptInvitation({token,password,firstName,lastName})
    res.status(201).json(acceptation)
    }
    catch(error){
    if(error.code === 'INVITATION_NOT_FOUND'){
      return res.status(404).json({ error: error.message }); 
    }
    else if (error.code === 'INVITATION_EXPIRED'){
      return res.status(409).json({ error: error.message }); 
    }
    else if (error.code === 'INVITATION_ALREADY_ACCEPTED'){
      return res.status(409).json({ error: error.message }); 
    }
    return res.status(500).json({error:'Erreur serveur'})
}
}
async function getMembers(req, res) {
  try {
    const members = await InviteService.getCompanyUsers(req.user.companyId)
    res.json(members)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}

async function getPendingInvitations(req, res) {
  try {
    const invitations = await InviteService.getCompanyInvitations(req.user.companyId)
    res.json(invitations)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}

module.exports={inviteUser,acceptInvitation,getMembers,getPendingInvitations}