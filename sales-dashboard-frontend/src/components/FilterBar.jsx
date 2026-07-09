const inputClass =
  'border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder-[var(--text-muted)] rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)] transition-shadow'

function FilterBar({ product, setProduct, region, setRegion, startDate, setStartDate, endDate, setEndDate }) {
  return (
    <div className="flex gap-4 mb-6 p-4 rounded-lg border border-[var(--border)] bg-[var(--surface)]">
      <input type="text" placeholder="Produit" value={product} onChange={(e) => setProduct(e.target.value)} className={inputClass} />
      <input type="text" placeholder="Région" value={region} onChange={(e) => setRegion(e.target.value)} className={inputClass} />
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputClass} />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className={inputClass} />
    </div>
  )
}

export default FilterBar
