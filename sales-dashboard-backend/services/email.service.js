const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({//configure une seule fois la connexion à Gmail
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
})

async function sendInvitationEmail(destinataire, token) {// envoie réellement l'email — from/to les adresses, subject l'objet, html le contenu 
  const lien = `http://localhost:5173/accepter-invitation?token=${token}`
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: destinataire,
    subject: 'Invitation à rejoindre votre entreprise',
    html: `<p>Vous avez été invité à rejoindre une entreprise sur Sales Dashboard.</p>
           <p><a href="${lien}">Cliquez ici pour accepter l'invitation</a></p>
           <p>Ce lien expire dans 24 heures.</p>`
  })
}

module.exports = { sendInvitationEmail }
