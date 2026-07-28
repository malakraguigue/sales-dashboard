import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { acceptInvitation } from '../services/authService'

const inputClass =
  'border border-[var(--border)] bg-[var(--page)] text-[var(--text)] rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)] transition-shadow w-full'
const labelClass = 'block text-sm text-[var(--text-secondary)] mb-1'

function AcceptInvitationPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const navigate = useNavigate()
  const { LogIn } = useAuth()

  const [form, setForm] = useState({ password: '', firstName: '', lastName: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const { user } = await acceptInvitation({ token, ...form })
      await LogIn({ email: user.email, password: form.password })
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--page)] p-8">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8">
        <h2 className="mb-1">Rejoindre l'entreprise</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-6">Crée ton mot de passe pour accepter l'invitation</p>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className={labelClass}>Prénom</label>
            <input type="text" name="firstName" value={form.firstName} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Nom</label>
            <input type="text" name="lastName" value={form.lastName} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Mot de passe</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} className={inputClass} />
          </div>
        </div>
        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
        <button type="submit" disabled={loading} className="mt-6 w-full px-4 py-2 rounded-md text-sm font-medium bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50">
          {loading ? 'Validation...' : "Rejoindre l'entreprise"}
        </button>
      </form>
    </div>
  )
}

export default AcceptInvitationPage
