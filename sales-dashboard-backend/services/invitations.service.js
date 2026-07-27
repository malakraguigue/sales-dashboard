const prisma = require('../prisma/client');
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
return { invitation}
}
module.exports={inviteUser}

