import { useState } from 'react'

const inputClass =
  'border border-[var(--border)] bg-[var(--page)] text-[var(--text)] rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)] transition-shadow w-full'
const labelClass = 'block text-sm text-[var(--text-secondary)] mb-1'
function LoginForm({SignUp, LogIn}) {
    const [mode, setMode] = useState('SignUp')
    const [form, setForm] = useState({
       firstName:'', lastName:'', email:'', password:'',companyName:''
    })
    const [formError, setFormError] = useState(null)

function handleChange(e){
    const{name,value}=e.target
    setForm(prev => ({...prev, [name]: value})) }

async function handleSubmit(e) {
    e.preventDefault()
    const payload = form
    try{
      if (mode === 'SignUp') {
        await SignUp(payload)
         setForm({ firstName:'', lastName:'', email:'', password:'',companyName:''})
    } else {
        await LogIn({ email: form.email, password: form.password })
         setForm({ firstName:'', lastName:'', email:'', password:'',companyName:''})
    }
    }catch(err){
     setFormError(err.response?.data?.error || 'Une erreur est survenue')
    }
}

    return(
        <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8">
         <h2 className="mb-1">{mode === 'SignUp' ? "Créer un compte" : "Se connecter"}</h2>
         <p className="text-sm text-[var(--text-secondary)] mb-6">
           {mode === 'SignUp' ? 'Renseigne tes informations pour commencer' : 'Content de te revoir'}
         </p>
         <div className="grid grid-cols-1 gap-4">
           {mode === 'SignUp' && (
             <>
               <div>
                 <label className={labelClass}>Prénom</label>
                 <input type="text" name="firstName" placeholder="entrez votre prenom" value={form.firstName} onChange={handleChange} className={inputClass} />
               </div>
               <div>
                 <label className={labelClass}>Nom</label>
                 <input type="text" name="lastName" placeholder="entrez votre nom" value={form.lastName} onChange={handleChange} className={inputClass} />
               </div>
               <div>
                 <label className={labelClass}>Entreprise</label>
                 <input type="text" name="companyName" placeholder="entrez le nom de votre Entreprise" value={form.companyName} onChange={handleChange} className={inputClass} />
               </div>
             </>
           )}
           <div>
             <label className={labelClass}>Email</label>
             <input type="email" name="email" placeholder="entrez votre email" value={form.email} onChange={handleChange} className={inputClass} />
           </div>
           <div>
             <label className={labelClass}>Mot de passe</label>
             <input type="password" name="password"  placeholder="entrez votre mot de passe "  value={form.password} onChange={handleChange} className={inputClass} />
           </div>
         </div>
         {formError && <p className="text-sm text-red-500 mb-2">{formError}</p>}
         <button type="submit" className="mt-6 w-full px-4 py-2 rounded-md text-sm font-medium bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-colors">
            {mode === 'SignUp' ? "S'inscrire" : "Se connecter"}
         </button>
         <button type="button" onClick={() => setMode(mode === 'SignUp' ? 'Login' : 'SignUp')} className="mt-4 w-full text-center text-sm text-[var(--accent)] hover:underline">
            {mode === 'SignUp' ? 'Déjà un compte ? Se connecter' : "Pas de compte ? S'inscrire"}
         </button>
        </form>
    )
}
 export default LoginForm
