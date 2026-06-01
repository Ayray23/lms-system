import { DataTable } from '../../components/DataTable'
import { SectionCard } from '../../components/SectionCard'
import { adminAssignments } from '../../utils/mockData'

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'course', label: 'Course' },
  { key: 'dueDate', label: 'Due Date' },
  { key: 'status', label: 'Status' },
]

export function AdminAssignmentsPage() {
  return (
    <div className="page-stack">
      <SectionCard
        title="Assignment Management"
        description="Create, update, grade, and manage assignments across your courses."
        action={<button className="primary-button small">Create Assignment</button>}
      >
        <DataTable columns={columns} rows={adminAssignments} />
      </SectionCard>
    </div>
  )
}
