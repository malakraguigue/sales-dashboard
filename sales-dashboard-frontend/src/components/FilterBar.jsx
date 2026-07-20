const inputClass =
  'border border-[var(--border)] bg-[var(--page)] text-[var(--text)] placeholder-[var(--text-muted)] rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)] transition-shadow w-full'
const labelClass = 'block text-sm text-[var(--text-secondary)] mb-1'

function FilterBar({ product, setProduct, region, setRegion, category, setCategory, startDate, setStartDate, endDate, setEndDate }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 mb-6">
      <h2 className="mb-4">Trouver une vente</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div>
          <label className={labelClass}>Produit</label>
          <input type="text" placeholder="Produit" value={product} onChange={(e) => setProduct(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Région</label>
          <input type="text" placeholder="Région" value={region} onChange={(e) => setRegion(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Catégorie</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
            <option value="">Toutes les catégories</option>
            <option value="Furniture">Furniture</option>
            <option value="OfficeSupplies">Office Supplies</option>
            <option value="Technology">Technology</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Date de début</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Date de fin</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className={inputClass} />
        </div>
      </div>
    </div>
  )
}

export default FilterBar
