import api from './api'

async function inviteUser({ email, role }) {
  const response = await api.post('/invitations/invite', { email, role })
  return response.data
}

async function fetchMembers() {
  const response = await api.get('/invitations/members')
  return response.data
}

async function fetchPendingInvitations() {
  const response = await api.get('/invitations/pending')
  return response.data
}

export { inviteUser, fetchMembers, fetchPendingInvitations }
