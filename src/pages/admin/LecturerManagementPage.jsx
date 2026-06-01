import { DataTable } from '../../components/DataTable'
import { SectionCard } from '../../components/SectionCard'
import { adminLecturers } from '../../utils/mockData'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'department', label: 'Department' },
  { key: 'courses', label: 'Courses Assigned' },
  { key: 'status', label: 'Status' },
]

export function LecturerManagementPage() {
  return (
    <div className="page-stack">
      <SectionCard
        title="Lecturer Management"
        description="Manage lecturers, assign courses, and review teaching assignments."
        action={<button className="primary-button small">Add Lecturer</button>}
      >
        <DataTable columns={columns} rows={adminLecturers} />
      </SectionCard>
    </div>
  )
}
