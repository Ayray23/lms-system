import { DataTable } from '../../components/DataTable'
import { SectionCard } from '../../components/SectionCard'
import { assignments } from '../../utils/mockData'

const columns = [
  { key: 'title', label: 'Assignment' },
  { key: 'course', label: 'Course' },
  { key: 'deadline', label: 'Deadline' },
  { key: 'status', label: 'Status' },
]

export function AssignmentManagementPage() {
  return (
    <div className="page-stack">
      <SectionCard
        title="Assignment Management"
        description="Create assignments, set deadlines, review submissions, and grade work."
        action={<button className="primary-button small">New assignment</button>}
      >
        <DataTable columns={columns} rows={assignments} />
      </SectionCard>
    </div>
  )
}
