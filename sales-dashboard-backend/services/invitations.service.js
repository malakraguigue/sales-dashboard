const prisma = require('../prisma/client');
const bcrypt = require('bcrypt')
const { sendInvitationEmail } = require('./email.service')

async function inviteUser({email,role},companyId){
const ExistingUser= await prisma.user.findUnique({where:{email}})
if (ExistingUser) {
    const error = new Error('Un compte existe déjà avec cet email')
    error.code = 'EMAIL_TAKEN'
    throw error
}
const token = require('crypto').randomBytes(32).toString('hex')
const expiration= new Date()
expiration.setDate(expiration.getDate() + 1)
const invitation=await prisma.invitation.create({data:{email,companyId,token, rolePropose:role, expiration}})
await sendInvitationEmail(email, token)
return { invitation}
}

async function acceptInvitation({token,password,firstName,lastName}){
  const invitation = await prisma.invitation.findUnique({ where: { token } })

if (!invitation) {
    const error = new Error('invitation indisponible')
    error.code = 'INVITATION_NOT_FOUND'
    throw error
}
else if(invitation.expiration < new Date()){
    const error = new Error('invitation expiré')
    error.code = 'INVITATION_EXPIRED'
    throw error
}
else if(invitation.statutAccepte===true){
    const error = new Error('invitation deja accepté')
    error.code = 'INVITATION_ALREADY_ACCEPTED'
    throw error
}
const hashedPassword = await bcrypt.hash(password, 10)
const user = await prisma.user.create({
    data: {
      email: invitation.email,
      password: hashedPassword,
      firstName,
      lastName,
      role: invitation.rolePropose,
      companyId: invitation.companyId
    }
  })
const { password: _, ...userSansMotDePasse } = user
await prisma.invitation.update({
    where: { id: invitation.id },
    data: { statutAccepte : true }
  })
return { user: userSansMotDePasse}
}

module.exports={inviteUser,acceptInvitation}

