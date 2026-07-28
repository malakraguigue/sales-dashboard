import { useInvitations } from '../hooks/useInvitations'
import InviteUserForm from '../components/InviteUserForm'
import MembersTable from '../components/MembersTable'

function TeamPage() {
  const { members, invitations, loading, error, inviteUser } = useInvitations()

  if (loading) return <p className="p-8">Chargement...</p>
  if (error) return <p className="p-8">Erreur : {error}</p>

  return (
    <div className="min-h-screen p-8 bg-[var(--page)]">
      <h1 className="mb-6">Gestion de l'équipe</h1>
      <InviteUserForm inviteUser={inviteUser} />
      <MembersTable members={members} invitations={invitations} />
    </div>
  )
}

export default TeamPage
