import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter}from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  
  </StrictMode>,
)
//Sans routage, le lien d'invitation ne pourra jamais fonctionner. 
// Ce n'est pas une question d'élégance ou de "bonne pratique" abstraite 
//  c'est que ton app n'a physiquement aucun moyen de distinguer "quelqu'un visite normalement" de "quelqu'un clique sur un lien d'invitation précis". 
// Le token resterait éternellement ignoré, et la fonctionnalité qu'on vient de construire côté backend (acceptInvitation, l'email envoyé...) resterait inaccessible depuis un vrai clic utilisateur 
//  tout ce travail existerait, mais personne ne pourrait jamais s'en servir normalement.
//En une phrase : le routage transforme l'URL d'un simple élément cosmétique (qui ne change jamais rien pour ton app) en une vraie donnée que ton code peut lire et utiliser pour décider quoi afficher.