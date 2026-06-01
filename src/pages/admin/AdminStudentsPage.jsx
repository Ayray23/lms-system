import { DataTable } from '../../components/DataTable'
import { SectionCard } from '../../components/SectionCard'
import { adminStudents } from '../../utils/mockData'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'matricNo', label: 'Matric No' },
  { key: 'department', label: 'Department' },
  { key: 'level', label: 'Level' },
  { key: 'status', label: 'Status' },
]

export function AdminStudentsPage() {
  return (
    <div className="page-stack">
      <SectionCard
        title="Student Management"
        description="Add, edit, suspend, and review student profiles across the platform."
        action={<button className="primary-button small">Add Student</button>}
      >
        <DataTable columns={columns} rows={adminStudents} />
      </SectionCard>
    </div>
  )
}
