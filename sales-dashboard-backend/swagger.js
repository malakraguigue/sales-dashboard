const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sales Dashboard API',
      version: '1.0.0',
      description: 'API du dashboard de ventes',
    },
  },
  apis: ['./routes/*.js'], // où chercher les commentaires @swagger
}

module.exports = swaggerJsdoc(options)
