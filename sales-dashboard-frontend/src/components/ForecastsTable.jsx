function ForecastsTable( {forecasts } ) {
  if (forecasts.length === 0) {
    return <p>Aucune prévision pour le moment.</p>
  }

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-[var(--page)]">
            <th className="p-3 text-sm font-medium text-[var(--text-secondary)]">Date</th>
            <th className="p-3 text-sm font-medium text-[var(--text-secondary)]">Produit</th>
            <th className="p-3 text-sm font-medium text-[var(--text-secondary)]">Région</th>
            <th className="p-3 text-sm font-medium text-[var(--text-secondary)]">Prévision</th>
            <th className="p-3 text-sm font-medium text-[var(--text-secondary)]">Borne basse</th>
            <th className="p-3 text-sm font-medium text-[var(--text-secondary)]">Borne haute</th>
            <th className="p-3 text-sm font-medium text-[var(--text-secondary)]">Modèle</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map((prévision, i) => (//.map() transforme chaque élément d'un tableau en JSX
          //ici j ai utilisé i pour des raisons décoratives ligne teinté ligne non 
            <tr 
              key={prévision.id}//et key donne un identifiant unique à chaque ligne générée.
              className={`border-t border-[var(--border)] hover:bg-[var(--accent-bg)] transition-colors ${
                i % 2 === 1 ? 'bg-[var(--page)]/40' : ''
              }`}
            >
              <td className="p-3 text-[var(--text)]">{prévision.forecast_date}</td>
              <td className="p-3 text-[var(--text)]">{prévision.product}</td>
              <td className="p-3 text-[var(--text)]">{prévision.region}</td>
              <td className="p-3 text-[var(--text)]">{prévision.predicted_amount}</td>
              <td className="p-3 text-[var(--text)]">{prévision.lower_bound}</td>
              <td className="p-3 text-[var(--text)]">{prévision.upper_bound }</td>
              <td className="p-3 text-[var(--text)]">{prévision.model_name }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default ForecastsTable