import { DataTable } from '../../components/DataTable'
import { SectionCard } from '../../components/SectionCard'
import { assignments } from '../../utils/mockData'

const columns = [
  { key: 'title', label: 'Assignment' },
  { key: 'course', label: 'Course' },
  { key: 'deadline', label: 'Deadline' },
  { key: 'status', label: 'Status' },
]

export function StudentAssignmentsPage() {
  return (
    <div className="page-stack">
      <SectionCard
        title="Assignments"
        description="Document tasks, coding submissions, and grading updates."
        action={<button className="primary-button small">Submit assignment</button>}
      >
        <DataTable columns={columns} rows={assignments} />
      </SectionCard>
    </div>
  )
}
