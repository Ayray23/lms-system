import { DataTable } from '../../components/DataTable'
import { SectionCard } from '../../components/SectionCard'
import { usersTable } from '../../utils/mockData'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'department', label: 'Department' },
  { key: 'status', label: 'Status' },
]

export function UserManagementPage() {
  return (
    <div className="page-stack">
      <SectionCard
        title="User Management"
        description="Manage students, lecturers, admins, and role assignments."
        action={<button className="primary-button small">Add user</button>}
      >
        <DataTable columns={columns} rows={usersTable} />
      </SectionCard>
    </div>
  )
}
