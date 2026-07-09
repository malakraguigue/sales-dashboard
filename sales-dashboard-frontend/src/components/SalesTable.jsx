function SalesTable({ sales }) {
  if (sales.length === 0) {
    return <p>Aucune vente pour le moment.</p>
  }

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-[var(--page)]">
            <th className="p-3 text-sm font-medium text-[var(--text-secondary)]">Date</th>
            <th className="p-3 text-sm font-medium text-[var(--text-secondary)]">Produit</th>
            <th className="p-3 text-sm font-medium text-[var(--text-secondary)]">Catégorie</th>
            <th className="p-3 text-sm font-medium text-[var(--text-secondary)]">Région</th>
            <th className="p-3 text-sm font-medium text-[var(--text-secondary)]">Quantité</th>
            <th className="p-3 text-sm font-medium text-[var(--text-secondary)]">Montant</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((vente, i) => (//.map() transforme chaque élément d'un tableau en JSX
          //ici j ai utilisé i pour des raisons décoratives ligne teinté ligne non 
            <tr 
              key={vente.id}//et key donne un identifiant unique à chaque ligne générée.
              className={`border-t border-[var(--border)] hover:bg-[var(--accent-bg)] transition-colors ${
                i % 2 === 1 ? 'bg-[var(--page)]/40' : ''
              }`}
            >
              <td className="p-3 text-[var(--text)]">{vente.sale_date}</td>
              <td className="p-3 text-[var(--text)]">{vente.product}</td>
              <td className="p-3 text-[var(--text)]">{vente.category}</td>
              <td className="p-3 text-[var(--text)]">{vente.region}</td>
              <td className="p-3 text-[var(--text)]">{vente.quantity}</td>
              <td className="p-3 text-[var(--text)]">{vente.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SalesTable
