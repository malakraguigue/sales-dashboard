import { useState, useEffect } from 'react'
import { inviteUser as inviteUserService, fetchMembers, fetchPendingInvitations } from '../services/invitationsService'

export function useInvitations() {
  const [members, setMembers] = useState([])
  const [invitations, setInvitations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function reload() {
    const [membersData, invitationsData] = await Promise.all([
      fetchMembers(),
      fetchPendingInvitations()
    ])
    setMembers(membersData)
    setInvitations(invitationsData)
  }

  useEffect(() => {
    reload()
      .then(() => setLoading(false))
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  async function inviteUser({ email, role }) {
    await inviteUserService({ email, role })
    await reload()
  }

  return { members, invitations, loading, error, inviteUser }
}
