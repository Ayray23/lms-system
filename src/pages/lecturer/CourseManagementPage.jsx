import { DataTable } from '../../components/DataTable'
import { SectionCard } from '../../components/SectionCard'
import { courseManagementRows } from '../../utils/mockData'

const columns = [
  { key: 'course', label: 'Course' },
  { key: 'owner', label: 'Lecturer' },
  { key: 'materials', label: 'Materials' },
  { key: 'students', label: 'Students' },
]

export function CourseManagementPage() {
  return (
    <div className="page-stack">
      <SectionCard
        title="Course Management"
        description="Create courses, upload notes, add links, and publish announcements."
        action={<button className="primary-button small">Create course</button>}
      >
        <DataTable columns={columns} rows={courseManagementRows} />
      </SectionCard>
    </div>
  )
}
