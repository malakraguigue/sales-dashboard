const prisma = require('../prisma/client');

async function getCompanyUsers(companyId) {
  return prisma.user.findMany({
    where: { companyId },
    select: { id: true, email: true, firstName: true, lastName: true, role: true, createdAt: true }
  })
}

async function getCompanyInvitations(companyId) {
  return prisma.invitation.findMany({
    where: { companyId },
    orderBy: { expiration: 'desc' }
  })
}
async function deleteUser(id,companyId){
return prisma.user.deleteMany({
     where: {id, companyId }
})
}
module.exports={getCompanyUsers,getCompanyInvitations,deleteUser}

