import { useState } from 'react'

const inputClass =
  'border border-[var(--border)] bg-[var(--page)] text-[var(--text)] rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)] transition-shadow w-full'
const labelClass = 'block text-sm text-[var(--text-secondary)] mb-1'

function InviteUserForm({ inviteUser }) {
  const [form, setForm] = useState({ email: '', role: 'USER' })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    try {
      await inviteUser(form)
      setForm({ email: '', role: 'USER' })
      setSuccess(true)
    } catch (err) {
      setError(err.response?.data?.error || 'Une erreur est survenue')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 mb-6">
      <h2 className="mb-4">Inviter un membre</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Rôle</label>
          <select name="role" value={form.role} onChange={handleChange} className={inputClass}>
            <option value="USER">Utilisateur</option>
            <option value="MANAGER">Manager</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
      </div>
      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      {success && <p className="mt-3 text-sm text-green-600">Invitation envoyée !</p>}
      <button type="submit" className="mt-4 px-4 py-2 rounded-md text-sm font-medium bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-colors">
        Inviter
      </button>
    </form>
  )
}

export default InviteUserForm
