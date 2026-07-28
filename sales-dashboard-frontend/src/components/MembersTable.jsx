function MembersTable({ members, invitations }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-[var(--page)] text-left">
          <tr>
            <th className="p-3">Nom</th>
            <th className="p-3">Email</th>
            <th className="p-3">Rôle</th>
            <th className="p-3">Statut</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id} className="border-t border-[var(--border)]">
              <td className="p-3">{m.firstName} {m.lastName}</td>
              <td className="p-3">{m.email}</td>
              <td className="p-3">{m.role}</td>
              <td className="p-3 text-green-600">Actif</td>
            </tr>
          ))}
          {invitations.filter((i) => !i.statutAccepte).map((i) => (
            <tr key={i.id} className="border-t border-[var(--border)] text-[var(--text-secondary)]">
              <td className="p-3">—</td>
              <td className="p-3">{i.email}</td>
              <td className="p-3">{i.rolePropose}</td>
              <td className="p-3 text-amber-600">En attente</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MembersTable
