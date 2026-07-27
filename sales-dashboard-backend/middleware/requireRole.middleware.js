const requireRole=(...roleValides)=>(req, res, next) => {
      if ( !roleValides.includes((req.user.role))) {// jai enlevé le && car il ferait l'inverse de ce que je veut : il laisserait passer l'anomalie au lieu de la rejeter. Il fallait le retirer.
    return res.status(403).json({ error: 'Accès refusé' })
  }
  next()
}
module.exports = requireRole;

