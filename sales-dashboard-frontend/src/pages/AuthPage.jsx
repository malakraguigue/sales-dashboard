import LoginForm from '../components/LoginForm'
function AuthPage({ SignUp, LogIn }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--page)] p-8">
      <LoginForm SignUp={SignUp} LogIn={LogIn} />
    </div>
  )
}

export default AuthPage
