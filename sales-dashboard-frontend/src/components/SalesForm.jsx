import { useState } from 'react'

const inputClass =
  'border border-[var(--border)] bg-[var(--page)] text-[var(--text)] rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)] transition-shadow w-full'
const labelClass = 'block text-sm text-[var(--text-secondary)] mb-1'

function SalesForm({addSale}){
    const [form, setForm] = useState({
        product:'', region:'', category:'', sale_date:'', quantity:'',amount:'',stock_quantity :''
    })
    function handleChange(e){
        const{name,value}=e.target
        setForm(prev => ({...prev, [name]: value})) }
    async function handleSubmit(e) {
     e.preventDefault()
     const payload = {...form, quantity: Number(form.quantity), amount: Number(form.amount), stock_quantity: Number(form.stock_quantity)}
     await addSale(payload)
      setForm({ product:'', region:'', category:'', sale_date:'', quantity:'', amount:'', stock_quantity:''})
    }

    return(
        <form onSubmit={handleSubmit} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 mb-6">
         <h2 className="mb-4">Ajouter une vente</h2>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <div>
             <label className={labelClass}>Produit</label>
             <input type="text" name="product" placeholder="Nom du produit" value={form.product} onChange={handleChange} className={inputClass} />
           </div>
           <div>
             <label className={labelClass}>Région</label>
             <input type="text" name="region" placeholder="Région" value={form.region} onChange={handleChange} className={inputClass} />
           </div>
           <div>
             <label className={labelClass}>Catégorie</label>
             <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
                <option value="">-- Choisir --</option>
                <option value="Furniture">Furniture</option>
                <option value="OfficeSupplies">Office Supplies</option>
                <option value="Technology">Technology</option>
             </select>
           </div>
           <div>
             <label className={labelClass}>Date de la vente</label>
             <input type="date" name="sale_date" value={form.sale_date} onChange={handleChange} className={inputClass} />
           </div>
           <div>
             <label className={labelClass}>Quantité</label>
             <input type="number" name="quantity" placeholder="0" value={form.quantity} onChange={handleChange} className={inputClass} />
           </div>
           <div>
             <label className={labelClass}>Montant</label>
             <input type="number" step="0.01" name="amount" placeholder="0.00" value={form.amount} onChange={handleChange} className={inputClass} />
           </div>
           <div>
             <label className={labelClass}>Stock (optionnel)</label>
             <input type="number" name="stock_quantity" placeholder="0" value={form.stock_quantity} onChange={handleChange} className={inputClass} />
           </div>
         </div>
         <button type="submit" className="mt-4 px-4 py-2 rounded-md text-sm font-medium bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-colors">
           Ajouter
         </button>
        </form>
    )
}

export default SalesForm
