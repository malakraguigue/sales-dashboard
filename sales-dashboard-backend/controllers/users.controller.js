const UserService = require('../services/users.service')

async function getMembers(req, res) {
  try {
    const members = await UserService.getCompanyUsers(req.user.companyId)
    res.json(members)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}

async function getPendingInvitations(req, res) {
  try {
    const invitations = await UserService.getCompanyInvitations(req.user.companyId)
    res.json(invitations)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}
async function deleteUser(req,res){
    const { id } = req.params
try {
   const suppression = await UserService.deleteUser(id, req.user.companyId)
    if (suppression.count === 0) {
       return res.status(404).json({ error: 'Utilisateur introuvable' })
    }
res.json(suppression)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}
module.exports={getMembers,getPendingInvitations,deleteUser}