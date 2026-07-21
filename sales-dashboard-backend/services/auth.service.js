const prisma = require('../prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function register({ email, password, firstName, lastName }){
const ExistingUser= await prisma.user.findUnique({where:{email}})
if(ExistingUser){
    const error = new Error('Un compte existe déjà avec cet email')
    error.code = 'EMAIL_TAKEN'
    throw error
}
const salt= await bcrypt.genSalt(10)
const hashedPassword=await bcrypt.hash(password,salt)
const created=await prisma.user.create ({
    data: {
         email, 
         password : hashedPassword,
         firstName, 
         lastName 
    }       
})

return created
}

async function login({ email, password }){
const ExistingUser= await prisma.user.findUnique({where:{email}})
if(!ExistingUser){
    const error = new Error('Email ou mot de passe incorrect')
    error.code = 'USER_NOT_FOUND'
    throw error
}
const isValid= await bcrypt.compare(password, ExistingUser.password)
if(!isValid){
    const error = new Error('Email ou mot de passe incorrect')
    error.code = 'WRONG_PASSWORD'
    throw error
}
const accessToken = jwt.sign(
    { userId: ExistingUser.id, role: ExistingUser.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '15m' })

const refreshToken = jwt.sign(
    { userId: ExistingUser.id, role: ExistingUser.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' })

return { accessToken, refreshToken, user: {
    id: ExistingUser.id,
    email: ExistingUser.email,
    firstName: ExistingUser.firstName,
    lastName: ExistingUser.lastName,
    role: ExistingUser.role
  } }
}
module.exports={register,login}