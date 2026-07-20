function KpisTable({ titre, valeur }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
      <p className="text-sm text-[var(--text-secondary)]">{titre}</p>
      <p className="text-2xl font-semibold text-[var(--text)] break-words">{valeur}</p>
    </div>
  )
}

export default KpisTable
// Intérêt : réutilisable partout (Dashboard, Rapport mensuel, etc.)
// avec des données différentes à chaque fois, SANS dupliquer le CSS.
// Si je change le style ICI, ça change PARTOUT où KpiCard est utilisé. 