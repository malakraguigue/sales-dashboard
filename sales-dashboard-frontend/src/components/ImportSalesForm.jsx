import { useState } from 'react'

function ImportSalesForm({ importSales }) {
  const [file, setFile] = useState(null)
  const [resume, setResume] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleFileChange(e) {
    setFile(e.target.files[0])
    setResume(null)
    setError(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!file) return
    setLoading(true)
    setError(null)
    try {
      const data = await importSales(file)
      setResume(data)
      setFile(null)
      e.target.reset()
    } catch (err) {
      setError(err.response?.data?.error || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 mb-6">
      <h2 className="mb-4">Importer un fichier Excel</h2>
      <div className="flex items-center gap-4">
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          className="text-sm text-[var(--text-secondary)]"
        />
        <button
          type="submit"
          disabled={!file || loading}
          className="px-4 py-2 rounded-md text-sm font-medium bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50"
        >
          {loading ? 'Import en cours...' : 'Importer'}
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

      {resume && (
        <div className="mt-3 text-sm">
          <p className="text-[var(--text)]">
            {resume.imported} ligne(s) importée(s), {resume.rejected} rejetée(s)
          </p>
          {resume.errors?.length > 0 && (
            <ul className="mt-2 list-disc list-inside text-red-500">
              {resume.errors.map((e) => (
                <li key={e.ligne}>
                  Ligne {e.ligne} : {e.erreurs.map((err) => err.message).join(', ')}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </form>
  )
}

export default ImportSalesForm
